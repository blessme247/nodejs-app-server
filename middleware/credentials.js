const whitelist = ["https://blessme.netlify.app", 'http://localhost:3500', 'http://localhost:5173']

const credentials = (req, res, next)=>{
    const origin = req.headers.origin
    if(whitelist.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials