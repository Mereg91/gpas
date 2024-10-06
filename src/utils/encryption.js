import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // En una aplicación real, esto debería ser único para cada usuario y almacenado de forma segura

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};