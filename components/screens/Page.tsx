import { View, ViewStyle } from "react-native";

import { Section } from "@/components/basics";
import { Header } from "@/components/applets/Header";

export interface PageProps {
  title: string;
  options?: string;
  size?: "small" | "large";
  containerStyle?: ViewStyle;
  children?: React.ReactNode;
}

export function Page(props:PageProps) {
  return (
    <View style={{ flex: 1 }}>
      <Header title={props.title} options={props.options} size={props.size} />
      <Section style={{ flex: 1 }} containerStyle={props.containerStyle}>
        {props.children}
      </Section>
    </View>
  )
}