import { useEffect } from "react";
import axios from 'axios';
import { useState} from "react";
import Footer from "./Footer";

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
                const response = await axios.get(`http://localhost:8080/api/groups/${userId}`);
                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        const fetchFriends = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/followed/${userId}`);
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
            await axios.post("http://localhost:8080/api/groups", {
                name: groupName,
                userIds: [userId, ...selectedFriends]
            });

            setGroupName("");
            setSelectedFriends([]);
            setShowCreateForm(false);
            // Refrescar lista de grupos
            const response = await axios.get(`http://localhost:8080/api/groups/${userId}`);
            setGroups(response.data);
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    return (
        <div className="messages-container">
        <h1>Messages</h1>

        <button onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? "Cancelar" : "Crear nuevo grupo"}
        </button>

        {showCreateForm && (
            <div className="create-group-form">
                <input
                    type="text"
                    placeholder="Nombre del grupo"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                />
                <h3>Selecciona amigos:</h3>
                {friends.map(friend => (
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
                        {friend.username}
                    </label>
                ))}
                <button onClick={handleCreateGroup}>Crear</button>
            </div>
        )}

        <div className="groups-list">
            {groups.map(group => (
                <div key={group.idGroup} onClick={() => setSelectedGroup(group)} className="group-item">
                    {group.nameGroup}
                </div>
            ))}
        </div>

        {selectedGroup && (
            <div className="messages-detail">
                <h2>{selectedGroup.nameGroup}</h2>
                {/* Aquí puedes mostrar los mensajes del grupo seleccionado */}
            </div>
        )}
        <Footer current="/messages" />
    </div>
    );    
};

export default Messages;