import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { color } from '../styles/colors';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MIN_TRANSLATE_Y = 70;
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

export default function BottomSheet({children}) {
  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});

  useLayoutEffect(() => {
    translateY.value = withSpring(-MIN_TRANSLATE_Y, {damping: 50});
  }, []);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 2) {
        translateY.value = withSpring(-MIN_TRANSLATE_Y, {damping: 50});
      } 
    //   else if (translateY.value > -SCREEN_HEIGHT / 2) {
    //     translateY.value = withSpring(-SCREEN_HEIGHT/2, {damping: 50});
    //   }
      else {
        translateY.value = withSpring(-SCREEN_HEIGHT, {damping: 50});
      }
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT);
    });
  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 10],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  const marginBottomSheetStyle = useAnimatedStyle(() => {
    if (translateY.value == -MIN_TRANSLATE_Y) {
      return {
        paddingBottom: (SCREEN_HEIGHT * 2) / 3,
      };
    } else {
      return {
        paddingBottom: 0,
      };
    }
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          rBottomSheetStyle,
          marginBottomSheetStyle,
        ]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: color.text,
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: '15%',
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 2,
  },
});
