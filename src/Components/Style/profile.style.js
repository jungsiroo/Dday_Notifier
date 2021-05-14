import { StyleSheet } from "react-native";

import { statusbarheight, windowWidth, windowHeight } from "../Common";

export const profileStyle = StyleSheet.create({
  savContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  profileImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
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
    width: 105,
    height: 105,
    borderRadius: 50,
    marginLeft: 20,
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
  menuIcon: {
    height: 30,
    width: 30,
    marginTop: 50,
    marginLeft: 25,
  },
  logoutText: {
    fontSize: 15,
    color: "white",
    paddingTop: 15,
  },
});
