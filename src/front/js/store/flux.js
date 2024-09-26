const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            auth: false,  
            token: null,  
            user: null,   
            contacts: []  
        },
        actions: {
            getContacts: async () => { 
                const store = getStore();
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/contacts", requestOptions);
                    if (response.status === 200) {
                        const data = await response.json();
                        setStore({ contacts: data });
                        console.log("Contactos obtenidos:", data);
                    } else {
                        console.error("Error al obtener contactos:", response.status);
                    }
                } catch (error) {
                    console.error("Error en la solicitud de contactos:", error);
                }
            },

            login: async (email, password) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/login", requestOptions);
                    if (response.status === 200) {
                        const data = await response.json();
                        setStore({ auth: true, token: data.access_token });
                        localStorage.setItem("token", data.access_token);
                        console.log("Login exitoso:", data);
                    } else {
                        console.error("Error en login:", response.status);
                        setStore({ auth: false });
                    }
                } catch (error) {
                    console.error("Error en la solicitud de login:", error);
                }
            },

            logout: () => {
                setStore({ auth: false, token: null, user: null, contacts: [] });
                localStorage.removeItem("token");
                console.log("Sesión cerrada");
            },

            signup: async (email, password) => {
                const requestOptions = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions);
                    const data = await response.json();
                    if (response.status === 201) {
                        console.log("Registro exitoso:", data);
                    } else {
                        console.error("Error en el registro:", data.msg);
                    }
                } catch (error) {
                    console.error("Error en la solicitud de registro:", error);
                }
            },

            getContacts: async () => {
                const store = getStore();
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/contacts", requestOptions);
                    if (response.status === 200) {
                        const data = await response.json();
                        setStore({ contacts: data });
                        console.log("Contactos obtenidos:", data);
                    } else {
                        console.error("Error al obtener contactos:", response.status);
                    }
                } catch (error) {
                    console.error("Error en la solicitud de contactos:", error);
                }
            },

            createContact: async (full_name, phone, email, address) => {
                const store = getStore();
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    },
                    body: JSON.stringify({ full_name, phone, email, address })
                };

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/contacts", requestOptions);
                    if (response.status === 201) {
                        const newContact = await response.json();
                        setStore({ contacts: [...store.contacts, newContact] });
                        console.log("Contacto creado:", newContact);
                    } else {
                        console.error("Error al crear contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error en la solicitud de creación de contacto:", error);
                }
            },

            updateContact: async (id, full_name, phone, email, address) => {
                const store = getStore();
                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    },
                    body: JSON.stringify({ full_name, phone, email, address })
                };

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/contacts/${id}`, requestOptions);
                    if (response.status === 200) {
                        const updatedContact = await response.json();
                        const updatedContacts = store.contacts.map(contact =>
                            contact.id === id ? updatedContact : contact
                        );
                        setStore({ contacts: updatedContacts });
                        console.log("Contacto actualizado:", updatedContact);
                    } else {
                        console.error("Error al actualizar contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error en la solicitud de actualización de contacto:", error);
                }
            },

            deleteContact: async (id) => {
                const store = getStore();
                const requestOptions = {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
                };

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/contacts/${id}`, requestOptions);
                    if (response.status === 200) {
                        const remainingContacts = store.contacts.filter(contact => contact.id !== id);
                        setStore({ contacts: remainingContacts });
                        console.log("Contacto eliminado");
                    } else {
                        console.error("Error al eliminar contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error en la solicitud de eliminación de contacto:", error);
                }
            }
        }
    };
};

export default getState;

  
