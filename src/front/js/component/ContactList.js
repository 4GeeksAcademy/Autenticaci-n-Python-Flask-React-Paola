import React, { useEffect, useState } from 'react';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setError("No token found, please log in.");
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/contacts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setContacts(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching contacts", error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div>
            <h1>Contact List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>{contact.name} - {contact.phone}</li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList; 


