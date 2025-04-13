package network.backend.model.jpa;

import java.util.List;

import javax.swing.GroupLayout.Group;
import javax.swing.text.View;

import org.springframework.data.jpa.repository.JpaRepository;

import network.backend.model.ViewId;

public interface ViewRepository extends JpaRepository<View, ViewId> {
    List<View> findByGroup(Group group);
}
