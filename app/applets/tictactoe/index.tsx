import { View } from "react-native";

import { Header } from "@/components/applets/Header";
import { Section } from "@/components/basics";

export default () : React.JSX.Element => {

  return (
    <View style={{ flex:1 }}>
      <Header title='TIC-TAC-TOE' options={"/applets/tictactoe/settings"}/>
      <Section style={{ flex:1 }}>
      </Section>
    </View>
  );
}