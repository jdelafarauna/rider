FROM amazoncorretto:17-alpine-jdk

COPY target/webCaballos-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java" , "-jar" , "/app.jar" ]
