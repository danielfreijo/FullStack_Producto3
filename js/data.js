var userselected="0";
var projectselected="0";
var taskselected="0";

// Defino el array de los Proyectos
var projects =[
    project1={"id":0, 
              "name": "Project A",
              "description":"This is a description of the Project A.",
              "department":"Desarrollo",
              "startdate":"2024-01-01",
              "enddate":"2024-02-03",
              "backgroundcolor":"FFFFFF",
              "backgroundimage":"../assets/cafe.jpg",
              "priority":0,
              "status":1,
              "tasks": [
                {
                    "task_id": 0,
                    "task_name": "Task 1 for Project A",
                    "task_description": "Description of Task 1 for Project A",
                    "task_due_date": "2024-01-15",
                    "task_status": "In Progress"
                },
                {
                    "task_id": 1,
                    "task_name": "Task 2 for Project A",
                    "task_description": "Description of Task 2 for Project A",
                    "task_due_date": "2024-01-30",
                    "task_status": "Pending"
                }
               
            ]
        },

    project2={"id":1, 
              "name": "Project B",
              "description":"This is a description of the Project A.",
              "department":"Marketing",
              "startdate":"2024-03-01",
              "enddate":"2024-05-03",
              "backgroundcolor":"FFFFFF",
              "backgroundimage":"../assets/logoLuis.jpg",
              "priority":1,
              "status":0},
    project3={"id":2, 
              "name": "Project C",
              "description":"This is a description of the Project B.",
              "department":"Diseño",
              "startdate":"2023-01-01",
              "enddate":"2023-02-03",
              "backgroundcolor":"FFFFFF",
              "backgroundimage":"../assets/covid.jpg",
              "priority":0,
              "status":1},
    project4={"id":2, 
              "name": "Project D",
              "description":"This is a description of the Project B.",
              "department":"Diseño",
              "startdate":"2023-01-01",
              "enddate":"2023-02-03",
              "backgroundcolor":"FFFFFF",
              "backgroundimage":"../assets/sushi.jpg",
              "priority":0,
              "status":1},
    project5={"id":2, 
              "name": "Project F",
              "description":"This is a description of the Project B.",
              "department":"Diseño",
              "startdate":"2023-01-01",
              "enddate":"2023-02-03",
              "backgroundcolor":"FFFFFF",
              "backgroundimage":"../assets/trabajoequipo.jpg",
              "priority":0,
              "status":1},   
        
        project6={"id":2, 
              "name": "Project F",
              "description":"This is a description of the Project B.",
              "department":"Diseño",
              "startdate":"2023-01-01",
              "enddate":"2023-02-03",
              "backgroundcolor":"FFFFFF",
              "backgroundimage":"../assets/dispositivo.jpg",
              "priority":0,
              "status":1}             
              
    
];

// Defino el array de las Tareas
var tasks =[
    task1= {"idtask":0, 
            "project_id":0, 
            "userassigned":"Maria", 
            "nametask":"Task1", 
            "descriptiontask":"Put the description here.", 
            "startdate":"2024-01-01", 
            "enddate":"2024-01-31", 
            "backgroundcolor":"FFFFFF",
            "status":"TODO"},
    task2= {"idtask":1, 
            "project_id":0, 
            "userassigned":"Esteban", 
            "nametask":"Task1", 
            "descriptiontask":"Put the description here.", 
            "startdate":"2024-01-01", 
            "enddate":"2024-01-15", 
            "backgroundcolor":"FFFFFF",
            "status":"INPROGRESS"},  
    task3= {"idtask":2, 
            "project_id":0, 
            "userassigned":"Carlos", 
            "nametask":"Task1", 
            "descriptiontask":"Put the description here.", 
            "startdate":"2024-01-01", 
            "enddate":"2024-02-01", 
            "backgroundcolor":"FFFFFF",
            "status":"COMPLETED"}        
];
if (!sessionStorage.getItem('projectsdb') || !sessionStorage.getItem('usersdb')) {

        // Defino los usuarios
        var userdata = [
        user1 = {"nombre":"Maria", "pass":"12345678", "active":1},
        user2 = {"nombre":"Carlos", "pass":"12345678", "active":1},
        user3 = {"nombre":"Esteban", "pass":"12345678", "active":1},
        user4 = {"nombre":"Daniel", "pass":"12345678", "active":1},
        user5 = {"nombre":"Jordi", "pass":"12345678", "active":1},
        ];  

        // Defino el array de los Proyectos
        var projectsModel = [
            {       
                "id":0, 
                "name": "Desarrollo web Cafeteria el barrio",
                "description":"This is a description of the Project A.",
                "department":"Desarrollo",
                "backgroundcolor":"#f8e800",
                "backgroundimage":null,
                "backgroundcolorcard":"#ffffff",
                "backgroundcard": "cafeteria.jpg",
                "priority":0,
                "status":1,
                "dateAccess": new Date("2023-12-11T16:32:00"),
                "tasks": [
                    {
                        "id": 0,
                        "title": "Tarea 1",
                        "description": "Description of Task 1",
                        "responsible": ["Maria", "Jordi"],
                        "enddate": "2024-04-15",
                        "notes": "Some notes about Task 1",
                        "status": "POR HACER"
                    },
                    {
                        "id": 1,
                        "title": "Tarea 2",
                        "description": "Description of Task 2",
                        "responsible": ["Carlos", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "EN PROGRESO"
                    },
                    {
                        "id": 2,
                        "title": "Tarea 3",
                        "description": "Description of Task 2",
                        "responsible": ["Daniel", "Esteban"],
                        "enddate": "2024-04-28",
                        "notes": "Some notes about Task 2",
                        "status": "FINALIZADO"
                    },
                    {
                        "id": 3,
                        "title": "Tarea 4",
                        "description": "Description of Task 1",
                        "responsible": ["Maria", "Jordi"],
                        "enddate": "2024-04-15",
                        "notes": "Some notes about Task 1",
                        "status": "POR HACER"
                    },
                    {
                        "id": 4,
                        "title": "Tarea 5",
                        "description": "Description of Task 2",
                        "responsible": ["Carlos", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "POR HACER"
                    },
                    {
                        "id": 5,
                        "title": "Tarea 6",
                        "description": "Description of Task 2",
                        "responsible": ["Daniel", "Esteban"],
                        "enddate": "2024-04-28",
                        "notes": "Some notes about Task 2",
                        "status": "FINALIZADO"
                    },
                ]
                
            },

            {
                "id":1, 
                "name": "Desarrollo web Restaurante Japonés",
                "description":"This is a description of the Project B.",
                "department":"Desarrollo",
                "backgroundcolor":"#f2df38",
                "backgroundimage":null,
                "backgroundcolorcard":"#ffffff",
                "backgroundcard": "sushi.jpg",
                "priority":0,
                "status":1,
                "dateAccess": new Date("2024-02-11T16:32:00"),
                "tasks": [
                    {
                        "id": 0,
                        "title": "Tarea 1",
                        "description": "Description of Task 1",
                        "responsible": ["Maria", "Jordi"],
                        "enddate": "2024-04-15",
                        "notes": "Some notes about Task 1",
                        "status": "POR HACER"
                    },
                    {
                        "id": 1,
                        "title": "Tarea 2",
                        "description": "Description of Task 2",
                        "responsible": ["Carlos", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "EN PROGRESO"
                    },
                    {
                        "id": 2,
                        "title": "Tarea 3",
                        "description": "Description of Task 2",
                        "responsible": ["Daniel", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "FINALIZADO"
                    },
                ]
            },

            {       
                "id":2, 
                "name": "Estrategia de marca Micas's",
                "description":"This is a description of the Project A.",
                "department":"Diseño",
                "backgroundcolor":"#909D30",
                "backgroundimage":null,
                "backgroundcolorcard":"#ffffff",
                "backgroundcard": "diseño1.jpg",
                "priority":1,
                "status":1,
                "dateAccess": new Date("2024-02-21T16:32:00"),
                "tasks": [
                    {
                        "id": 0,
                        "title": "Tarea 1",
                        "description": "Description of Task 1",
                        "responsible": ["Maria", "Jordi"],
                        "enddate": "2024-04-15",
                        "notes": "Some notes about Task 1",
                        "status": "POR HACER"
                    },
                    {
                        "id": 1,
                        "title": "Tarea 2",
                        "description": "Description of Task 2",
                        "responsible": ["Carlos", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "EN PROGRESO"
                    },
                    {
                        "id": 2,
                        "title": "Tarea 3",
                        "description": "Description of Task 2",
                        "responsible": ["Daniel", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "FINALIZADO"
                    },
                ]
            },

            {
                "id":3, 
                "name": "Logotipo E-commerce Luís",
                "description":"This is a description of the Project B.",
                "department":"Diseño",
                "backgroundcolor":"#1256f2",
                "backgroundimage":null,
                "backgroundcolorcard":"#ffffff",
                "backgroundcard": "diseño2.jpg",
                "priority":0,
                "status":1,
                "dateAccess": new Date("2023-12-19T09:10:00"),
                "tasks": [
                    {
                        "id": 0,
                        "title": "Tarea 1",
                        "description": "Description of Task 1",
                        "responsible": ["Maria", "Jordi"],
                        "enddate": "2024-04-15",
                        "notes": "Some notes about Task 1",
                        "status": "POR HACER"
                    },
                    {
                        "id": 1,
                        "title": "Tarea 2",
                        "description": "Description of Task 2",
                        "responsible": ["Carlos", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "EN PROGRESO"
                    },
                    {
                        "id": 2,
                        "title": "Tarea 3",
                        "description": "Description of Task 2",
                        "responsible": ["Daniel", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "FINALIZADO"
                    },
                ]
            },

            {       
                "id":4, 
                "name": "Campaña de impacto Gripo SA",
                "description":"This is a description of the Project A.",
                "department":"Marketing",
                "backgroundcolor":"#909D30",
                "backgroundimage":null,
                "backgroundcolorcard":"#ffffff",
                "backgroundcard": "marketing1.jpg",
                "priority":1,
                "status":1,
                "dateAccess": new Date("2023-12-28T11:52:00"),
                "tasks": [
                    {
                        "id": 0,
                        "title": "Tarea 1",
                        "description": "Description of Task 1",
                        "responsible": ["Maria", "Jordi"],
                        "enddate": "2024-04-15",
                        "notes": "Some notes about Task 1",
                        "status": "POR HACER"
                    },
                    {
                        "id": 1,
                        "title": "Tarea 2",
                        "description": "Description of Task 2",
                        "responsible": ["Carlos", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "EN PROGRESO"
                    },
                    {
                        "id": 2,
                        "title": "Tarea 3",
                        "description": "Description of Task 2",
                        "responsible": ["Daniel", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "FINALIZADO"
                    },
                ]
            },

            {       
                "id":5, 
                "name": "Branding Pasteleria Pepita",
                "description":"This is a description of the Project A.",
                "department":"Diseño",
                "backgroundcolor":"#1DC53F",
                "backgroundimage":null,
                "backgroundcolorcard":"#ffffff",
                "backgroundcard": "pasteleria.jpg",
                "priority":1,
                "status":1,
                "dateAccess": new Date("2024-01-08T12:32:00"),
                "tasks": [
                    {
                        "id": 0,
                        "title": "Tarea 1",
                        "description": "Description of Task 1",
                        "responsible": ["Maria", "Jordi"],
                        "enddate": "2024-04-15",
                        "notes": "Some notes about Task 1",
                        "status": "POR HACER"
                    },
                    {
                        "id": 1,
                        "title": "Tarea 2",
                        "description": "Description of Task 2",
                        "responsible": ["Carlos", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "EN PROGRESO"
                    },
                    {
                        "id": 2,
                        "title": "Tarea 3",
                        "description": "Description of Task 2",
                        "responsible": ["Daniel", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "FINALIZADO"
                    },
                ]
            },

            {       
                "id":6, 
                "name": "Desarrollo aplicación móvil",
                "description":"This is a description of the Project A.",
                "department":"Desarrollo",
                "backgroundcolor":"#ffffff",
                "backgroundimage":"animal1.jpg",
                "backgroundcolorcard":"#ffffff",
                "backgroundcard": "desarrollo1.jpg",
                "priority":1,
                "status":1,
                "dateAccess": new Date("2024-03-11T16:32:00"),
                "tasks": [
                    {
                        "id": 0,
                        "title": "Tarea 1",
                        "description": "Description of Task 1",
                        "responsible": ["Maria", "Jordi"],
                        "enddate": "2024-04-15",
                        "notes": "Some notes about Task 1",
                        "status": "POR HACER"
                    },
                    {
                        "id": 1,
                        "title": "Tarea 2",
                        "description": "Description of Task 2",
                        "responsible": ["Carlos", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "EN PROGRESO"
                    },
                    {
                        "id": 2,
                        "title": "Tarea 3",
                        "description": "Description of Task 2",
                        "responsible": ["Daniel", "Esteban"],
                        "enddate": "2024-04-20",
                        "notes": "Some notes about Task 2",
                        "status": "FINALIZADO"
                    },
                ]
            },

        ];

        // Almacenamiento de datos en el almacenamiento de sesión del navegador
        console.log("Guardando datos en el almacenamiento de sesión del navegador: ", tempProjects);

        // Convertir Array de objetos a cadenas JSON
        var tempProjects = JSON.stringify(projectsModel);
        var tempUsers = JSON.stringify(userdata);

        console.log("Proyectos en JSON: ", tempProjects);

        // Almacenar cadenas JSON en el almacenamiento de sesión
        sessionStorage.setItem('projectsdb', tempProjects);
        sessionStorage.setItem('usersdb', tempUsers);

        console.log("Datos guardados en el almacenamiento de sesión del navegador: ", sessionStorage);
}

