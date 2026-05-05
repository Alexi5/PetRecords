import { useParams} from "react-router-dom";
import { useState, useEffect } from 'react'
import "./styles/PetProfile.css"

import ModalComponent from "./Modal"
import EditProfileForm from "./EditProfileForm"
import PetRecordsList from "./PetRecordsList.jsx";

const PetProfile = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [records, setRecords] = useState(null);
    const [editProfile, setEditProfile] = useState(false);

    const fetchPets = () => {
        fetch(`/api/pets/${id}`)
            .then(res => res.json())
            .then(data => setPet(data))
    }

    const fetchRecords = () => {
        fetch(`/api/records?pet_id=${id}`)
            .then(res => res.json())
            .then(records => {
                setRecords(records)
            })
    }

    useEffect(() => {
        fetchPets();
        fetchRecords();
    }, []);

    if (!pet) return null;

    const openEditModal = (id) => {
        setEditProfile(!editProfile);
    }

    const handleCloseModal = () => {
        setEditProfile(false);
    }

    return (
        <>
            <section className="spacer" />

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

            <section className="spacer" />

            <PetRecordsList records={records} onUpdate={fetchRecords} petId={pet.id} />

            <ModalComponent isOpen={editProfile} onClose={handleCloseModal} label="Edit Profile">
                <EditProfileForm pet={pet} onClose={handleCloseModal}></EditProfileForm>
            </ModalComponent>
        </>
    )
}

export default PetProfile