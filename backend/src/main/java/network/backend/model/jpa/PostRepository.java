package network.backend.model.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import network.backend.model.Post;
import network.backend.model.User;
import network.backend.model.Type;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUser(User user);
    List<Post> findByType(Type type);
    List<Post> findByUserAndType(User user, Type type);



}
