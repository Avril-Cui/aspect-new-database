import React from "react";
import { useState } from "react";
import Link from "next/link";
import { chatRooms } from "../../../chatRoom";
import styles from "./landing.module.css";
import Fundamental from "./ChatRoom/fundamental";
import Technical from "./ChatRoom/technical";
import Quantatitative from "./ChatRoom/quantatitative";
import Main from "./ChatRoom/main";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

function ChatPages() {
  return (
    <div>
      <Landing />
    </div>
  );
}

export default ChatPages;

export function Landing() {
  const [chat, setChat] = useState("FrontPage");
  const cookies = new Cookies();
  const user = cookies.get("userData");
  const router = useRouter();
  const handleLogout = () => {
    cookies.remove("userData")
  };
  return (
    <>
      {chat === "FrontPage" && (
        <div>
          <h2 className={styles.heading}>
            Share Unique Opinions With Friends!
          </h2>
          <p className={styles.slogan}>Join Different Chat Groups To...</p>
          <div className={styles.functions}>
            <p>
              1️⃣ <span>Hear</span> diverse voices.
            </p>
            <p>
              2️⃣ <span>Make</span> group decisions.
            </p>
            <p>
              3️⃣ <span>Learn</span> from others.
            </p>
            <p>
              4️⃣ <span>Meet</span> new people.
            </p>
            <p>
              1️⃣ <span>Get</span> familiar with finance.
            </p>
          </div>

          <h2 className={styles.pick}>Choose a Chat Room</h2>
          <ul className={styles.chat_room_list}>
            {chatRooms.map((room) => (
              <li key={room.id}>
                {user ? (
                  <button onClick={() => setChat(room.id)} className={styles.section}>{room.title}</button>
                ) : (
                  <button>
                    <Link className={styles.section} href="/">
                      {room.title}
                    </Link>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {chat === "Fundamental" && (
        <div>
          <Fundamental />
        </div>
      )}
      {chat === "Technical" && (
        <div>
          <Technical />
        </div>
      )}
      {chat === "Quantitative" && (
        <div>
          <Quantatitative />
        </div>
      )}
      {chat === "Main" && (
        <div>
          <Main />
        </div>
      )}
    </>
  );
}
