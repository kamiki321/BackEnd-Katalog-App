const { User } = require('../models')

const getUsersById = (req, res) => {
    try{
        const { id } = req.params
        const data = await User.findByPk(id)
        if (data === undefined){
            return res.status(404).json({
                status:'failed',
                message: `data user with id ${id} not found`,
            })
        }
        res.json({
            status: 'ok',
            data: data
        })
    } catch(error) {
        console.log(error, "<< error get user by id");
    }
}