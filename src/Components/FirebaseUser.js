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

export function UserRelateHook() {
  const { user } = useContext(AuthContext);

  const [userName, setUserName] = useState(user.displayName);
  const [userInfo, setUserInfo] = useState();
  const [picURL, setPicURL] = useState(getProfileImage(user.uid));

  return { userName, setUserName, userInfo, setUserInfo, picURL, setPicURL };
}

export function handleUserInfo(text, currentUser, userInfoFunc, modalFunc) {
  let passedInfo = _convertToAscii(text);

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

  userInfoFunc(text);
  modalFunc();
}

export function readUserInfo(currentUser, userInfoFunc, value, value2 = null) {
  const stringRef = storage().ref(`UserProfile/${currentUser}/UserInfo`);

  stringRef
    .getDownloadURL()
    .then(function (url) {
      let XMLHttp = new XMLHttpRequest();
      XMLHttp.onreadystatechange = function () {
        if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
          //setUserInfo(_exportFromAscii(String.raw`${XMLHttp.responseText}`));
          userInfoFunc(value);
        } else userInfoFunc(value2);
      };
      XMLHttp.open("GET", url, true); // true for asynchronous
      XMLHttp.send(null);
    })
    .catch(function (error) {
      userInfoFunc(value2);
    });
}

export function getProfileImage(currentUser, setPicFunc) {
  const profileRef = storage().ref(`UserProfile/${currentUser}/profileImage`);

  try {
    profileRef.getDownloadURL().then(function (url) {
      UpdateProfilePic(url);
    });
  } catch (err) {
    // setPicURL(null);
    setPicFunc(null);
  }
}

export async function UploadImage(source, currentUser) {
  const { uri } = source;
  const filename = `UserProfile/${currentUser}/profileImage`;
  const { user } = useContext(AuthContext);

  const task = storage().ref(filename).putFile(uri);

  task.then(() => {
    getProfileImage(user.uid);
    _SuccessHandler("Update Profile Image");
  });
}

export function UpdateProfilePic(source, setPicFunc) {
  const { user } = useContext(AuthContext);

  user
    .updateProfile({
      photoURL: source,
    })
    .then(function () {
      // setPicURL(source);
      setPicFunc(source);
    })
    .catch(function (error) {
      _ErrorHandler(error, "Error");
    });
}

export function NameSaveHandler(newName, modalFunc, setNameFunc) {
  const { user } = useContext(AuthContext);

  user
    .updateProfile({
      displayName: newName,
    })
    .then(function () {
      // setUserName(newName);
      setNameFunc(newName);
      _SuccessHandler("Update");
      modalFunc();
      //UserModalHandler("username");
    })
    .catch(function (error) {
      _ErrorHandler("Update", error);
    });
}
