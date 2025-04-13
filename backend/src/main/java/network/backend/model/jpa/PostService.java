package network.backend.model.jpa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import network.backend.model.Post;
import network.backend.model.User;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long idPost) {
        return postRepository.findById(idPost).orElse(null);
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(Long idPost) {
        postRepository.deleteById(idPost);
    }

    public List<Post> getPostsByUser(User user) {
        return postRepository.findByUser(user);
    }
    
}
