package sistemas_distribuidos.webCaballos.service;

import java.util.Collection;
import java.util.Optional;
import org.springframework.stereotype.Service;

import sistemas_distribuidos.webCaballos.db.Reserva;
import sistemas_distribuidos.webCaballos.repository.ReservaRepository;


@Service
public class ReservaService {

    private ReservaRepository ReservaR;
    
    public ReservaService(ReservaRepository ReservaRepository) {
        this.ReservaR = ReservaRepository;
    }

    public Collection<Reserva> findAll() {
        return ReservaR.findAll();
    }

    public Optional<Reserva> findById(long id) {
        return ReservaR.findById(id);
    }

    public long save(Reserva reserva) {

        ReservaR.save(reserva);
        return reserva.getId();
    }

    public void deleteById(long id) {
        this.ReservaR.deleteById(id);
    }

}