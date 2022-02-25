module.exports = (() => {

    const chars = [':', '(', ')', ';', '.', '?', ',']

    const messageToNumStr = (str) => {
        let ret = [];
        for (let i in str) {
            let val = str.charCodeAt(i) - 64;
            ret.push(((val > 0) ? val : 0).toString(6));
        }
        return ret;
    }

    const numStrToMessage = (num) => {
        let ret = [];
        for (let i in num) {
            let val = parseInt(num[i], 6);
            ret.push((val == 0) ? ' ' : String.fromCharCode(val + 64));
        }
        return ret.join('');
    }

    const convertToSpace = (char, idx, num) => {
        ret = '';
        while (num.length < 2) {
            num = '0' + num;
        }
        switch (num[idx]) {
            case '0':
                return `${char} `;
            case '1':
                return `${char} `;
            case '2':
                return `${char}  `;
            case '3':
                return `${char}  `;
            case '4':
                return `${char}  `;
            case '5':
                return `${char}  `
        }
        return null;
    }

    const removeCharAt = (str, idx) => {
        part1 = str.substring(0, idx);
        part2 = str.substring(idx + 1, str.length);
        return (part1 + part2);
    }

    const removeSpaces = (str) => {
        let ret = str;
        for (let i = str.length - 1; i >= 0; i--) {
            if (str.charAt(i) === ' ') {
                if (chars.indexOf(str[i - 1]) >= 0 || chars.indexOf(str[i + 1]) >= 0)
                    ret = removeCharAt(ret, i);
            }
        }
        return ret;
    }

    const countNonAlphaNum = (str) => {
        let cnt = 0;
        for (let i in str) {
            if (chars.indexOf(str[i]) >= 0) cnt++;
        }
        return cnt;
    }

    const getNextChar = (str, pos) => {
        for (let i = pos + 1; i < str.length; i++) {
            if (chars.indexOf(str[i]) >= 0) return i;
        }
        return null;
    }

    const convertFromSpaces = (str) => {
        let buf = '';
        let idx = 1;
        while (str[idx] === ' ' || str[idx] === ' ') {
            code = str.charCodeAt(idx);
            buf += str.charCodeAt(idx);
            idx++;
        }
        switch (buf) {
            case '32':
                return '0';
            case '160':
                return '1';
            case '3232':
                return '2';
            case '32160':
                return '3';
            case '16032':
                return '4';
            case '160160':
                return '5';
            default:
                return '';
        }
    }

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

    return {
        encode,
        decode
    }

})()