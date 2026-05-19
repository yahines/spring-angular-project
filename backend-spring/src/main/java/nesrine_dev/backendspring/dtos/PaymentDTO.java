package nesrine_dev.backendspring.dtos;

import jakarta.persistence.*;
import lombok.*;
import nesrine_dev.backendspring.entities.PaymentStatus;
import nesrine_dev.backendspring.entities.PaymentType;
import nesrine_dev.backendspring.entities.Student;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class PaymentDTO {
    private Long id;
    private LocalDate date;
    private double amount;
    private PaymentType type;
    private PaymentStatus status = PaymentStatus.CREATED;
}
