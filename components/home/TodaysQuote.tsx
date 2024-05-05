import{ useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Clipboard from 'expo-clipboard';

import { BI, LI, Section, T } from "@/components/basics";
import { ITime, normalize, hashDateToLength } from "@/src/general";

import { Copied } from "./copied";
import quotes from "@/library/quotes.json";

export const TodaysQuote = ({date: time}:{date:ITime}) => {
  const quote = quotes[hashDateToLength(time, quotes.length)];
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Section
        style={styles.section}
        title="Today's quote"
        titleStyle={styles.title}
        containerStyle={styles.card}
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
          <T style={styles.quoteBody}>
            <BI>{'“ '}</BI>
            <LI>
              {normalize(quote.quote)}
            </LI>
            <BI>{' ”'}</BI>
          </T>

          {/* Quote author */}
          <T style={styles.quoteAuthor}>
            - {quote.author}
          </T>
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

  quoteBody: {
    marginTop: 10
  },

  quoteAuthor: {
    alignSelf: 'flex-start',
    marginTop: 7.5,
    marginLeft: 5
  }
});
