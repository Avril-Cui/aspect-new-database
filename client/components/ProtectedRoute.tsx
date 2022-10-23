import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Cookies from "universal-cookie";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const cookies = new Cookies();
  const userData = cookies.get("userData");
  const router = useRouter()

  useEffect(() => {
    if (!userData) {
      router.push('/')
    }
  }, [router, userData])

  return <>{userData ? children : <></>}</>
}

export default ProtectedRoute;