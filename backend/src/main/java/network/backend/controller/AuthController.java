package network.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import network.backend.dto.LoginRequest;
import network.backend.dto.RegisterRequest;
import network.backend.model.User;
import network.backend.model.jpa.AuthService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
  origins = "http://localhost:3000",  // Frontend URL
  allowCredentials = "true",  // Permite enviar cookies (credenciales) con la solicitud
  allowedHeaders = "*",  // Permite cualquier encabezado
  maxAge = 3600  // Tiempo de cache de pre-solicitud de CORS
)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
    User user = authService.authenticateAndGetUser(request.getEmail(), request.getPassword(), session);
    if (user != null) {
        return ResponseEntity.ok(user);  // Devuelve el usuario completo como JSON
    } else {
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        User user = authService.register(request);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();  // Invalidar la sesión
        return ResponseEntity.ok("Logout successful");
    }
}
