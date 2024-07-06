package sistemas_distribuidos.webCaballos.repository;

import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import jakarta.transaction.Transactional;
import sistemas_distribuidos.webCaballos.db.Competidor;

public interface CompetidorRepository extends JpaRepository<Competidor, Long> {

    @Query("SELECT c FROM Competidor c WHERE c.idConcurso = :idConcurso")
    public Collection<Competidor> findByIdConcurso(Long idConcurso);

   @Query("SELECT c FROM Competidor c ORDER BY  SUM(c.puntos) ASC, AVG(c.tiempo) ASC")
    public Collection<Competidor> findClasiGlobal();

    @Query("SELECT COUNT(*) AS num_competidores FROM Competidor c WHERE c.idConcurso = :idConcurso")
    public int countComp(Long idConcurso);

    @Transactional
    @Modifying
    @Query("DELETE FROM Competidor c WHERE c.idConcurso = :idC")
    void deleteByIdConcurso(Long idC);

    /*@Query("DELETE FROM Competidor c WHERE id = id")
    public void deleteById(Long id);
*/
}
