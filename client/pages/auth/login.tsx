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

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = data.user_email;
    const user_name = data.user_name;
    cookies.set("userData", { email, user_name }, { path: "/" });
    axios({
      method: "POST",
      url: `${process.env.serverConnection}/result`,
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    })
      .then(function (response) {
        cookies.set("user_uid", response.data, { path: "/" });
        router.back()
      })
      .catch(function (error) {
        setIsError(true);
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
              <span className={styles.show_text}>Account Email</span>
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
                  id="user-email-login-entry"
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
                  id="user-email-password-entry"
                />
              </div>
            </div>
            {isError ? (
              <p className={styles.wrong_text}>
                Invalid password or email input
              </p>
            ) : null}
            <input
              style={{marginTop:"5em"}}
              type="submit"
              className={styles.submit_button}
              value="Log In"
              id="submit-user-login"
            />
          </form>
        </div>
      </div>

      <div className={styles.sign_in_container}>
        <Link href="/auth/signup">
          <a className={styles.sign_in}>
            New user? <span className={styles.register} id="register-new-user">Register</span> an
            account.
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
