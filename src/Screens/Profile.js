import React, { useContext, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import {
  AuthContext,
  _ErrorHandler,
  _SuccessHandler,
  _NotiHandler,
  _convertToAscii,
  _exportFromAscii,
} from "../Components/index";
import { profileStyle } from "../Components/Style/ProfileStyle";
import Toast from "react-native-toast-message";
import { ProfileBack } from "../Components/Images";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import { CustomModal, ModalVisibleHook } from "../Components/CustomModal";
import {
  UserRelateHook,
  handleUserInfo,
  readUserInfo,
} from "../Components/FirebaseUser";

const ProfileScreen = () => {
  const userIcon =
    "https://raw.githubusercontent.com/alpha-src/Dday_Notifier/main/assets/icons/profileIcon.png";
  let newName, newInfo;

  const { user, logout } = useContext(AuthContext);
  const {
    isUserInfoModalVisible,
    setUserInfoModalVisible,
    isUserNameModalVisible,
    setUserNameModalVisible,
  } = ModalVisibleHook();
  const {
    userName,
    setUserName,
    userInfo,
    setUserInfo,
    picURL,
    setPicURL,
  } = UserRelateHook();

  useEffect(() => {
    readUserInfo(user.uid, setUserInfo);

    if (picURL == null) {
      updateProfilePic(userIcon);
      _NotiHandler("Profile Image", "You can pick your profile image");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImage = async (source, curretUser) => {
    const { uri } = source;
    const filename = `UserProfile/${curretUser}/profileImage`;

    const task = storage().ref(filename).putFile(uri);

    task.then(() => {
      getProfileImage(user.uid);
      _SuccessHandler("Update Profile Image");
    });
  };

  function updateProfilePic(source) {
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
  }

  function getProfileImage(curretUser) {
    const profileRef = storage().ref(`UserProfile/${curretUser}/profileImage`);

    try {
      profileRef.getDownloadURL().then(function (url) {
        updateProfilePic(url);
      });
    } catch (err) {
      setPicURL(null);
    }
  }

  function cameraRollHandler() {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 300,
      },
      (response) => {
        if (response.didCancel) {
          user
            .updateProfile({
              photoURL: userIcon,
            })
            .then(function () {
              _ErrorHandler(
                "Profile Image Select",
                "You Canceled pick a image"
              );
              updateProfilePic(userIcon);
            })
            .catch(function (error) {
              _ErrorHandler(error, "Error");
            });
        } else {
          let source = { uri: response.uri };
          uploadImage(source, user.uid);
        }
      }
    );
  }

  function nameSaveHandler() {
    user
      .updateProfile({
        displayName: newName,
      })
      .then(function () {
        saveHandler(newName);
        _SuccessHandler("Update");
        modalHandler("username");
      })
      .catch(function (error) {
        _ErrorHandler("Update", error);
      });
  }

  const saveHandler = (name) => {
    setUserName(name);
    newName = name;
  };

  function modalHandler(data = "") {
    if (data === "username") setUserNameModalVisible(!isUserNameModalVisible);
    else setUserInfoModalVisible(!isUserInfoModalVisible);
  }

  return (
    <SafeAreaView style={profileStyle.savContainer}>
      <StatusBar backgroundColor="#299af4" />
      <ImageBackground
        source={ProfileBack}
        style={profileStyle.imageBackground}
      >
        <View style={profileStyle.card}>
          <View style={profileStyle.profileImage}>
            <TouchableOpacity onPress={() => cameraRollHandler()}>
              <Image style={profileStyle.profileImg} source={{ uri: picURL }} />
            </TouchableOpacity>
          </View>

          <View style={profileStyle.header}>
            <TouchableOpacity onPress={() => modalHandler("username")}>
              {userName == null || userName == "" ? (
                <TextInput
                  style={profileStyle.userNameStyle}
                  placeholder="Enter Your Name 🖊"
                  editable={false}
                ></TextInput>
              ) : (
                <Text style={profileStyle.userNameStyle}>{userName} 🖊</Text>
              )}
            </TouchableOpacity>

            <CustomModal
              modalType={isUserNameModalVisible}
              modalVisible={() => modalHandler("username")}
              onChangeText={(text) => (newName = text)}
              onSaveFunc={() => nameSaveHandler()}
            />

            <TouchableOpacity
              style={profileStyle.descText}
              onPress={() => modalHandler()}
            >
              {userInfo == null ? (
                <TextInput
                  style={profileStyle.descText}
                  placeholder="Enter Your Info"
                  editable={false}
                ></TextInput>
              ) : (
                <Text style={profileStyle.descText}>{userInfo}</Text>
              )}
            </TouchableOpacity>

            <CustomModal
              modalType={isUserInfoModalVisible}
              modalVisible={() => modalHandler()}
              onChangeText={(text) => (newInfo = text)}
              onSaveFunc={() =>
                handleUserInfo(newInfo, user.uid, setUserInfo, modalHandler)
              }
            />
          </View>
        </View>

        <TouchableOpacity onPress={() => logout()}>
          <Text style={profileStyle.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ImageBackground>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
