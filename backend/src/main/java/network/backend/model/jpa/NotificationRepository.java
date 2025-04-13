package network.backend.model.jpa;

import java.util.List;

import javax.management.Notification;

import org.springframework.data.jpa.repository.JpaRepository;

import network.backend.model.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(Long userId);
    List<Notification> findByUser(User user);
}
