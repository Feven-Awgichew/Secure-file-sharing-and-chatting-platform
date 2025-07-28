import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GroupChatMembers() {
    const [members, setMembers] = useState(['']);
    const [fetchedMembers, setFetchedMembers] = useState([]);

    const handleInputChange = (index, value) => {
        const newMembers = [...members];
        newMembers[index] = value;
        setMembers(newMembers);
    };

    const addMemberInput = () => {
        setMembers([...members, '']);
    };

    const submitMembers = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/chat/members', members.filter(Boolean));
            alert('Members submitted successfully!');
        } catch (error) {
            console.error('Error submitting members:', error);
        }
    };

    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/chat/members');
            setFetchedMembers(response.data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <div>
            <h2>Add Members to Group Chat</h2>
            <form onSubmit={submitMembers}>
                {members.map((member, index) => (
                    <div key={index}>
                        <label>Member {index + 1}:</label>
                        <input
                            type="text"
                            value={member}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addMemberInput}>Add Member</button>
                <button type="submit">Submit Members</button>
            </form>
            <h3>Current Members:</h3>
            <ul>
                {fetchedMembers.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
        </div>
    );
}

export default GroupChatMembers;