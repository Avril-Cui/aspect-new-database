import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/login/styles.module.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState({
    user_email: "",
    user_name: "",
    password: "",
  });

  const cookies = new Cookies();

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    cookies.set("userData", data, { path: "/" });
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/register",
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    })
      .then(function (response: any) {
        cookies.set("user_uid", response.data, { path: "/" });
        router.push("/dashboard");
      })
      .catch(function (error: any) {
        setIsError(true);
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.signup_container}>
        <h1 className={styles.login_text}>Sign Up in to Website</h1>
        <div className={styles.log_in}>
          <form onSubmit={handleSignUp}>
            <div className={styles.email_input}>
              <span className={styles.show_text}>User Name</span>
              <div style={{ marginTop: 10 }}>
                <input
                  onChange={(e: any) =>
                    setData({
                      ...data,
                      user_name: e.target.value,
                    })
                  }
                  className={styles.input_name}
                  value={data["user_name"]}
                  type="text"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className={styles.email_input}>
              <span className={styles.show_text}>Email</span>
              <div style={{ marginTop: 10 }}>
                <input
                  onChange={(e: any) =>
                    setData({
                      ...data,
                      user_email: e.target.value,
                    })
                  }
                  className={styles.input_name}
                  value={data["user_email"]}
                  type="email"
                  placeholder="Enter user email"
                />
              </div>
            </div>

            <div className={styles.password_input}>
              <span className={styles.show_text}>Password</span>
              <div style={{ marginTop: 10 }}>
                <input
                  onChange={(e: any) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                  className={styles.input_name}
                  value={data.password}
                  required
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            {isError ? (
              <p className={styles.wrong_text}>
                Sign-up error, likely the email already exists
              </p>
            ) : null}

            <input
              type="submit"
              className={styles.submit_button}
              value="Sign Up"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
