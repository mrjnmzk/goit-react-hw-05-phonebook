import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Alert.module.css';

const alertAnim = {
  appear: styles.appear,
  appearActive: styles.appearActive,
  exit: styles.exit,
  exitActive: styles.exitActive,
};

const Alert = ({ title }) => (
  <CSSTransition
    in={true}
    appear={true}
    timeout={250}
    classNames={alertAnim}
    unmountOnExit
  >
    <div className={(styles.alert, styles.alertDanger, styles.alertCustom)}>
      {title}
    </div>
  </CSSTransition>
);

export default Alert;
