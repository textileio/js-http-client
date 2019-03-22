const bip39 = require("bip39");
const { BIP32 } = require("./bip32");
const { Keypair } = require("./keypair");
const { hmacSHA512 } = require("../../helpers/crypto");

// Textile account path format used for key pair derivation as described in SEP-00XX
const TEXTILE_BIP44 = `m/44'/406'`;

// Derive the "m" level of the BIP44 wallet
const createMasterKey = seed => {
  // As in https://github.com/satoshilabs/slips/blob/master/slip-0010.md
  const I = hmacSHA512("ed25519 seed", seed);
  const privateKey = I.slice(0, 32);
  const chainCode = I.slice(32);
  return BIP32.fromPrivateKey(privateKey, chainCode);
};

/**
 * Wallet is an API module for initializing wallets and creating/accessing accounts
 *
 * A wallet is represented by mnemonic phrase, and in practice is a BIP32 Hierarchical
 * Deterministic Wallet based on Stellar's implementation of SLIP-0010. You can think of a wallet
 * as a master key, and the account represent keys specific to a given application or use-case.
 * Any given wallet may create an arbitrary number of accounts.
 *
 * Accounts are generated via the wallet pass-phrase and are an Ed25519 public/private keypair
 * used to sign backups, provision libp2p identities, etc. Textile uses Ed25519 here because
 * it's fast, compact, secure, and widely used. See the EdDSA Wikipedia page for more details.
 *
 * WARNING! Store the derived pass-phrases in a safe place!
 * WARNING! If you lose your words, you will lose access to data in all derived accounts!
 * WARNING! Anyone who has access to these words can access your wallet accounts!
 *
 * @param {ApiOptions} opts API options object
 * @extends API
 */
export default class Wallet {
  /**
   * Initialize a new Wallet
   *
   * @param {string} recoveryPhrase Mnemonic pass-phrase (aka wordlist, recovery phrase, etc)
   * @param {boolean} [check] Wheather to validate the input recovery phrase
   * @example
   * const mnemonic = 'blah lava place private blah blah blah magic truth verify kite blah'
   * const wallet = new Wallet(mnemonic, true)
   * console.log(wallet.accountAt(0))
   */
  constructor(recoveryPhrase, check) {
    if (check && !bip39.validateMnemonic(recoveryPhrase)) {
      throw new Error("Invalid recovery phrase");
    }
    this.recoveryPhrase = recoveryPhrase;
  }

  /** Generate a new Walet from a given word count */
  static fromWordCount(wordCount) {
    return Wallet.fromEntropy(
      (count => {
        switch (count) {
          case 12:
            return 128;
          case 15:
            return 160;
          case 18:
            return 192;
          case 21:
            return 225;
          case 24:
            return 256;
          default:
            return 256;
        }
      })(wordCount)
    );
  }

  /** Generate a new Walet from a given entropy level */
  static fromEntropy(strength) {
    return new Wallet(bip39.generateMnemonic(strength));
  }

  /**
   * Accesses derived accounts (address/seed pairs) from a wallet
   *
   * Derives key for a path in BIP-44 format and a seed.
   * Ed25119 derivation operated on hardened keys only.
   *
   * @param {number} index Account index
   * @param {string} [password] Mnemonic recovery phrase password (omit if none)
   * @returns {Account} A derived Wallet account
   */
  accountAt(index, password) {
    const seed = bip39.mnemonicToSeed(this.recoveryPhrase, password);
    const masterKey = createMasterKey(seed);
    const baseKey = masterKey.derivePath(TEXTILE_BIP44);
    const accountKey = baseKey.derive(index);
    const kp = Keypair.fromRawEd25519Seed(accountKey.privateKey);
    return {
      seed: kp.secret(),
      address: kp.publicKey()
    };
  }
}

/**
 * A derived Wallet account
 * @typedef {Object} Account
 * @property {string} seed Ed25519 private seed
 * @property {string} address Ed25519 public key
 */

