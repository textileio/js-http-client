const createHash = require("create-hash");
const createHmac = require("create-hmac");

const hash160 = buffer => {
  return createHash("rmd160")
    .update(
      createHash("sha256")
        .update(buffer)
        .digest()
    )
    .digest();
};

const hmacSHA512 = (key, data) => {
  return createHmac("sha512", key)
    .update(data)
    .digest();
};

module.exports = { hash160, hmacSHA512 };
