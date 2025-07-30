import React, { useState, useEffect } from 'react';
import axios from 'axios';
// const API = process.env.REACT_APP_API;
const API = import.meta.env.VITE_API_URL;
const Hobbies = () => {
    const [hobbies, setHobbies] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        fetchHobbies();
    }, []);

    const fetchHobbies = async () => {
        try {
            const url = `${API}/api/hobbies/showhobby`;
            const response = await axios.get(url);
            console.log('Fetched hobbies:', response.data);
            setHobbies(response.data);
        } catch (err) {
            console.error('Error fetching hobbies:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
        }
    };
    const addHobby = async () => {
        if (!inputValue.trim()) {
            console.log('Input is empty, not adding hobby');
            return;
        }

        try {
            const url = `${API}/api/hobbies/addhobby`;
            console.log('Adding hobby to URL:', url); 
            console.log('Request data:', { name: inputValue.trim() }); 
            
            const result = await axios.post(url, { name: inputValue.trim() });
            console.log('API response:', result.data);
            setHobbies([...hobbies, result.data]);
            setInputValue('');
        } catch (err) {
            console.error('Error adding hobby:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
        }
    };
    
    const deleteHobby = async (id) => {
        try {
            const url = `${API}/api/hobbies/deletehobby/${id}`;
            console.log('Deleting hobby from URL:', url);
            await axios.delete(url);
            setHobbies(hobbies.filter(hobby => hobby._id !== id));
            console.log('Hobby deleted successfully');
        } catch (err) {
            console.error('Error deleting hobby:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addHobby();
        }
    };
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
            <h1>My Hobbies</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder='Enter your hobby here...' 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{ 
                        padding: '10px', 
                        marginRight: '10px', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px',
                        width: '300px'
                    }}
                />
                <button 
                    onClick={addHobby}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#1f3a56ff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Add
                </button>
            </div>

            <div>
                {hobbies.length === 0 ? (
                    <p style={{ color: 'white', fontStyle: 'italic' }}>No hobbies added yet. Add your first hobby above!</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {hobbies.map(hobby => (
                            <li 
                                key={hobby._id} 
                                style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    padding: '10px', 
                                    margin: '5px 0', 
                                    backgroundColor: '#131c24ff', 
                                    border: '1px solid #dee2e6',
                                    borderRadius: '4px'
                                }}
                            >
                                <span style={{ fontSize: '16px' }}>{hobby.name}</span>
                                <button 
                                    onClick={() => deleteHobby(hobby._id)}
                                    style={{ 
                                        padding: '5px 10px', 
                                        backgroundColor: '#dc3545', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Hobbies;