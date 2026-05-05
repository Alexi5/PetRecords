import './styles/EditRecordForm.css';
import { useState } from 'react';

const EditRecordForm = ({ record, petId, onClose, onUpdate }) => {
    const [name, setName] = useState(record?.name || "");
    const [type, setType] = useState(record?.type || "");
    const [date_given, setDateGiven] = useState(record?.dob || "");
    const [reactions, setReactions] = useState(record?.reactions || "");
    const [severity, setSeverity] = useState(record?.severity || "");
    const [errors, setErrors] = useState({});

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

    const validate = () => {
        const validationErrs = {};
        if (!name.trim()) validationErrs.name = "Name is required";
        if (!type.trim()) validationErrs.type = "Type is required";
        setErrors(validationErrs);
        return Object.keys(validationErrs).length === 0;
    };

    const handleSave = (event) => {
        event.preventDefault();
        if (!validate()) return;

        const lowerCaseType = type.toLowerCase();
        if(record?.id) {
            fetch(`/api/records/${record.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    type: lowerCaseType,
                    date_given,
                    reactions,
                    severity
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log('success', data)
                    onUpdate();
                    onClose();
                })
                .catch(err => {
                    setErrors(err);
                });
        } else {
            fetch(`/api/records`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    type,
                    date_given,
                    reactions,
                    severity,
                    pet_id: petId,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if(data.error) {
                        setErrors({createError: data.message});
                    } else {
                        onUpdate();
                        onClose();
                    }
                })
        }
    }

    return (
        <form className="edit-record-form" onSubmit={handleSave}>
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={name} onChange={handleNameChange} placeholder="Vaccine or Allergy name" className={errors.name ? "input-error" : ""} />
                {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="form-field">
                <label htmlFor="type">Type</label>
                <input id="type" type="text" value={type} onChange={handleTypeChange} placeholder="Vaccine or Allergy" className={errors.type ? "input-error" : ""} />
                {errors.type && <span className="field-error">{errors.type}</span>}
            </div>
            <div className="form-field">
                <label htmlFor="dob">Date Administered</label>
                <input id="date_given" type="date" value={date_given} onChange={handleDOBChange} className={errors.date_given ? "input-error" : ""} />
            </div>
            <div className="form-field">
                <label htmlFor="reactions">Reactions</label>
                <input id="type" type="text" value={reactions} onChange={handleReactionsChange} placeholder="ex. Rash, Hives" />
            </div>
            <div className="form-field">
                <label htmlFor="severity">Severity</label>
                <input id="type" type="text" value={severity} onChange={handleSeverityChange} placeholder="Mild or Severe" />
            </div>

            {errors.createError && <span className="field-error">{errors.createError}</span>}

            <div className="form-actions">
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Save</button>
            </div>
        </form>
    )
}

export default EditRecordForm;