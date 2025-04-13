package network.backend.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class ViewId {
    
    private Long idPost;
    private Long idGroup;

    public ViewId(Long idPost, Long idGroup) {
        this.idPost = idPost;
        this.idGroup = idGroup;
    }

    public Long getIdPost() {
        return idPost;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }

    public Long getIdGroup() {
        return idGroup;
    }

    public void setIdGroup(Long idGroup) {
        this.idGroup = idGroup;
    }

}
