const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		contactlist: [],
	  },
	  actions: {
		fetchData: async() => {
		  try {
			const respons = await fetch("https://supreme-bassoon-654ppj67wwjfx5jp-3001.app.github.dev" + "/api/User", {
			  method: "GET",
			  headers: { accept: "application/json" },
			});
			if (respons.status === 404) {
			  await fetch("https://supreme-bassoon-654ppj67wwjfx5jp-3001.app.github.dev" + "/api/User", {
				method: "POST",
				headers: { accept: "application/json" },
			  });
			} 
		  } catch (error) {
			console.log(error);
		  }
		},
  
		getContact: async() => {
		  try {
			const respons = await fetch("https://supreme-bassoon-654ppj67wwjfx5jp-3001.app.github.dev" + "/api/User", {
			  method: "GET",
			  headers: { accept: "application/json" },
			}); 
			const data = await respons.json();
			setStore({contactlist: data.contacts})
		  } catch (error) {
			console.log(error);
		  }
		},
  
		createContact: async(contact) => {
		  try {
			const respons = await fetch("https://supreme-bassoon-654ppj67wwjfx5jp-3001.app.github.dev" + "/api/User", {
			  method: "POST",
			  headers: { accept: "application/json", 'Content-Type': 'application/json' },
			  body: JSON.stringify(contact)
			});
			const data = await respons.json();
			setStore({contactlist: [...getStore().contactlist, data]})
		  } catch (error) {
			console.log(error);
		  }
		},
  
		updateContact: async(id, contact) => {
		  try {
			const respons = await fetch(`https://supreme-bassoon-654ppj67wwjfx5jp-3001.app.github.dev${id}`, {
			  method: "PUT",
			  headers: { accept: "application/json", 'Content-Type': 'application/json' },
			  body: JSON.stringify(contact)
			});
			if (respons.ok) {
			  const data = await resp.json();
			  const updatedContacts = getStore().contacts.map((contact) => {
				if (contact.id === id) {
				  return data;
				}
				return contact;
			  });
			  setStore({ contacts: updatedContacts });
			  getActions().getContact();
			  setStore({ isEditing: false });
			} else {
			 
			  setStore({ isEditing: false });
			}
		  } catch (error) {
			console.log(error);
		  }
		},
  
		deleteContact: async(id) => {
		  try {
			const respons = await fetch(`https://supreme-bassoon-654ppj67wwjfx5jp-3001.app.github.dev${id}`, {
			  method: "DELETE",
			  headers: { accept: "application/json" },
			  headers: { accept: "application/json", 'Content-Type': 'application/json' },
			});
			if (respons.ok) {
			  const updatedContacts = getStore().contacts.filter(
				(contact) => contact.id !== id
			  );
			  setStore({ contacts: updatedContacts });
			}
		  } catch (error) {
			console.log(error);
		  }
		},
	  
	  },
	};
  };
  
  export default getState;
