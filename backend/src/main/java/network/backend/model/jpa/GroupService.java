package network.backend.model.jpa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import network.backend.model.Group;

@Service
public class GroupService {
    
    @Autowired
    GroupRepository groupRepository;

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    public Group getGroupById (Long idGroup) {
        return groupRepository.findById(idGroup).orElse(null);
    }

    public Group creatGroup (Group group) {
        return groupRepository.save(group);
    }

    public void deleteGroup (Long idGroup) {
        groupRepository.deleteById(idGroup);
    }

}
