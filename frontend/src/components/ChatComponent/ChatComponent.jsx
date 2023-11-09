/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export default function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const socket = useRef();

  useEffect(() => {
    socket.current = io(backendURL);
    // Écoute des nouveaux messages
    socket.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      socket.current.emit("message", inputMessage);
      // Ajoute le message à la liste locale
      setMessages([...messages, inputMessage]);
      setInputMessage("");
    }
  };

  return (
    <section className="flex h-96 w-2/3 flex-col ">
      <div className="chat-box h-96 border-2 border-black text-lg font-medium">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <input
          type="text"
          className="w-4/5 border border-black text-lg font-medium"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Tapez votre message..."
        />
        <button
          onClick={sendMessage}
          className="w-1/5 border border-black bg-black text-lg font-medium text-white"
        >
          Envoyer
        </button>
      </div>
    </section>
  );
}
