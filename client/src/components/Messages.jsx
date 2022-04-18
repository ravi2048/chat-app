import React from 'react';
import styled from "styled-components";
import Picker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

const Messages = ({messages, scrollRef}) => {
    
    return(
        <>
            <Container>
                {
                    messages.map((message) => {
                        // message = JSON.stringify(message);
                        // console.log('@@@', JSON.stringify(message));
                        return(
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`message ${message.fromSelf ? 'sent' : 'received'}`}>
                                    <div className="content">
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Container> 
        </>
    )
}

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.4rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }
  .sent {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
`;
export default Messages;