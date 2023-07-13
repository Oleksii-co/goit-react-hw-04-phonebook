import React, { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log(0);
    const stringifyContacts = window.localStorage.getItem('contacts');

    if (stringifyContacts) {
      setContacts(JSON.parse(stringifyContacts));
    }
  }, []);

  useEffect(() => {
    console.log(1);
    const stringifiedContacts = JSON.stringify(contacts);
    window.localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);

  // componentDidMount() {
  //   const stringifyContacts = localStorage.getItem('contacts');

  //   if (stringifyContacts) {
  //     this.setState({ contacts: JSON.parse(stringifyContacts) });
  //   }
  // }

  // componentDidUpdate(_, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     const stringifiedContacts = JSON.stringify(this.state.contacts);
  //     localStorage.setItem('contacts', stringifiedContacts);
  //   }
  // }

  const onAddContacts = evt => {
    const contact = {
      id: nanoid(),
      name: evt.name,
      tel: evt.tel,
    };

    contacts.some(elem => {
      return contact.name.toLowerCase() === elem.name.toLowerCase();
    })
      ? alert(`${contact.name} is alredy in contacts`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const filterChange = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const filterContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContacts} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterChange} />
      <ContactList contactData={filterContacts} deleteContact={deleteContact} />
    </>
  );
};

export default App;
