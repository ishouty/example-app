import { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeContext } from './theme.context';

export const ThemeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={{ theme: 'black' }}>
      {children}
    </ThemeContext.Provider>
  );
};
