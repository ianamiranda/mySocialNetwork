package network.backend.model.jpa;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import network.backend.model.Group;
import network.backend.model.Post;
import network.backend.model.View;

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

    public List<Post> findByGroup(Group group) {
        List<View> viewsGroup = viewRepository.findByGroup(group);
        List<Post> posts = viewsGroup.stream().map(View::getPost).toList();
        return posts;
    }

}
