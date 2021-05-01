export function _isBlank(email, password) {
  if (
    typeof email == "undefined" ||
    email.length == 0 ||
    typeof password == "undefined" ||
    password.length == 0
  )
    return true;

  return false;
}

export const _arePasswordandconfirmPwSame = (password, confirmPw) => {
  if (password === confirmPw) return true;

  return false;
};

export const _checkEmail = (email) => {
  let reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  return reg_email.test(email);
};

export const _isPasswordLong = (password) => {
  return password.length >= 6;
};

export const _convertToAscii = (text) => {
  let unicode = "";
  for (let i = 0, l = text.length; i < l; i++) {
    unicode += "\\" + text[i].charCodeAt(0).toString(16);
  }
  return unicode;
};

export const _exportFromAscii = (text) => {
  let result = "";

  let uniArr = text.split("\\");
  uniArr.shift();

  for (let uni of uniArr) result += String.fromCharCode(parseInt(uni, 16));

  return result;
};
