package sistemas_distribuidos.webCaballos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sistemas_distribuidos.webCaballos.db.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {


}