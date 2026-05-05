import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './styles/PetsList.css'
import ModalComponent from "./Modal.jsx";
import CreatePetForm from "./CreatePetForm.jsx";
import PetRecordsList from "./PetRecordsList.jsx";

const PetsList = ({pets, records, onUpdate}) => {
    if(!pets) return;

    const [showAddPetModal, setShowAddPetModal] = useState(false);
    const [petList, setPetList] = useState(pets);
    const [recordsList, setRecordsList] = useState(records);

    useEffect(() => {
        setPetList(pets);
        setRecordsList(records)
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

    const filterPetOptions = pets.map(pet => pet.type).reduce((acc, type) => {
        if(!acc.includes(type)) {
            acc.push(type);
        }
        return acc;
    }, []);

    const filterPetsList = (selected) => {
        if(selected === 'all') {
            setPetList(pets);
        } else {
            const filtered = pets.filter(pet => pet.type === selected);
            setPetList(filtered);
        }
    }

    const filterRecordOptions = records.map(rec => rec.type).reduce((acc, type) => {
        if(!acc.includes(type)) {
            acc.push(type);
        }
        return acc;
    }, []);

    const filterRecords = (selected) => {
        if(selected === 'all') {
            setRecordsList(records);
        } else {
            const filtered = records.filter(record => record.type === selected);
            setRecordsList(filtered);
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
                        <select id="pet-type-filter" onChange={(e) => filterPetsList(e.target.value)}>
                            <option value="all">All</option>
                            {filterPetOptions && filterPetOptions.map(op => {
                                return  <option key={op} value={op}>{op}</option>
                            })}
                        </select>
                    </div>
                </div>
            </section>

            <br/>

            <section className="pets-list-container">
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
            </section>

            <br/>
            <br/>

            <section className="pets-records-list-container">
                <h2>Records List</h2>
                <br/>

                <section>
                    <div className="pets-records-actions">
                        <div className="pets-records-filter">
                            <select id="pet-records-type-filter" onChange={(e) => filterRecords(e.target.value)}>
                                <option value="all">All</option>
                                {filterRecordOptions && filterRecordOptions.map(op => {
                                    return <option key={op} value={op}>{op}</option>
                                })}
                            </select>
                        </div>
                    </div>
                </section>

                <br/>

                <PetRecordsList records={recordsList} onUpdate={onUpdate} petId={null} />
            </section>

            <ModalComponent isOpen={showAddPetModal} onClose={() => toggleAddPetModal(false)} label="Create Pet">
                <CreatePetForm onClose={() => toggleAddPetModal(false)} onUpdate={onUpdate}></CreatePetForm>
            </ModalComponent>
        </>
    )
}

export default PetsList