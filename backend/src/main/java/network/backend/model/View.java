package network.backend.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

public class View {
    
    @EmbeddedId
    private ViewId idView;

    @ManyToOne
    @MapsId("idPost")
    @JoinColumn(name = "post_id", referencedColumnName = "idPost")
    private Post post;

    @ManyToOne
    @MapsId("idGroup")
    @JoinColumn(name = "group_id", referencedColumnName = "idGroup")
    private Group group;

    public View (Post post, Group group) {
        this.post = post;
        this.group = group;
        this.idView = new ViewId(post.getIdPost(), group.getIdGroup());
    }

    public ViewId getIdView() {
        return idView;
    }

    public void setIdView(ViewId idView) {
        this.idView = idView;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

}
