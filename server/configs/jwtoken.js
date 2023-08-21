import jwt from 'jsonwebtoken'


const generateToken = (id)=>{
    return jwt.sign({ id }, 'private',{expiresIn: "1d"});
}
export default {generateToken}