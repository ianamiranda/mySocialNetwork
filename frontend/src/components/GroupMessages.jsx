import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import './GroupMessages.css';

const GroupMessages = ({userId}) => {
  const { idGroup } = useParams();
  const location = useLocation();

  const [groupInfo, setGroupInfo] = useState(location.state?.groupInfo || null);
  const [posts, setPosts] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Traer mensajes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/messages/group/${idGroup}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    const fetchGroupInfo = async () => {
      if (!groupInfo) {
        try {
          const res = await axios.get(`http://localhost:8080/api/messages/info/${idGroup}`);
          setGroupInfo(res.data);
        } catch (err) {
          console.error("Error fetching group info:", err);
        }
      }
    };

    fetchPosts();
    fetchGroupInfo();
  }, [idGroup, groupInfo]);

  // Enviar mensaje
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
        const postResponse = await axios.post("http://localhost:8080/api/posts", {
            namePost: groupInfo.nameGroup,
            text: newMessage,
            user: { idUser: userId },
            type: 'PRIVATE' 
      });

      const newPostId = postResponse.data.idPost;
      
      await axios.post('http://localhost:8080/api/views', {
        idPost: newPostId,
        idGroup: groupInfo.idGroup
      });
      
        setNewMessage(""); 

      const res = await axios.get(`http://localhost:8080/api/messages/group/${idGroup}`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="group-messages-container">
      <h1 className="group-header">{groupInfo ? groupInfo.nameGroup : "Grupo"}</h1>

      <div className="messages-list">
        {posts.length === 0 ? (
          <p>No hay mensajes aún.</p>
        ) : (
          posts.map((post) => (
            <div className="message-item" key={post.idPost}>
              <strong>{post.user.nameUser}</strong>
              <p>{post.text}</p>
            </div>
          ))
        )}
      </div>

      <div className="send-bar">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>

      <Footer current="/messages" />
    </div>
  );    
};

export default GroupMessages;
