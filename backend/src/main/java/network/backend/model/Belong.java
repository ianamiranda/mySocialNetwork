package network.backend.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "belongs")
public class Belong {
    
    @EmbeddedId
    private BelongId idBelong;

    @ManyToOne
    @MapsId("idUser")
    @JoinColumn(name = "user_id", referencedColumnName = "idUser")
    private User user;

    @ManyToOne
    @MapsId("idGroup")
    @JoinColumn(name = "group_id", referencedColumnName = "idGroup")
    private Group group;

    public Belong (User user, Group group) {
        this.user = user;
        this.group = group;
        this.idBelong = new BelongId(user.getIdUser(), group.getIdGroup());
    }

    public BelongId getIdBelong() {
        return idBelong;
    }

    public void setIdBelong(BelongId idBelong) {
        this.idBelong = idBelong;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

}
