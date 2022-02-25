# messageEncode

## Principal
messageEncode uses the principals of text steganography to hide encoded data within the whitespace of a simple text string.

## Encoding

The following code is used to encode a message. It first converts the secret message into quads. Then after checking that there is enough whitespace in the input string, the code iterates through the secret message and uses the convertToSpace helper function to add a mix of 0-2 spaces and non-breaking spaces based on quad values.

 ```javascript
const encode = (str, msg) => {
  let outp = '';
  let last = 0;
  let idx = 0;
  const quad = messageToNumStr(msg);
  if (countNonAlphaNum(str) < quad.length * 2) throw 'Error'
  str = removeSpaces(str);
  for (let i in quad) {
    for (let ii = 0; ii < 2; ii++) {
      idx = getNextChar(str, idx) + 1;
      if (idx === null) return 'err';
      outp += str.substring(last, idx) + convertToSpace('', ii, quad[i]);
      last = idx;
    }
  }
  outp += str.substr(last);
  return outp;
}
 ```

 ## Decoding

 Decoding is basically encoding but in reverse. The code iterates though the encoded string and uses the convertFromSpaces helper function to decode the hidden message.

 ```javascript
const decode = (str) => {
  let idx = 0;
  let hold = [];
  let chars;

  while (idx = getNextChar(str, idx)) {
    let next = convertFromSpaces(str.substr(idx, 3));
    if (next != '') hold.push(next);
  }

  let final = [];
  let temp = '';
  for (let i = 1; i <= hold.length; i++) {
    if (i % 2 === 0) {
      final.push(`${temp}${hold[i-1]}`)
    } else {
      temp = hold[i - 1]
    }
  }
  return numStrToMessage(final)
}
 ```