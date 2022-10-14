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
// import Slider from '@react-native-community/slider';
import {Slider} from '@miblanchard/react-native-slider';
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
const REPEAT_MODE = {NORMAL: 'normal', ALL: 'all', ONE: 'one'};
const InitialPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(PLAY_LIST);
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
  } catch (error) {
    console.log(error);
  }
};

export default function MusicPlayer() {
  const rotationValue = new Animated.Value(0);
  const [songIndex, setSongIndex] = useState(0);
  const [repeatMode, setRepeatMode] = useState(REPEAT_MODE.NORMAL);
  const [isRandom, setIsRandom] = useState(false);
  const playBackState = usePlaybackState();
  const progress = useProgress();

  useEffect(() => {
    InitialPlayer();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if(isRandom) {
      const randomIndex = Math.floor(Math.random()*(PLAY_LIST.length));
      console.log("Random: ", randomIndex);
      await TrackPlayer.skip(randomIndex);
      await TrackPlayer.play();
      setSongIndex(randomIndex);
    }
    else {
      const index = await TrackPlayer.getCurrentTrack();
      setSongIndex(index);
    }
  });

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async event => {
    await TrackPlayer.skip(0);
  })

  const RotateData = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handlePlayPress = async () => {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack != null) {
        if (playBackState === State.Playing) {
          await TrackPlayer.pause();
        } else await TrackPlayer.play();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayBackPress = async () => {
    try {
      if (songIndex === 0) {
        await TrackPlayer.skip(PLAY_LIST.length - 1);
        const index = await TrackPlayer.getCurrentTrack();
        return setSongIndex(index);
      }
      await TrackPlayer.skip(songIndex - 1);
      const index = await TrackPlayer.getCurrentTrack();
      return setSongIndex(index);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayNextPress = async () => {
    try {
      if (songIndex === PLAY_LIST.length - 1) {
        await TrackPlayer.skip(0);
        return setSongIndex(0);
      }
      await TrackPlayer.skip(songIndex + 1);
      return setSongIndex(songIndex + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaylistItemPress = async index => {
    try {
      if (index === songIndex) {
        if(playBackState !== State.Playing) {
          await TrackPlayer.play();
        }
        return;
      }
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      return setSongIndex(index);
    } catch (error) {
      console.log(error);
    }
  };

  const onNormalRepeatPress = async () => {
    setRepeatMode(REPEAT_MODE.ALL);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };
  const onAllRepeatPress = async () => {
    setRepeatMode(REPEAT_MODE.ONE);
    await TrackPlayer.setRepeatMode(RepeatMode.Track);
  };
  const onOneRepeatPress = async () => {
    setRepeatMode(REPEAT_MODE.NORMAL);
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
  };

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
          <Text style={[styles.text, styles.songTitle]}>
            {PLAY_LIST[songIndex].tittle}
          </Text>
          <Text style={[styles.text, styles.songArtist]}>
            {PLAY_LIST[songIndex].artist}
          </Text>
          <Slider
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor={color.text}
            maximumTrackTintColor={color.sub_text}
            thumbTintColor={color.text}
            onValueChange={async value => {
              await TrackPlayer.seekTo(value[0]);
            }}
            step={1}
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value[0]);
            }}
            containerStyle={styles.slider}
            trackStyle={{width: '100%'}}
          />
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>
              {new Date(progress.position * 1000)
                .toLocaleTimeString('it-IT')
                .substring(3)}
            </Text>
            <Text style={styles.timer}>
              {new Date(progress.duration * 1000)
                .toLocaleTimeString('it-IT')
                .substring(3)}
            </Text>
          </View>
        </View>

        {/* Button */}
        <View style={[styles.containerRow, styles.buttonContainer]}>
          {repeatMode == REPEAT_MODE.NORMAL && (
            <TouchableOpacity
              style={styles.sub_button}
              onPress={onNormalRepeatPress}>
              <Icon name="repeat" size={40} color={color.sub_text} />
            </TouchableOpacity>
          )}
          {repeatMode == REPEAT_MODE.ALL && (
            <TouchableOpacity
              style={styles.sub_button}
              onPress={onAllRepeatPress}>
              <Icon name="repeat" size={40} color={color.text} />
            </TouchableOpacity>
          )}
          {repeatMode == REPEAT_MODE.ONE && (
            <TouchableOpacity
              style={[styles.sub_button, styles.repeatOneButton]}
              onPress={onOneRepeatPress}>
              <Icon name="repeat" size={40} color={color.text} />
              <Text style={styles.repeatOneText}>1</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.sub_button}>
            <Icon
              name="play-back"
              size={40}
              color={color.text}
              onPress={handlePlayBackPress}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.main_button}
            activeOpacity={0.7}
            onPress={handlePlayPress}>
            <Icon
              name={playBackState === State.Playing ? 'pause' : 'play'}
              size={40}
              color={color.background}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sub_button}>
            <Icon
              name="play-forward"
              size={40}
              color={color.text}
              onPress={handlePlayNextPress}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sub_button}
            onPress={() => setIsRandom(!isRandom)}>
            <Icon
              name="shuffle"
              size={40}
              color={isRandom ? color.text : color.sub_text}
            />
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
              if(index === songIndex && playBackState === State.Playing) {
                return (
                  <Music
                    key={index}
                    song={item}
                    onPress={() => handlePlaylistItemPress(index)}
                    style={styles.songActive}
                  />
                );
              }
              return (
                <Music
                  key={index}
                  song={item}
                  onPress={() => handlePlaylistItemPress(index)}
                />
              );
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
  repeatOneButton: {
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  repeatOneText: {
    position: 'absolute',
    top: 4,
    left: 10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: color.background,
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
  songActive: {
    backgroundColor: color.item_active
  }
});
