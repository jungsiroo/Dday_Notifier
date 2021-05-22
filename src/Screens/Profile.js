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
import { NavigationContainer } from "@react-navigation/native";
import { profileStyle } from "../Components/Style/profile.style";
import Toast from "react-native-toast-message";
import { ProfileBack } from "../Components/Images";
import { launchImageLibrary } from "react-native-image-picker";
import { CustomModal, ModalVisibleHook } from "../Components/CustomModal";
import { menu } from "../Components/Icons";
import { CustomDrawer } from "../Components/CustomDrawer";
import {
  UserRelateHook,
  handleUserInfo,
  handleUserName,
  readUserInfo,
  uploadImage,
  updateProfilePic,
} from "../Components/FirebaseUser";

const ProfileScreenMain = ({ navigation }) => {
  const userIcon =
    "https://raw.githubusercontent.com/alpha-src/Dday_Notifier/main/assets/icons/profileIcon.png";
  const nameModal = "nameModal";
  let newName, newInfo;

  const { user } = useContext(AuthContext);
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
        quality: 1,
        maxHeight: 700,
        maxWidth: 700,
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
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={ProfileBack}
        style={profileStyle.imageBackground}
      >
        <SafeAreaView style={profileStyle.savContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={menu} style={profileStyle.menuIcon} />
            </TouchableOpacity>
          </View>

          <View style={profileStyle.cardContainer}>
            <View style={profileStyle.card}>
              <View style={profileStyle.profileImage}>
                <TouchableOpacity onPress={() => cameraRollHandler()}>
                  <Image
                    style={profileStyle.profileImg}
                    source={{ uri: picURL }}
                  />
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
                  onSaveFunc={() =>
                    handleUserName(newName, modalHandler, setUserName, user)
                  }
                  type={nameModal}
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
          </View>
        </SafeAreaView>
      </ImageBackground>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

const ProfileScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <CustomDrawer MainScreen={ProfileScreenMain} />
    </NavigationContainer>
  );
};

export default ProfileScreen;
