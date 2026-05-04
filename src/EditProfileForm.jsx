import './styles/EditProfileForm.css';

const EditProfileForm = ({ pet, onClose }) => {
    const handleSave = () => {
        console.log("Handle save")
    }
    return (
        <form className="edit-profile-form">
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" defaultValue={pet?.name} />
            </div>
            <div className="form-field">
                <label htmlFor="type">Type</label>
                <input id="type" type="text" defaultValue={pet?.type} />
            </div>
            <div className="form-field">
                <label htmlFor="dob">Date of Birth</label>
                <input id="dob" type="date" defaultValue={pet?.dob} />
            </div>
            <div className="form-actions">
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="button" onClick={handleSave}>Save</button>
            </div>
        </form>
    )
}

export default EditProfileForm;