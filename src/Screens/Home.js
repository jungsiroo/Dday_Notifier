import React, { useContext, useEffect } from "react";
import { View, SafeAreaView, StatusBar, Text } from "react-native";
import { AuthContext, _InfoHandler } from "../Components/Common";
import Toast from "react-native-toast-message";
import LinearGradient from "react-native-linear-gradient";
import { homeStyles, colors } from "../Components/Style/home.style";
import CustomCarousel from "../Components/CustomCarousel/index";

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    _InfoHandler(user.displayName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={homeStyles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={homeStyles.gradient}
      />

      <Text style={homeStyles.logoText}>Dday-Notifier</Text>
      <View style={{ marginTop: 20 }}>
        <Text style={homeStyles.eventText}>Starred Events</Text>
        <CustomCarousel />
      </View>
      <View style={{ marginTop: 15 }}>
        <Text style={homeStyles.eventText}>Upcoming Events</Text>
        <CustomCarousel />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
