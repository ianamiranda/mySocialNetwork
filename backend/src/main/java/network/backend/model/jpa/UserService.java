package network.backend.model.jpa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import network.backend.model.User;

@Service
public class UserService {
    
    @Autowired
    UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById (Long idUser) {
        return userRepository.findById(idUser).orElse(null);
    }

    public User creatUser (User user) {
        return userRepository.save(user);
    }

    public void deleteUser (Long idUser) {
        userRepository.deleteById(idUser);
    }

    public List<User> getUsersById (List<Long> idUser) {
        return userRepository.findAllById(idUser);
    }

}
