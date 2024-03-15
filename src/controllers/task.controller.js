import Task from '../models/task.model.js'

export const getTasks = async (req, res)=> {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user') //Devuelve toda la informacion de los usuarios. Si esto NO esta, solo regresa el id
    res.json(tasks)
}

export const getTask = async (req, res)=> {
    const task = await Task.findById(req.params.id).populate('user')
    if(!task) return res.status(404).json({message: "Task not found"})
    res.json(task)
}

export const createTask = async (req, res)=> {
    const {title, description, date } = req.body;
    const newTask = new Task({
        title, description, date,
        user: req.user.id
    })
    
    const savedTask = await newTask.save();
    res.json(savedTask) 
}

export const deleteTask = async (req, res)=> {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: "Task not found"})
    return res.status(204).json({message: "Tarea eliminada"})
}

export const updateTask = async (req, res)=> {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body ,{
        new: true //es para que devuelva el dato nuevo 
    })
    if(!task) return res.status(404).json({message: "Task not found"})
    res.json(task)
}