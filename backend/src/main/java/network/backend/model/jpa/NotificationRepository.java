package network.backend.model.jpa;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import network.backend.model.Notification;
import network.backend.model.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdUser(Long userId);
    List<Notification> findByUser(User user);
}
