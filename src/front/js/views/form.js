import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Form = () => {
    const { actions, store } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        if (params.id) {
            const contact = store.contacts.find(contact => contact.id == params.id);
            if (contact) {
                setFormData({
                    full_name: contact.full_name,
                    phone: contact.phone,
                    email: contact.email,
                    address: contact.address
                });
            } else {
                actions.getContacts(); 
            }
        }
    }, [params.id, store.contacts, actions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (params.id) {
            actions.updateContact(params.id, formData.full_name, formData.phone, formData.email, formData.address);
        } else {
            actions.createContact(formData.full_name, formData.phone, formData.email, formData.address);
        }
        navigate("/");
    };

    const handleReturn = () => {
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
                        name="full_name"
                        value={formData.full_name}
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
};
