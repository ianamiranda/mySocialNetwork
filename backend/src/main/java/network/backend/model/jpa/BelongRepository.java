package network.backend.model.jpa;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import network.backend.model.Belong;
import network.backend.model.BelongId;
import network.backend.model.Group;
import network.backend.model.User;

public interface BelongRepository extends JpaRepository<Belong, BelongId> {

    List<Belong> findByMember(User member);

    List<Belong> findByGroup(Group group);

    boolean existsByMemberAndGroup(User member, Group group);

    void deleteByMemberAndGroup(User member, Group group);

}