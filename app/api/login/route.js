import prisma from "@/helpers/prisma"
import { NextResponse } from "next/server"
import * as bcrypt from 'bcrypt'
import { signJwtAccessToken } from "@/helpers/jwt"

export async function POST(request){
    try{
        const {email, password} = await request.json()

        if(!email || !password){
            return NextResponse.json({ message: "All fields are required", result: e }, { status: 400 })
        }

        const user = await prisma.users.findFirst({
            where:{
                email: email.toLowerCase(),
            }
        })
        if(!user){
            return NextResponse.json({ message: "Email or Password Mismatched. User NOT", result: e }, { status: 500 })
        }

        if(await bcrypt.compare(password, user.password)){
            const { password: hashedPassword, ...result } = user;
            const accessToken = signJwtAccessToken(result)
            return NextResponse.json({ result: { ...result, accessToken } }, { status: 200 })
        }else{
            return NextResponse.json({ message: "Email or Password Mismatched.", result: e }, { status: 500 })
        }

        const { password: hashedPassword, ...result } = user
        return NextResponse.json({ result }, { status: 201 })
    }
    catch (e) {
        console.error(e)
        return NextResponse.json({ message: "Error while trying to login", result: e }, { status: 500 })
    }
}