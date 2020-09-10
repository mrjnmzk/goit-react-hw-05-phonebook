import React, { Component } from "react";
import ContactForm from "./contactForm/ContactForm";
import styles from "./App.module.css";
import { CSSTransition } from "react-transition-group";
import slidePhone from "../transitions/slidePhone.module.css";
import ContactList from "./contactsList/ContactList";
import Filter from "./filter/Filter";
import Notification from "./notification/Notification";

const filterContacts = (contacts, filterValue) => {
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );
};

const toBeAddedContact = (contacts, name, number) => {
  return contacts.find(
    (contact) => contact.name.includes(name) && contact.number.includes(number)
  );
};

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    isRender: false,
    isRenderFilter: false,
    isRenderNotific: false,
  };

  componentDidMount() {
    const savedContactsInLocalStorage = localStorage.getItem("contacts");
    this.setState({ isRender: true, isRenderFilter: true });

    if (savedContactsInLocalStorage) {
      this.setState({ contacts: JSON.parse(savedContactsInLocalStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prevState: ", prevState);
    console.log("this.state: ", this.state);

    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (newContactData) => {
    const contactToAdd = {
      ...newContactData,
    };

    if (
      !toBeAddedContact(
        this.state.contacts,
        contactToAdd.name,
        contactToAdd.number
      )
    ) {
      this.setState((state) => ({
        contacts: [...state.contacts, contactToAdd],
      }));
    } else {
      this.setState({ isRenderNotific: true });
      this.showNotification();
    }
  };

  showNotification = () =>
    setTimeout(() => this.setState({ isRenderNotific: false }), 2000);

  deleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  };

  changeFilterContact = (e) => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const {
      contacts,
      filter,
      isRender,
      isRenderFilter,
      isRenderNotific,
    } = this.state;
    const filteredContacts = filterContacts(contacts, filter);
    return (
      <div>
        <CSSTransition
          in={isRenderNotific}
          timeout={500}
          classNames={slidePhone}
          mountOnEnter
          unmountOnExit
        >
          <Notification />
        </CSSTransition>
        <CSSTransition in={isRender} timeout={500} classNames={slidePhone}>
          <h1 className={styles.header}>Phonebook</h1>
        </CSSTransition>
        <ContactForm onItemAdded={this.addContact} />

        <h2 className={styles.headerPhone}>Contacts</h2>

        <CSSTransition
          in={isRenderFilter}
          timeout={500}
          classNames={slidePhone}
          unmountOnExit
        >
          <Filter
            value={filter}
            onChangeFilterContact={this.changeFilterContact}
            allContacts={contacts}
          />
        </CSSTransition>
        <ContactList
          contacts={filteredContacts}
          onItemDeleted={this.deleteContact}
        />
      </div>
    );
  }
}
