import { useState, useEffect } from "react";
import axios from 'axios';
import Footer from "./Footer";
import './Notifications.css';


const Notifications = ({userId}) => {
    const[notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/notifications/${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, [userId]);

    return (
        <div className="notifications-container">
            <h1>Notifications</h1>
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id}>
                            {notification.descriptionNotification}
                        </li>
                    ))}
                </ul>
            )}
            <Footer current="/notifications"/>
        </div>
    )

}

export default Notifications;