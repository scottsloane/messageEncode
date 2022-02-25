const {
  encode,
  decode
} = require('./lib/encoder');

const fs = require('fs');

const inp = fs.readFileSync('./test.txt', 'utf-8');
const msg = "This is a test".toUpperCase();

const para = inp.split('\n\n');

let encoded = encode(para[0], msg);
console.log(encoded);

let decoded = decode(encoded);
console.log(decoded);