import React, { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import { v4 as uuid } from 'uuid';
import styles from './App.module.css';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import withTheme from './hoc/withTheme';
import { Logo } from './logo/Logo';
import Alert from './alert/Alert';

class App extends Component {
  static alertTimeoutHandle = 0;

  state = {
    contacts: [],
    filter: '',
    alert: '',
  };

  componentDidMount() {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    storedContacts &&
      storedContacts.length > 0 &&
      this.setState({ contacts: storedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.contacts !== this.state.contacts &&
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

    const contact = {
      id: uuid(),
      name: name,
      number: number,
    };

    if (contacts && contacts.find(contact => name === contact.name)) {
      this.showAlert(`${contact.name} already exists`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, contact],
        };
      });
    }
  };

  showAlert = message => {
    this.setState({ alert: message });
    clearTimeout(this.alertTimeoutHandle);
    this.alertTimeoutHandle = setTimeout(() => {
      this.setState({ alert: '' });
    }, 3000);
  };

  removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { contacts, filter, alert } = this.state;
    const { themeCfg } = this.props;
    return (
      <>
        <div style={{ color: themeCfg.fontColor, background: themeCfg.bodybg }}>
          <button onClick={this.props.toggle}>Change theme</button>
          <Logo />
          {alert && <Alert title={alert} />}
          <ContactForm onSubmit={this.addContact} />

          <h2 className={styles.sectionTitle}>Contacts</h2>
          {contacts.length > 1 && (
            <Filter value={filter} onChangeFilter={this.changeFilter} />
          )}
          <ContactList
            onRemoveContact={this.removeContact}
            contacts={this.getFilteredContacts()}
          />
        </div>
      </>
    );
  }
}

export default withTheme(App);
