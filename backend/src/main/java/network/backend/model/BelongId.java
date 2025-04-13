package network.backend.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class BelongId {
    
    private Long idUser;
    private Long idGroup;

    public BelongId(Long idUser, Long idGroup) {
        this.idUser = idUser;
        this.idGroup = idGroup;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdGroup() {
        return idGroup;
    }

    public void setIdGroup(Long idGroup) {
        this.idGroup = idGroup;
    }

}
