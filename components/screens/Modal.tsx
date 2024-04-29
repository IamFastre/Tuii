import { ScrollView } from "react-native";

import { Section } from "@/components/basics";
import { MiniHeader } from "@/components/applets/Header";

export interface ModalProps {
  title?: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function Modal(props:ModalProps) {
  return (
    <Section style={{ flex: 1 }}>
      <MiniHeader title={props.title ?? 'OPTIONS'} subtitle={props.subtitle}/>
      <ScrollView style={{ flex: 1 }}>
        {props.children}
      </ScrollView>
    </Section>
  )
}