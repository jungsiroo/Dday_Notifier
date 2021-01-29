import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {_ErrorHandler} from './ToastMsg';
import Toast from 'react-native-toast-message';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

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
          if (email !== undefined && password !== undefined) {
            try {
              await auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              _ErrorHandler('Login', e.toString());
            }
          } else if (!_checkEmail(email)) {
            _ErrorHandler('Login', 'Invalid Email Address');
          } else {
            _ErrorHandler('Login', 'Blank');
          }
        },
        register: async (email, password) => {
          if (email !== undefined && password !== undefined) {
            try {
              await auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              _ErrorHandler('Signup', e.toString());
            }
          } else {
            _ErrorHandler('Signup', 'Blank');
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            _ErrorHandler('Logout');
          }
        },
      }}>
      {children}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </AuthContext.Provider>
  );
};
