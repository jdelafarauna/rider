package sistemas_distribuidos.webCaballos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;



@Controller
public class controllerweb {

    @GetMapping("/indice")
    public String Indice() {
        return "indice";
    }
    @GetMapping("/")
    public String Indice2() {
        return "indice";
    }

    @GetMapping("/calendario")
    public String Calendario() {
        return "calendario";
    }

    @GetMapping("/concursos")
    public String Concursos() {
        return "concursos";
    }

    @GetMapping("/formuParticipante")
    public String formuParticipante(@RequestParam(name = "id", required = false) String id, Model model) {
        // Aquí puedes procesar el parámetro 'id' si es necesario
        model.addAttribute("id", id); // Añadir el parámetro 'id' al modelo si es necesario
        return "formuParticipante"; // Retornar la vista 'formuParticipante'
    }

    @GetMapping("/formuConcurso")
    public String formuConcurso(@RequestParam(name = "prueba", required = false) String prueba, Model model) {
        if (prueba != null) {
            // Aquí puedes realizar la lógica según el valor del parámetro tiempo
            // Por ejemplo, puedes redirigir a diferentes formularios según el valor pasado
            model.addAttribute("prueba", prueba);
            return "formuConcurso";
        } else {
            // Si no se proporciona ningún parámetro, puedes devolver el formulario por defecto
            return "error.html";
        }
    }

    @GetMapping("/vistaConcursos")
    public String VistaConcurso() {
        return "vistaConcursos";
    }

    @GetMapping("/Clasificacion")
    public String Clasificacion(@RequestParam(name = "id", required = false) String id, Model model) {
        model.addAttribute("id", id);
        return "Clasificacion";
    }

    @GetMapping("/formuReserva")
    public String formuReserva() {
        return "formuReserva";
    }

    @GetMapping("/reserva")
    public String Reserva(@RequestParam(name = "id", required = false) String id, Model model) {
        model.addAttribute("id", id);
        return "reserva";
    }
    
    @GetMapping("/Contacto")
    public String Contacto() {
        return "contacto";
    }

    @GetMapping("/mensajes")
    public String Mensajes() {
        return "mensajes";
    }

    @GetMapping("/editorM")
    public String EditarM() {
        return "editorM";
    }

    @GetMapping("/editorR")
    public String EditarR() {
        return "editorR";
    }

    @GetMapping("/editorC")
    public String EditarC() {
        return "editorC";
    }

    @GetMapping("/editorP")
    public String EditarP() {
        return "editorP";
    }

    @GetMapping("/error")
    public String Error() {
        return "error";
    }
    
   
}
