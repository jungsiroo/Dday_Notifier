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
  PermissionsAndroid,
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
import { pencil, userIcon } from "../Components/Icons";
import AsyncStorage from "@react-native-community/async-storage";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const ProfileScreen = () => {
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

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  }

  const askPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      if (result === RESULTS.GRANTED) {
        cameraRollHandler();
      }
    } catch (error) {
      _ErrorHandler("Ask Permission", error);
    }
  };

  function cameraRollHandler() {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 30,
        maxWidth: 30,
      },
      (response) => {
        setResponse(response);
      }
    );
  }

  let newName;

  const { user, logout } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState(user.displayName);
  const [userInfo, setUserInfo] = useState();
  const [response, setResponse] = useState(null);

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
          <View style={styles.header}>
            {response ? (
              <TouchableOpacity onPress={() => askPermission()}>
                <Image
                  style={styles.profileImg}
                  source={{ uri: response.uri }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => askPermission()}>
                <Image style={styles.profileImg} source={userIcon} />
              </TouchableOpacity>
            )}
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{userName}</Text>
            <TouchableOpacity onPress={toggleModal}>
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
              <Image source={pencil} style={styles.pencilIconStyle} />
            </TouchableOpacity>
          </View>
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
  card: {
    height: 120,
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    alignContent: "center",
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
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
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
  pencilIconStyle: {
    width: 16,
    height: 16,
    alignItems: "flex-end",
    marginLeft: 10,
    marginTop: 5,
  },
  descText: {
    color: "gray",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 10,
  },
  logoutText: {
    fontSize: 15,
    color: "white",
    paddingTop: 15,
  },
});
