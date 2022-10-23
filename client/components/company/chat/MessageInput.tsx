import { useState } from "react";
import styles from "./MessageInput.module.css";
import Cookies from "universal-cookie";
import axios from "axios";

function MessageInput({ roomId }: any) {
  const cookies = new Cookies();
  const user = cookies.get("userData");
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let data = {
      "section": roomId,
      "name": user.user_name,
      "text": value
    }
    let config = {
      method: 'post',
      url: 'http://localhost:5000/send-message',
      headers: { 
        'Content-Type': 'text/plain'
      },
      data : JSON.stringify(data)
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    setValue("");
  };

  return (
    <div className={styles.input_box}>
      <form onSubmit={handleSubmit} className={styles.message_input_container}>
        <input
          type="text"
          placeholder="Enter a message"
          value={value}
          onChange={handleChange}
          className={styles.message_input}
          required
          minLength={1}
        />
        <button
          type="submit"
          disabled={value.length < 1}
          className={styles.send_message}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
