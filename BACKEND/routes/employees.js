const router = require("express").Router();
let Employee = require("../models/employeeDetails");

router.route("/add").post((req, res) => {                      //http://localhost:8070/employee/add    //add employee to the system

    const nic = req.body.nic;
    const name = req.body.name;
    const gender = req.body.gender;
    const age = Number(req.body.age);
    const position = req.body.position;
    const address = req.body.address;
    const mobile = Number(req.body.mobile);
    const username = req.body.username;
    const password = req.body.password;

    const newEmployee = new Employee({

        nic,
        name,
        gender,
        age,
        position,
        address,
        mobile,
        username,
        password
    })

    newEmployee.save().then(() => {
        res.json("Employee Added")                      //if insert succeful this will be indicate
    }).catch((err) => {
        console.log(err);                               //display error message
    })

})


router.route("/display").get((req, res) => {               //http://localhost:8070/employee/display

    Employee.find().then((employees) => {
        res.json(employees)

    }).catch((err) => {
        console.log(err)
    })

})

/*router.route("/update/:nic").put(async (req, res) => {
    let userNic = req.params.nic;
    const { nic, name, gender, age, position, address, mobile, username, password } = req.body;     //get data from frontend through D structure

    const updateEmployee = {
        nic,
        name,
        gender,
        age,
        position,
        address,
        mobile,
        username,
        password
    }

    const update = await Employee.findOneAndUpdate(userNic, updateEmployee).then(() => {
        res.status(200).send({ status: "User Updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })

}) */


/********************************************** */

router.route("/update/:nic").put(async (req, res) => {
    let userNic = req.params.nic;
    const { nic, name, gender, age, position, address, mobile, username, password } = req.body;     //get data from frontend through D structure

    const updateEmployee = {
        nic,
        name,
        gender,
        age,
        position,
        address,
        mobile,
        username,
        password
    }

    const update = await Employee.findOneAndUpdate({ nic: userNic }, updateEmployee).then(() => {
        res.status(200).send({ status: "User Updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })

})

//************************************************************************ */

router.route("/delete/:nic").delete(async (req, res) => {
    let userNic = req.params.nic;

    await Employee.findOneAndDelete(userNic).then(() => {
        res.status(200).send({ status: "Employee Deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with Delete Employee", error: err.message });
    })
})




router.route("/login").post(async (req, res) => {

    const newusername = req.body.username;
    const newpassword = req.body.password;





})



/*const {username, password} = req.body;

 if (!username || !password)
     return res.status(401).json({errorMessage: "wrong user name or password"});
 
 const existingUser = await Employee.findOne({username});
 if (existingUser !== username){
     return res.status(401).json({errorMessage: "wrong user name or password"})
 }
 const checkPassword = await Employee.findOne({password});
 if (checkPassword !== password){
    return res.status(401).json({errorMessage: "wrong user name or password" })
 }

res.status(200).send({status:"Login Successful"});
//res.redirect('http://example.com'); */



router.route("/display1").get((req, res) => {               //http://localhost:8070/employee/display
    //let uname = req.params.username;
    let uname = "Ann123";
    Employee.find({ username: uname }).then((employees) => {
        res.status(200).send({ status: employees });
    }).catch((err) => {
        console.log(err)
    })

})



router.route("/display2/:username/:password").get((req, res) => {               //http://localhost:8070/employee/display
    let uname = req.params.username;
    let psw = req.params.password;

    Employee.find({ username: uname }).then((employees) => {

        //check whether any empmloyee is returned
        if (employees.length > 0) {
            //found empoloyees with given username
            let emp = employees[0];
            //check the password
            if (psw == emp.password) {
                //password match

                //check for position
                if (emp.position == "Accountant") {
                    res.status(200).send({ page: 4 });
                } else if (emp.position == "Admin") {
                    res.status(200).send({ page: 3 });
                } else if (emp.position == "Manager") {
                    res.status(200).send({ page: 1 });
                } else {
                    //no match
                    res.status(200).send({ page: -2 });
                }
            } else {
                //password don't match
                res.status(200).send({ page: -1 });
            }
            res.status(200).send(emp);
        } else {
            //no employee found for the username
            res.status(200).send({ page: -1 });
        }



        //res.status(200).send({ status: employees});

        //page codes
        //-1 - login error
        // 1 - manager
        // 2 - cashier
        // 3 - admin
        // 4 - Accountant


    }).catch((err) => {
        console.log(err)
    })

    // {
    //     "_id": "61067151374c4210b0cc161c",
    //     "nic": "199725410045",
    //     "name": "Ann",
    //     "gender": "female",
    //     "age": 24,
    //     "position": "Accountant",
    //     "address": "200/Kaduwela",
    //     "mobile": 774678824,
    //     "username": "Ann123",
    //     "password": "Ann@123",
    //     "__v": 0
    // }

})



module.exports = router;



// if (page == 1) {
//     window.location.href = "http://localhost:8070/employee/manager";
// }

