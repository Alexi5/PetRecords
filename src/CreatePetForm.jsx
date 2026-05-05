import './styles/CreatePetForm.css';
import { useState } from 'react';

const EditProfileForm = ({ onClose, onUpdate }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [dob, setDOB] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleDOBChange = (event) => {
        setDOB(event.target.value);
    };

    const handleSave = (event) => {
        event.preventDefault();

        fetch(`/api/pets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                type,
                dob
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('pet created')
                onUpdate()
                onClose();
            })
            .catch(err => console.log(err));
    }

    return (
        <form className="create-pet-form" onSubmit={handleSave}>
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className="form-field">
                <label htmlFor="type">Type</label>
                <input id="type" type="text" value={type} onChange={handleTypeChange} />
            </div>
            <div className="form-field">
                <label htmlFor="dob">Date of Birth</label>
                <input id="dob" type="date" value={dob} onChange={handleDOBChange} />
            </div>
            <div className="form-actions">
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    )
}

export default EditProfileForm;