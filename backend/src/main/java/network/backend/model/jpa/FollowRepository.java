package network.backend.model.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import network.backend.model.Follow;
import network.backend.model.FollowId;
import network.backend.model.User;

public interface FollowRepository extends JpaRepository<Follow, FollowId> {

    List<Follow> findByFollower(User follower);

    List<Follow> findByFollowed(User followed);

    boolean existsByFollowerAndFollowed(User follower, User followed);

    void deleteByFollowerAndFollowed(User follower, User followed);

}
