import { useState } from "react";
import {
  _SuccessHandler,
  _NotiHandler,
  _ErrorHandler,
  _convertToAscii,
  _exportFromAscii,
} from "./Common";
import storage from "@react-native-firebase/storage";

export function UserRelateHook(displayName, userPhoto) {
  const [userName, setUserName] = useState(displayName);
  const [userInfo, setUserInfo] = useState();
  const [picURL, setPicURL] = useState(userPhoto);

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

export function handleUserName(newName, modalFunc, setNameFunc, currentUser) {
  currentUser
    .updateProfile({
      displayName: newName,
    })
    .then(function () {
      setNameFunc(newName);
      _SuccessHandler("Update");
      modalFunc("username");
    })
    .catch(function (error) {
      _ErrorHandler("Update", error);
    });
}

export function readUserInfo(currentUser, userInfoFunc) {
  const stringRef = storage().ref(`UserProfile/${currentUser}/UserInfo`);

  stringRef
    .getDownloadURL()
    .then(function (url) {
      let XMLHttp = new XMLHttpRequest();
      XMLHttp.onreadystatechange = function () {
        if (XMLHttp.readyState === 4 && XMLHttp.status === 200) {
          userInfoFunc(_exportFromAscii(String.raw`${XMLHttp.responseText}`));
        } else userInfoFunc(null);
      };
      XMLHttp.open("GET", url, true); // true for asynchronous
      XMLHttp.send(null);
    })
    .catch(function (error) {
      userInfoFunc(null);
    });
}

export async function uploadImage(source, currentUser, setPicFunc) {
  const { uri } = source;
  const filename = `UserProfile/${currentUser.uid}/profileImage`;

  const task = storage().ref(filename).putFile(uri);

  task.then(() => {
    getProfileImage(currentUser, setPicFunc);
    _SuccessHandler("Update Profile Image");
  });
}

function getProfileImage(currentUser, setPicFunc) {
  const profileRef = storage().ref(
    `UserProfile/${currentUser.uid}/profileImage`
  );

  try {
    profileRef.getDownloadURL().then(function (url) {
      updateProfilePic(currentUser, url, setPicFunc);
    });
  } catch (err) {
    setPicFunc(null);
  }
}

export function updateProfilePic(currentUser, source, setPicFunc) {
  currentUser
    .updateProfile({
      photoURL: source,
    })
    .then(function () {
      setPicFunc(source);
    })
    .catch(function (error) {
      _ErrorHandler(error, "Error");
    });
}
