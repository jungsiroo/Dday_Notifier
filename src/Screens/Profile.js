import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
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
  UserRelateHook,
  getProfileImage,
  readUserInfo,
  UpdateProfilePic,
  UploadImage,
  UserModalHandler,
  CustomInfoModal,
  CustomNameModal,
  NameSaveHandler,
  handleUserInfo,
} from "../Components/index";
import Toast from "react-native-toast-message";
import {
  statusbarheight,
  windowWidth,
  windowHeight,
  userIcon,
} from "../Components/Common";
import { ProfileBack } from "../Components/Images";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";

const ProfileScreen = () => {
  let newName, newInfo;

  const { user, logout } = useContext(AuthContext);
  const {
    userName,
    setUserName,
    userInfo,
    setUserInfo,
    picURL,
    setPicURL,
  } = UserRelateHook(user.displayName, getProfileImage(user.uid));

  useEffect(() => {
    readUserInfo(user.uid);

    if (picURL == null) {
      UpdateProfilePic(userIcon);
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
          user
            .updateProfile({
              photoURL: userIcon,
            })
            .then(function () {
              _ErrorHandler(
                "Profile Image Select",
                "You Canceled pick a image"
              );
              UpdateProfilePic(userIcon);
            })
            .catch(function (error) {
              _ErrorHandler(error, "Error");
            });
        } else {
          let source = { uri: response.uri };
          UploadImage(source, user.uid);
        }
      }
    );
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
            <TouchableOpacity onPress={() => UserModalHandler("username")}>
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

            <CustomNameModal
              onChangeText={(text) => (newName = text)}
              onSaveName={() => NameSaveHandler(newName)}
            />

            <TouchableOpacity
              style={styles.descText}
              onPress={() => UserModalHandler()}
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

            <CustomInfoModal
              onChangeText={(text) => (newInfo = text)}
              onSaveInfo={() => handleUserInfo(newInfo, user.uid)}
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

const styles = StyleSheet.create({
  savContainer: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    resizeMode: "cover",
    width: windowWidth,
    height: windowHeight + statusbarheight,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: 150,
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
  },
  profileImg: {
    width: 85,
    height: 85,
    borderRadius: 50,
    marginRight: 10,
  },
  header: {
    flex: 2,
  },
  userNameStyle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  descText: {
    color: "gray",
    alignItems: "center",
    padding: 10,
    textAlign: "center",
  },
  logoutText: {
    fontSize: 15,
    color: "white",
    paddingTop: 15,
  },
});
