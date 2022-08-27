// login_save_get, login_user, login_single
const LoginResto = require("../model/restoModel"); 

const login_save = (req, res) => {
    const login = new LoginResto({
        name: "Kevin Derek Panis", 
        email: "megabyte@yahoo.com", 
        password: "555555"
    });   

    login.save() 
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
}

const login_user = (req, res) => {
    LoginResto.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

const login_single = (req, res) => {
    LoginResto.findById('6307efc866006a07b55dcb3a')
    .then((result) => res.send(`
                            <h1>Name: ${result.name}</h1>
                            <h2>email: ${result.email}</h2>
                            <p>password: ${result.password}</p>`))
    .catch((err) => console.log(err))
}

module.exports = {
    login_save,
    login_user,
    login_single
}