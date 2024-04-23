import{ useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AxiosError } from "axios";
import * as Clipboard from 'expo-clipboard';

import { B, BI, C, L, LI, Section, T } from "@/components/basics";
import { ITime, State } from "@/src/general";
import { IWord, fetchDict, getDefinition, getClass, getPhonetic, getWord } from "@/src/todays-word";

import { Copied } from "./copied";

export const TodaysWord = ({date, shortClass}:{date:ITime, shortClass?:boolean}) => {
  const [msg, setMsg] = useState<string>("loading...");
  const [word, setWord] = useState<IWord | undefined>(undefined);
  const [copied, setCopied] = useState<boolean>(false);

  const refresh = () => {
    setMsg("loading...");
    fetchDict(date, setWord as State<IWord>)
      .catch((e:AxiosError) =>
        setTimeout(() =>
          setMsg(e.response?.status === 404
                ? `Seems our dictionary doesn't have this word.\n(${getWord(date)})`
                : "Please check your internet connection..."
          )
        , 250)
      );
  }

  useEffect(() => {
    refresh();
  }, [date.day, date.month, date.year]);

  return (
    <Section
      title="Word of the day"
      style={styles.section}
      titleStyle={styles.title}
      containerStyle={styles.card}
      isCard
      centered
    >
      <View style={styles.wotdHeader}>
        {/* Word */}
        <T style={styles.wotd} selectable>
          <C.HIGHLIGHT>
            <BI>
              {word
              ? word.word
              : <B>
                  <C.RED>{"•-{"}</C.RED>
                  <C.TERTIARY>???</C.TERTIARY>
                  <C.RED>{"}-•"}</C.RED>
                </B>
              }
            </BI>
          </C.HIGHLIGHT>
        </T>

        {/* Word class */}
        <View style={styles.wotdClassContainer}>
          <C.SECONDARY
            style={styles.wotdClass}
          >
            ({word ? getClass(word, date, shortClass) : "?"}.)
          </C.SECONDARY>
          </View>
      </View>

      {/* Word phonetic */}
      <T style={styles.wotdPhonetics}>
        <C.SECONDARY>
          <L>{word ? getPhonetic(word) : "/?/"}</L>
        </C.SECONDARY>
      </T>

      <TouchableOpacity
        style={styles.wotdBody}
        onLongPress={() => {
          setCopied(true);
          word ? Clipboard.setStringAsync(getDefinition(word, date).definition) : null;
          setTimeout(() => setCopied(false), 2000);
        }}
      >
      { copied
      ? // Copied component //
        <Copied size={16} />
      :
      <>
        {/* Word definition */}
        <T style={styles.wotdDefinition} selectable>
          <L>
            {word ? getDefinition(word, date).definition : <LI style={{ opacity: 0.5 }}>{msg}</LI>}
          </L>
        </T>

        {/* Word example */}
        { word && getDefinition(word, date).example ?
        <T style={styles.wotdExample} selectable>
          <C.SECONDARY>
            <LI>
              ({getDefinition(word, date).example})
            </LI>
          </C.SECONDARY>
        </T>
        : null }
      </>
      }
      </TouchableOpacity>
    </Section>
  );
};


const styles = StyleSheet.create({
  section: {
    margin: 10,
    marginBottom: 20,
    flex: 1
  },
  
  card: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120
  },

  title: {
    fontSize: 20
  },

  wotdHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },

  wotd: {
    fontSize: 20,
    textAlign: 'center'
  },

  wotdClassContainer: {
    alignSelf: 'flex-end',
    width: 0,
    height: 0,
    overflow: 'visible'
  },

  wotdClass: {
    fontSize: 10,
    position: "absolute",
    left: 0,
    bottom: 0,
  },

  wotdPhonetics: {
    fontSize: 10,
    marginBottom: 7.5
  },

  wotdBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  wotdDefinition: {
    fontSize: 12,
    textAlign: 'center'
  },

  wotdExample: {
    marginTop: 5,
    fontSize: 10,
  },
});
