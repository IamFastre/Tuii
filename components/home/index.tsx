import{ useEffect, useState } from "react";
import * as Clipboard from 'expo-clipboard';

import { B, BI, C, L, LI, Section, T } from "@/components/basics";
import { normalize } from "@/src/general/funcs";
import { ITime } from "@/src/general/interfaces";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import quotes from "@/library/quotes.json";
import { hashDateToLength } from "@/src/general/funcs";
import { fetchDict, getDefinition, getClass, getPhonetic } from "@/src/todays-word/funcs";
import { IWord } from "@/src/todays-word/interfaces";
import { State } from "@/src/general/types";
import { useColors } from "@/constants/colors";

const Copied = ({size}:{size?:number}) => (
  <T style={{ fontSize: size ?? 18 }}>
    {'>>-•{ '}
    <LI>
      <C.HIGHLIGHT>
        Copied
      </C.HIGHLIGHT>
    </LI>
    {' }•-<<'}
  </T>
);

export const TodaysWord = ({date, shortClass}:{date:ITime, shortClass?:boolean}) => {
  const colors = useColors();

  const [msg, setMsg] = useState<string>("loading...");
  const [word, setWord] = useState<IWord | undefined>(undefined);
  const [copied, setCopied] = useState<boolean>(false);
  const [wordWidth, setWordWidth] = useState<number>(10);

  useEffect(() => {
    fetchDict(date, setWord as State<IWord>)
      .catch(() => setMsg("Please check your internet connection..."));
  }, [date.day, date.month, date.year]);

  return (
    <Section
      title="Word of the day"
      style={styles.card}
      titleStyle={{ fontSize: 20 }}
      containerStyle={{ padding: 20, justifyContent: 'center', alignItems: 'center', minHeight: 120 }}
      isCard
      centered
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
        {/* Word */}
        <T style={{ fontSize: 20, textAlign: 'center' }} selectable>
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
        <C.SECONDARY
          onLayout={e => setWordWidth(Math.ceil(e.nativeEvent.layout.width))}
          style={{ fontSize: 10, bottom: Platform.OS === "android" ? 2 : -1, right: -wordWidth, position: "absolute" }}
        >
          ({word ? getClass(word, date, shortClass) : "?"}.)
        </C.SECONDARY>
      </View>

      {/* Word phonetic */}
      <T style={{ fontSize: 10, marginBottom: 7.5 }}>
        <C.SECONDARY>
          <L>{word ? getPhonetic(word) : "/?/"}</L>
        </C.SECONDARY>
      </T>

      <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
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
        <T style={{ fontSize: 12 }} selectable>
          <L>
            {word ? getDefinition(word, date).definition : <LI style={{ opacity: 0.5 }}>{msg}</LI>}
          </L>
        </T>

        {/* Word example */}
        { word && getDefinition(word, date).example ?
        <T style={{ marginTop: 5, fontSize: 10, color: colors.secondary }} selectable>
          <LI>
            ({getDefinition(word, date).example})
          </LI>
        </T>
        : null }
      </>
      }
      </TouchableOpacity>
    </Section>
  );
};

export const TodaysQuote = ({date: time}:{date:ITime}) => {
  const quote = quotes[hashDateToLength(time, quotes.length)];
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Section
        style={styles.card}
        title="Today's quote"
        titleStyle={{ fontSize: 20 }}
        containerStyle={{ padding: 20, justifyContent: 'center', alignItems: 'center', minHeight: 120 }}
        isCard
        centered
      >
        <TouchableOpacity
          onLongPress={() => {
            setCopied(true);
            Clipboard.setStringAsync(`${normalize(quote.quote)}\n- ${quote.author}`);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
        { copied
        ? // Copied component //
          <Copied />
        :
        <>
          {/* Quote body */}
          <T style={{ marginTop: 10 }}>
            <BI>{'“ '}</BI>
            <LI>
              {normalize(quote.quote)}
            </LI>
            <BI>{' ”'}</BI>
          </T>

          {/* Quote author */}
          <T style={{ alignSelf: 'flex-start', marginTop: 7.5, marginLeft: 5 }}>
            - {quote.author}
          </T>
        </>
        }
      </TouchableOpacity>
    </Section>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    marginBottom: 20,
    flex: 1
  },
});