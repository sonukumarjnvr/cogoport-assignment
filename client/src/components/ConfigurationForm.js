import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfigurationForm = () => {
    const [newConfiguration, setNewConfiguration] = useState({ country_code: '', requirements: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewConfiguration({ ...newConfiguration, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/create_configuration', newConfiguration);
            navigate('/'); // Redirect to the list page
        } catch (error) {
            console.error('Error creating configuration:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Create Configuration</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="country_code">Country Code</label>
                    <input
                        type="text"
                        name="country_code"
                        placeholder="Country Code"
                        value={newConfiguration.country_code}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="requirements">Requirements</label>
                    <input
                        type="text"
                        name="requirements"
                        placeholder="Requirements"
                        value={newConfiguration.requirements}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Create</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        fontSize: '14px',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default ConfigurationForm;
