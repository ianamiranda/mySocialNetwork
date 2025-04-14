package network.backend.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import network.backend.model.Post;
import network.backend.model.Type;
import network.backend.model.User;
import network.backend.model.jpa.PostRepository;
import network.backend.model.jpa.UserRepository;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{userId}/public")
    public ResponseEntity<List<Post>> getPublicPostsByUser(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            List<Post> posts = postRepository.findByUserAndType(userOpt.get(), Type.PUBLIC);
            return ResponseEntity.ok(posts);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


   
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        if (post.getUser() == null || post.getUser().getIdUser() == null) {
            return ResponseEntity.badRequest().build();
        }

        User user = userRepository.findById(post.getUser().getIdUser()).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        post.setUser(user);
        Post savedPost = postRepository.save(post);
        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("/public")
    public List<Post> getPublicPosts() {
        return postRepository.findByType(Type.PUBLIC);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id, @RequestParam Long userId) {
        Optional<Post> postOpt = postRepository.findById(id);

        if (postOpt.isPresent()) {
            Post post = postOpt.get();

            if (post.getUser().getIdUser().equals(userId)) {
                postRepository.deleteById(id);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No puedes eliminar este post");
            }
        }

        return ResponseEntity.notFound().build();
    }

}
