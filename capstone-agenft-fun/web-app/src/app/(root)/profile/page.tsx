import Link from "next/link";
import React from "react";

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Link href="/chat">Chat</Link>
    </div>
  );
};

export default Profile;
