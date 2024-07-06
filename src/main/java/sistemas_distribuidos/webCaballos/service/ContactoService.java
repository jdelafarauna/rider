package sistemas_distribuidos.webCaballos.service;

import java.util.Collection;
import java.util.Optional;
import org.springframework.stereotype.Service;

import sistemas_distribuidos.webCaballos.db.Contacto;
import sistemas_distribuidos.webCaballos.repository.ContactoRepository;


@Service
public class ContactoService {

    private ContactoRepository ContactoR;
    
    public ContactoService(ContactoRepository contactoRepository) {
        this.ContactoR = contactoRepository;
    }

    public Collection<Contacto> findAll() {
        return ContactoR.findAll();
    }

    public Optional<Contacto> findById(long id) {
        return ContactoR.findById(id);
    }

    public long save(Contacto concurso) {

        ContactoR.save(concurso);
        return concurso.getId();
    }

    public void deleteById(long id) {
        this.ContactoR.deleteById(id);
    }

}