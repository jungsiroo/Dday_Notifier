import Toast from 'react-native-toast-message';

export const _ErrorHandler = (status, Error) => {
  function ErrorSelect(ErrorMsg) {
    if (ErrorMsg.includes('user-not-found')) return 'User Not Found';
    else if (ErrorMsg.includes('wrong-password'))
      return 'Invalid Email or Wrong Password';
    else if (ErrorMsg.includes('Blank')) return 'No Blank Allowed';
    else if (ErrorMsg.includes('Equal')) return 'Passwords are not Same!';
    else return 'Invalid Email Address';
  }

  Toast.show({
    type: 'error',
    position: 'top',
    visibilityTime: 6000,
    autoHide: true,
    topOffset: 70,
    bottomOffset: 40,
    text1: status + ' Error',
    text2: ErrorSelect(Error),
  });
};

export const _SuccessHandler = (status) => {
  Toast.show({
    type: 'success',
    position: 'top',
    visibilityTime: 6000,
    autoHide: true,
    topOffset: 70,
    bottomOffset: 40,
    text1: status.toString() + ' Success',
  });
};

export const _InfoHandler = () => {
  Toast.show({
    type: 'info',
    position: 'top',
    visibilityTime: 6000,
    autoHide: true,
    topOffset: 70,
    bottomOffset: 40,
    text1: 'Login Success',
    text2: 'Welcome Back',
  });
};
