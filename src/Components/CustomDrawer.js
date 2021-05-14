import React, { useContext } from "react";
import { View, Image, ScrollView } from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { DrawerBack } from "./Images";
import { drawerStyle } from "./Style/drawer.style";
import { logout } from "./Icons";
import { AuthContext } from "./index";

const CustomDrawerContent = (props) => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView {...props}>
        <Image source={DrawerBack} style={drawerStyle.drawerBack} />
        <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          label="Toggle drawer"
          onPress={() => props.navigation.toggleDrawer()}
        />
      </ScrollView>
      <View>
        <DrawerItem
          style={drawerStyle.bottomDrawer}
          icon={() => <Image source={logout} style={drawerStyle.logoutIcon} />}
          label="Sign Out"
          onPress={() => logout()}
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
