import { CodeComponentMeta } from "@plasmicapp/host";
import { H1Props } from ".";

export const renderH1Meta: CodeComponentMeta<H1Props> = {
  name: 'H1',
  importPath: './components/H1',
  props: {
    children: 'slot'
  }
}