const router = require("express").Router();
let Salary = require("../models/salaryDetails");            //import the salaryDetails.js model


router.route("/add").post((req, res) => {                      //http://localhost:8070/salary/add    //add employee to the system

    
    const nic = req.body.nic;
    const position = req.body.position;
    const name = req.body.name;
    const dailywage = Number(req.body.dailywage);
    const days = Number(req.body.days);
    const leaves = Number(req.body.leaves);
    //const salary = Number(req.body.salary);
   
    
    const salary = dailywage*days;

    const newSalary = new Salary({

        nic,
        position,
        name,
        dailywage,
        days,
        leaves,
        salary
        
    })

    newSalary.save().then(() => {
        res.json("Salary Created")                      //if insert succeful this will be indicate
    }).catch((err) => {
        console.log(err);                               //display error message
    })

})


router.route("/display").get((req, res) => {               //http://localhost:8070/salary/display

    Salary.find().then((salary) => {
        res.json(salary)

    }).catch((err) => {
        console.log(err)
    })

})



router.route("/update/:nic").put(async (req, res) => {
    let userNic = req.params.nic;
    const { position, name, dailywage, days, leaves, salary } = req.body;     //get data from frontend through D structure

    const updateSalary = {
        
        position,
        name,
        dailywage,
        days,
        leaves,
        salary
    }

    const update = await Salary.findOneAndUpdate({nic: userNic}, updateSalary).then(() => {
        res.status(200).send({ status: "Salary Sheet Updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    })

})



router.route("/delete/:nic").delete(async (req, res) => {
    let userNic = req.params.nic;

    await Salary.findOneAndDelete(userNic).then(() => {
        res.status(200).send({ status: "Salary Sheet Deleted" });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with Delete Salary sheet", error: err.message });
    })
})


router.route("/get/:nic").get(async (req, res)=>{
    let userNic = req.params.nic;
    const salarySheet = await Salary.findOne({nic: userNic})
      .then((salary)=>{
        res.status(200).send({status: "Salary Sheet Fetched", salary})
      }).catch((err)=>{
            console.log(err.message);
            res.status(500).send({status: "Error with get salary sheet",error:err.message});
        
    })
})

module.exports = router;