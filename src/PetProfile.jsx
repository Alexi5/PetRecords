import { useParams} from "react-router-dom";
import { useState, useEffect } from 'react'
import "./styles/PetProfile.css"

import ModalComponent from "./Modal"
import EditProfileForm from "./EditProfileForm"
import EditRecordForm from "./EditRecordForm.jsx";

const PetProfile = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [records, setRecords] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [showEditRecord, setShowEditRecord] = useState(false);
    const [editRecord, setEditRecord] = useState(null);

    useEffect(() => {
        fetch(`/api/pets/${id}`)
            .then(res => res.json())
            .then(pet => setPet(pet))

        fetch(`/api/records?pet_id=${id}`)
            .then(res => res.json())
            .then(records => {
                setRecords(records)
            })
    }, [id]);

    if (!pet) return null;

    const openEditRecordModal = (record) => {
        setEditRecord(record)
        setShowEditRecord(!showEditRecord);
    }

    const handleDelete = (recordId) => {
        const confirmDelete = confirm("Are you sure you want to delete this record?")
        if (confirmDelete) {
            fetch(`/api/records/${recordId}`, {
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

    const openEditModal = (id) => {
        setEditProfile(!editProfile);
    }

    const handleCloseModal = () => {
        setEditProfile(false);
        setShowEditRecord(false)
    }

    return (
        <>
            <h3>Pet Profile</h3>
            <section className="profile">
                <div className="profile-section-container">
                    <div className="name-row">
                        <p>Name</p>
                        <p>{pet.name}</p>
                    </div>
                    <div className="type-row">
                        <p>Type</p>
                        <p>{pet.type}</p>
                    </div>
                    <div className="dob-row">
                        <p>Birthdate</p>
                        <p>{pet.dob}</p>
                    </div>
                </div>
                <button onClick={() => openEditModal(id)}>Edit Profile</button>
            </section>

            <section>
                <div className="records-section">
                    <h3>Record Management</h3>
                    {records && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Date Administered</th>
                                    <th>Reactions</th>
                                    <th>Severity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {records.length > 0 && records.map((record, i) => (
                                <tr key={`record_${i}`}>
                                    <td>
                                        <p>{record.type}</p>
                                    </td>
                                    <td>
                                        <p>{record.name}</p>
                                    </td>
                                    <td>
                                        <p>{record.date_given || "unknown"}</p>
                                    </td>
                                    <td>
                                        <p>{record.reactions || null}</p>
                                    </td>
                                    <td>
                                        <p>{record.severity || null}</p>
                                    </td>
                                    <td className="actions">
                                        <button onClick={() => openEditRecordModal(record)}>Edit</button>
                                        <button onClick={() => handleDelete(record.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            <ModalComponent isOpen={editProfile} onClose={handleCloseModal} label="Edit Profile">
                <EditProfileForm pet={pet} onClose={handleCloseModal}></EditProfileForm>
            </ModalComponent>

            <ModalComponent isOpen={showEditRecord} onClose={handleCloseModal} label="Edit Record">
                <EditRecordForm record={editRecord} onClose={handleCloseModal}></EditRecordForm>
            </ModalComponent>
        </>
    )
}

export default PetProfile