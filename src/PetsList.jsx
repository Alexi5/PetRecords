import { Link } from 'react-router-dom'
import { useState } from 'react';
import './styles/PetsList.css'
import ModalComponent from "./Modal.jsx";
import CreatePetForm from "./CreatePetForm.jsx";

const PetsList = ({pets}) => {
    if(!pets) return;

    const [showAddPetModal, setShowAddPetModal] = useState(false);

    const toggleAddPetModal = (setTo = null) => {
        setShowAddPetModal(setTo || !showAddPetModal);
    }

    const handleDelete = (petId) => {
        const confirmDelete = confirm("Are you sure you want to delete this pet?")
        if (confirmDelete) {
            fetch(`/api/pets/${petId}`, {
                method: 'DELETE',
            })
                .then(res => {
                    if(res.ok) {
                        console.log('record deleted')
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <>
            <section className="spacer" />
            <h2>Pets List</h2>
            <br/>
            <div className="pets-list-actions">
                <button className="add-pet" onClick={() => toggleAddPetModal()}>Add Pet</button>
            </div>
            <br/>
            <br/>

            <div className="pets-list-container">
                <table className="pets-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>DOB</th>
                        </tr>
                    </thead>
                    <tbody>
                    {pets.length > 0 && pets.map((pet) => (
                        <tr key={pet.id}>
                            <td>
                                <Link to={`/pets/${pet.id}`}>
                                    <p>{pet.name}</p>
                                </Link>
                            </td>
                            <td>
                                <p>{pet.type}</p>
                            </td>
                            <td>
                                <p>{pet.dob || "unknown"}</p>
                            </td>
                            <td className="actions">
                                <button onClick={() => handleDelete(pet.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <ModalComponent isOpen={showAddPetModal} onClose={() => toggleAddPetModal(false)} label="Create Pet">
                <CreatePetForm onClose={() => toggleAddPetModal(false)}></CreatePetForm>
            </ModalComponent>
        </>
    )
}

export default PetsList