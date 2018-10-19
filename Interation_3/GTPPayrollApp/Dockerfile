# Use an official Python runtime as a parent image
FROM openjdk:8

# Copy the current directory contents into the container at /app
COPY ./target/GTPPayrollApp-1.0-SNAPSHOT.jar .

# Make port 80 available to the world outside this container
EXPOSE 8080

# the command to run
ENTRYPOINT ["java", "-jar", "GTPPayrollApp-1.0-SNAPSHOT.jar"]