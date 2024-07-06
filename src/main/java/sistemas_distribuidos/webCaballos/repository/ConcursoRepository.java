package sistemas_distribuidos.webCaballos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import jakarta.transaction.Transactional;
import sistemas_distribuidos.webCaballos.db.Concurso;

public interface ConcursoRepository extends JpaRepository<Concurso, Long> {

    @Transactional
    @Modifying
    @Query("DELETE FROM Concurso c WHERE c.id = :id")
    public void DeleteConcurso(Long id);

}