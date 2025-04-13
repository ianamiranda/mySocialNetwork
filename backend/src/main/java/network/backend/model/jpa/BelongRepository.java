package network.backend.model.jpa;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import network.backend.model.Belong;
import network.backend.model.BelongId;
import network.backend.model.Group;
import network.backend.model.User;

public interface BelongRepository extends JpaRepository<Belong, BelongId> {

    List<Belong> findByUser(User member);

    List<Belong> findByGroup(Group group);

    boolean existsByUserAndGroup(User member, Group group);

    void deleteByUserAndGroup(User member, Group group);

}