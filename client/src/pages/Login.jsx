import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        if(localStorage.getItem('App-User')) {
            navigate('/');
        }
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()) {
            const {username, password} = formValues;
            const { data } = await axios.post(loginRoute, {
                username,
                password
            });
            // console.log(`### Response from Server after LOGIN: ${JSON.stringify(data)}`);
            if(data.status === "ERROR") {
                toast.error(data.msg);
            }

            if(data.status === "SUCCESS") {
                localStorage.setItem("App-User", JSON.stringify(data.responseObj));
                navigate("/");
            }
        }
    }


    const handleValidation = () => {
        const {username, password} = formValues;
        if(username === "") {
            toast.error(`Username and Password Required`);
            return false;
        } else if(password === "") {
            toast.error(`Username and Password Required`);
            return false;
        } else {
            return true;
        }
    }

    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    return(
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src={logo} alt="Logo"/>
                        <h1>Snappy</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)}/>
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)}/>
                    <button>Login</button>
                    <span>
                        <Link to="/register">Don't have an account? </Link>
                    </span>
                    <span>
                        <Link to="/">Proceed Without Creating Account</Link>
                    </span>
                </form>
            </FormContainer>
            <Toaster/>
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            caret-color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
            :-webkit-autofill,
            :-webkit-autofill:hover, 
            :-webkit-autofill:focus, 
            :-webkit-autofill:active{
                transition: background-color 5000s ease-in-out 0s;
                -webkit-text-fill-color: white !important;
            }
            
        }
        
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #7f56f1;
                text-decoration: none;
                /* font-weight: bold; */
            }
        }
    }
`;
export default Login;
