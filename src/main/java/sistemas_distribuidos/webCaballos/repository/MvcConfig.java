package sistemas_distribuidos.webCaballos.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@SuppressWarnings("null") ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/Imagenes/**") // La URL que utilizarás en tu HTML para acceder a los recursos
                .addResourceLocations("classpath:/Imagenes/"); // La ubicación de los recursos en el proyecto
    }
}