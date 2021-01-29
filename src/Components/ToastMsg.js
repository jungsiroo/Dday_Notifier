import Toast from 'react-native-toast-message';

export const _ErrorHandler = (status, Error) => {
  Toast.show({
    type: 'error',
    position: 'top',
    visibilityTime: 6000,
    autoHide: true,
    topOffset: 70,
    bottomOffset: 40,
    text1: status + ' Error',
    text2: Error.toString(),
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
    text2: 'Welcome Back',
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
