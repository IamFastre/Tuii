import { StyleSheet, View } from 'react-native';
import { B, Button, C, Section, T } from '@/components/basics';
import { useColors } from '@/constants/colors';
import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import { Image } from 'expo-image';

const SONG  = require('@/assets/audio/Emilee - i love you baby.mp3');
const COVER = require('@/assets/audio/Cover.png');

const TrackPlayer = () => {
  const colors = useColors();
  const duration = useRef(0);
  const [song, setSong] = useState<Audio.Sound | null>(null);

  const loadSong = async () => {
    const { sound } = await Audio.Sound.createAsync(SONG);
    setSong(sound);
  };

  const playSong = () => {
    song?.playAsync();
  };

  const pauseSong = () => {
    song?.pauseAsync();
  };

  const stopSong = () => {
    song?.stopAsync();
  };

  useEffect(() => {
    loadSong();
  }, [])

  useEffect(() => {
    return () => {
      song?.stopAsync();
      song?.unloadAsync()
    };
  }, [song]);

  return (
    <View style={styles.playerContainer}>
      <Image
        source={COVER}
        transition={500}
        style={styles.cover}
      />
      <View style={{ width: "100%", height: 5, backgroundColor: colors.secondary }}>
        <View style={{ width: "100%", height: 5, backgroundColor: colors.accent }} />
      </View>
      <T style={styles.text}>
        <B>
          Emilee
        </B>
        {'\n'}
        <C.SECONDARY>
          i love you baby
        </C.SECONDARY>
      </T>
      <View style={styles.player}>
        <Button
          icon={{ name: 'play', color: colors.tertiary }}
          style={styles.button}
          color={colors.highlight}
          onPress={playSong}
        />
        <Button
          icon={{ name: 'pause', color: colors.tertiary }}
          style={styles.button}
          color={colors.highlight}
          onPress={pauseSong}
        />
      </View>
      <Button
        icon={{ name: 'stop', color: colors.tertiary }}
        style={{ width: "100%" }}
        color={colors.red}
        onPress={stopSong}
      />
    </View>
  );
}

export default function ILYBPage() : React.JSX.Element {
  return (
    <View style={{ flex:1 }}>
      <Section title="SECRET ROOM" style={{ flex:1 }} containerStyle={styles.container} centered>
        <TrackPlayer />
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  cover: {
    width: "100%",
    maxWidth: 500,
    aspectRatio: 1,
  },

  playerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "90%",
    maxWidth: 500,
  },

  text: {
    textAlign: 'center',
    marginVertical: 10
  },

  player: {
    gap: 10,
    marginBottom: 10,
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

  button: {
    flex: 1,
  }
});
