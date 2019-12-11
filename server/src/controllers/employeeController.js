const controllers = {};

// importing model and database
const Role = require('../Models/Role');
const Employee = require('../Models/Employee');

// to migrate in case you don't have tables
// db.sync();

controllers.delete = (req, res) => {

    // id parameter for post
    const { id } = req.body;
    // delete sequelize
    Employee.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({ success: true, deleted_id: id, message: "Deleted successfully!" });
    });
};

controllers.update = async (req, res) => {
    // id parameter for get
    const { id } = req.params;

    // parameters for post
    const { name, email, phone, address, role } = req.body;

    // update data
    Employee.update({
        name: name,
        email: email,
        phone: phone,
        address: address,
        roleID: role
    },{
        where: { id: id }
    }).then((data) => {
        res.status(200).json({ success: true, data: data, message: "Updated Successfully!" });
    })
};

controllers.get = async (req, res) => {
    // id parameter for get
    const { id } = req.params;
    const data = await Employee.findAll({
        where: { id: id },
        include: [ Role ]
    })
    .then( function(data) {
        res.status(200).json({ success: true, data: data });
        // return data;
    })
    .catch(err => {
        return err;
    })
};

controllers.list = async (req, res) => {
    Employee.findAll({ 
        include: [ Role ]
    })
    .then( function(data) {
        console.log(data,"data")
        res.status(200).json({ success: true, data: data });
    })
    .catch(err => {
        return err;
    })
};

controllers.create = async (req, res) => {
    try {
        
        // DATA parameters since post
        const { name, email, phone, address, role } = req.body;
    
        console.log("*>Payload:", req.body);
    
        console.log('Role is ==>', role);
        // create
    
        var payload = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            roleID: role
        }
        console.log("*>Payload:", payload);
        
        const data = await Employee.create(payload);
    
        // return response
        res.status(200).json({ success: true, data: data, message: "Saved Successfully!" });
    } catch (error) {
        console.log("Error found:", error);
        res.status(200).json({ success: false, data: error, message: "Some error occurred!" });
        
    }
};

module.exports = controllers;