import React, { useContext, useState, useEffect } from "react";
import {
  _SuccessHandler,
  _NotiHandler,
  _ErrorHandler,
  _convertToAscii,
  _exportFromAscii,
  AuthContext,
} from "./index";
import storage from "@react-native-firebase/storage";
import { UserModalHandler } from "./CustomModal";

export const UserRelateHook = (currentUser) => {
  const { user } = useContext(AuthContext);

  const [userName, setUserName] = useState(currentUser);
  const [userInfo, setUserInfo] = useState();
  const [picURL, setPicURL] = useState(getProfileImage(user.uid));

  return { userName, setUserName, userInfo, setUserInfo, picURL, setPicURL };
};

export const handleUserInfo = (text, currentUser) => {
  let passedInfo = _convertToAscii(text);
  const { setUserInfo } = UserRelateHook(currentUser);

  const task = storage()
    .ref(`UserProfile/${currentUser}/UserInfo`)
    .putString(passedInfo);

  task
    .then(() => {
      _SuccessHandler("Update User Info");
    })
    .catch(function (err) {
      alert(err.code);
    });

  setUserInfo(text);
  UserModalHandler();
};

export const readUserInfo = (currentUser) => {
  const stringRef = storage().ref(`UserProfile/${currentUser}/UserInfo`);
  const { userInfo, setUserInfo } = UserRelateHook(currentUser);

  stringRef
    .getDownloadURL()
    .then(function (url) {
      let XMLHttp = new XMLHttpRequest();
      XMLHttp.onreadystatechange = function () {
        if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
          setUserInfo(_exportFromAscii(String.raw`${XMLHttp.responseText}`));
        } else setUserInfo(null);
      };
      XMLHttp.open("GET", url, true); // true for asynchronous
      XMLHttp.send(null);
    })
    .catch(function (error) {
      setUserInfo(null);
    });
};

function getProfileImage(currentUser) {
  const profileRef = storage().ref(`UserProfile/${currentUser}/profileImage`);
  const { setPicURL } = UserRelateHook(currentUser);

  try {
    profileRef.getDownloadURL().then(function (url) {
      UpdateProfilePic(url);
    });
  } catch (err) {
    setPicURL(null);
  }
}

export const UploadImage = async (source, currentUser) => {
  const { uri } = source;
  const filename = `UserProfile/${currentUser}/profileImage`;
  const { user } = useContext(AuthContext);

  const task = storage().ref(filename).putFile(uri);

  task.then(() => {
    getProfileImage(user.uid);
    _SuccessHandler("Update Profile Image");
  });
};

export const UpdateProfilePic = (source) => {
  const { user } = useContext(AuthContext);
  const { picURL, setPicURL } = UserRelateHook(user.displayName);

  user
    .updateProfile({
      photoURL: source,
    })
    .then(function () {
      setPicURL(source);
    })
    .catch(function (error) {
      _ErrorHandler(error, "Error");
    });
};

export const NameSaveHandler = (newName) => {
  const { user } = useContext(AuthContext);
  const { setUserName } = UserRelateHook(user.displayName);

  user
    .updateProfile({
      displayName: newName,
    })
    .then(function () {
      setUserName(newName);
      _SuccessHandler("Update");
      UserModalHandler("username");
    })
    .catch(function (error) {
      _ErrorHandler("Update", error);
    });
};
