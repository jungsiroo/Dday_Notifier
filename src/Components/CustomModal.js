import Modal from "react-native-modal";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";

export const CustomNameModal = ({
  modalType,
  modalVisible,
  onChangeText,
  onSaveName,
}) => {
  return (
    <Modal
      style={styles.modalPopup}
      isVisible={modalType}
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
            placeholderTextColor="#a8a8a8"
            onChangeText={onChangeText}
          />
        </View>
        <TouchableOpacity onPress={onSaveName}>
          <Text style={{ color: "white" }}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={modalVisible} style={{ marginTop: 15 }}>
          <Text style={{ color: "white" }}>CANCLE</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export const CustomInfoModal = ({
  modalType,
  modalVisible,
  onChangeText,
  onSaveInfo,
}) => {
  return (
    <Modal
      style={styles.modalPopup}
      isVisible={modalType}
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
            placeholderTextColor="#a8a8a8"
            multiline={true}
            onChangeText={onChangeText}
          />
        </View>
        <TouchableOpacity onPress={onSaveInfo}>
          <Text style={{ color: "white" }}>SAVE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 15 }} onPress={modalVisible}>
          <Text style={{ color: "white" }}>CANCLE</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalPopup: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
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
  inputView: {
    width: "100%",
    backgroundColor: "#373B44",
    borderRadius: 25,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
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
  infoInputView: {
    width: "100%",
    backgroundColor: "#373B44",
    borderRadius: 25,
    height: 150,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  infoText: {
    height: 100,
    color: "white",
    textAlign: "center",
  },
});
