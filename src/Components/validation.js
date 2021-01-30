function _isBlank(email, password) {
  if (
    typeof email == 'undefined' ||
    email.length == 0 ||
    typeof password == 'undefined' ||
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
