import React from "react";
import { useState, useEffect } from "react";

function Test() {
  const [price, setPrice] = useState();
  const WAIT_TIME = 3000;
  useEffect(() => {
    const data = setInterval(() => {
      var axios = require("axios");
      var data = '"wrkn"';

      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://aspect-server.herokuapp.com/current-prices",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function (response: any) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error: any) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, []);
  console.log(process.env.SERVERLINK);
  return <div>"HI"</div>;
}

export default Test;
