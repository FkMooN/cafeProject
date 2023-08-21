import jwt from 'jsonwebtoken'


const generateRefreshToken = (id)=>{
    return jwt.sign({ id }, 'private',{expiresIn: "3d"});
}
export default {generateRefreshToken}