package sistemas_distribuidos.webCaballos.controller.Post;

import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sistemas_distribuidos.webCaballos.db.Competidor;
import sistemas_distribuidos.webCaballos.service.CompetidorService;



@RestController
@RequestMapping("/apiCompetidor")
public class CompetidorController {
    
    private AtomicLong competidorIdCounter = new AtomicLong();
    @Autowired
    private CompetidorService CompetidorS;

    @PostMapping("/posts")
    public void addParticipante( @RequestBody Competidor CompetidorDTO) {
        Competidor Competidor = new Competidor();
        long competidorId = competidorIdCounter.incrementAndGet();
        Competidor.setId(competidorId);
        Competidor.setNombre(CompetidorDTO.getNombre());
        Competidor.setCaballo(CompetidorDTO.getCaballo());
        Competidor.setDerribos(CompetidorDTO.getDerribos());
        Competidor.setDesobediencias(CompetidorDTO.getDesobediencias());
        Competidor.setEliminado(CompetidorDTO.isEliminado());
        Competidor.setCaido(CompetidorDTO.isCaido());
        Competidor.setTiempo(CompetidorDTO.getTiempo());
        Competidor.setObservaciones(CompetidorDTO.getObservaciones());
        Competidor.setPuntos();
        Competidor.setIdConcurso(CompetidorDTO.getIdConcurso());
        CompetidorS.save(Competidor); 
    }

    @GetMapping("/datos")
    public Collection<Competidor> getCompetidores() {
        Collection<Competidor> datos = CompetidorS.findAll();
        return datos;
    }

    @GetMapping("/Concurso/{idConcurso}")
    public Collection<Competidor> getCompetidoresDeConcurso(@PathVariable Long idConcurso) { 
        Collection<Competidor> datos = CompetidorS.findByIdConcurso(idConcurso);
        return datos;
    }

    @GetMapping("/{id}")
    public Optional<Competidor> getComp(@PathVariable Long id) { 
        Optional<Competidor> competidor = CompetidorS.findById(id);
        return competidor;
    }


    @GetMapping("/clasiGlobal")
    public Collection<Competidor> getClasificacionGlobal() { 
        Collection<Competidor> clasificacion = CompetidorS.findClasiGlobal();
        return clasificacion;
    }

    @DeleteMapping("/{idParticipante}")
    public void deleteConcurso(@PathVariable long idParticipante) {
       CompetidorS.deleteId(idParticipante);
    }

 
    @PutMapping("/{id}")
    public ResponseEntity<Optional<Competidor>> replacePost(@PathVariable long id, @RequestBody Competidor newCompetidor) {
        Optional<Competidor> Competidor = CompetidorS.findById(id);
        if (Competidor != null) {
            newCompetidor.setId(id);
            CompetidorS.save(newCompetidor);
            return ResponseEntity.ok(Competidor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Competidor> patchCompetidor(@PathVariable long id, @RequestBody Competidor updatedCompetidor) {
        Optional<Competidor> optionalCompetidor = CompetidorS.findById(id);
        if (optionalCompetidor.isPresent()) {
            Competidor existingCompetidor = optionalCompetidor.get();

        // Actualizar solo los campos proporcionados en el objeto actualizado
        if (updatedCompetidor.getNombre() != null) {
            existingCompetidor.setNombre(updatedCompetidor.getNombre());
        }
        if (updatedCompetidor.getCaballo() != null) {
            existingCompetidor.setCaballo(updatedCompetidor.getCaballo());
        }
        if (updatedCompetidor.getDerribos() !=  existingCompetidor.getDerribos()) {
            existingCompetidor.setDerribos(updatedCompetidor.getDerribos());
        }
        if (updatedCompetidor.getDesobediencias() != existingCompetidor.getDesobediencias()) {
            existingCompetidor.setDesobediencias(updatedCompetidor.getDesobediencias());
        }
        if (updatedCompetidor.isEliminado() != existingCompetidor.isEliminado()) {
            existingCompetidor.setEliminado(updatedCompetidor.isEliminado());
        }
        if (updatedCompetidor.isCaido() != existingCompetidor.isCaido()) {
            existingCompetidor.setCaido(updatedCompetidor.isCaido());
        }
        if (updatedCompetidor.getTiempo() != existingCompetidor.getTiempo()) {
            existingCompetidor.setTiempo(updatedCompetidor.getTiempo());
        }
        if (updatedCompetidor.getObservaciones() != null) {
            existingCompetidor.setObservaciones(updatedCompetidor.getObservaciones());
        }       
        CompetidorS.save(existingCompetidor);
        
        return ResponseEntity.ok(existingCompetidor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
