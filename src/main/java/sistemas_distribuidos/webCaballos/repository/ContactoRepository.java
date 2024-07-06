package sistemas_distribuidos.webCaballos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sistemas_distribuidos.webCaballos.db.Contacto;

public interface ContactoRepository extends JpaRepository<Contacto, Long> {


}
