"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/services/auth"

const RegisterForm = () => {
    const router = useRouter()

    const[first_name, setFirstName] = useState("")
    const[last_name, setLastName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState("")

    const handleFirstNameChange = e => setFirstName(e.target.value)
    const handleLastNameChange = e => setLastName(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)
    
    const clearInputs = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        registerUser(first_name, last_name, email, password)
        .then(res => {
            if(res.status === 201) {
                clearInputs()
                router.push('/login')
            }else{
                setError(res.message)
            }
        }).catch(e => {
            console.error(e)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={first_name} onChange={handleFirstNameChange} placeholder="First Name" />
            <input type="text" value={last_name} onChange={handleLastNameChange} placeholder="Last Name" />
            <input type="text" value={email} onChange={handleEmailChange} placeholder="Enter email" />
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter password" />
            <button type="submit">Register</button>
            <p>{error}</p>
        </form>
    )
}

export default RegisterForm