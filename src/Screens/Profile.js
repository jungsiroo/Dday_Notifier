import React, { useContext, useState } from "react";
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
import { pencil, userIcon } from "../Components/Icons";

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);

  let [userName, setUserName] = useState("User");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.savContainer}>
      <StatusBar backgroundColor="#299af4" />
      <ImageBackground source={ProfileBack} style={styles.imageBackground}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image style={styles.profileImg} source={userIcon} />
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {user.displayName}
            </Text>
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
                      value={userName}
                      onChangeText={(text) => setUserName(text)}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      user
                        .updateProfile({
                          displayName: userName,
                        })
                        .then(function () {
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
          <Text style={styles.descText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            gravida, metus eleifend vulputate fringilla, liguladsfad
          </Text>
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
    height: 200,
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
