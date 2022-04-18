import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import {Buffer} from 'buffer';

const SetAvatar = () => {
    const api = 'https://api.multiavatar.com/';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const setProfilePic = async()=> {

    };

    useEffect(() => {
        const data = [];
        const fetchAvatars = async () => {
            for(let i=0;i<1;i+=1) {
                const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
                // console.log(image)
                const buffer = new Buffer.from(image.data);
                // console.log(buffer.toString("base64"));
                data.push(buffer.toString("base64"));
            }
        }
        fetchAvatars();
        setAvatars(data);
        setIsLoading(false);
    }, [])
    

    return(
        <>
            <Container>
                <div className="title-container">
                    <h1>
                        Please select an Avatar
                    </h1>
                </div>
                <div className="avatars">
                    {

                        avatars.map((avatar, idx) => {
                            console.log('1111111111', avatar);
                            return(
                                <div key={idx} className={`avatar ${selectedAvatar === idx ? "selected": ""}`}>
                                    <img 
                                        src={`data:image/svg+xml;base64, ${avatar}`} 
                                        alt="avatar"
                                        onClick={() => setSelectedAvatar(idx)}
                                    />
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </Container>
            <Toaster/>
        </>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
    .loader {
        max-inline-size:100%;
    }
    .title-container {
        h1{
            color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
    }
`;


export default SetAvatar;
