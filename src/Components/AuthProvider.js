import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import { _ErrorHandler, _SuccessHandler } from "./Common";
import Toast from "react-native-toast-message";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            _ErrorHandler("Login", e.toString());
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
            _SuccessHandler("Signup");
          } catch (e) {
            _ErrorHandler("Signup", e.toString());
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            _ErrorHandler("Logout");
          }
        },
        forgot: async (email) => {
          try {
            await auth().sendPasswordResetEmail(email);
          } catch (e) {
            _ErrorHandler("Reset Password", e.toString());
          }
        },
      }}
    >
      {children}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </AuthContext.Provider>
  );
};
