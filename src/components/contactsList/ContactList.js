import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from "./ContactList.module.css";
import ContactListItem from "../contactListItem/ContactListItem";
import slideTransition from "../../transitions/slide.module.css";
import PropTypes from "prop-types";

const ContactList = ({ contacts, onItemDeleted }) => (
  <TransitionGroup component="ul" className={styles.contactList}>
    {contacts.map((contact) => (
      <CSSTransition timeout={250} classNames={slideTransition} unmountOnExit>
        <ContactListItem
          contact={contact}
          key={contact.id}
          onDeleted={() => onItemDeleted(contact.id)}
        />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  contacts: PropTypes.array,
  onItemDeleted: PropTypes.func,
};

export default ContactList;
