import Market from "../models/market.model.js";

export const getMarkets = async (req, res) => {
    try {
       
        const markets = await Market.find({
            user: req.user.id
        }).populate('user')
        res.json(markets)
      
    } catch (error) {
        console.log('error: ', error);
        return res.status(404).json({message: "market not found"})
    }
}

export const getMarket = async (req, res)=> {
    try {
        const market = await Market.findById(req.params.id).populate('user')
        if(!market) return res.status(404).json({message: "Market not found"})
        res.json(market)
        
    } catch (error) {
        return res.status(404).json({message: "Market not found"})
    }
}

export const createMarket = async (req, res)=> {
    try {
        const {name } = req.body;
        const newMarket = new Market({
            name,
            user: req.user.id
        })
        
        const savedMarket = await newMarket.save();
        res.json(savedMarket) 
        
    } catch (error) {
        return res.status(500).json({message: "Error"})
    }
}

export const deleteMarket = async (req, res)=> {
    try {
        const market = await Market.findByIdAndDelete(req.params.id)
        if(!market) return res.status(404).json({message: "Market not found"})
        return res.status(204).json({message: "Market eliminado"})
        
    } catch (error) {
        return res.status(404).json({message: "Market not found"})
    }
}

export const updateMarket = async (req, res)=> {
    try {
        const market = await Market.findByIdAndUpdate(req.params.id, req.body ,{
            new: true 
        })
        if(!market) return res.status(404).json({message: "Market not found"})
        res.json(market)
        
    } catch (error) {
        return res.status(404).json({message: "Market not found"})
    }
}