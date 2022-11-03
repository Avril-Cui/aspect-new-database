import React from "react";
import Link from "next/link";
import Button from "../../UI/Button";
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useRouter } from 'next/router';
import Cookies from "universal-cookie";

function SignIn() {
  const cookies = new Cookies();
  const user = cookies.get("user");
  const handleLogout = () => {
    cookies.remove("user")
  };    const router = useRouter();

  return (
    <div>
      <Button>
        <p>
          {user ? (
            <Nav.Link
              onClick={() => {
                handleLogout;
                router.push("/auth/login");
              }}
            >
              Log Out
            </Nav.Link>
          ) : (
            <Link href="/auth/login">Log In</Link>
          )}
        </p>
      </Button>
    </div>
  );
}

export default SignIn;