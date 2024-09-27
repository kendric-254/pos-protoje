// Import the crypto module, which provides cryptographic functionality
const crypto = require('crypto');

// Generate a random 32-byte key, then convert it to a hexadecimal string
const key1 = crypto.randomBytes(32).toString('hex');

// Generate a second random 32-byte key, also converted to a hexadecimal string
const key2 = crypto.randomBytes(32).toString('hex');

// Log both keys in a tabular format
console.table({key1, key2});
