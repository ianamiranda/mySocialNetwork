package network.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import network.backend.dto.NotificationRequest;
import network.backend.model.Notification;
import network.backend.model.Post;
import network.backend.model.User;
import network.backend.model.jpa.NotificationService;
import network.backend.model.jpa.PostService;
import network.backend.model.jpa.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserService userService;

    @Autowired 
    private PostService postService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        List<Notification> notifications = notificationService.findByUser(user);
        return ResponseEntity.ok(notifications);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createFollow")
    public  ResponseEntity<Notification> createNotificationFollow(@RequestBody NotificationRequest request) {
    User targetUser = userService.getUserById(request.getTargetUserId());
    User actorUser = userService.getUserById(request.getActorUserId());
    if (targetUser == null || actorUser == null) {
        return ResponseEntity.badRequest().build();
    }  
    Notification notification = new Notification();
    notification.setUser(targetUser);
    notification.setDescriptionNotification("User " + actorUser.getNameUser() + " started following you.");
    Notification savedNotification = notificationService.saveNotification(notification);
    return ResponseEntity.ok(savedNotification);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createLike")
    public  ResponseEntity<Notification> createNotificationLike(@RequestBody NotificationRequest request) {
    Post post = postService.getPostById(request.getTargetUserId());
    User targetUser = post.getUser();
    User actorUser = userService.getUserById(request.getActorUserId());
    if (targetUser == null || actorUser == null) {
        return ResponseEntity.badRequest().build();
    }  
    Notification notification = new Notification();
    notification.setUser(targetUser);
    notification.setDescriptionNotification("User " + actorUser.getNameUser() + " liked your post "+post.getText()+".");
    Notification savedNotification = notificationService.saveNotification(notification);
    return ResponseEntity.ok(savedNotification);
    }
    

}
