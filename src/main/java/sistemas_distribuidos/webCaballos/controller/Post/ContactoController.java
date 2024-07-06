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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import sistemas_distribuidos.webCaballos.db.Contacto;
import sistemas_distribuidos.webCaballos.service.ContactoService;


@RestController
@RequestMapping("/apiContacto")
public class ContactoController {

    @Autowired
    private ContactoService ContactoS;

    @GetMapping("/datos")
    public Collection<Contacto> getContactos() {
        return ContactoS.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contacto> getContacto(@PathVariable long id) {
        Optional<Contacto> optionalContacto = ContactoS.findById(id);
        if (optionalContacto.isPresent()) {
            return ResponseEntity.ok(optionalContacto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/posts")
    public  ResponseEntity<Long> addContacto(@RequestBody Contacto ContactoDTO) {
        // Crear un nuevo objeto Post a partir del DTO y guardarlo en el servicio
        long id = ContactoS.save(ContactoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

     @PostMapping("/")
    public ResponseEntity<Contacto> createContacto(@RequestBody Contacto Contacto) {
        ContactoS.save(Contacto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(Contacto.getId()).toUri();
        return ResponseEntity.created(location).body(Contacto);
    }

     @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Contacto>> deleteContacto(@PathVariable long id) {
        Optional<Contacto> Contacto = ContactoS.findById(id);
        if (Contacto != null) {
            ContactoS.deleteById(id);
            return ResponseEntity.ok(Contacto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Optional<Contacto>> replacePost(@PathVariable long id, @RequestBody Contacto newContacto) {
        Optional<Contacto> Contacto = ContactoS.findById(id);
        if (Contacto != null) {
            newContacto.setId(id);
            ContactoS.save(newContacto);
            return ResponseEntity.ok(Contacto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Contacto> updateContacto(@PathVariable long id, @RequestBody Contacto updatedContacto) {
        Optional<Contacto> optionalContacto = ContactoS.findById(id);
        if (optionalContacto.isPresent()) {
            Contacto existingContacto = optionalContacto.get();
            
            // Actualizar solo los campos proporcionados en el objeto actualizado
            if (updatedContacto.getCorreo() != null) {
                existingContacto.setCorreo(updatedContacto.getCorreo());
            }
            if (updatedContacto.getAsunto() != null) {
                existingContacto.setAsunto(updatedContacto.getAsunto());
            }
            if (updatedContacto.getDescripcion() != null) {
                existingContacto.setDescripcion(updatedContacto.getDescripcion());
            }
            
            // Guardar los cambios en el repositorio
            ContactoS.save(existingContacto);
            
            return ResponseEntity.ok(existingContacto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}