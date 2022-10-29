import React from 'react';
import shortid from 'shortid';
import { Phonebook } from 'components/Phonebook/Phonebook';

import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';
export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitForm = data => {
    console.log(data);
    for (const element of contacts) {
      if (element.name.toLowerCase() === data.name.toLowerCase()) {
        alert(`${element.name} is alrady in contacts`);
        return;
      }
    }

    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };
    setContacts(s => [...s, contact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const onDelete = e => {
    console.log(e.currentTarget.id);
    const id = e.currentTarget.id;
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        width: 720,
        margin: 'auto',
        fontSize: 30,
      }}
    >
      <h1>Phonebook</h1>
      <Phonebook onSubmitForm={onSubmitForm}></Phonebook>
      {contacts.length !== 0 && <h2>Contacts</h2>}
      {contacts.length !== 0 && (
        <Filter value={filter} onChange={changeFilter}></Filter>
      )}
      {contacts.length !== 0 && (
        <Contacts contacts={visibleContacts} onDelete={onDelete}></Contacts>
      )}
    </div>
  );
};
