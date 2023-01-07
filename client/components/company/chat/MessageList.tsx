import React from "react";
import styles from "./MessageList.module.css";
import { useRef, useLayoutEffect } from "react";
import { userInfo } from "os";
import Cookies from "universal-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

function MessageList({ roomId }: any) {
  const containerRef = useRef(null);
  const cookies = new Cookies();
  const user = cookies.get("userData");
  const [messages, setMessages] = useState([
    {
      name: "Daniel",
      text: "Wakron is a very good stock, I think it will go up ⬆️.",
      timestamp: 1665433832.401077,
      uid: "7777dd4a-7039-455f-bfa2-56dec9cace59",
    },
    {
      name: "Avril.C",
      text: "No 😬😬😬, I think it is too risky. I heard its CEO just got into troubles.",
      timestamp: 1665433832.401077,
      uid: "7777dd4a-7039-455f-bfa2-56dec9cace50",
    },
    {
      name: "Friday",
      text: "Lets see what will happen during the IPO then 🔥.",
      timestamp: 1665433832.401077,
      uid: "7777dd4a-7039-455f-bfa2-56dec9cace50",
    }
  ]);

  useEffect(() => {
    let data = JSON.stringify(roomId);
    var config = {
      method: "post",
      url: "http://localhost:5000/get-message",
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setMessages(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [roomId]);

  if (user == null) {
    const user = {
      user_name: "",
      password: ""
    };
  }

  return (
    <div className={styles.show_bottom}>
      <div className={styles.message_list_container} ref={containerRef}>
        <ul className={styles.message_list}>
          {messages.map((x) => (
            <Message
              key={x.uid}
              message={x}
              isOwnMessage={x.name === user.user_name}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function Message({ message, isOwnMessage }: any) {
  const { name, text, timestamp, uid } = message;
  const cookies = new Cookies();
  const user = cookies.get("userData");

  return (
    <div>
      {isOwnMessage ? (
        <li className={styles.own_message}>
          <h4 className={styles.sender}>You</h4>
          <div className={styles.self_message_content}>
            <div>{text}</div>
          </div>
        </li>
      ) : (
        <li>
          <h4 className={styles.sender_email}>
            <i>{name}</i>
          </h4>
          <div className={styles.message}>{text}</div>
        </li>
      )}
    </div>
  );
}

export default MessageList;
