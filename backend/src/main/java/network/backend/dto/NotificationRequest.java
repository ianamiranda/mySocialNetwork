package network.backend.dto;

public class NotificationRequest {
    
    private Long targetUserId;
    private Long actorUserId;

    public Long getTargetUserId() {
        return targetUserId;
    }
    public void setTargetUserId(Long targetUserId) {
        this.targetUserId = targetUserId;
    }  
    public Long getActorUserId() {
        return actorUserId;
    }
    public void setActorUserId(Long actorUserId) {
        this.actorUserId = actorUserId;
    }

}
