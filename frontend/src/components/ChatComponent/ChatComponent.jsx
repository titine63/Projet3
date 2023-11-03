/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ChatComponent({ userId, partnerId, userToken }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const socket = useRef();

  const room = `${userId}-${partnerId}`;

  useEffect(() => {
    socket.current = io(backendUrl, { query: { token: userToken } });

    socket.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Rejoindre la room dès la connexion
    console.log(`Joining room ${room}`);
    socket.current.emit("joinRoom", room);

    return () => {
      // Quitter la room à la déconnexion
      socket.current.emit("leaveRoom", room);
      socket.current.disconnect();
    };
  }, [room]);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      socket.current.emit("privateMessage", { room, message: inputMessage });
      setMessages([...messages, { username: "Vous", content: inputMessage }]);
      setInputMessage("");
    }
  };

  return (
    <section className="flex h-96 w-2/3 flex-col ">
      <div className="chat-box h-96 border-2 border-black text-lg font-medium">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message.username}: {message.content}
          </div>
        ))}
      </div>
      <div className="flex  w-full">
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
