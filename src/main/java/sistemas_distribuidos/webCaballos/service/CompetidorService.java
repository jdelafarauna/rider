package sistemas_distribuidos.webCaballos.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import sistemas_distribuidos.webCaballos.db.Competidor;
import sistemas_distribuidos.webCaballos.repository.CompetidorRepository;
import sistemas_distribuidos.webCaballos.repository.ConcursoRepository;


@Service
public class CompetidorService {
    @Autowired
    private CompetidorRepository CompetidorR;
    @Autowired
    ConcursoRepository ConcursoR;
    

    public Collection<Competidor> findAll() {
        return CompetidorR.findAll();
    }

    public Optional<Competidor> findById(long id) {
        return CompetidorR.findById(id);
    }

    public long save(Competidor competidor) {
        CompetidorR.save(competidor);
        return competidor.getId();
    }

    @Transactional
    public void deleteId(Long id) {
        CompetidorR.deleteById(id);
    }

    public Collection<Competidor> findByIdConcurso(Long idConcurso){
        return CompetidorR.findByIdConcurso(idConcurso);
    }

    public Collection<Competidor> findClasiGlobal(){      
        return CompetidorR.findClasiGlobal();
    }

}