import React, { Component, createContext } from 'react';

const Context = createContext();

const themeConfig = {
  light: {
    headerBg: '#F7B30C',
    fontColor: 'black',
    bodybg: 'white',
  },
  dark: {
    headerBg: '#3c3c3c',
    fontColor: 'white',
    bodybg: 'black',
  },
};

export default class ThemeContext extends Component {
  static Consumer = Context.Consumer;

  themeToggle = () => {
    this.setState(prevState => {
      if (prevState.theme === 'light') {
        return { theme: 'dark', themeCfg: themeConfig.dark };
      } else {
        return { theme: 'light', themeCfg: themeConfig.light };
      }
    });
  };

  state = {
    theme: 'light',
    themeCfg: themeConfig.light,
    themeToggle: this.themeToggle,
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
