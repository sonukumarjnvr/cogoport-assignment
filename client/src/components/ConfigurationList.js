import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ConfigurationList = () => {
    const [configurations, setConfigurations] = useState([]);

    useEffect(() => {
        fetchConfigurations();
    }, []);

    const fetchConfigurations = async () => {
        try {
            const response = await axios.get('/api/configurations');
            setConfigurations(response.data);
        } catch (error) {
            console.error('Error fetching configurations:', error);
        }
    };

    const handleDeleteConfiguration = async (id) => {
        try {
            await axios.delete(`/api/delete_configuration/${id}`);
            setConfigurations(configurations.filter(config => config.id !== id));
        } catch (error) {
            console.error('Error deleting configuration:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Configuration List</h2>
            <Link to="/create" style={styles.addButton}>Create New Configuration</Link>
            <ul style={styles.list}>
                {configurations.map(config => (
                    <li key={config.id} style={styles.listItem}>
                        <div style={styles.configDetails}>
                            <span style={styles.countryCode}>{config.country_code}</span> - <span style={styles.requirements}>{config.requirements}</span>
                        </div>
                        <div style={styles.buttons}>
                            <button style={styles.deleteButton} onClick={() => handleDeleteConfiguration(config.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
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
    addButton: {
        display: 'inline-block',
        marginBottom: '20px',
        padding: '10px 20px',
        borderRadius: '4px',
        textDecoration: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '16px',
        textAlign: 'center',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
    },
    listItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    configDetails: {
        display: 'flex',
        alignItems: 'center',
    },
    countryCode: {
        fontWeight: 'bold',
        marginRight: '10px',
    },
    requirements: {
        color: '#555',
    },
    buttons: {
        display: 'flex',
        gap: '10px',
    },
    deleteButton: {
        padding: '5px 10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#dc3545',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default ConfigurationList;
