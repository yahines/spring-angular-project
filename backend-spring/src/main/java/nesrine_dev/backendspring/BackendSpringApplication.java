package nesrine_dev.backendspring;

import nesrine_dev.backendspring.entities.Payment;
import nesrine_dev.backendspring.entities.PaymentStatus;
import nesrine_dev.backendspring.entities.PaymentType;
import nesrine_dev.backendspring.entities.Student;
import nesrine_dev.backendspring.repository.PaymentRepository;
import nesrine_dev.backendspring.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class BackendSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendSpringApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(StudentRepository studentRepository,
                                               PaymentRepository paymentRepository) {
        return args -> {
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112233").firstname("Adam").programId("cpA").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112244").firstname("Yasser").programId("cpB").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112255").firstname("Assil").programId("cpC").build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString()).code("112266").firstname("Yacine").programId("cpB").build());

            PaymentType[] paymentTypes = PaymentType.values();
            Random random = new Random();
            studentRepository.findAll().forEach(st->{
                for (int i = 0; i<10; i++) {
                    int index = random.nextInt(paymentTypes.length);
                    Payment payment = Payment.builder()
                                             .amount(1000+(int)(Math.random()*10000))
                                             .date(LocalDate.now())
                                             .type(paymentTypes[index])
                                             .status(PaymentStatus.CREATED)
                                             .file(UUID.randomUUID().toString())
                                             .student(st)
                                             .build();
                    paymentRepository.save(payment);
                }
            });
        };
    }
}
