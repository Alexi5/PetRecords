import './styles/EditRecordForm.css';
import { useState } from 'react';

const EditRecordForm = ({ record, onClose, onUpdate }) => {
    // if(!record) return;

    const [name, setName] = useState(record?.name || "");
    const [type, setType] = useState(record?.type || "");
    const [date_given, setDateGiven] = useState(record?.dob || "");
    const [reactions, setReactions] = useState(record?.reactions || "");
    const [severity, setSeverity] = useState(record?.severity || "");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleReactionsChange = (event) => {
        setReactions(event.target.value);
    };

    const handleSeverityChange = (event) => {
        setSeverity(event.target.value);
    };

    const handleDOBChange = (event) => {
        setDateGiven(event.target.value);
    };

    const handleSave = (event) => {
        event.preventDefault();

        fetch(`/api/records/${record.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                type,
                date_given,
                reactions,
                severity,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log('success', data)
                onUpdate();
                onClose();
            })
            .catch(err => console.log(err));
    }

    return (
        <form className="edit-record-form" onSubmit={handleSave}>
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className="form-field">
                <label htmlFor="type">Type</label>
                <input id="type" type="text" value={type} onChange={handleTypeChange} />
            </div>
            <div className="form-field">
                <label htmlFor="dob">Date Administered</label>
                <input id="dob" type="date" value={date_given} onChange={handleDOBChange} />
            </div>
            <div className="form-field">
                <label htmlFor="reactions">Reactions</label>
                <input id="type" type="text" value={reactions} onChange={handleReactionsChange} />
            </div>
            <div className="form-field">
                <label htmlFor="severity">Severity</label>
                <input id="type" type="text" value={severity} onChange={handleSeverityChange} />
            </div>

            <div className="form-actions">
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    )
}

export default EditRecordForm;