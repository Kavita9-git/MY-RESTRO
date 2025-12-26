// src/components/BannerCarousel.js
import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function BannerCarousel({ banners = [] }) {
  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={180}
        autoPlay
        loop
        data={banners}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: width - 20,
    height: 180,
    borderRadius: 12,
  },
});
