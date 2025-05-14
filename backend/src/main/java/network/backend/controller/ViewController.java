package network.backend.controller;

import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import network.backend.dto.ViewRequest;
import network.backend.model.Post;
import network.backend.model.View;
import network.backend.model.Group;
import network.backend.model.jpa.GroupService;
import network.backend.model.jpa.PostService;
import network.backend.model.jpa.ViewService;

@RestController
@RequestMapping("/api/views")
@CrossOrigin(origins = "http://localhost:3000")
public class ViewController {
    
    @Autowired
    private ViewService viewService;

    @Autowired
    private PostService postService;   

    @Autowired
    private GroupService groupService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public ResponseEntity<View> createView(@RequestBody ViewRequest request) {
        Post post = postService.getPostById(request.getIdPost());
        Group group = groupService.getGroupById(request.getIdGroup());
        if (post == null || group == null) {
            return ResponseEntity.notFound().build();
        }
        View view = new View(post, group);
        viewService.saveView(view);
        return ResponseEntity.ok(view);
    }

}
