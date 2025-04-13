package network.backend.model.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import network.backend.model.Like;
import network.backend.model.LikeId;
import network.backend.model.Post;
import network.backend.model.User;

public interface LikeRepository extends JpaRepository<Like, LikeId> {

    List<Like> findByUser(User user);
    List<Like> findByPost(Post post);
    List<Like> findByUserAndPost(User user, Post post);
    
}
