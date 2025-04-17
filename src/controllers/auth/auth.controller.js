import { createUserService, loginService } from "../../services/auth/auth.services.js"

export const registerController = async(req, res) =>{
    const {name, email, password} = req.body
    const user = await createUserService(name, email, password)

    return res.status(201).json(user)
}

export const loginController = async(req,res)=>{
    const {email, password} = req.body
    const login = await loginService(email, password)

    return res.status(200).json({token: login})
}

export const  allUserController = async(req,res)=>{
    
    return res.status(200).send()
}