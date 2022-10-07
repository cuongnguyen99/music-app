import { StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native'
import React, { useState } from 'react'
import { color } from '../styles/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import BottomSheet from './BottomSheet'
import { ScrollView } from 'react-native-gesture-handler'
import {songs} from '../model/data';
import Music from './Music'

const PLAY_LIST = songs;
export default function MusicPlayer() {
    const rotationValue = new Animated.Value(0);
    const [status, setStatus] = useState({
        repeatStatus: 0,
        isRandom: false,
        isPlay: false,
    });

    console.log(status.isPlay)
    const startRotate = () => {
        if(!status.isPlay) {
            Animated.timing(rotationValue, {
                toValue: 2,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        }
    }
    const stopRotate = () => {
        Animated.timing(rotationValue, {
            toValue: 1,
            duration: 0,
            easing: Easing.linear,
            useNativeDriver: false,
        }).stop();
    }

    const RotateData = rotationValue.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg', '360deg'],
    })

    const handleRepeatPress = () => {

    }

    const handleRandomPress = () => {

    }

    const handlePlayPress = () => {

    }

    const handlePlayBackPress = () => {

    }

    const handlePlayNextPress = () => {

    }

  return (
    <>
    <View style={styles.container}>
        {/* Music play image */}
        <Animated.View style={[styles.containerRow, styles.iconContainer, {transform: [{rotate: RotateData}]}]}>
            <Icon name='musical-note' size={100} color={color.background}/>
        </Animated.View>
        {/* Song name */}
        <View style={[styles.containerRow, styles.songContentContainer]}>
            <Text style={[styles.text, styles.songTitle]}>{"Chuyện đôi ta"}</Text>
            <Text style={[styles.text, styles.songArtist]}>{"Emcee L"}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={color.text}
                maximumTrackTintColor={color.sub_text}
                thumbTintColor={color.text}
            />
            <View style={styles.timerContainer}>
                <Text style={styles.timer}>{'00:00'}</Text>
                <Text style={styles.timer}>{'00:00'}</Text>
            </View>
        </View>

        {/* Button */}
        <View style={[styles.containerRow, styles.buttonContainer]}>
            <TouchableOpacity  style={styles.sub_button}>
                <Icon name='repeat' size={40} color={color.text}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.sub_button}>
                <Icon name='play-back' size={40} color={color.text}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.main_button} activeOpacity={0.7} onPress={startRotate}>
                <Icon name='play' size={40} color={color.background}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.sub_button}>
                <Icon name='play-forward' size={40} color={color.text}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.sub_button} onPress={stopRotate}>
                <Icon name='shuffle' size={40} color={color.text}/>
            </TouchableOpacity>
        </View>
    </View>
    <BottomSheet>
        <Text style={styles.listHeader}>Danh Sách Phát</Text>
        <ScrollView style={styles.bottomsheet} showsVerticalScrollIndicator={false}>
            {PLAY_LIST && PLAY_LIST.map((item, index) => {
                return (
                    <Music key={index} song={item}/>
                )
            })}
        </ScrollView>
    </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 40
    },
    text: {
        color: color.text,
        fontSize: 16
    },  
    containerRow: {
        alignItems: 'center',
        marginTop: 40
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
        fontWeight: '700'
    },
    songArtist: {
        color: color.sub_text,
        fontWeight: '500',
        marginTop: 5
    },
    progressContainer: {
        
    },
    slider: {
        width: '100%',
        flexDirection: 'row',
        height: 40,
        marginVertical: 0
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
        paddingLeft: 5
    },

    bottomsheet: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 10
    },
    listHeader: {
        color: color.background,
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: '700'
    }
})