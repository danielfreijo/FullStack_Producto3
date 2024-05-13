const Project = require ("./models/project");
const Task = require ("./models/task");

module.exports = {
    Query: {

    },
    Mutation: {
        async addProject( parent, arguments) {
            const project = new Project(arguments);
            await project.save();
            return project;
        },
        async addTask( parent, arguments) {
            const task = new Task(arguments);
            await task.save();
            return task;
        },
        
    },

    Subscription: {
        TaskAdded: {
            async subscribe(parent, arguments, { pubsub}){
                return pubsub.asyncIterator("TaskAdd")
            }
        }
    },
    Project: {

    },
    Task: {

    },
}