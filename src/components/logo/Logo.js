import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Logo.module.css';

const logoStyles = {
  appear: styles.appear,
  appearActive: styles.appearActive,
};

export const Logo = () => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames={logoStyles}
      unmountOnExit
    >
      <h1>Phonebook</h1>
    </CSSTransition>
  );
};
