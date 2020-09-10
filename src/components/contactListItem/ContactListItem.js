import React from "react";
import styles from "./ContactListItem.module.css";
import PropTypes from "prop-types";

const ContactListItem = ({ contact, onDeleted }) => {
  const { name, number } = contact;
  return (
    <li className={styles.item}>
      <p className={styles.name}>{name}</p>
      <p className={styles.number}>{number}</p>
      <button className={styles.buttonForm} type="click" onClick={onDeleted}>
        x
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.object,
  onDeleted: PropTypes.func
};

export default ContactListItem;
