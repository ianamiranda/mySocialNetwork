package network.backend.model.jpa;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import network.backend.model.Group;
import network.backend.model.View;
import network.backend.model.ViewId;

public interface ViewRepository extends JpaRepository<View, ViewId> {
    List<View> findByGroup(Group group);
}
