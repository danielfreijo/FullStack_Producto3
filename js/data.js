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