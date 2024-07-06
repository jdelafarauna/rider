package sistemas_distribuidos.webCaballos.db;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Contacto  {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    String correo;
    String asunto;
    String descripcion;
    
    public Contacto() {}
    
    public Contacto(String correo, String asunto, String descripcion) {
        this.correo = correo;
        this.asunto = asunto;
        this.descripcion = descripcion;
    }
    

    //************** Getters **************//

    public Long getId() {
        return id;
    }
    
    public String getCorreo() {
        return correo;
    }

    public String getAsunto() {
        return asunto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    //************** Setters **************//

    public void setId(Long id) {
        this.id = id;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Override
    public String toString() {
        return "Contacto [correo=" + correo + ", asunto=" + asunto + ", descripcion=" + descripcion + "]";
    }   
}
