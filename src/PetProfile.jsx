import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

const PetProfile = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    console.log('id', id);
    console.log('pet', pet);

    useEffect(() => {
        fetch(`/api/pets/${id}`)
            .then(res => res.json())
            .then(pet => setPet(pet))
    }, [id]);

    return (
        <>
          "Pet Profile -- Pet Management, Record Management"

        </>
    )
}

export default PetProfile