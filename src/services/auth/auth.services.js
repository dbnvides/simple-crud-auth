import { compare } from 'bcryptjs'
import prisma from '../../config/database.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const createUserService = async (name, email, password) =>{
    const hashpassword = bcrypt.hashSync(password, 6)

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashpassword,
        }
    })

    const response = {
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    }

    return response
}


export const loginService = async(email, password) =>{
    const user = await prisma.user.findFirst({
        where:{
            email: email
        }
    })

    if(!user){
        return "Usuario não encontrado"
    }

    const validPassword = compare(password, user.password)

    if(!validPassword){
        return "Email ou senha incorreta!"
    }

    const token = jwt.sign({user}, process.env.SECRET,{
        expiresIn: 5000
    })

    return token
}
