import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Form = () => {
  const { actions, store } = useContext(Context);
  const params = useParams();

  const defaultData = store.contacts.find((contact) => contact.id == params.id);
  console.log(defaultData);

  const [formData, setFormData] = useState({
    name: defaultData?.name || "",
    email: defaultData?.email || "",
    phone: defaultData?.phone || "",
    address: defaultData?.address || "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      actions.updateContact(params.id, formData);
    } else {
      actions.addContact(formData);
    }
    navigate("/");
  };

  const handleReturn = () => {
    actions.isEditing();
    navigate("/");
  };
  return (
    <div className="container p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
      </form>
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={handleReturn}>
          Or get back to contacts
        </button>
      </div>
    </div>
  );
}