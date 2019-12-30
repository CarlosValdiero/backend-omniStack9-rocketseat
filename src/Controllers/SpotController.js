const User = require("../Models/User");
const Spot =require("../Models/Spot");

module.exports ={

    async index(req,res){
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech});

        return res.json(spots);
    },

    async store(req,res) {
        const {filename} = req.file;
        const {company,price,techs} = req.body;
        const {user_id} = req.headers;

        console.log();
        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({erro:"User does not exists"})
        }

        const spot = await Spot.create({
            user: user_id,
            company,
            thumbnail:filename,
            techs: techs.split(",").map(tech => tech.trim()),
            price,

        });

        return res.json(spot);
    }

};