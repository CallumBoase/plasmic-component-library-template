//This CSS Import will be bundled into a unified CSS file during build and this import will be removed
import './style.css';
import moduleStyle from './some-module-style.module.css';

export type H1Props = {
  children: React.ReactNode;
};

export function H1 ({ children } : H1Props) {
  return (
    <h1 className={moduleStyle.underline}>{children}</h1>
  )
}