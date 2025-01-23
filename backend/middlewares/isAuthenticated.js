import jwt from 'jsonwebtoken'

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                messsage:"User not authenticated",
                success:false,
            })
        }
        const decode = await jwt.verify(token , process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                messsage:"Invalid token",
                success:false
            })
        }
        req.id = decode.userID //If the token is valid, it extracts the userID from the decoded token payload and assigns it to req.id.
        next()
    } catch (error) {
        res.send(error)
    }
}

export default isAuthenticated