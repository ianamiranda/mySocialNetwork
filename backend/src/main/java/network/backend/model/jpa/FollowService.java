package network.backend.model.jpa;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import network.backend.model.Follow;
import network.backend.model.User;

@Service
public class FollowService {
    
    @Autowired
    FollowRepository followRepository;

    public Follow follow(User follower, User followed) {
        if (!followRepository.existsByFollowerAndFollowed(follower, followed)) {
            Follow follow = new Follow(follower, followed);
            return followRepository.save(follow);
        }
        return null; // O lanzar una excepción si querés manejarlo mejor
    }

    public void unfollow(User follower, User followed) {
        followRepository.deleteByFollowerAndFollowed(follower, followed);
    }

    public List<User> getFollowedBy(User follower) {
        return followRepository.findByFollower(follower)
                .stream()
                .map(Follow::getFollowed)
                .collect(Collectors.toList());
    }

    public List<User> getFollowersOf(User followed) {
        return followRepository.findByFollowed(followed)
                .stream()
                .map(Follow::getFollower)
                .collect(Collectors.toList());
    }

    public boolean isFollowing(User follower, User followed) {
        return followRepository.existsByFollowerAndFollowed(follower, followed);
    }

}
