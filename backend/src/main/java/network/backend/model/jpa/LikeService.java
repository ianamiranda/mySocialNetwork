package network.backend.model.jpa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import network.backend.model.Like;
import network.backend.model.Post;
import network.backend.model.User;

@Service
public class LikeService {
    
    @Autowired
    LikeRepository likeRepository;

    public void saveLike(Like like) {
        likeRepository.save(like);
    }
    public void deleteLike(Like like) {
        likeRepository.delete(like);
    }
    public boolean existsLike(Like like) {
        return likeRepository.existsById(like.getIdLike());
    }
    public List<Like> findByUser(User user) {
        return likeRepository.findByUser(user);
    }
    public List<Like> findByPost(Post post) {
        return likeRepository.findByPost(post);
    }
    

}
