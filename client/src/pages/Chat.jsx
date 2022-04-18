import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";
import { allUsersRoute } from "../utils/APIRoutes";
import {useNavigate} from 'react-router-dom';
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';

const Chat = () => {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkUser = async() => {
            if(!localStorage.getItem('App-User')) {
                navigate('/login');
                return;
            } 
            setCurrentUser(await JSON.parse(localStorage.getItem('App-User')));
            setIsLoaded(true);
        }
        checkUser();
    },[])

    // using another useEffect hook bcz useState() hook is asynchronous and doesnt update the cuurentUser immediately
    useEffect(()=>{
        if(currentUser) {
            socket.current = io(process.env.REACT_APP_API_HOST);
            socket.current.emit("add-user", currentUser._id)
        }
        const fetchAllUsers = async() => { 
            if(isLoaded) {
                // console.log("curr user", currentUser);
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                // console.log("all users data:", data);
                setContacts(data.data);
            }
        }
        fetchAllUsers();
    }, [currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }

    return(
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
                {
                    isLoaded && (currentChat === undefined ? <Welcome currentUser={currentUser}/> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
                }          
            </div>
        </Container>
    )
}

const Container = styled.div`
   height : 100vh;
   width: 100vw;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 1rem;
   background-color: #131324;
   .container {
       height: 80vh;
       width: 80vw;
       background-color: #00000076;
       display: grid;
       grid-template-columns: 25% 75%;
       @media screen and (min-width:720px) and (max-width:1080px) {
           grid-template-columns: 35% 65%;
       }
       @media screen and (min-width:360px) and (max-width:480px) {
           grid-template-columns: 100% 0%;
       }
   }
`;

export default Chat;
