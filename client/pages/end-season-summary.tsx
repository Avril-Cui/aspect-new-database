import React from 'react';
import { useState, useEffect } from 'react';
import styles from "../styles/EndSeason/EndSeason.module.css"

const EndSeasonSummary = () => {
  const [isEnd, setIsEnd] = useState(false)
  const [event, setEvent] = useState("")

  useEffect(() => {
    var axios = require('axios');
    var data = '';

    var config = {
    method: 'post',
    url: 'http://127.0.0.1:5000/is-end-game',
    headers: { },
    data : data
    };
    axios(config)
    .then(function (response: { data: any }) {

        if (JSON.stringify(response.data)=="0"){
            setIsEnd(true);
        }
    })
    .catch(function (error: any) {
        console.log(error);
    });

    if (isEnd == true) {
      var data = '';

      var config = {
        method: 'get',
        url: 'http://127.0.0.1:5000/get-event',
        headers: { },
        data : data
      };

      axios(config)
      .then(function (response:any) {
        setEvent(JSON.stringify(response.data));
      })
      .catch(function (error:any) {
        console.log(error);
      });
    }
  }, [isEnd])

  return (
    <div className={styles.container}>
      <p className={styles.recap_header}>S1: {event} Event Recap</p>
      <div className={styles.header_news_container}>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  )
}

export default EndSeasonSummary