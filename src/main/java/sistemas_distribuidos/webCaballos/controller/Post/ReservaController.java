package sistemas_distribuidos.webCaballos.controller.Post;

import java.net.URI;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import sistemas_distribuidos.webCaballos.db.Reserva;
import sistemas_distribuidos.webCaballos.service.ReservaService;



@RestController
@RequestMapping("/apiReserva")
public class ReservaController<Participante> {

    @Autowired
    private ReservaService ReservaR;

    @GetMapping("/datos")
    public Collection<Reserva> getReservaS() {
        return ReservaR.findAll();
        
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Reserva>> getReserva(@PathVariable long id) {
        Optional<Reserva> Reserva = ReservaR.findById(id);
        if (Reserva != null) {
            return ResponseEntity.ok(Reserva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/posts")
    public  ResponseEntity<Long> addReserva(@RequestBody Reserva ReservaDTO) {
        // Crear un nuevo objeto Post a partir del DTO y guardarlo en el servicio
        long id = ReservaR.save(ReservaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @PostMapping("/")
    public ResponseEntity<Reserva> createReserva(@RequestBody Reserva Reserva) {
        ReservaR.save(Reserva);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(Reserva.getId()).toUri();
        return ResponseEntity.created(location).body(Reserva);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Reserva>> deleteReserva(@PathVariable long id) {
        Optional<Reserva> Reserva = ReservaR.findById(id);
        if (Reserva != null) {
            ReservaR.deleteById(id);
            return ResponseEntity.ok(Reserva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<Optional<Reserva>> replacePost(@PathVariable long id, @RequestBody Reserva newReserva) {
        Optional<Reserva> Reserva = ReservaR.findById(id);
        if (Reserva != null) {
            newReserva.setId(id);
            ReservaR.save(newReserva);
            return ResponseEntity.ok(Reserva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Reserva> updateReserva(@PathVariable long id, @RequestBody Reserva updatedReserva) {
        Optional<Reserva> optionalReserva = ReservaR.findById(id);
        if (optionalReserva.isPresent()) {
            Reserva existingReserva = optionalReserva.get();
            
            // Actualizar solo los campos proporcionados en el objeto actualizado
            if (updatedReserva.getOrganica() != null) {
                existingReserva.setOrganica(updatedReserva.getOrganica());
            }
            if (updatedReserva.getConcurso() != null) {
                existingReserva.setConcurso(updatedReserva.getConcurso());
            }
            if (updatedReserva.getAmbito() != null) {
                existingReserva.setAmbito(updatedReserva.getAmbito());
            }
            if (updatedReserva.getFecha() != null) {
                existingReserva.setFecha(updatedReserva.getFecha());
            }
            if (updatedReserva.getPrueba() != null) {
                existingReserva.setPrueba(updatedReserva.getPrueba());
            }
            // Guardar los cambios en el repositorio
            ReservaR.save(existingReserva);
            
            return ResponseEntity.ok(existingReserva);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
