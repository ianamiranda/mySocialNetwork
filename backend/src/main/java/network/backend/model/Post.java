package network.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "posts")
public class Post {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idPost;

    private String namePost;
    private String text;

    @Enumerated(EnumType.STRING)
    private Type type;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "idUser")
    private User user;

    public Long getIdPost() {
        return idPost;
    }

    public String getNamePost() {
        return namePost;
    }

    public String getText() {
        return text;
    }

    public Type getType() {
        return type;
    }

    public User getUser() {
        return user;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }

    public void setNamePost(String namePost) {
        this.namePost = namePost;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
