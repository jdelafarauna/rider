package sistemas_distribuidos.webCaballos.controller.Post;

import java.util.Collection;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import sistemas_distribuidos.webCaballos.db.Concurso;
import sistemas_distribuidos.webCaballos.service.ConcursoService;


@RestController
@RequestMapping("/apiConcurso")
public class ConcursoController{

    

    /*@Autowired
    private ConcursoService ConcursoS;
    */

    @Autowired
    private ConcursoService ConcursoS;

    @PostMapping("/posts")
    public  ResponseEntity<Long> addConcurso(@RequestBody Concurso concursoDTO) {
        // Crear un nuevo objeto Post a partir del DTO y guardarlo en el servicio
        Concurso Concurso = new Concurso();
        Concurso.setOrganica(concursoDTO.getOrganica());
        Concurso.setConcurso(concursoDTO.getConcurso());
        Concurso.setAmbito(concursoDTO.getAmbito());
        Concurso.setTiempo(concursoDTO.getTiempo());
        Concurso.setAltura(concursoDTO.getAltura());
        Concurso.setNumero(concursoDTO.getNumero());
        Concurso.setFecha(concursoDTO.getFecha());
        Concurso.setPrueba(concursoDTO.getPrueba());
        ConcursoS.save(Concurso); 
        long id = Concurso.getId();
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
    
    @GetMapping("/datos")
    public Collection<Concurso> getConcursos() {
        Collection<Concurso> datos =  ConcursoS.findAll();
        return datos;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Concurso> getConcurso(@PathVariable long id) {
        Optional<Concurso> optionalConcurso = ConcursoS.findById(id);
        Concurso Concurso = optionalConcurso.get();
        return ResponseEntity.ok(Concurso);
            
    }
    

    @DeleteMapping("/{id}")
    public void deleteConcurso(@PathVariable long id) {
       ConcursoS.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Optional<Concurso>> updateConcurso(@PathVariable long id, @RequestBody Concurso newConcurso) {
        Optional<Concurso> Concurso = ConcursoS.findById(id);
        if (Concurso != null) {
            newConcurso.setId(id);
            ConcursoS.save(newConcurso);
            return ResponseEntity.ok(Concurso);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Concurso> patchConcurso(@PathVariable long id, @RequestBody Concurso updatedConcurso) {
        Optional<Concurso> optionalConcurso = ConcursoS.findById(id);
        if (optionalConcurso.isPresent()) {
            Concurso existingConcurso = optionalConcurso.get();

        // Actualizar solo los campos proporcionados en el objeto actualizado
        if (updatedConcurso.getOrganica() != null) {
            existingConcurso.setOrganica(updatedConcurso.getOrganica());
        }
        if (updatedConcurso.getConcurso() != null) {
            existingConcurso.setConcurso(updatedConcurso.getConcurso());
        }
        if (updatedConcurso.getAmbito() != null) {
            existingConcurso.setAmbito(updatedConcurso.getAmbito());
        }
        if (updatedConcurso.getTiempo() != 0) {
            existingConcurso.setTiempo(updatedConcurso.getTiempo());
        }
        if (updatedConcurso.getAltura() != 0) {
            existingConcurso.setAltura(updatedConcurso.getAltura());
        }
        if (updatedConcurso.getNumero() != 0) {
            existingConcurso.setNumero(updatedConcurso.getNumero());
        }
        if (updatedConcurso.getFecha() != null) {
            existingConcurso.setFecha(updatedConcurso.getFecha());
        }
        if (updatedConcurso.getPrueba() != null) {
            existingConcurso.setPrueba(updatedConcurso.getPrueba());
        }       
        ConcursoS.save(existingConcurso);
        
        return ResponseEntity.ok(existingConcurso);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}