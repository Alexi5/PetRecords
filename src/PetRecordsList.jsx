import { useState } from 'react'
import "./styles/PetProfile.css"

import ModalComponent from "./Modal"
import EditRecordForm from "./EditRecordForm.jsx";

const PetRecordsList = ({ records, onUpdate }) => {
    const [showEditRecord, setShowEditRecord] = useState(false);
    const [editRecord, setEditRecord] = useState(null);

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
                    onUpdate();
                })
                .catch(err => console.log(err));
        }
    }

    const handleCloseModal = () => {
        setShowEditRecord(false)
    }

    return (
        <>
            <section>
                <div className="records-section">
                    <h3>Record Management</h3>

                    <button onClick={() => openEditRecordModal()}>Add Record</button>
                    <br/>
                    <br/>


                    {records && (
                        <div className="records-list-container">
                            <table className="records-table">
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
                        </div>
                    )}
                </div>
            </section>

            <ModalComponent isOpen={showEditRecord} onClose={handleCloseModal} label={`${editRecord ? "Edit" : "Create"} Record`}>
                <EditRecordForm record={editRecord} onClose={handleCloseModal} onUpdate={onUpdate}></EditRecordForm>
            </ModalComponent>
        </>
    )
}

export default PetRecordsList