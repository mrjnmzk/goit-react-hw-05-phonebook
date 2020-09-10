import React from 'react';
import ThemeContext from '../../contexts/ThemeContext';

const withTheme = WrappedComponent => {
  return function withTheme(props) {
    return (
      <ThemeContext.Consumer>
        {ctx => (
          <WrappedComponent
            {...props}
            themeCfg={ctx.themeCfg}
            theme={ctx.theme}
            toggle={ctx.themeToggle}
          />
        )}
      </ThemeContext.Consumer>
    );
  };
};

export default withTheme;
