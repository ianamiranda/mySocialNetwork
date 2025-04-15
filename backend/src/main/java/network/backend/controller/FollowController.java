package network.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import network.backend.model.Follow;
import network.backend.model.FollowId;
import network.backend.model.User;
import network.backend.model.jpa.FollowRepository;
import network.backend.model.jpa.UserRepository;

@RestController
@RequestMapping("/api/follow")
@CrossOrigin(origins = "http://localhost:3000")
public class FollowController {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> follow(@RequestBody Map<String, Long> data) {
        Long followerId = data.get("followerId");
        Long followedId = data.get("followedId");

        if (followerId.equals(followedId)) return ResponseEntity.badRequest().body("You cannot follow yourself");

        User follower = userRepository.findById(followerId).orElse(null);
        User followed = userRepository.findById(followedId).orElse(null);

        if (follower == null || followed == null) return ResponseEntity.notFound().build();

        Follow follow = new Follow(followed, follower);
        followRepository.save(follow);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<?> unfollow(@RequestParam Long followerId, @RequestParam Long followedId) {
        followRepository.deleteById(new FollowId(followerId, followedId));
        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<Follow>> getFollowers(@PathVariable Long userId) {
        List<Follow> follows = followRepository.findByFollowed_IdUser(userId);
        return ResponseEntity.ok(follows);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/followed/{userId}")
    public ResponseEntity<List<Follow>> getFollowed(@PathVariable Long userId) {
        List<Follow> follows = followRepository.findByFollower_IdUser(userId);
        return ResponseEntity.ok(follows);
    }
}
