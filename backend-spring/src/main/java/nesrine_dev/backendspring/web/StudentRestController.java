package nesrine_dev.backendspring.web;

import nesrine_dev.backendspring.entities.Payment;
import nesrine_dev.backendspring.entities.PaymentStatus;
import nesrine_dev.backendspring.entities.PaymentType;
import nesrine_dev.backendspring.entities.Student;
import nesrine_dev.backendspring.repository.PaymentRepository;
import nesrine_dev.backendspring.repository.StudentRepository;
import nesrine_dev.backendspring.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
public class StudentRestController {
//    @Autowired
    private StudentRepository studentRepository;
//    @Autowired
    private PaymentRepository paymentRepository;
    private PaymentService paymentService;

    public StudentRestController(StudentRepository studentRepository, PaymentRepository paymentRepository, PaymentService paymentService) {
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
        this.paymentService = paymentService;
    }

    @GetMapping("/payments")
    public List<Payment> allPayments() {

        return paymentRepository.findAll();
    }

    @GetMapping("/payments/{id}")
    public Payment findById(@PathVariable Long id) {

        return paymentRepository.findById(id).get();
    }

    @GetMapping("/PaymentsByStatus")
    public List <Payment> findByStatus(@RequestParam PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }

    @GetMapping("/PaymentsByType")
    public List <Payment> findByType(@RequestParam PaymentType type) {
        return paymentRepository.findByType(type);
    }

    @PutMapping("/payments/updateStatus/{paymentId}")
    public Payment updatePaymentStatus(@PathVariable Long paymentId,
                                       @RequestParam PaymentStatus status) {
        Payment payment = paymentRepository.findById(paymentId).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    @GetMapping(value="/paymentFile/{paymentId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws IOException {
        return paymentService.getPaymentFile(paymentId);
    }

    @GetMapping("/students")
    public List<Student> allStudents() {
        return studentRepository.findAll();
    }

    @GetMapping("/students/{id}")
    public Student findById(@PathVariable String id) {
        return studentRepository.findById(id).get();
    }

    @GetMapping("/students/{code}")
    public Student getStudentByCode(@PathVariable String code) {
        return studentRepository.findByCode(code);
    }

    @GetMapping("/studentsByProgramId")
    public List<Student> getStudentByProgramId(@RequestParam String programId) {
        return studentRepository.findByProgramId(programId);
    }

    @GetMapping("/students/{code}/payments")
    public List<Payment> findByStudentCode(@PathVariable String code) {
        return paymentRepository.findByStudentCode(code);
    }

    @PostMapping(value="/payments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment savePayment(@RequestParam MultipartFile file,
                               LocalDate date,
                               double amount,
                               PaymentType type,
                               String studentCode) throws IOException {

        return paymentService.savePayment(file, date, amount, type, studentCode);
    }
}
