package network.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import network.backend.model.Group;
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

    @GetMapping("/messages")
    public ResponseEntity<List<Group>> showMessages(Model model, HttpSession session) {
        User user =(User) session.getAttribute("user");
        
        List<Group> groups = belongService.getGroupsByMember(user);
        model.addAttribute("groups", groups);
        model.addAttribute("user", user);
        return ResponseEntity.ok(groups);
    }


}
