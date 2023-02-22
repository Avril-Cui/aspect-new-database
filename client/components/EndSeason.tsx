import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const EndSeason = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    var axios = require("axios");
    var data = "";

    var config = {
      method: "post",
      url: "https://aspect-server.onrender.com/is-end-game",
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response: { data: any }) {
        if (JSON.stringify(response.data) == "0") {
          setIsEnd(true);
        } else (
          router.push("/")
        )
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [router, isEnd]);
  console.log(isEnd)

  return <>{isEnd ? children : <></>}</>;
};

export default EndSeason;
