import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const ToastMsgHandler = (status, Error) => {
    Toast.show({
      type: 'info',
      position: 'top',
      visibilityTime: 6000,
      autoHide: true,
      topOffset: 70,
      bottomOffset: 40,
      text1: status + ' Error',
      text2: Error,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            ToastMsgHandler('Login', e.toString());
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            ToastMsgHandler('Signup', e.toString());
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            ToastMsgHandler('Logout');
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
