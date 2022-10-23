import React from "react";
import { useState } from "react";
import { Landing } from "../ChatPages";
import styles from "./chat_styles.module.css"
import MessageInput from "../MessageInput";
import { chatRooms } from "../../../../chatRoom";
import MessageList from "../MessageList";


function Fundamental() {
  const [chat, setChat] = useState("Fundamental");
  // const params = useParams();
  const chat_name = "Fundamental"


  // const room = chatRooms.find((x) => x.id == chat_name);
  // if (!room) {
  //   console.log("No room!")
  // }
  //   console.log(chat_name)

  return (
    <div>
      {/* {chat_name} */}
      {chat === "FrontPage" && (<Landing />)}
      {chat === "Fundamental" && (
        <div className={styles.messages_container}>
          <button onClick={() => setChat("FrontPage")} className={styles.back_link}>&#8612; Main Page</button>
          <div>
            <MessageList roomId={chat_name} />
            <MessageInput roomId={chat_name}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fundamental;
