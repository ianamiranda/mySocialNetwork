package network.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "groups")
public class Group {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idGroup;

    private String nameGroup;
    private String descriptionGroup;

    public Long getIdGroup() {
        return idGroup;
    }
    public void setIdGroup(Long idGroup) {
        this.idGroup = idGroup;
    }
    public String getNameGroup() {
        return nameGroup;
    }
    public void setNameGroup(String nameGroup) {
        this.nameGroup = nameGroup;
    }
    public String getDescriptionGroup() {
        return descriptionGroup;
    }
    public void setDescriptionGroup(String descriptionGroup) {
        this.descriptionGroup = descriptionGroup;
    }

    

}
