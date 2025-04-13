package network.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import network.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}