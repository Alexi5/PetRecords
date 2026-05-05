import { useEffect, useState } from 'react'
import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard.jsx";
import PetsList from "./PetsList.jsx";
import PetProfile from "./PetProfile.jsx"

function App() {
    const [pets, setPets] = useState([]);

    const fetchPets = () => {
        fetch(`/api/pets`)
            .then(res => res.json())
            .then(data => setPets(data))
    }

    useEffect(() => {
        fetchPets()
    }, [])

    return (
        <>
            {/*<Dashboard></Dashboard>*/}
            <Routes>
                <Route path="/" element={<PetsList pets={pets} onUpdate={fetchPets} />} />
                <Route path="/pets/:id" element={<PetProfile />} />
            </Routes>
        </>
    )
}

export default App
