const path = require('path');
const fs = require('fs').promises;
const shortid = require('shortid');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
    fs.readFile(contactsPath)
        .then((data) => console.table(JSON.parse(data)))
        .catch((err) => console.log(err.message))
}

function getContactById(contactId) {
   fs.readFile(contactsPath, 'utf8')
        .then((data) =>
            {
                let contactFound = JSON.parse(data).find(({ id }) => id === contactId );
                return console.table(contactFound);
            }
        )
        .catch((err) => console.log(err.message))
}


function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf8')
        .then((data) =>
            {
                let editedList = JSON.parse(data).filter(({ id }) => id !== contactId );
               fs.writeFile(contactsPath, JSON.stringify(editedList), 'utf8');
               console.log('removed');
                listContacts();
               })
        .catch((err) => console.log(err.message))
}

function addContact(name, email, phone) {
    const newContact = {
        id: shortid.generate(),
        name: name,
        email: email,
        phone: phone
    }
    fs.readFile(contactsPath, 'utf8')
        .then((data) =>
            {
                let jsonData = JSON.parse(data);
                let list = jsonData;
                let updatedList = list.push(newContact);
                fs.writeFile(contactsPath, JSON.stringify(list), 'utf8');
                console.log('added');
                listContacts();
            }
        )
        .catch((err) => console.log(err.message))

}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}