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
import { styles } from "../Components/Style/profile.style";
import Toast from "react-native-toast-message";
import { ProfileBack } from "../Components/Images";
import { launchImageLibrary } from "react-native-image-picker";
import { CustomModal, ModalVisibleHook } from "../Components/CustomModal";
import {
  UserRelateHook,
  handleUserInfo,
  handleUserName,
  readUserInfo,
  uploadImage,
  updateProfilePic,
} from "../Components/FirebaseUser";

const ProfileScreen = () => {
  const userIcon =
    "https://raw.githubusercontent.com/alpha-src/Dday_Notifier/main/assets/icons/profileIcon.png";
  const nameModal = "nameModal";
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
  } = UserRelateHook(user.displayName, user.photoURL);

  useEffect(() => {
    readUserInfo(user.uid, setUserInfo);

    if (picURL == null) {
      updateProfilePic(user, userIcon, setPicURL);
      _NotiHandler("Profile Image", "You can pick your profile image");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          _ErrorHandler("Profile Image Select", "You Canceled pick a image");
        } else {
          let source = { uri: response.uri };
          uploadImage(source, user, setPicURL);
        }
      }
    );
  }

  function modalHandler(data = "") {
    if (data === "username") setUserNameModalVisible(!isUserNameModalVisible);
    else setUserInfoModalVisible(!isUserInfoModalVisible);
  }

  return (
    <SafeAreaView style={styles.savContainer}>
      <StatusBar backgroundColor="#299af4" />
      <ImageBackground source={ProfileBack} style={styles.imageBackground}>
        <View style={styles.card}>
          <View style={styles.profileImage}>
            <TouchableOpacity onPress={() => cameraRollHandler()}>
              <Image style={styles.profileImg} source={{ uri: picURL }} />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => modalHandler("username")}>
              {userName == null || userName == "" ? (
                <TextInput
                  style={styles.userNameStyle}
                  placeholder="Enter Your Name 🖊"
                  editable={false}
                ></TextInput>
              ) : (
                <Text style={styles.userNameStyle}>{userName} 🖊</Text>
              )}
            </TouchableOpacity>

            <CustomModal
              modalType={isUserNameModalVisible}
              modalVisible={() => modalHandler("username")}
              onChangeText={(text) => (newName = text)}
              onSaveFunc={() =>
                handleUserName(newName, modalHandler, setUserName, user)
              }
              type={nameModal}
            />

            <TouchableOpacity
              style={styles.descText}
              onPress={() => modalHandler()}
            >
              {userInfo == null ? (
                <TextInput
                  style={styles.descText}
                  placeholder="Enter Your Info"
                  editable={false}
                ></TextInput>
              ) : (
                <Text style={styles.descText}>{userInfo}</Text>
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
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ImageBackground>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
