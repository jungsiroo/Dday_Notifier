import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {_ErrorHandler, _SuccessHandler} from './ToastMsg';
import Toast from 'react-native-toast-message';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  function _isBlank(email, password) {
    if (
      email === undefined ||
      password === undefined ||
      email === '' ||
      password === ''
    )
      return true;

    return false;
  }

  function _arePasswordandconfirmPwSame(password, confirmPw) {
    if (password === confirmPw) return true;

    return false;
  }

  function _checkEmail(email) {
    let reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (!reg_email.test(email)) {
      return false;
    } else {
      return true;
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            if (_isBlank(email, password)) _ErrorHandler('Login', 'Blank');
            else if (!_checkEmail(email)) _ErrorHandler('Login', 'Invalid');
            else await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            _ErrorHandler('Login', e.toString());
          }
        },
        register: async (email, password, confirmPw) => {
          try {
            if (_isBlank(email, password)) _ErrorHandler('Signup', 'Blank');
            else if (!_checkEmail(email)) _ErrorHandler('Signup', 'Invalid');
            else if (!_arePasswordandconfirmPwSame(password, confirmPw))
              _ErrorHandler('Signup', 'Equal');
            else await auth().createUserWithEmailAndPassword(email, password);
            _SuccessHandler('Signup');
          } catch (e) {
            _ErrorHandler('Signup', e.toString());
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            _ErrorHandler('Logout');
          }
        },
        forgot: async (email) => {
          try {
            await auth().sendPasswordResetEmail(email);
          } catch (e) {
            _ErrorHandler('Forgot', e.toString());
          }
        },
      }}>
      {children}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </AuthContext.Provider>
  );
};
