package network.backend.model.jpa;

import java.util.List;

import javax.swing.GroupLayout.Group;
import javax.swing.text.View;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ViewService {
    
    @Autowired
    ViewRepository viewRepository;

    public void saveView(View view) {
        viewRepository.save(view);
    }
    
    public void deleteView(View view) {
        viewRepository.delete(view);
    }  

    public List<View> findByGroup(Group group) {
        return viewRepository.findByGroup(group);
    }

}
