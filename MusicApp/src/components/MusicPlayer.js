import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet from './BottomSheet';
import {ScrollView} from 'react-native-gesture-handler';
import {songs} from '../model/data';
import Music from './Music';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const PLAY_LIST = songs;
const InitialPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(PLAY_LIST);
  } catch (error) {
    console.log(error);
  }
};

export default function MusicPlayer() {
  const rotationValue = new Animated.Value(0);
  const [songIndex, setSongIndex] = useState(0);
  const playBackState = usePlaybackState();
  const progress = useProgress();

  useEffect(() => {
    InitialPlayer();
  }, [PLAY_LIST]);

  const RotateData = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleRepeatPress = () => {};

  const handleRandomPress = () => {};

  const handlePlayPress = async () => {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if(currentTrack != null) {
        if(playBackState === State.Playing) {
          await TrackPlayer.pause();
        }
        else await TrackPlayer.play();  
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePausePress = async () => {
    await TrackPlayer.pause();
  };

  const handlePlayBackPress = () => {};

  const handlePlayNextPress = () => {};

  return (
    <>
      <View style={styles.container}>
        {/* Music play image */}
        <Animated.View
          style={[
            styles.containerRow,
            styles.iconContainer,
            {transform: [{rotate: RotateData}]},
          ]}>
          <Icon name="musical-note" size={100} color={color.background} />
        </Animated.View>
        {/* Song name */}
        <View style={[styles.containerRow, styles.songContentContainer]}>
          <Text style={[styles.text, styles.songTitle]}>{'Chuyện đôi ta'}</Text>
          <Text style={[styles.text, styles.songArtist]}>{'Emcee L'}</Text>
          {/* <Slider
                style={styles.slider}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                minimumTrackTintColor={color.text}
                maximumTrackTintColor={color.sub_text}
                thumbTintColor={color.text}
                onSlidingComplete={async (value) => {
                  await TrackPlayer.seekTo(value);
                }}
            /> */}
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>{
              new Date(progress.position * 1000).toLocaleTimeString("it-IT").substring(3)
            }</Text>
            <Text style={styles.timer}>{
              new Date(progress.duration * 1000).toLocaleTimeString("it-IT").substring(3)
            }</Text>
          </View>
        </View>

        {/* Button */}
        <View style={[styles.containerRow, styles.buttonContainer]}>
          <TouchableOpacity style={styles.sub_button}>
            <Icon name="repeat" size={40} color={color.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sub_button}>
            <Icon name="play-back" size={40} color={color.text} onPress={handlePlayBackPress}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.main_button}
            activeOpacity={0.7}
            onPress={handlePlayPress}>
            <Icon name={playBackState === State.Playing ? "pause" : "play"} size={40} color={color.background} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sub_button}>
            <Icon name="play-forward" size={40} color={color.text} onPress={handlePlayNextPress}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sub_button}>
            <Icon name="shuffle" size={40} color={color.text} />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet>
        <Text style={styles.listHeader}>Danh Sách Phát</Text>
        <ScrollView
          style={styles.bottomsheet}
          showsVerticalScrollIndicator={false}>
          {PLAY_LIST &&
            PLAY_LIST.map((item, index) => {
              return <Music key={index} song={item} />;
            })}
        </ScrollView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 40,
  },
  text: {
    color: color.text,
    fontSize: 16,
  },
  containerRow: {
    alignItems: 'center',
    marginTop: 40,
  },
  iconContainer: {
    backgroundColor: color.text,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    borderRadius: 300,
    overflow: 'hidden',
  },
  songContentContainer: {
    width: '100%',
  },
  songTitle: {
    fontSize: 30,
    fontWeight: '700',
  },
  songArtist: {
    color: color.sub_text,
    fontWeight: '500',
    marginTop: 5,
  },
  progressContainer: {},
  slider: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    marginVertical: 0,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timer: {
    color: color.text,
    fontWeight: 'normal',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 100,
  },
  main_button: {
    backgroundColor: color.text,
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
  },

  bottomsheet: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 10,
  },
  listHeader: {
    color: color.background,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '700',
  },
});
