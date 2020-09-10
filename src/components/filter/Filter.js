import React from "react";
import styles from "./Filter.module.css";
import PropTypes from 'prop-types';


const Filter = ({value, onChangeFilterContact}) => {
  return (
    <label className={styles.filter}>
      Find contact by name
      <input className={styles.inputFilter} value={value} onChange={onChangeFilterContact}></input>
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilterContact: PropTypes.func
};

export default Filter;