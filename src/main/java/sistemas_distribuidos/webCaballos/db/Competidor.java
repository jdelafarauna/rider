package sistemas_distribuidos.webCaballos.db;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Competidor  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nombre;
    private String caballo;
    private int derribos;
    private int desobediencias;
    private boolean eliminado;
    private boolean caido;
    private float tiempo;
    private String observaciones;
    private int puntos;
    private Long idConcurso;
    
    public Competidor() {}
    
    public Competidor(String nombre, String caballo, int derribos, int desobediencias, boolean eliminado, boolean caido, float tiempo,String observaciones, Long concurso) {
        this.nombre = nombre;
        this.caballo = caballo;
        this.derribos = derribos;
        this.desobediencias = desobediencias;
        this.eliminado = eliminado || caido || desobediencias>1;
        this.caido = caido;
        this.tiempo = tiempo;
        this.observaciones = observaciones;
        this.idConcurso = concurso;

        if (this.eliminado){
            this.puntos = 99;
        }else{
        this.puntos = derribos*4 + desobediencias*4;
        }

    }
    
    public Long getId() {return id;}
    
    public void setId(long id) { this.id = id;}
    
   // Getters
   public String getNombre() {
    return nombre;
}

public String getCaballo() {
    return caballo;
}

public int getDerribos() {
    return derribos;
}

public int getDesobediencias() {
    return desobediencias;
}


public boolean isCaido() {
    return caido;
}

public float getTiempo() {
    return tiempo;
}

public String getObservaciones() {
    return observaciones;
}

public int getPuntos() {
    return puntos;
}
public Long getIdConcurso() {
    return idConcurso;
}

// Setters
public void setNombre(String nombre) {
    this.nombre = nombre;
}

public void setCaballo(String caballo) {
    this.caballo = caballo;
}

public void setDerribos(int derribos) {
    this.derribos = derribos;
}

public void setDesobediencias(int desobediencias) {
    this.desobediencias = desobediencias;
}

public void setEliminado(boolean eliminado) {
    this.eliminado = eliminado;
}

public void setCaido(boolean caido) {
    this.caido = caido;
}

public void setTiempo(float tiempo) {
    this.tiempo = tiempo;
}

public void setIdConcurso(Long idConcurso) {
    this.idConcurso = idConcurso;
}

public void setObservaciones(String observaciones) {
    this.observaciones = observaciones;
}

public void setPuntos() {
    if (isEliminado()){
        this.puntos = 99;
    }else{
        this.puntos = this.derribos*4 + desobediencias*4;
    }
}

public void setPuntos(int puntos){
    this.puntos = puntos;
}

public boolean isEliminado(){
    return this.eliminado|| this.caido || this.desobediencias>1;
}

// toString
@Override
public String toString() {
    return "Competidor{" +
            "nombre='" + nombre + '\'' +
            ", caballo='" + caballo + '\'' +
            ", derribos=" + derribos +
            ", desobediencias=" + desobediencias +
            ", eliminado=" + eliminado +
            ", caido=" + caido +
            ", tiempo=" + tiempo +
            ", observaciones='" + observaciones + '\'' +
            ", puntos=" + puntos +
            '}';
}
    
}
