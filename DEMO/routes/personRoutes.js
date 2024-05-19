const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

//POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the req body conatins person data
    //Directly pass data to avoid this
    const newPerson = new Person(data);

    //save newPerson
    const response = await newPerson.save();
    console.log("Data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log("Payload: ", payload);
    const token = generateToken(JSON.stringify(payload));
    console.log("Token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }

  /*
    //Create new person doc using mongoose model
    // const newPerson = new Person();
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.work = data.work;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;

    const data = req.body; //Assuming the req body conatins person data
        //Directly pass data to avoid this
        const newPerson = new Person(data);

        //save newPerson 
        newPerson.save((error, savedPerson) => {
            if(error) {
                console.log('Error in saving data', error);
                res.status(500).json({error: 'Internal Server Error'});
            }else {
                console.log('Data saved successfully');
                res.status(200).json(savedPerson);
            }
        })
    })
    */
});

//GET Route
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    //validation
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedData, {
      new: true, //returns updated doc
      runValidators: true, //run mongoose validation
    });

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("Data deleted");
    res.status(200).json({ message: "person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
