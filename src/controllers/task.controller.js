import marketModel from '../models/market.model.js'
import Task from '../models/task.model.js'

export const getTasks = async (req, res, next)=> {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user', 'market') //Devuelve toda la informacion de los usuarios. Si esto NO esta, solo regresa el id
        res.json(tasks)
        
    } catch (error) {
        next(error);
    }
}

export const getTask = async (req, res, next)=> {
    try {
        const task = await Task.findById(req.params.id).populate('user')
        if(!task) return res.status(404).json({message: "Task not found"})
        res.json(task)
        
    } catch (error) {
        next(error);
    }
}

export const createTask = async (req, res, next)=> {
    try {
        const {title, description, quantity, market } = req.body;
        const marketInfo = await marketModel.findById(market);

        if (!marketInfo) {
            return res.status(404).json({ message: "Market not found" });
        }

        const newTask = new Task({
            title, description, quantity,
            user: req.user.id,
            market: marketInfo
        })
        
        const savedTask = await newTask.save();
        res.json(savedTask) 
        
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next)=> {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).json({message: "Task not found"})
        return res.status(204).json({message: "Tarea eliminada"})
        
    } catch (error) {
        next(error);
    }
}

export const deleteTaskbyMarket = async (req, res, next)=> {
    try {
        const task = await Task.deleteMany({ 'market._id': req.params.id })
        return res.status(204).json({message: "Tareas eliminadas"})
        
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next)=> {
    try {
        const { title, description, quantity, market } = req.body;

        let marketInfo;
        if (market) {
            marketInfo = await marketModel.findById(market);

            if (!marketInfo) {
                return res.status(404).json({ message: "Market not found" });
            }
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
            title,
            description,
            quantity,
            market: marketInfo ? marketInfo : market, 
        }, {
            new: true
        });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask);
        
    } catch (error) {
       next(error);
    }
}

export const updateFinishedTask = async (req, res, next)=> {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { $set: {finished: !req.body.actualState} }, {new: true});

        if(!task) return res.status(404).json({message: "Task not found"})
        res.json(task)
        
    } catch (error) {
        next(error);
    }
}