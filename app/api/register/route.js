import prisma from "@/helpers/prisma"
import { NextResponse } from "next/server"
import * as bcrypt from 'bcrypt'

export async function POST(request){
    try{
        const {first_name, last_name, email, password} = await request.json()

        if(!first_name || !last_name || !email || !password){
            return NextResponse.json({ message: "All fields are required", result: e }, { status: 400 })
        }

        const user = await prisma.users.create({
            data:{
                first_name: first_name,
                last_name: last_name,
                email: email.toLowerCase(),
                password: await bcrypt.hash(password, 10)
            }
        })

        const { password: hashedPassword, ...result } = user
        return NextResponse.json({ result }, { status: 201 })
    }
    catch (e) {
        console.error(e)
        return NextResponse.json({ message: "Error while trying to register", result: e }, { status: 500 })
    }
}