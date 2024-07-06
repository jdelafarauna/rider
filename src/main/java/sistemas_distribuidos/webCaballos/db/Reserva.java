package sistemas_distribuidos.webCaballos.db;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String organica;
    private String concurso;
    private String ambito;
    private String fecha;
    private String prueba;


    // Constructor
    public Reserva() {
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getOrganica() {
        return organica;
    }

    public String getConcurso() {
        return concurso;
    }

    public String getAmbito() {
        return ambito;
    }

    public String getFecha() {
        return fecha;
    }

    public String getPrueba() {
        return prueba;
    }


    // Setters
    public void setId(long id) { 
        this.id = id;
    }

    public void setOrganica(String organica) {
        this.organica = organica;
    }

    public void setConcurso(String Concurso) {
        this.concurso = Concurso;
    }

    public void setAmbito(String ambito) {
        this.ambito = ambito;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public void setPrueba(String prueba) {
        this.prueba = prueba;
    }

    // toString
    @Override
    public String toString() {
        return "Reserva{" +
                "id=" + id +
                ", organica='" + organica + '\'' +
                ", Reserva='" + concurso + '\'' +
                ", ambito='" + ambito + '\'' +
                ", fecha='" + fecha;
                
    }
}
    
