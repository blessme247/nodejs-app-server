const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data) {this.users = data}
}

const fsPromises = require("fs").promises
const path = require("path")
const bcrypt = require("bcrypt") // for password hashing

const handleNewUser = async (req, res)=>{
    const {user,pwd} = req.body;
    if (!user || !pwd){
        return res.status(400).json({"message": "Username and password are required"})
        // 400 represents bad request
    }
    // Check for duplicate usernames in the DB
    const duplicate = usersDB.users.find((person)=>person.username === user)
    if (duplicate) return res.sendStatus(409) //conflict
    try {
        // encypt the password
        // hashes the pwd and adds a salt rounds of 10, the salt rounds controls how much time is needed to calculate a single hash, 
        // the more number of times the hashing is done, 
        const hashedPwd = await bcrypt.hash(pwd, 10)  
        // store the new user
        const newUser = {"username": user, "password": hashedPwd}
        usersDB.setUsers([...usersDB.users, newUser])
        // update the users json file with new user
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users)
        res.status(201).json({"success": `New user ${user} created`}) // 201 successful record creation
        
    } catch (error) {
        res.status(500).json({"message": error.message})
    }
}

module.exports = {handleNewUser}