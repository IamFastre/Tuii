import { T, LI, C } from "@/components/basics";

export const Copied = ({size}:{size?:number}) => (
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
