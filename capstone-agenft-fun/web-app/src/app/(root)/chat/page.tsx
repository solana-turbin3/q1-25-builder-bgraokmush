import Link from "next/link";
import React from "react";

const Chat = () => {
  return (
    <div>
      <h1>Chat</h1>
      <Link href="/">Main Page</Link>
      <Link href="/profile">profile</Link>
    </div>
  );
};

export default Chat;
