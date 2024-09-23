const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		contactlist: [], 
	  },
	  actions: {
		fetchData: async () => {
		  try {
			const response = await fetch(process.env.BACKEND_URL + "/api/User", {
			  method: "GET",
			  headers: { accept: "application/json" },
			});
			
			if (response.status === 404) {
			  await fetch(process.env.BACKEND_URL + "/api/User", {
				method: "POST",
				headers: { accept: "application/json" },
			  });
			}
		  } catch (error) {
			console.log("Error en fetchData:", error);
		  }
		},
  
		getContact: async () => {
		  try {
			const response = await fetch(process.env.BACKEND_URL + "/api/User", {
			  method: "GET",
			  headers: { accept: "application/json" },
			});
  
			const data = await response.json();
			setStore({ contactlist: data.contacts }); 
		  } catch (error) {
			console.log("Error en getContact:", error);
		  }
		},
  
		createContact: async (contact) => {
		  try {
			const response = await fetch(process.env.BACKEND_URL + "/api/User", {
			  method: "POST",
			  headers: { 
				accept: "application/json", 
				'Content-Type': 'application/json' 
			  },
			  body: JSON.stringify(contact)
			});
  
			const data = await response.json();
			setStore({ contactlist: [...getStore().contactlist, data] });
		  } catch (error) {
			console.log("Error en createContact:", error);
		  }
		},
  
		updateContact: async (id, contact) => {
		  try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/User/${id}`, {
			  method: "PUT",
			  headers: { 
				accept: "application/json", 
				'Content-Type': 'application/json' 
			  },
			  body: JSON.stringify(contact)
			});
  
			if (response.ok) {
			  const data = await response.json();
			  const updatedContacts = getStore().contactlist.map((c) => {
				return c.id === id ? data : c;
			  });
			  setStore({ contactlist: updatedContacts });
			}
		  } catch (error) {
			console.log("Error en updateContact:", error);
		  }
		},
  
		deleteContact: async (id) => {
		  try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/User/${id}`, {
			  method: "DELETE",
			  headers: { accept: "application/json" }
			});
  
			if (response.ok) {
			  const updatedContacts = getStore().contactlist.filter((contact) => contact.id !== id);
			  setStore({ contactlist: updatedContacts });
			}
		  } catch (error) {
			console.log("Error en deleteContact:", error);
		  }
		},
	  },
	};
  };
  
  export default getState;
  
