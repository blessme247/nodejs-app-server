Short Notes on the app

// built in middleware to handle urlencoded data
// in other words, formdata
// "content-type: application/x-www-form-urlencoded"
// when the formdata comes in the route, this middleware is used to pull the data out as a parameter
app.use(express.urlencoded({extended: false}))


// built-in middleware for pulling out json data as a parameter 
app.use(express.json())

// using ("/") below only catches a request to the / path from the client
// using ("^/$|/index.html") catches requests to the / and /index.html paths 
// using (("^/$|/index(.html)?") catches requests to the / and index.html paths with the .html being optional
app.get("^/$|/index(.html)?", (req,res)=>{
    // res.sendFile("./views/index.html", {root: __dirname}) // another method of sending file
    res.sendFile(path.join(__dirname, "views", "index.html"))
})


// log all request methods, request headers origin, request url
app.use((req, res, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`)
    next()
})

// handle undefined routes
// app.all('*') is an inbuilt middleware that accepts regex
// which means any url in any form that is not predefined in the app
app.all("*", (req, res)=>{
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})


// difference between app.use and app.all is that app.use does not accept regex while app.all accepts it and works with all Http methods

// Steps to manually generate tokens 
1. Enter the node command in the terminal
2. require('crypto').randomBytes(64).toString('hex')