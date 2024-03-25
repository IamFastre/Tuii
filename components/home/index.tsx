import React, { useEffect, useState } from "react";
import * as Clipboard from 'expo-clipboard';

import { B, BI, C, I, L, LI, R, Section, T } from "@/components/basics";
import { normalize } from "@/src/general/funcs";
import { ITime } from "@/src/general/interfaces";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import quotes from "@/library/quotes.json";
import dict from  "@/library/dict.json";
import { useColors } from "@/constants/colors";

function hashToLength(len:number, ...list:number[]) : number {
  list.sort((a, b) => a - b);
  let val = (list.shift() ?? 2 << 16);
  list.forEach(e => val ^= e);
  return val % len;
}

export const TodaysWord = ({date: time}:{date:ITime}) => {
  const [i, setI] = useState<number>(0);
  const [wordWidth, setWordWidth] = useState<number>(10);

  useEffect(() => {
    setI(hashToLength(Object.keys(dict).length, time.day, time.month, time.year));
  }, []);


  return (
    <Section
      title="Word of the day"
      style={styles.card}
      titleStyle={{ fontSize: 20 }}
      containerStyle={{ padding: 20, justifyContent: 'center', alignItems: 'center', minHeight: 120 }}
      isCard
      centered
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Word */}
        <T style={{ fontSize: 18, textAlign: 'center' }} selectable>
          <C.ACCENT2>
            <BI>{Object.keys(dict)[i]}</BI>
          </C.ACCENT2>
        </T>

        {/* Word Kind */}
        <C.MAIN2
          onLayout={e => setWordWidth(Math.ceil(e.nativeEvent.layout.width))}
          style={{ fontSize: 10, bottom: Platform.OS === "android" ? 2 : -1, right: -wordWidth, position: "absolute" }}
        >
          (n.)
        </C.MAIN2>
      </View>

      {/* Definition */}
      <T style={{ marginTop: 10, fontSize: 12 }} selectable>
        <L>
          {Object.values(dict)[i]}
        </L>
      </T>
    </Section>
  );
};

export const TodaysQuote = ({date: time}:{date:ITime}) => {
  const quote = quotes[hashToLength(quotes.length, time.day, time.month, time.year)];
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onLongPress={() => {
        setCopied(true);
        Clipboard.setStringAsync(`${normalize(quote.quote)}\n- ${quote.author}`);
        setTimeout(() => setCopied(false), 2000)
      }}
    >
      <Section
        title="Today's quote"
        titleStyle={{ fontSize: 20 }}
        containerStyle={{ padding: 20, justifyContent: 'center', alignItems: 'center', minHeight: 120 }}
        isCard
        centered
      >
        { copied
        ?
        <T style={{ fontSize: 18 }}>
            {'>>-•{ '}
            <LI>
              <C.ACCENT2>
                Copied
              </C.ACCENT2>
            </LI>
            {' }•-<<'}
        </T>
        :
        <>
          {/* Quote */}
          <T style={{ marginTop: 10 }}>
            <BI>{'“ '}</BI>
            <LI>
              {normalize(quote.quote)}
            </LI>
            <BI>{' ”'}</BI>
          </T>

          {/* Auth */}
          <T style={{ alignSelf: 'flex-start', marginTop: 7.5, marginLeft: 5 }}>
            - {quote.author}
          </T>
        </>
        }
      </Section>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    marginBottom: 20,
    flex: 1
  },
});