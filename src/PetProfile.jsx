import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import "./styles/PetProfile.css"

const PetProfile = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        fetch(`/api/pets/${id}`)
            .then(res => res.json())
            .then(pet => setPet(pet))
    }, [id]);

    if (!pet) return null;

    return (
        <>
            <h3>Pet Profile</h3>
            <div className="profile-section">
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

            <div className="records-section">
                <h3>Record Management</h3>
                {/*<div className="name-row">*/}
                {/*    <p>Name</p>*/}
                {/*    <p>{pet.name}</p>*/}
                {/*</div>*/}
                {/*<div className="type-row">*/}
                {/*    <p>Type</p>*/}
                {/*    <p>{pet.type}</p>*/}
                {/*</div>*/}
                {/*<div className="type-dob">*/}
                {/*    <p>Birthdate</p>*/}
                {/*    <p>{pet.dob}</p>*/}
                {/*</div>*/}
            </div>
        </>
    )
}

export default PetProfile