package nesrine_dev.backendspring.service;

import nesrine_dev.backendspring.entities.Payment;
import nesrine_dev.backendspring.entities.PaymentStatus;
import nesrine_dev.backendspring.entities.PaymentType;
import nesrine_dev.backendspring.entities.Student;
import nesrine_dev.backendspring.repository.PaymentRepository;
import nesrine_dev.backendspring.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    private PaymentRepository paymentRepository;
    private StudentRepository studentRepository;

    public PaymentService(PaymentRepository paymentRepository, StudentRepository studentRepository) {
        this.paymentRepository = paymentRepository;
        this.studentRepository = studentRepository;
    }

    public Payment savePayment(MultipartFile file,
                               LocalDate date,
                               double amount,
                               PaymentType type,
                               String studentCode) throws IOException {
        Path path = Paths.get(System.getProperty("user.home"),"students-app-files","payments");
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
        String fileId = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"),"students-app-files","payments",fileId+".pdf");
        Files.copy(file.getInputStream(), filePath);

        Student student = studentRepository.findByCode(studentCode);
        Payment payment = Payment.builder().type(type)
                .amount(amount)
                .student(student)
                .status(PaymentStatus.CREATED)
                .file(filePath.toUri().toString())
                .build();
        Payment savedPayment = paymentRepository.save(payment);
        return savedPayment;
    }

    public byte[] getPaymentFile(Long paymentId) throws IOException {
        Payment payment = paymentRepository.findById(paymentId).get();
        String filePath = payment.getFile();
        return Files.readAllBytes(Path.of(URI.create(filePath)));
    }
}
