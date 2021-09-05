const router = require("express").Router();
let Admin = require("../models/adminDetails");            //import the adminDetails.js model


router.route("/add").post((req, res) => {                      //http://localhost:8070/admin/add    //add employee to the system

    const nic = req.body.nic;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;


    
    const newAdmin = new Admin({

        nic,
        name,
        username,
        password
    })

    newAdmin.save().then(() => {
        res.json("Admin Added")                      //if insert succeful this will be indicate
    }).catch((err) => {
        console.log(err);                               //display error message
    })

})

router.route("/login/:username/:password").get((req, res) => {               //http://localhost:8070/admin/login
    let uname = req.params.username;
    let psw = req.params.password;

    Admin.find({ username: uname }).then((admin) => {

        //check whether any empmloyee is returned
        if (admin.length > 0) {
            //found admin with given username
            let adm = admin[0];
            //check the password
            if (psw == adm.password) {
                //password match

                    res.status(200).send({ status: "login succesful"  });
               
            } else {
                //password don't match
                res.status(200).send({ page: "password wrong" });
            }
             
        } else {
            //no employee found for the username
            res.status(200).send({ page: "User name didnot find" });
        }



    }).catch((err) => {
        console.log(err)
    })

  
})







module.exports = router;