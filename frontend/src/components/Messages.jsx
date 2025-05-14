import { useEffect } from "react";
import axios from 'axios';
import { useState} from "react";
import Footer from "./Footer";
import { Link } from 'react-router-dom';
import './Messages.css';

const Messages = ({userId}) => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [friends, setFriends] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [selectedFriends, setSelectedFriends] = useState([]);

    
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/messages/${userId}`);
                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        const fetchFriends = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/follow/followed/${userId}`);
                // el resultado es una lista de objetos Follow, así que mapeamos al usuario seguido
                const followedUsers = response.data.map(f => f.followed);
                setFriends(followedUsers);
            } catch (error) {
                console.error('Error fetching followed users:', error);
            }
        };
        fetchGroups();
        fetchFriends();
    }, [userId]);

    const handleCreateGroup = async () => {
        try {
            await axios.post("http://localhost:8080/api/messages/createGroup", {
                name: groupName,
                userIds: [userId, ...selectedFriends]
            });

            setGroupName("");
            setSelectedFriends([]);
            setShowCreateForm(false);
            // Refrescar lista de grupos
            const response = await axios.get(`http://localhost:8080/api/messages/${userId}`);
            setGroups(response.data);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <div className="messages-container">
        <h1>Messages</h1>
        <div className="groups-list">
        {groups.map(group => (
            <Link
            to={`/messages/group/${group.idGroup}`}
            state={{ groupInfo: group, userId: userId }}
            key={group.idGroup}
            style={{
                textDecoration: 'none',
                color: 'inherit'
            }}
            >
                <div
                    className="group-item"
                    style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    backgroundColor: '#f9f9f9'
                    }}
                >
                    <h3>{group.nameGroup}</h3>
                </div>
                </Link>
            ))}
        </div>

        <button onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? "Cancel" : "Create new group"}
        </button>

        {showCreateForm && (
            <div className="create-group-form">
                <input
                    type="text"
                    placeholder="Name of the group"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                />
                <h3>Selecciona amigos:</h3>
                {friends.map((friend, index) => (
                    <label key={friend.idUser}>
                        <input
                            type="checkbox"
                            value={friend.idUser}
                            checked={selectedFriends.includes(friend.idUser)}
                            onChange={e => {
                                const checked = e.target.checked;
                                const id = friend.idUser;
                                setSelectedFriends(prev =>
                                    checked ? [...prev, id] : prev.filter(f => f !== id)
                                );
                            }}
                        />
                        {friend.nameUser}
                    </label>
                ))}
                <button onClick={handleCreateGroup}>Create</button>
            </div>
        )}
    
        <Footer current="/messages" />
    </div>
    );    
};

export default Messages;