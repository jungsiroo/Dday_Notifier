import React, { useContext } from "react";
import { View, Image, ScrollView } from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { DrawerBack } from "./Images";
import { drawerStyle, colors } from "./Style/drawer.style";
import LinearGradient from "react-native-linear-gradient";
import { exitIcon } from "./Icons";
import { AuthContext } from "./index";

const CustomDrawerContent = (props) => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={drawerStyle.gradient}
      />
      <ScrollView>
        <Image source={DrawerBack} style={drawerStyle.drawerBack} />
        <DrawerItem
          label="Close drawer"
          labelStyle={drawerStyle.drawerItem}
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          label="Toggle drawer"
          labelStyle={drawerStyle.drawerItem}
          onPress={() => props.navigation.toggleDrawer()}
        />
      </ScrollView>
      <View>
        <DrawerItem
          style={drawerStyle.bottomDrawer}
          icon={() => (
            <Image source={exitIcon} style={drawerStyle.logoutIcon} />
          )}
          label="Sign Out"
          onPress={() => logout()}
          labelStyle={drawerStyle.drawerItem}
        />
      </View>
    </View>
  );
};

const Drawer = createDrawerNavigator();

export const CustomDrawer = ({ MainScreen }) => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        borderTopRightRadius: 20,
        borderRadius: 20,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
    </Drawer.Navigator>
  );
};
