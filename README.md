# Hi there!

Be very welcome to my solution to my resolution to Bain Take-Home Assignment.

## Q/A

1. Tell us what pieces of software you think are necessary to develop for the working prototype and how they are related. We call each application (web, mobile or desktop), each API, each batch process that can be deployed independently a piece of software. Support yourself with a diagram if you think necessary.

- I would suggest developing a Minimum Viable Product (MVP) with essential launchable features with the aim to validate the assumptions, along with attracting early adopters in the early stages of the product development cycle. To do this, I would try to propose the creation of four applications that correspond to the customer (buyer) app, the delivery staff app, the admin app and the merchant app; and each of them would be divided into two application layers: frontend (web and/or mobile) and backend, which would communicate through a series of APIs and access a shared database.

2. Tell us about the type of architecture you chose for question (1). Monolithic? Micro-services? Any intermediate? Other? Comment on what you based to make this decision.

- I would choose to create the entire architecture in a single monolithic executable because this would provide simplicity and less complexity to start a project, reducing the work that would need to be performed by a smaller team. In addition, I would opt for an association with the serverless architecture because we could focus on the development of the main product, without having to deal with routine tasks of provisioning and managing servers, having more time to focus on the applications. This would help in meeting demand, allowing scalability without manual intervention and also in cutting operational expenses. I recognize some disadvantages of the monolithic architecture, but I believe it would be ideal for a project that would need to be validated.

3. Describe the work methodology you would use for development. It can be some known methodology (Scrum, XP, RUP), an adaptation, or a mixture between several methodologies. Whatever your experience has shown you works. Tell us why you think this form is appropriate for our problem.

- I would adopt Kanban because I believe it is an agile methodology that promotes frequent deliveries and great adaptability to changing requirements. Kanban is a great visual way to work as a team, encouraging self-management of actions by all members. In addition, it provides a clear view of the workflow and the status of each task. This helps to quickly identify bottlenecks and impediments and find wasted resources. We could track the progress of tasks from start to completion based on the distribution of cards related to different activities throughout the development process, which fits well in the context of creating a MVP. This becomes especially useful for promoting continuous improvement and allowing for rapid adaptation to changes. With this, it would be possible to quickly launch a basic product, gather feedback and iterate continuously.

4. Describe the workflow you would use to collaborate using Git. As with (3), you can use something familiar or an adaptation.

- I would use a workflow based on the creation of two basic environments: a production environment and a development/homologation. Then, from the development/homologation environment, the team would create feature branches to develop their work, where each feature branch would correspond to a task identified on the team's board. For example, developing a new feature, refactoring code, improving performance and so forth. After implementing the source code and testing the solution in the feature branch environment, when it's considered that the activity was complete, the developer would create a pull request for review. After the code review, the solution would be merged into the development/homologation environment. In the future, when all code parts of a project are complete and approved, all of them from the development/homologation environment would be merged into the production environment.

5. Do you think it is necessary to add any extra member to the team during the development of the prototype? What would your role be? Do you think it would be necessary to add new members after the prototype phase? When and why?

- I believe that having another software developer could help with the development of the prototype because we could share the implementation and testing responsibilities of the software development life cycle. After the prototype phase, when the MVP has already been validated and we can add new team members, I believe we could try to create a team with full-stack developers who could work on both backend and frontend activities, as well as on implementation and testing. To do this, the company could provide specialization opportunities such as professional training courses or something along those lines.

6. What other considerations would you have to make the development process robust and efficient?

- I believe that the development process is strongly associated with good software engineering practices applied by teams over time. In this way, I would try to enhance the deep understanding of the project requirements, identify the underlying needs and unexpressed expectations; promote effective communication and collaboration among team members; emphasize the importance of alignment and code review to ensure code quality, as well as good programming practices; include the adoption of automated tests that are essential to ensure code quality and system stability; employ constant refactoring to restructure the code, facilitating the maintenance and evolution of the system over time; adopt design patterns that can improve the quality, scalability and maintainability of the code, promoting a more solid and flexible architecture; finally, I would seek to have continuous feedback from stakeholders to ensure that the final product meets their expectations and needs.

## Coding Part

- [Introduction](#introduction)
- [How to run the Project?](#how-to-run-the-project)
- [Backend Application](#backend-application)
- [Frontend Application](#frontend-application)
- [Final Considerations](#final-considerations)

## Introduction

This project consists in a full-stack application composed by a frontend and a backend application that can be run using Docker containers.

- The frontend application is a simple interface where two addresses can be entered: source and destination. When sending this data, the application should display a message with the distance in kilometers between these two addresses.

- The backend application is a REST API developed using Node.js/TypeScript and Postgres database that provides two API endpoints: one to calculate the distance between two addresses and another to retrieve the history of distance calculations between two addresses using a paging scheme, where records are organized in descending order of creation time in the database.

## How to run the project?

All applications and database can be run using a [**Docker**](https://www.docker.com/) container with commands from a Makefile file.

#### Makefile file

A **Makefile** file was created as a single entry point containing a set of instructions to run all applications (backend and frontend) and the database using Docker containers via commands in the terminal.

To run the project with a Docker container, run the command:

```
make startup-all
```

Note:

- If you don't have the dependencies needed to run instructions from a Makefile file, just copy and paste and run the Docker command related to the instruction above to run the project.

To finish all applications and database, run the command:

```
make shutdown-all
```

## Frontend Application

After running the project, access the following URL through your web browser to view an HTML page that illustrates the frontend application:

```
http://localhost:3000
```

## Backend Application

### Database

The backend application interacts with a Postgres database and its tables are defined in SQL scripts placed in **db/sqls** directory. In what follows there is the entity relationship diagram of the database including all the tables in the path **db/docs/DB.drawio.png**.

![BainDB](db/docs/DB.drawio.png)

### API documentation

#### API endpoints

The API *endpoints* were documented using [tsoa](https://tsoa-community.github.io/docs/) that is a framework with integrated OpenAPI compiler to build Node.js serve-side applications using TypeScript, providing support for quickly building REST API routes and swagger documentation.

After running the project using Docker containers, access the following URL through your web browser to view an HTML page that illustrates the information of the API endpoints:

```
http://localhost:5000/apidocs/
```

#### Postman Collection

To support the use of the API, it was created the file which contains a group of requests that can be imported into the **Postman** tool (an API client used to facilitate the creation, sharing, testing and documentation of APIs by developers.) in the path **apps/backend/docs/bain-take-home-assignment.postman_collection.json**.

## Final Considerations

This was a great challenge and I believe I managed to develop some of the test items by applying my acquired knowledge throughout my career working as a Software engineer. Uunfortunately, I didn't have time to solve some items of the technical challenge, as follows:

- I was unable to progress with the development of the frontend application, but I have some knowledge of how I would do it. The following link directs to a frontend application developed by me a few months ago in another selection process that I would use as a reference to develop a solution for this technical challenge: [frontend](https://github.com/icaroribeiro/overview-full-stack-take-home-assignment/tree/development/frontend/app)

- I was unable to host both frontend and backend applications on a free server.

Anyway, I really hope I have met some expectations.
