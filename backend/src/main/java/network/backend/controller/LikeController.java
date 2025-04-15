package network.backend.controller;

import network.backend.model.Like;
import network.backend.model.Post;
import network.backend.model.User;
import network.backend.model.jpa.LikeService;
import network.backend.model.jpa.PostRepository;
import network.backend.model.jpa.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000") // Aplicar solo en el método toggleLike
    @PostMapping("/toggle")
    public ResponseEntity<String> toggleLike(@RequestParam Long userId, @RequestParam Long postId) {
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));

            Like like = new Like(user, post);

            if (likeService.existsLike(like)) {
                likeService.deleteLike(like);
            } else {
                likeService.saveLike(like);
            }

            return ResponseEntity.ok("Like toggled successfully");
        } catch (Exception e) {
            // Agrega un log detallado para poder identificar el error
            System.err.println("Error toggling like: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing like: " + e.getMessage());
        }
    }



    @CrossOrigin(origins = "http://localhost:3000") // Aquí también puedes agregar si es necesario
    @GetMapping("/count/{postId}")
    public long getLikeCount(@PathVariable Long postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        List<Like> likes = likeService.findByPost(post);
        return likes.size();
    }

    @CrossOrigin(origins = "http://localhost:3000") // De nuevo, solo en el método específico
    @GetMapping("/exists")
    public boolean checkLike(@RequestParam Long userId, @RequestParam Long postId) {
        User user = userRepository.findById(userId).orElseThrow();
        Post post = postRepository.findById(postId).orElseThrow();
        Like like = new Like(user, post);
        return likeService.existsLike(like);
    }
}

