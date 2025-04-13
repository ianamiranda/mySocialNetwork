package network.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import network.backend.dto.RegisterRequest;
import network.backend.model.User;
import network.backend.repository.UserRepository;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepo;

    // Método para autenticar al usuario con sesión HTTP
    public boolean authenticate(String email, String password, HttpSession session) {
        User user = userRepo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            // Guardar información del usuario en la sesión
            session.setAttribute("user", user);
            return true;
        }
        return false;
    }

    // Método para registrar un nuevo usuario
    public User register(RegisterRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setPassword(request.getPassword());
        return userRepo.save(user);
    }
}
