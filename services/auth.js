import { reject } from "bcrypt/promises"
import { resolve } from "styled-jsx/css"

export const registerUser = (first_name, last_name, email, password) => {
    return new Promise((resolve, reject) => {
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({first_name, last_name, email, password}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
    }).then(res => {
        res.json()
        .then(json => resolve(json))
        .catch(e => reject(e))
    })
}