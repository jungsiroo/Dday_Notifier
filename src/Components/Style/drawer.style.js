import { StyleSheet } from "react-native";

export const colors = {
  background1: "#272b36",
  background2: "#3E4C59",
};

export const drawerStyle = StyleSheet.create({
  menuIcon: {
    height: 30,
    width: 30,
    marginTop: 50,
    marginLeft: 25,
  },
  logoutIcon: {
    height: 24,
    width: 24,
    justifyContent: "flex-end",
  },
  bottomDrawer: {
    marginBottom: 50,
  },
  drawerBack: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  drawerItem: {
    color: "white",
  },
});
