package network.backend.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "likes")
public class Like {
    
    @EmbeddedId
    private LikeId idLike;

    @ManyToOne
    @MapsId("idUser")
    @JoinColumn(name = "user_id", referencedColumnName = "idUser")  
    private User user;

    @ManyToOne
    @MapsId("idPost")
    @JoinColumn(name = "post_id", referencedColumnName = "idPost")
    private Post post;

    public Like() {}


    public Like (User user, Post post) {
        this.user = user;
        this.post = post;
        this.idLike = new LikeId(user.getIdUser(), post.getIdPost());
    }

    public LikeId getIdLike() {
        return idLike;
    }   

    public void setIdLike(LikeId idLike) {
        this.idLike = idLike;
    }

    public User getUser() {
        return user;
    }   

    public void setUser(User user) {
        this.user = user;
    }   

    public Post getPost() {
        return post;
    }   

    public void setPost(Post post) {
        this.post = post;
    }

}
