import React from "react";
import { useState } from "react";
import { Landing } from "../ChatPages";
import styles from "./chat_styles.module.css"
import MessageInput from "../MessageInput";
import { chatRooms } from "../../../../chatRoom";
import MessageList from "../MessageList";


function Technical() {
  const [chat, setChat] = useState("Technical");
  // const params = useParams();
  const chat_name = "Technical"


  // const room = chatRooms.find((x) => x.id == chat_name);
  // if (!room) {
  //   console.log("No room!")
  // }
  //   console.log(chat_name)

  return (
    <div>
      {/* {chat_name} */}
      {chat === "FrontPage" && (<Landing />)}
      {chat === "Technical" && (
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

export default Technical;
