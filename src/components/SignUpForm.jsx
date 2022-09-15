import React, { useState } from 'react'
import { Box, Button, TextField } from '@material-ui/core'
import axios from 'axios';
var bcrypt = require('bcryptjs');

const SignUpForm = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleSubmit = async()=>{

        if(password!==confirmPassword){
            window.alert("Passwords do not match");
            return;
        }
        const {data} = await axios.get(`http://localhost:8000/user?email=${email}`);
        if(data.length!==0){
            window.alert("user already exists");
            return;
        }

        var hashedPassword = bcrypt.hashSync(password, 10);
        
        const response = await axios.post('http://localhost:8000/user',
        {
            "id" : Date.now(),
            "email" : email,
            "hashedPassword" : hashedPassword
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        
        );
        if(response){
            window.alert("signup successfull");
        }
        console.log(response);


    }


  return (
    <Box p={3}
    style={{
        padding:10,
        display:"flex",
        flexDirection:"column",
        gap: "20px"
    }}>

        <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        onChange={(e)=>setEmail(e.target.value)}
        >

        </TextField>

        <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        onChange={(e)=> setPassword(e.target.value)}>

        </TextField>
        <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        onChange={(e)=> setConfirmPassword(e.target.value)}>

        </TextField>
        
        <Button
        variant="contained"
        size="large"
        style={{backgroundColor:"red"}}
        onClick={handleSubmit}>
            Sign Up
        </Button>


    </Box>
  )
}

export default SignUpForm