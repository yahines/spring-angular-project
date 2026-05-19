package nesrine_dev.backendspring.repository;

import nesrine_dev.backendspring.entities.Payment;
import nesrine_dev.backendspring.entities.PaymentStatus;
import nesrine_dev.backendspring.entities.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStudentCode(String code);
    List<Payment> findByStatus(PaymentStatus status);
    List<Payment> findByType(PaymentType type);
}
