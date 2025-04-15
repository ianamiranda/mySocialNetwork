package network.backend.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class LikeId {
    
    private Long idUser;
    private Long idPost;

    public LikeId() {}


    public LikeId(Long idUser, Long idPost) {
        this.idUser = idUser;
        this.idPost = idPost;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdPost() {
        return idPost;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }

}
