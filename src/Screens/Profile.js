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
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import {
  statusbarheight,
  windowWidth,
  windowHeight,
} from "../Components/Common";
import { ProfileBack } from "../Components/Images";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";

const ProfileScreen = () => {
  let newName, newInfo;
  const userIcon =
    "https://raw.githubusercontent.com/alpha-src/Dday_Notifier/main/assets/icons/profileIcon.png";

  const { user, logout } = useContext(AuthContext);
  const [isUserNameModalVisible, setUserNameModalVisible] = useState(false);
  const [isUserInfoModalVisible, setUserInfoModalVisible] = useState(false);
  const [userName, setUserName] = useState(user.displayName);
  const [userInfo, setUserInfo] = useState(readUserInfo(user.uid));
  const [picURL, setPicURL] = useState(getProfileImage(user.uid)); // set pic url (uri)

  useEffect(() => {
    if (picURL == null) {
      updateProfilePic(userIcon);
      _NotiHandler("Profile Image", "You can pick your profile image");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleUserInfo(text, currentUser) {
    const task = storage()
      .ref(`UserProfile/${currentUser}/UserInfo.txt`)
      .putString(text);

    task.then(() => {
      _SuccessHandler("Update User Info Success");
    });

    setUserInfo(text);
    modalHandler();
  }

  function readUserInfo(user) {
    const stringRef = storage().ref(`UserProfile/${user}/UserInfo.txt`);
    let UserInfo;

    stringRef
      .getDownloadURL()
      .then(function (url) {
        let XMLHttp = new XMLHttpRequest();
        XMLHttp.onreadystatechange = function () {
          if (XMLHttp.readyState === 4 && XMLHttp.status === 200)
            UserInfo = XMLHttp.responseText;
          else UserInfo = null;
        };
        XMLHttp.open("GET", url, true); // true for asynchronous
        XMLHttp.send(null);
      })
      .catch(function (error) {
        setUserInfo(null);
      });

    return UserInfo;
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
                ></TextInput>
              ) : (
                <Text style={styles.userNameStyle}>{userName} 🖊</Text>
              )}
            </TouchableOpacity>
            <Modal
              style={styles.modalPopup}
              isVisible={isUserNameModalVisible}
              backdropColor="#B4B3DB"
              backdropOpacity={0.8}
              animationIn="zoomInDown"
              animationOut="zoomOutUp"
              animationInTiming={600}
              animationOutTiming={600}
              backdropTransitionInTiming={600}
              backdropTransitionOutTiming={600}
            >
              <View style={styles.nameCard}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Change UserName"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="white"
                    onChangeText={(text) => (newName = text)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() =>
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
                      })
                  }
                >
                  <Text style={{ color: "white" }}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => modalHandler("username")}
                  style={{ marginTop: 15 }}
                >
                  <Text style={{ color: "white" }}>CANCLE</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <TouchableOpacity
              style={styles.descText}
              onPress={() => modalHandler()}
            >
              {userInfo == null ? (
                <TextInput
                  style={styles.descText}
                  placeholder="Enter Your Info"
                ></TextInput>
              ) : (
                <Text style={styles.descText}>{userInfo}</Text>
              )}
            </TouchableOpacity>

            <Modal
              style={styles.modalPopup}
              isVisible={isUserInfoModalVisible}
              backdropColor="#B4B3DB"
              backdropOpacity={0.8}
              animationIn="zoomInDown"
              animationOut="zoomOutUp"
              animationInTiming={600}
              animationOutTiming={600}
              backdropTransitionInTiming={600}
              backdropTransitionOutTiming={600}
            >
              <View style={styles.infoCard}>
                <View style={styles.infoInputView}>
                  <TextInput
                    style={styles.infoText}
                    placeholder="Change User Info"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="white"
                    multiline={true}
                    onChangeText={(text) => (text = newInfo)}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleUserInfo(user.uid, newInfo)}
                >
                  <Text style={{ color: "white" }}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginTop: 15 }}
                  onPress={() => modalHandler()}
                >
                  <Text style={{ color: "white" }}>CANCLE</Text>
                </TouchableOpacity>
              </View>
            </Modal>
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
  nameCard: {
    height: 170,
    width: "90%",
    backgroundColor: "#487494",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    alignContent: "center",
  },
  infoCard: {
    height: 250,
    width: "90%",
    backgroundColor: "#487494",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    alignContent: "center",
  },
  modalPopup: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
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
  inputText: {
    height: 50,
    color: "white",
  },
  inputView: {
    width: "100%",
    backgroundColor: "#373B44",
    borderRadius: 25,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  infoText: {
    height: 100,
    color: "white",
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
  infoInputView: {
    width: "100%",
    backgroundColor: "#373B44",
    borderRadius: 25,
    height: 150,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
});
