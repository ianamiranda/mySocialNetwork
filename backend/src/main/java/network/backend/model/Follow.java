package network.backend.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "follows")
public class Follow {
    
     @EmbeddedId
    private FollowId idFollow;

    @ManyToOne
    @MapsId("followerId")
    @JoinColumn(name = "follower_id", referencedColumnName = "idUser")
    private User follower;

    @ManyToOne
    @MapsId("followedId")
    @JoinColumn(name = "followed_id", referencedColumnName = "idUser")
    private User followed;

    public Follow (User followed,User follower) {
        this.follower = follower;
        this.followed = followed;
        this.idFollow = new FollowId(follower.getIdUser(), followed.getIdUser());
    }

    public FollowId getId() {
        return idFollow;
    }

    public void setId(FollowId id) {
        this.idFollow = id;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getFollowed() {
        return followed;
    }

    public void setFollowed(User followed) {
        this.followed = followed;
    }

}
