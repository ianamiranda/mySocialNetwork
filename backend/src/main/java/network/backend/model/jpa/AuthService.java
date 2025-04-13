package network.backend.model.jpa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import network.backend.dto.RegisterRequest;
import network.backend.model.User;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    // Retorna el usuario completo si las credenciales son válidas
    public User authenticateAndGetUser(String email, String password, HttpSession session) {
        User user = userRepo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            session.setAttribute("user", user);
            return user;
        }
        return null;
    }

    public User register(RegisterRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setNameUser(request.getNameUser());
        user.setPassword(request.getPassword());
        return userRepo.save(user);
    }
}
