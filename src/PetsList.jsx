import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './styles/PetsList.css'
import ModalComponent from "./Modal.jsx";
import CreatePetForm from "./CreatePetForm.jsx";

const PetsList = ({pets, onUpdate}) => {
    if(!pets) return;

    const [showAddPetModal, setShowAddPetModal] = useState(false);
    const [petList, setPetList] = useState(pets);

    useEffect(() => {
        setPetList(pets);
    }, [pets]);

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
                    onUpdate();
                })
                .catch(err => console.log(err));
        }
    }

    const filterOptions = pets.map(pet => pet.type).reduce((acc, type) => {
        if(!acc.includes(type)) {
            acc.push(type);
        }
        return acc;
    }, []);

    const filterList = (selected) => {
        if(selected === 'all') {
            setPetList(pets);
        } else {
            const filtered = pets.filter(pet => pet.type === selected);
            setPetList(filtered);
        }
    }

    return (
        <>
            <section className="spacer" />
            <h2>Pets List</h2>
            <br/>

            <section>
                <div className="pets-list-actions">
                    <button className="add-pet" onClick={() => toggleAddPetModal()}>Add Pet</button>
                    <div className="pets-list-filter">
                        <select id="pet-type-filter" onChange={(e) => filterList(e.target.value)}>
                            <option value="all">All</option>
                            {filterOptions && filterOptions.map(op => {
                                return  <option key={op} value={op}>{op}</option>
                            })}
                        </select>
                    </div>
                </div>
            </section>

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
                    {petList.length > 0 && petList.map((pet) => (
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
                <CreatePetForm onClose={() => toggleAddPetModal(false)} onUpdate={onUpdate}></CreatePetForm>
            </ModalComponent>
        </>
    )
}

export default PetsList