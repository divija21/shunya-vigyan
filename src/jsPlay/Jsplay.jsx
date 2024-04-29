import React from "react";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

const Jsplay = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  // const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState([]);
  const getMessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        user_input: value,
        user_id: 6,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/lali",
        options
      );
      const data = await response.json();
      console.log("data", data.response.sections[0]);
      setMessage(data.response.sections[0]);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   console.log("CVM", currentTitle, value, message);
  //   if (currentTitle && value && message) {
  //     // if (currentTitle.length > 0 && value.length > 0 && message.length > 0) {
  //     setPreviousChats((prevChats) => [
  //       ...prevChats,
  //       { title: currentTitle, role: "user", content: value },

  //       {
  //         title: currentTitle,
  //         role: message.role,
  //         content: message.content,
  //       },
  //     ]);
  //   }
  // }, [message, currentTitle]);

  // console.log("prevChats", previousChats);

  return (
    <div className={styles.app}>
      <section className={styles.side_bar}>
        <button> New Chat</button>
        <ul className={styles.history}>
          <li>hello</li>
        </ul>
        <nav>
          <p>Made by Divija</p>
        </nav>
      </section>
      <section className={styles.main}>
        {!currentTitle && <h1>DivijaGPT</h1>}
        <ul className={styles.feed}>
          <div className={styles.reply_sections}>
            <h1 className={styles.h1}>I am going to show the answer here</h1>
            {message && (
              <div className={styles.reply}>
                <h2 className={styles.h2}>{message.title}</h2>
                <p>{message.description}</p>
                <p>Time Limit:{message.additional_features.time_limit}</p>
                <p>Marks:{message.additional_features.total_marks}</p>
                {message.questions.map((ele,index) => (
                  <div>
                    Q{index + 1}: {ele.question_text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ul>
        <div className={styles.bottom_section}>
          <div className={styles.input_container}>
            <input
              value={value}
              onChange={(e) => {
                // console.log(value);
                setValue(e.target.value);
              }}
            />

            <button id={styles.submit} onClick={getMessage}>
              ➡️
            </button>
          </div>
          <p className={styles.info}>
            Chat Gpt Mar 14 Version .free Research Preview Our goal is to make
            AI systems natural and safe to interact with ur feedback will help
            us imporove
          </p>
        </div>
      </section>
    </div>
  );
};

export default Jsplay;
