/* eslint-disable react/no-unescaped-entities */
import Cookies from "js-cookie";
import ChatComponent from "../../components/ChatComponent/ChatComponent";
export default function Chat() {
  const token = Cookies.get("token");
  console.log("token :>> ", token);
  return (
    <main className="main flex flex-col items-center justify-center gap-8">
      <h1 className="h1">Chat</h1>
      <h2 className="h2">
        Retrouvez vos conversations avec d'autres utilisateurs ici
      </h2>
      <ChatComponent userId="1" partnerId="4" userToken={token} />
    </main>
  );
}
