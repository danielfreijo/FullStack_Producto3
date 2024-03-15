var userselected="0";
var projectselected="0";
   
    
// Defino los usuarios
var userdata = [
user1 = {"nombre":"Maria", "pass":"12345678", "active":1},
user2 = {"nombre":"Carlos", "pass":"12345678", "active":1},
user3 = {"nombre":"Esteban", "pass":"12345678", "active":1},
user4 = {"nombre":"Daniel", "pass":"12345678", "active":1},
user5 = {"nombre":"Jordi", "pass":"12345678", "active":1},
];  

// Defino el array de los Proyectos
var projects = [
        {       
                "id":0, 
                "name": "Project A",
                "description":"This is a description of the Project A.",
                "department":"Desarrollo",
                "backgroundcolor":"f8e800",
                "backgroundimage":"default.jpg",
                "priority":0,
                "status":1
        },

        {
                "id":1, 
                "name": "Project B",
                "description":"This is a description of the Project B.",
                "department":"Diseño",
                "backgroundcolor":"1256f2",
                "backgroundimage":"default.jpg",
                "priority":0,
                "status":1
        },

        {       
                "id":2, 
                "name": "Project C",
                "description":"This is a description of the Project A.",
                "department":"Marketing",
                "backgroundcolor":"909D30",
                "backgroundimage":"default.jpg",
                "priority":1,
                "status":0
        },

        {       
                "id":3, 
                "name": "Project D",
                "description":"This is a description of the Project A.",
                "department":"Desarrollo",
                "backgroundcolor":"1DC53F",
                "backgroundimage":"default.jpg",
                "priority":1,
                "status":1
        },

        {       
                "id":4, 
                "name": "Project E",
                "description":"This is a description of the Project A.",
                "department":"Desarrollo",
                "backgroundcolor":"AC0FA2",
                "backgroundimage":"default.jpg",
                "priority":0,
                "status":1
        },

        {       
                "id":5, 
                "name": "Project F",
                "description":"This is a description of the Project A.",
                "department":"Desarrollo",
                "backgroundcolor":"967B94",
                "backgroundimage":"default.jpg",
                "priority":0,
                "status":1
        },

        {       
                "id":6, 
                "name": "Project H",
                "description":"This is a description of the Project A.",
                "department":"Diseño",
                "backgroundcolor":"F1C0A9",
                "backgroundimage":"default.jpg",
                "priority":1,
                "status":1
        },

        {       
                "id":7, 
                "name": "Project I",
                "description":"This is a description of the Project A.",
                "department":"Diseño",
                "backgroundcolor":"FFFFFF",
                "backgroundimage":"default.jpg",
                "priority":1,
                "status":1
        },
        {       
                "id":8, 
                "name": "Project J",
                "description":"This is a description of the Project A.",
                "department":"Diseño",
                "backgroundcolor":"000000",
                "backgroundimage":"default.jpg",
                "priority":0,
                "status":1
        },
];

