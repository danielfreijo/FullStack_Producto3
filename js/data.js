   
    // Defino los usuarios
    var userdata = [
        user1 = {"nombre":"Ana López", "pass":"12345678", "active":1, 
                 "rol" : "Jefe de Proyecto de Desarrollo", 
                 "Perfil" : "Profesional, comprometida y organizada con experiencia en gestión de proyectos de desarrollo de software. Es experta en coordinar equipos y cumplir con los plazos.", 
                 "Responsabilidades" : "Planificar y supervisar el desarrollo de proyectos.<br>Coordinar con el equipo técnico para definir requisitos y funcionalidades.<br>Asignar tareas y recursos eficientemente.<br>Garantizar la calidad del software y la satisfacción del cliente.",
                 "Desafios" : "Gestionar la complejidad técnica de los proyectos.<br>Mantener comunicación fluida entre equipos.<br>Adaptarse a cambios en los requisitos del proyecto.<br>Cumplir con los plazos establecidos." },
        user2 = {"nombre":"Carlos Martínez", "pass":"12345678", "active":1,
                 "rol" : "Jefe de Proyecto de Marketing", 
                 "Perfil" : "Profesional creativo y estratégico con experiencia en el ámbito del marketing digital. Tiene habilidades analíticas y una visión clara para desarrollar estrategias efectivas.", 
                 "Responsabilidades" : "Definir estrategias de marketing para promocionar productos o servicios.<br>Coordinar campañas publicitarias en línea y fuera de línea.<br>Analizar métricas y datos para evaluar el rendimiento de las campañas.<br>Colaborar con otros departamentos para alinear iniciativas de marketing con objetivos generales.",
                 "Desafios" : "Mantenerse actualizado con las últimas tendencias en marketing digital.<br>Competir en un mercado saturado y encontrar formas innovadoras de diferenciar la marca.<br>Adaptarse a cambios en el comportamiento del consumidor.<br>Demostrar el retorno de la inversión de las actividades de marketing." },
        user3 = {"nombre":"Laura Gómez", "pass":"12345678", "active":1,
                 "rol" : "Jefe de Proyecto de Diseño", 
                 "Perfil" : "Diseñadora apasionada y detallista con experiencia en la creación de experiencias de usuario intuitivas y atractivas. Tiene una sólida comprensión de los principios de diseño.", 
                 "Responsabilidades" : "Dirigir el proceso de diseño de productos digitales.<br>Colaborar con equipos multidisciplinarios para definir estética y usabilidad.<br>Crear wireframes, prototipos y diseños finales que cumplan con necesidades del usuario y objetivos del negocio.<br>Supervisar la implementación del diseño y asegurarse de mantener la integridad visual del producto final.",
                 "Desafios" : "Equilibrar la creatividad con restricciones técnicas y comerciales del proyecto.<br>Recibir y aplicar retroalimentación de múltiples partes interesadas.<br>Mantenerse al tanto de las tendencias de diseño y mejores prácticas en la industria.<br>Adaptarse a cambios en los requisitos del proyecto y ajustar el diseño en consecuencia." },
        user4 = {"nombre":"Daniel", "pass":"12345678", "active":1, 
                 "rol" : "Desarrollador 1", 
                 "Perfil" : "Profesional, comprometido y organizado con experiencia en metodos Agile. Orientado a objetivos y resultados.", 
                 "Responsabilidades" : "Cumplir las planificaciones y entrega de productos siguiendo las especificaciones del Jefe de Propyecto de Desarollo.",
                 "Desafios" : "Capacidad para encontrar soluciones a las problemáticas que surgan." },
        user5 = {"nombre":"Jordi", "pass":"12345678", "active":1, 
                 "Perfil" : "Profesional, comprometido y organizado con experiencia en metodos Agile. Orientado a objetivos y resultados.", 
                 "Responsabilidades" : "Cumplir las planificaciones y entrega de productos siguiendo las especificaciones del Jefe de Propyecto de Desarollo.",
                 "Desafios" : "Capacidad para encontrar soluciones a las problemáticas que surgan." },
    ];  

    // Defino el array de los Proyectos
    var projects =[
        project1={"id":0, 
                  "name": "Project A",
                  "description":"This is a description of the Project A.",
                  "department":"Desarrollo",
                  "backgroundcolor":"FaF2FF",
                  "backgroundimage":"default.jpg",
                  "priority":0,
                  "status":1},
        project2={"id":1, 
                  "name": "Project C",
                  "description":"This is a description of the Project A.",
                  "department":"Marketing",
                  "backgroundcolor":"FFe3FF",
                  "backgroundimage":"default.jpg",
                  "priority":1,
                  "status":0},
        project3={"id":2, 
                  "name": "Project B",
                  "description":"This is a description of the Project B.",
                  "department":"Diseño",
                  "backgroundcolor":"FFaF3Fe",
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
                "nametask":"Task2", 
                "descriptiontask":"Put the description here.", 
                "startdate":"2024-01-01", 
                "enddate":"2024-01-15", 
                "backgroundcolor":"FFFFFF",
                "status":"ONPROGRESS"},  
        task3= {"idtask":2, 
                "project_id":0, 
                "userassigned":"Carlos", 
                "nametask":"Task3", 
                "descriptiontask":"Put the description here.", 
                "startdate":"2024-01-01", 
                "enddate":"2024-02-01", 
                "backgroundcolor":"FFFFFF",
                "status":"COMPLETED"}        
    ];

    // Creamos las variables de entorno  para acceder a los elementos del DOM

    sessionStorage.setItem('MyName', "Carlos Martínez");
    sessionStorage.setItem('MyProject', 0);
    sessionStorage.setItem('MyTask', 0);

    // 
    var tempProjects = JSON.stringify(projects);
    var tempTasks = JSON.stringify(tasks);
    var tempUsers = JSON.stringify(userdata);

    sessionStorage.setItem('projectsdb', tempProjects);
    sessionStorage.setItem('tasksdb', tempTasks);
    sessionStorage.setItem('usersdb', tempUsers);