import CryptoJS from 'crypto-js'

// 默认的KEY与iv与后端保持一致，不采用后端传值密钥
const key = 'grkj202388886666';
const k = key.slice(0,16), i = key.slice(key.length - 16, key.length);
const KEY = CryptoJS.enc.Utf8.parse(k);// 密钥
const IV = CryptoJS.enc.Utf8.parse(i);// 偏移量

// slice(0,16)
// slice(length-16,len)
/** AES加密 */
export function EncryptByBase64(word, keyStr, ivStr) {
  let key = KEY;
  let iv = IV;

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

}


/** AES 解密 */
export function DecodeByBase64(word, keyStr, ivStr) {
  let key  = KEY;
  let iv = IV;

  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  const base64 = CryptoJS.enc.Base64.parse(word);
  const src = CryptoJS.enc.Base64.stringify(base64);

  const decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });

  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();

}
