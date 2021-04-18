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
} from "../Components/index";
import Toast from "react-native-toast-message";
import {
  statusbarheight,
  windowWidth,
  windowHeight,
} from "../Components/Common";
import { ProfileBack } from "../Components/Images";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import { CustomNameModal, CustomInfoModal } from "../Components/CustomModal";

const ProfileScreen = () => {
  let newName, newInfo;
  const userIcon =
    "https://raw.githubusercontent.com/alpha-src/Dday_Notifier/main/assets/icons/profileIcon.png";

  const { user, logout } = useContext(AuthContext);
  const [isUserNameModalVisible, setUserNameModalVisible] = useState(false);
  const [isUserInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [userName, setUserName] = useState(user.displayName);
  const [userInfo, setUserInfo] = useState();
  const [picURL, setPicURL] = useState(getProfileImage(user.uid)); // set pic url (uri)

  useEffect(() => {
    readUserInfo(user.uid);

    if (picURL == null) {
      updateProfilePic(userIcon);
      _NotiHandler("Profile Image", "You can pick your profile image");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleUserInfo(text, currentUser) {
    alert(text);

    const task = storage()
      .ref(`UserProfile/${currentUser}/UserInfo`)
      .putString(text);

    task
      .then(() => {
        _SuccessHandler("Update User Info");
      })
      .catch(function (err) {
        alert(err);
      });

    setUserInfo(text);
    modalHandler();
  }

  function readUserInfo(currentUser) {
    const stringRef = storage().ref(`UserProfile/${currentUser}/UserInfo`);

    stringRef
      .getDownloadURL()
      .then(function (url) {
        let XMLHttp = new XMLHttpRequest();
        XMLHttp.onreadystatechange = function () {
          if (XMLHttp.readyState === 4 && XMLHttp.status === 200)
            setUserInfo(XMLHttp.responseText);
          else setUserInfo(null);
        };
        XMLHttp.open("GET", url, true); // true for asynchronous
        XMLHttp.send(null);
      })
      .catch(function (error) {
        setUserInfo(null);
      });
  }
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

            <CustomNameModal
              modalType={isUserNameModalVisible}
              modalVisible={() => modalHandler("username")}
              onChangeText={(text) => (newName = text)}
              onSaveName={() => nameSaveHandler()}
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

            <CustomInfoModal
              modalType={isUserInfoModalVisible}
              modalVisible={() => modalHandler()}
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
