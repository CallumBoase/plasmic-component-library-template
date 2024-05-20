//This CSS Import will be bundled into a unified CSS file during build and this import will be removed
import './style.css';

export type H2Props = {
  children: React.ReactNode;
};

export function H2 ({ children } : H2Props) {
  return (
    <h2>{children}</h2>
  )
}