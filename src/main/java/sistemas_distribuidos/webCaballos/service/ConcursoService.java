package sistemas_distribuidos.webCaballos.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sistemas_distribuidos.webCaballos.db.Concurso;
import sistemas_distribuidos.webCaballos.repository.CompetidorRepository;
import sistemas_distribuidos.webCaballos.repository.ConcursoRepository;


@Service
public class ConcursoService {

    @Autowired
    private ConcursoRepository ConcursoR;
    @Autowired
    private CompetidorRepository CompetidorR;

    public Collection<Concurso> findAll() {
        return ConcursoR.findAll();
    }

    public Optional<Concurso> findById(long id) {
        return ConcursoR.findById(id);
    }

    public long save(Concurso concurso) {
        ConcursoR.save(concurso);
        return concurso.getId();
    }

    public void deleteById(long id) {
        ConcursoR.deleteById(id);
        CompetidorR.deleteByIdConcurso(id);
    }

}