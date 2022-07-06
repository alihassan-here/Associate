import express, { response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import path from 'path'
dotenv.config();

import JWT from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("DB Connected");
});

//user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const User = new mongoose.model("User", userSchema)
// Associate Schems

const associateSchema = new mongoose.Schema({
    name: String,
    email: String,
    landline: Number,
    mobile: Number,
    country: String,
    account: String,
    address: String
})
const Associate = new mongoose.model("Associate", associateSchema)

app.get("/test", (req, res) => {
    res.send("HELLO THERE");
})
//Routes
//login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        console.log("user =========== ", user, " error ======== ", err);
        if (user) {
            if (password == user.password) {

                JWT.sign({ user }, process.env.JWT_SECRET, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        res.send({ status: false, message: "Something went wrong, please try after sometime" })
                    }
                    res.send({ status: true, message: "Login sucessful", user: user, auth: token });

                });



            } else {
                res.send({ message: "password did'nt match" })
            }
        } else {
            res.send({ message: "user not registered" })
        }
    })
})
//Register
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "user already exist" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save((err) => {
                if (err) {
                    res.send(err)
                } else {
                    JWT.sign({ user }, process.env.JWT_SECRET, { expiresIn: "2h" }, (err, token) => {
                        if (err) {
                            res.send({ status: false, message: "Something went wrong, please try after sometime" })
                        }
                        res.send({ status: true, message: "Login sucessful", user: user, auth: token });

                    });

                    // res.send({ message: "Succefully register,please login now" })
                }
            })
        }
    })

})
///Add Associate
app.post("/add", verifyToken, (req, res) => {
    const { name, email, landline, mobile, country, account, address } = req.body;
    console.log(req.body)
    Associate.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "user already exist" })
        } else {
            const agnt = new Associate({
                name,
                email,
                landline,
                mobile,
                country,
                account,
                address
            })
            agnt.save((err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Associate Added Sucecfuly" })
                }
            })
        }
    })

})

//get associate
app.get("/getdata", verifyToken, async (req, res) => {
    try {
        const associates = await Associate.find();
        res.status(201).send(associates)
        console.log(associates)
    } catch (error) {
        res.status(422).json(error)
    }
})
//get individual Associate
app.get("/getuser/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const individualUser = await Associate.findById({ _id: id });
        console.log(individualUser);
        res.status(201).json(individualUser)
    } catch (error) {
        res.status(422).json(error)
    }
});
//Update  Associate
app.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateuser = await Associate.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(201).json(updateuser)

    } catch (error) {
        res.status(422).json(error)
    }
})

// delete user
app.delete("/deleteuser/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteuser = await Associate.findByIdAndDelete({ _id: id });
        res.status(201).json(deleteuser)

    } catch (error) {
        res.status(422).json(error)
    }
})

//DEPLOYMENT
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }
    );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})



function verifyToken(req, res, next) {
    console.warn(req.headers['authorization']);
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        console.warn(process.env.JWT_SECRET);
        JWT.verify(token, process.env.JWT_SECRET, (err, valid) => {
            if (err) {
                res.status(403).send({ status: false, message: "Token expired, please login" });
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({ status: false, message: "Token expired, please login" });
    }

}