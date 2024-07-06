package sistemas_distribuidos.webCaballos.db;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Concurso {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String organica;
    private String concurso;
    private String ambito;
    private int tiempo;
    private int altura;
    private int numero;
    private String fecha;
    private String prueba;

    // Constructor
    public Concurso() {
        
    }
    public Concurso(String concurso) {
        this.concurso = concurso;
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

    public int getTiempo() {
        return tiempo;
    }

    public int getAltura() {
        return altura;
    }

    public int getNumero() {
        return numero;
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

    public void setConcurso(String concurso) {
        this.concurso = concurso;
    }

    public void setAmbito(String ambito) {
        this.ambito = ambito;
    }

    public void setTiempo(int tiempo) {
        this.tiempo = tiempo;
    }

    public void setAltura(int altura) {
        this.altura = altura;
    }

    public void setNumero(int numero) {
        this.numero = numero;
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
        return "Concurso{" +
                "id=" + id +
                ", organica='" + organica + '\'' +
                ", concurso='" + concurso + '\'' +
                ", ambito='" + ambito + '\'' +
                ", tiempo=" + tiempo +
                ", altura=" + altura +
                ", numero=" + numero +
                ", fecha='" + fecha + '\'' +
                '}';
    }
}
    
