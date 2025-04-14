package network.backend.model.jpa;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import network.backend.model.Notification;
import network.backend.model.User;

@Service
public class NotificationService {
    
    @Autowired
    NotificationRepository notificationRepository;

    public List<Notification> findAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<Notification> findByUserId(Long userId) {
        return notificationRepository.findByUserIdUser(userId);
    }

    public List<Notification> findByUser(User user) {
        return notificationRepository.findByUser(user);
    }

    public void saveNotification(Notification notification) {
        notificationRepository.save(notification);
    }

    public void deleteNotification(Notification notification) {
        notificationRepository.delete(notification);
    }



}
