import { Button, Snackbar, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { REST_URL } from "../constants";
import AddressList from "./Addresslist";


export default function Login() {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({username : '', password : ''})
    
    const changeHandler = e => {
        setUser({...user, [e.target.name]:e.target.value})
    }
    
    const [auth, setAuth] = useState(false)

    const login = () => {
        fetch(REST_URL + 'login' , {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        })
        .then(response => {
            const jwtToken = response.headers.get('Authorization')
            if(jwtToken!==null){
                sessionStorage.setItem('jwt',jwtToken)
                setAuth(true)
            }else{
                setOpen(true)
            }
        })
        .catch(err => { 
            console.error(err)
            setOpen(true)
        })
    }

    if(auth){
        return <AddressList/>
    }else{
        return(
            <div>
                <Stack spacing={2} alignItems='center' mt={2}>
                <TextField label='아이디' name = "username" onChange={changeHandler}/>
                <TextField label='비밀번호' name = "password" type="password" onChange={changeHandler}/>
                <Button color='primary' variant="outlined" onClick={login}>Login</Button>
                </Stack>
                <Snackbar open={open}
                    autoHideDuration={3000}
                    onClose={()=>setOpen(false)}
                    message='로그인 실패 아이디나 비밀번호가 잘못되었습니다.'
                />
            </div>
        )
    }
}