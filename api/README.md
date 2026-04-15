# Vehicle Information System


## Introduction
This repository contains web application project - it was designed as an archive for vehicles technical and historical data. Future features may revolve around car dealership, managing your own vehicles or some other features.
This is my personal project that started rather slow, but with time it was expanded using Keycloak as identity provider and supabase to store images, as well as database backups in near futur. Project is still in development so new features will be added gradually but interval between updates may vary due to personal and academic life.


<font color="red">! Disclaimer: In the future, this project can be merged with other project on which my bachelor's thesis was based. </font>

## Requirements

### Backend
IDE:
1. Intellij IDEA:
   - To make Spring Boot application to work properly you must enable annotation processing.
   - Click on *pom.xml* file and add it as maven project.
   - Should be working after that. 
   - You must set SDK for project. I used __Eclipse Temurin 21.0.3__
2. Visual Studio Code:
   - Installed Lombok extension is needed 
   - To build Spring Boot project, navigate to *api* directory (where *pom.xml* is located) and run in terminal: `mvn clean install -DskipTests`.
   - To run project write: `mvn spring-boot:run `.

### Frontend
- Make sure Node.js and Angular CLI are installed:
  ```bash
  node -v
  npm -v
  ng version
  ```
- If Angular CLI is missing:
  ```bash
  npm install -g @angular/cli
  ```

- In *app* directory, (where *package.json* file is located), run `npm install`. 
- To run application: `ng serve`



### Keycloak
- For keycloak I use desktop docker
  - In docker terminal write: `docker run -p 9090:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.2.1 start-dev`
  - After the container starts, go to `localhost:9090` and input *admin* as username and password
  - Then click button *Create realm* and import *realm-export.json* file in *realms* directory in main project directory.

## Technologies
- Spring Boot
- Spring Data JPA
- REST API
- H2 database, PostgreSQL
- Angular
- Supabase
- Keycloak

## Features
- Authentication and authorization via Keycloak
- Role-based access control
- REST API to manage operations between front-end and back-end
