import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/login/styles.module.css";
import axios from "axios";
import Cookies from 'universal-cookie';
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const [data, setData] = useState({
    user_name: "",
    password: "",
  });

  const cookies = new Cookies();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    cookies.set('userData', data, { path: '/' });
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/login",
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    })
      .then(function (response) {
        router.push('/dashboard')
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h1 className={styles.login_text}>Log in to Website</h1>
        <div className={styles.log_in}>
          <form onSubmit={handleLogin}>
            <div className={styles.email_input}>
              <span className={styles.show_text}>Account User Name</span>
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
                  placeholder="Enter user name"
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
            <input
              type="submit"
              className={styles.submit_button}
              value="Log In"
            />
          </form>
        </div>
      </div>

      <div className={styles.sign_in_container}>
        <Link href="/login/signup">
          <a className={styles.sign_in}>
            New user? <span className={styles.register}>Register</span> an
            account.
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
