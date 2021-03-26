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
} from "../Components/index";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import {
  statusbarheight,
  windowWidth,
  windowHeight,
} from "../Components/Common";
import { ProfileBack } from "../Components/Images";
import { userIcon } from "../Components/Icons";
import AsyncStorage from "@react-native-community/async-storage";
import { launchImageLibrary } from "react-native-image-picker";

const ProfileScreen = () => {
  let newName;

  const { user, logout } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState(user.displayName);
  const [userInfo, setUserInfo] = useState();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("hasUserInfo").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("hasUserInfo", "false");
        AsyncStorage.setItem("UserInfo", "");
      } else {
        AsyncStorage.setItem("hasUserInfo", "true");
        setData();
      }
    });
  }, []);

  async function setData() {
    const data = await AsyncStorage.getItem("UserInfo");
    setUserInfo(data);
  }

  function handleInfo(text) {
    AsyncStorage.setItem("UserInfo", text);
    setData();
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
            })
            .catch(function (error) {
              _ErrorHandler(error, "Error");
            });
        } else {
          setResponse(response);
          user
            .updateProfile({
              photoURL: response.uri,
            })
            .then(function () {
              _SuccessHandler("Update Profile Image");
            })
            .catch(function (error) {
              _ErrorHandler(error, "Error");
            });
        }
      }
    );
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveHandler = (name) => {
    setUserName(name);
    newName = name;
  };

  return (
    <SafeAreaView style={styles.savContainer}>
      <StatusBar backgroundColor="#299af4" />
      <ImageBackground source={ProfileBack} style={styles.imageBackground}>
        <View style={styles.card}>
          <View style={styles.profileImage}>
            <TouchableOpacity onPress={() => cameraRollHandler()}>
              <Image style={styles.profileImg} source={user.photoURL} />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={styles.userNameStyle}>{userName} 🖊</Text>
            </TouchableOpacity>
            <Modal
              style={styles.modalPopup}
              isVisible={isModalVisible}
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
                        toggleModal();
                      })
                      .catch(function (error) {
                        _ErrorHandler("Update", error);
                      })
                  }
                >
                  <Text style={{ color: "white" }}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{ marginTop: 15 }}
                >
                  <Text style={{ color: "white" }}>CANCLE</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <TextInput
              style={styles.descText}
              multiline={true}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter Your Information"
              onChangeText={(text) => handleInfo(text)}
            >
              {userInfo}
            </TextInput>
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
    height: 120,
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
