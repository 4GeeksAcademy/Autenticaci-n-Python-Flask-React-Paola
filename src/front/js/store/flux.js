const getState = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        contactlist: [], 
        auth: false, 
        token: null, 
      },
      actions: {
        login: async (name, password) => {
          try {
            const response = await fetch(process.env.BACKEND_URL + "/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, password }),
            });
  
            if (response.ok) {
              const data = await response.json();
              setStore({ auth: true, token: data.access_token });
              localStorage.setItem("token", data.access_token);
              console.log("Login exitoso:", data);
            } else {
              const errorData = await response.json();
              console.error("Error en login:", response.status, errorData.msg);
              setStore({ auth: false });
            }
          } catch (error) {
            console.error("Error en la solicitud de login:", error);
          }
        },

        logout: () => {
          setStore({ auth: false, token: null, contactlist: [] });
          localStorage.removeItem("token");
          console.log("Sesión cerrada");
        },
  
        getContact: async () => {
          const store = getStore();
          try {
            const response = await fetch(process.env.BACKEND_URL + "/api/contacts", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`, 
              },
            });
            if (response.ok) {
              const data = await response.json();
              setStore({ contactlist: data }); 
              console.log("Contactos obtenidos:", data);
            } else {
              const errorData = await response.json();
              console.error("Error al obtener contactos:", response.status, errorData.msg);
            }
          } catch (error) {
            console.error("Error en la solicitud de contactos:", error);
          }
        },
  
        createContact: async (contact) => {
          const store = getStore();
          try {
            const response = await fetch(process.env.BACKEND_URL + "/api/contacts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`, 
              },
              body: JSON.stringify(contact),
            });
            if (response.ok) {
              const newContact = await response.json();
              setStore({ contactlist: [...store.contactlist, newContact] });
              console.log("Contacto creado:", newContact);
            } else {
              const errorData = await response.json();
              console.error("Error al crear contacto:", response.status, errorData.msg);
            }
          } catch (error) {
            console.error("Error en la solicitud de creación de contacto:", error);
          }
        },
  
        updateContact: async (id, contact) => {
          const store = getStore();
          try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/contacts/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`, 
              },
              body: JSON.stringify(contact),
            });
            if (response.ok) {
              const updatedContact = await response.json();
              const updatedContactList = store.contactlist.map((c) =>
                c.id === id ? updatedContact : c
              );
              setStore({ contactlist: updatedContactList });
              console.log("Contacto actualizado:", updatedContact);
            } else {
              const errorData = await response.json();
              console.error("Error al actualizar contacto:", response.status, errorData.msg);
            }
          } catch (error) {
            console.error("Error en la solicitud de actualización de contacto:", error);
          }
        },

        deleteContact: async (id) => {
          const store = getStore();
          try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/contacts/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`, 
              },
            });
            if (response.ok) {
              const remainingContacts = store.contactlist.filter(
                (contact) => contact.id !== id
              );
              setStore({ contactlist: remainingContacts });
              console.log("Contacto eliminado");
            } else {
              const errorData = await response.json();
              console.error("Error al eliminar contacto:", response.status, errorData.msg);
            }
          } catch (error) {
            console.error("Error en la solicitud de eliminación de contacto:", error);
          }
        },
      },
    };
  };
  
  export default getState;
  
  