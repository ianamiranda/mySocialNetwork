package network.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import network.backend.dto.GroupRequest;
import network.backend.model.Belong;
import network.backend.model.Group;
import network.backend.model.Post;
import network.backend.model.User;
import network.backend.model.jpa.BelongService;
import network.backend.model.jpa.GroupService;
import network.backend.model.jpa.PostService;
import network.backend.model.jpa.UserService;
import network.backend.model.jpa.ViewService;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {
    
    @Autowired
    private PostService postService;

    @Autowired
    private GroupService groupService;

    @Autowired 
    private UserService userService;

    @Autowired
    private ViewService viewService;

    @Autowired
    private BelongService belongService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{userId}")
    public ResponseEntity<List<Group>> showMessages(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        List<Group> groups = belongService.getGroupsByMember(user);
        return ResponseEntity.ok(groups);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createGroup")
    public Group createGroup(@RequestBody GroupRequest request) {
        Group group = new Group();
        group.setNameGroup(request.getName());
        group.setDescriptionGroup("Grupo creado por el usuario"); // opcional
        Group savedGroup = groupService.createGroup(group);

        List<User> users = userService.getUsersById(request.getUserIds());

         for (User user : users) {
            Belong belong = new Belong(user, savedGroup);
            belongService.create(belong);
        }
        return savedGroup;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<Post>> getPosts(@PathVariable Long groupId) {
        Group group = groupService.getGroupById(groupId);
        List<Post> posts = viewService.findByGroup(group);
        return ResponseEntity.ok(posts);
    }

}
