
    var userselected="";
    
    // Defino los usuarios
    var userdata = [
        user1 = {"nombre":"Maria", "pass":"12345678", "active":1},
        user2 = {"nombre":"Carlos", "pass":"12345678", "active":1},
        user3 = {"nombre":"Esteban", "pass":"12345678", "active":1},
        user4 = {"nombre":"Daniel", "pass":"12345678", "active":1},
        user5 = {"nombre":"Jordi", "pass":"12345678", "active":1},
    ];  

    // Defino el array de los Proyectos
    var projects =[
        project1={"id":0, 
                  "name": "Project A",
                  "description":"This is a description of the Project A.",
                  "startdate":"2024-01-01",
                  "enddate":"2024-02-03",
                  "backgroundcolor":"FFFFFF",
                  "backgroundimage":"default.jpg",
                  "priority":0,
                  "status":1},
        project2={"id":1, 
                  "name": "Project C",
                  "description":"This is a description of the Project A.",
                  "startdate":"2024-03-01",
                  "enddate":"2024-05-03",
                  "backgroundcolor":"FFFFFF",
                  "backgroundimage":"default.jpg",
                  "priority":1,
                  "status":0},
        project3={"id":2, 
                  "name": "Project B",
                  "description":"This is a description of the Project B.",
                  "startdate":"2023-01-01",
                  "enddate":"2023-02-03",
                  "backgroundcolor":"FFFFFF",
                  "backgroundimage":"default.jpg",
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