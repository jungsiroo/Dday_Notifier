import React, { useContext, useEffect } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { AuthContext, _InfoHandler } from "../Components/index";
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
      <StatusBar backgroundColor="#1c92d2" />

      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={homeStyles.gradient}
      />

      <View>
        <CustomCarousel />
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default HomeScreen;
