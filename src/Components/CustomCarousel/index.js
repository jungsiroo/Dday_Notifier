import React, { Component } from "react";
import { View } from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "../Style/SliderEntry.style";
import SliderEntry from "./SliderEntry";
import { carouselStyles, colors } from "../Style/carousel.style";
import { ENTRIES1 } from "./entries";

const SLIDER_1_FIRST_ITEM = 1;

export default class CustomCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  render() {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={carouselStyles.exampleContainer}>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={ENTRIES1}
          layout={"stack"}
          layoutCardOffset={`18`}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={carouselStyles.slider}
          contentContainerCustomStyle={carouselStyles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={carouselStyles.paginationContainer}
          dotColor={"rgba(255, 255, 255, 0.92)"}
          dotStyle={carouselStyles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }
}
