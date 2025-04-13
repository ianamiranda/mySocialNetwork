package network.backend.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class FollowId implements Serializable{

    private Long followerId;
    private Long followedId;

    public FollowId(Long followerId, Long followedId) {
        this.followerId = followerId;
        this.followedId = followedId;
    }

    public Long getFollowerId() {
        return followerId;
    }

    public void setFollowerId(Long followerId) {
        this.followerId = followerId;
    }

    public Long getFollowedId() {
        return followedId;
    }

    public void setFollowedId(Long followedId) {
        this.followedId = followedId;
    }

}
