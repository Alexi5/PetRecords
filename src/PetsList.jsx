import { Link } from 'react-router-dom'
import './styles/PetsList.css'

const PetsList = ({pets}) => {
    if(!pets) return;

    return (
        <>
            <section className="spacer" />
            <h2>Pets List</h2>
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
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default PetsList