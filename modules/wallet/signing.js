//  This module provides the signing functionality used by the stellar network
//  The code below may look a little strange... this is because we try to provide
//  the most efficient signing method possible.  First, we try to load the
//  native ed25519 package for node.js environments, and if that fails we
//  fallback to tweetnacl.js
//
// Copyright (c) 2015-2018 Stellar Development Foundation
//

const actualMethods = {};

function checkFastSigningBrowser() {
  // fallback to tweetnacl.js if we're in the browser or
  // if there was a failure installing ed25519
  // eslint-disable-next-line
  const nacl = require('tweetnacl');
  actualMethods.sign = (data, secretKey) => {
    let newData = Buffer.from(data);
    newData = new Uint8Array(newData.toJSON().data);
    const newSecretKey = new Uint8Array(secretKey.toJSON().data);

    const signature = nacl.sign.detached(newData, newSecretKey);

    return Buffer.from(signature);
  };

  actualMethods.verify = (data, signature, publicKey) => {
    let newData = Buffer.from(data);
    newData = new Uint8Array(newData.toJSON().data);
    const newSignature = new Uint8Array(signature.toJSON().data);
    const newPublicKey = new Uint8Array(publicKey.toJSON().data);

    return nacl.sign.detached.verify(newData, newSignature, newPublicKey);
  };

  return false;
}

function checkFastSigningNode() {
  // NOTE: we use commonjs style require here because es6 imports
  // can only occur at the top level.  thanks, obama.
  let ed25519;
  try {
    // eslint-disable-next-line
    ed25519 = require('ed25519');
  } catch (err) {
    return checkFastSigningBrowser();
  }

  actualMethods.sign = (data, secretKey) =>
    ed25519.Sign(Buffer.from(data), secretKey);

  actualMethods.verify = (data, signature, publicKey) => {
    const newData = Buffer.from(data);
    try {
      return ed25519.Verify(newData, signature, publicKey);
    } catch (e) {
      return false;
    }
  };

  return true;
}

function checkFastSigning() {
  return typeof window === "undefined"
    ? checkFastSigningNode()
    : checkFastSigningBrowser();
}

/**
 * Use this flag to check if fast signing (provided by `ed25519` package) is available.
 * If your app is signing a large number of transaction or verifying a large number
 * of signatures make sure `ed25519` package is installed.
 */
const FastSigning = checkFastSigning();

function sign(data, secretKey) {
  return actualMethods.sign(data, secretKey);
}

function verify(data, signature, publicKey) {
  return actualMethods.verify(data, signature, publicKey);
}

module.exports = { FastSigning, sign, verify };
