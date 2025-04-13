package network.backend.model.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import network.backend.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}