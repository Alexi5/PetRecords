const EditProfileForm = ({ pet, onClose }) => {
    const handleSave = () => {
        console.log("Handle save")
    }
    return (
        <form>
            Edit Profile Form
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
        </form>
    )
}

export default EditProfileForm;