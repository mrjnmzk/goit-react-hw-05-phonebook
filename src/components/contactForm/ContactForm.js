import React, { Component } from "react";
import styles from "./ContactForm.module.css";
import PropTypes from "prop-types";

export default class ContactForm extends Component {
  maxId = 100;

  state = {
    id: "",
    name: "",
    number: "",
  };

  handlerChangeInput = (e) => {
    this.setState({
      id: this.maxId++,
      [e.target.name]: e.target.value,
    });
  };

  handlerSubmitForm = (e) => {
    this.props.onItemAdded({ ...this.state });
    e.preventDefault();
    this.reset();
  };

  reset = () => {
    this.setState({
      id: "",
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <div className={styles.containerForm}>
        <form className={styles.phoneForm} onSubmit={this.handlerSubmitForm}>
          <label className={styles.phoneHeader}>
            Name
            <input
              className={styles.inputForm}
              onChange={this.handlerChangeInput}
              type="text"
              required
              name="name"
              placeholder="Please, enter Contact's Name and Last Name"
              value={name}
            ></input>
          </label>
          <label className={styles.phoneHeader}> Number </label>
          <input
            className={styles.inputForm}
            onChange={this.handlerChangeInput}
            type="text"
            name="number"
            placeholder="xxx-xxx"
            required
            value={number}
          ></input>
          <button className={styles.buttonForm} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
