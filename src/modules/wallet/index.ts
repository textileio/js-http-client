import bip39 from 'bip39'
import { BIP32 } from './bip32'
import { Keypair } from './keypair'
import { hmacSHA512 } from '../../helpers/crypto'
import { Account } from '../../models'

// Textile account path format used for key pair derivation as described in SEP-00XX
const TEXTILE_BIP44 = `m/44'/406'`

// Derive the 'm' level of the BIP44 wallet
function createMasterKey(seed: Buffer) {
  // As in https://github.com/satoshilabs/slips/blob/master/slip-0010.md
  const I = hmacSHA512('ed25519 seed', seed)
  const privateKey = I.slice(0, 32)
  const chainCode = I.slice(32)
  return BIP32.fromPrivateKey(privateKey, chainCode)
}

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
  /** Generate a new Walet from a given word count */
  static fromWordCount(wordCount: number) {
    return Wallet.fromEntropy(
      ((count) => {
        switch (count) {
          case 12:
            return 128
          case 15:
            return 160
          case 18:
            return 192
          case 21:
            return 225
          case 24:
            return 256
          default:
            return 256
        }
      })(wordCount)
    )
  }

  /**
   * Generate a new Walet from a given entropy level
   * @param strength The bits of entropy to use (defaults to 128)
   */
  static fromEntropy(strength?: number) {
    return new Wallet(bip39.generateMnemonic(strength))
  }

  recoveryPhrase: string

  /**
   * Initialize a new Wallet
   *
   * @param recoveryPhrase Mnemonic pass-phrase (aka wordlist, recovery phrase, etc)
   * @param check Wheather to validate the input recovery phrase
   * @example
   * const mnemonic = 'blah lava place private blah blah blah magic truth verify kite blah'
   * const wallet = new Wallet(mnemonic, true)
   * console.log(wallet.accountAt(0))
   */
  constructor(recoveryPhrase: string, check?: boolean) {
    if (check && !bip39.validateMnemonic(recoveryPhrase)) {
      throw new Error('Invalid recovery phrase')
    }
    this.recoveryPhrase = recoveryPhrase
  }

  /**
   * Accesses derived accounts (address/seed pairs) from a wallet
   *
   * Derives key for a path in BIP-44 format and a seed.
   * Ed25119 derivation operated on hardened keys only.
   *
   * @param index Account index
   * @param password Mnemonic recovery phrase password (omit if none)
   * @returns A derived Wallet account
   */
  accountAt(index: number, password?: string): Account {
    const seed = bip39.mnemonicToSeed(this.recoveryPhrase, password)
    const masterKey = createMasterKey(seed)
    const baseKey = masterKey.derivePath(TEXTILE_BIP44)
    const accountKey = baseKey.deriveHardened(index)
    const kp = Keypair.fromRawEd25519Seed(accountKey.privateKey)
    return {
      index,
      seed: kp.secret(),
      address: kp.publicKey()
    }
  }
}
