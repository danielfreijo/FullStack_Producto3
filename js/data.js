
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
                  "startdate":"01/01/2024",
                  "enddate":"05/02/2024",
                  "backgroundcolor":"FFFFFF",
                  "backgroundimage":"default.png",
                  "status":0}
    ];
    
    // Defino el array de las Tareas
    var tasks =[
        task1= {"idtask":0, 
                "project_id":0, 
                "userassigned":"Maria", 
                "nametask":"Task1", 
                "descriptiontask":"Put the description here.", 
                "startdate":"01/01/2024", 
                "enddate":"31/01/2024", 
                "backgroundcolor":"FFFFFF",
                "status":"TODO"},
        task2= {"idtask":0, 
                "project_id":0, 
                "userassigned":"Esteban", 
                "nametask":"Task1", 
                "descriptiontask":"Put the description here.", 
                "startdate":"01/01/2024", 
                "enddate":"31/01/2024", 
                "backgroundcolor":"FFFFFF",
                "status":"INPROGRESS"},  
        task3= {"idtask":0, 
                "project_id":0, 
                "userassigned":"Carlos", 
                "nametask":"Task1", 
                "descriptiontask":"Put the description here.", 
                "startdate":"01/01/2024", 
                "enddate":"31/01/2024", 
                "backgroundcolor":"FFFFFF",
                "status":"COMPLETED"}        
    ];