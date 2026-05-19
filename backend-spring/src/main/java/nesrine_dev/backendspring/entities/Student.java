package nesrine_dev.backendspring.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class Student {
    @Id
    private String id;
    @Column(unique = true)
    private String code;
    private String firstname;
    private String lastname;
    private String email;
    private String photo;
    private String programId;
}
