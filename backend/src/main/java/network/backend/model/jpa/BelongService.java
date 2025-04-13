package network.backend.model.jpa;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import network.backend.model.Belong;
import network.backend.model.Group;
import network.backend.model.User;

@Service
public class BelongService {
    
    @Autowired
    BelongRepository belongRepository;

    public Belong belong(User member, Group group) {
        if (!belongRepository.existsByUserAndGroup(member, group)) {
            Belong belong = new Belong(member, group);
            return belongRepository.save(belong);
        }
        return null; // O lanzar una excepción si querés manejarlo mejor
    }

    public void exitGroup(User member, Group group) {
        belongRepository.deleteByUserAndGroup(member, group);
    }

    public boolean isMember(User member, Group group) {
        return belongRepository.existsByUserAndGroup(member, group);
    }
    public List<Group> getGroupsByMember(User member) {
        return belongRepository.findByUser(member)
                .stream()
                .map(Belong::getGroup)
                .collect(Collectors.toList());
    }

}
