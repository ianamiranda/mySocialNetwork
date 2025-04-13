package network.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idUser;

    private String nameUser;
    private String descriptionUser;
    private String email;
    private String password;
    private String imgUser;
    
    public Long getIdUser() {
        return idUser;
    }
    public String getNameUser() {
        return nameUser;
    }
    public String getDescriptionUser() {
        return descriptionUser;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public String getImgUser() {
        return imgUser;
    }
    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }
    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }
    public void setDescriptionUser(String descriptionUser) {
        this.descriptionUser = descriptionUser;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setImgUser(String imgUser) {
        this.imgUser = imgUser;
    }

}
