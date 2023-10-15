"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Login from "@/app/login/page"

const LoginForm = () => {
    const router = useRouter()

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState("")

    const handleEmailChange = e => setEmail(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)
    
    const clearInputs = () => {
        setEmail("")
        setPassword("")
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        signIn("credentials", {
            email,
            password,
            redirect: false
        }).then(res => {
            if(res.error){
                setError(JSON.parse(ers.error).message)
            }else{
                clearInputs()
                router.push("/dashboard")
            }

        }).catch(e => console.error(e))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={email} onChange={handleEmailChange} placeholder="Enter email" />
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter password" />
            <button type="submit">Log in</button>
            <p>{error}</p>
        </form>
    )
}

export default LoginForm