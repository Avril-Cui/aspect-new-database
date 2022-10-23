import React from "react";
import { useState } from "react";
import { Landing } from "../ChatPages";
import styles from "./chat_styles.module.css"
import MessageInput from "../MessageInput";
import { chatRooms } from "../../../../chatRoom";
import MessageList from "../MessageList";


function Main() {
  const [chat, setChat] = useState("Main");
  const chat_name = "main"

  return (
    <div>
      {chat === "FrontPage" && (<Landing />)}
      {chat === "Main" && (
        <div className={styles.messages_container}>
          <button onClick={() => setChat("FrontPage")} className={styles.back_link}>&#8612; Main Page</button>
          <div>
            <MessageList roomId={chat_name} />
            <MessageInput roomId={chat_name} className={styles.input_box}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
