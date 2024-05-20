import { CodeComponentMeta } from "@plasmicapp/host";
import { H2Props } from ".";

export const renderH2Meta: CodeComponentMeta<H2Props> = {
  name: 'H2',
  importPath: './components/H1',
  props: {
    children: 'slot'
  }
}