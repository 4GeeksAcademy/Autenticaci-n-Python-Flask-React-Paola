import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/Card";

export const ListCard = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.createUser();
    actions.getContact();
  }, []);

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
        store.contacts.map((contact, i) => (
          <Card
            key={i}
            contact={contact}
            updateContact={actions.updateContact}
            deleteContact={actions.deleteContact}
          />
        ))
      ) : (
        <p>No hay contactos</p>
      )}
    </div>
  );
};