import prisma from '../../config/database.js'
import jwt from 'jsonwebtoken';
import { promisify } from 'util'

const verifyAsync = promisify(jwt.verify)

export const ensureUserExist = async(req,res,next) =>{
    const {email} = req.body
    const user = await prisma.user.findFirst({
        where:{
            email: email
        }
    })
    if(!user){
        return res.status(400).json({message: "Usuário não encontrado!"})
    }

    return next()
}

export const ensureUserNotExist = async(req,res,next) =>{
    const {email} = req.body

    const user = await prisma.user.findFirst({
        where:{
            email: email
        }
    })

    if(user){
        return res.status(400).json({message: "Usuário já cadastrado!"})
    }

    return next()
}

export const verifyToken = async(req,res,next) =>{
    const token = req.headers['authorization']

    if(!token){
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }
   
    try {

        const parts = token.split(' ')
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ auth: false, message: 'Token malformado.' })
        }
        const actualToken = parts[1]

        const decoded = await verifyAsync(actualToken, process.env.SECRET)
        req.userId = decoded.user.id
       
        return next()
    } catch (err) {
        return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' })
    }

}

export const ensureIsAdmin = async(req,res,next) =>{

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.userId)
            },
            select: {
                role: true
            }
        })

        if (user.role.toUpperCase() !== "ADMIN") {
            return res.status(403).json({ message: 'Usuário sem permissão!' })
        }

        return next()

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar usuário', error })
    }
}
