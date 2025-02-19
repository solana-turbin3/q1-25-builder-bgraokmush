"use client";

import { Button } from "@/components/ui/Buttton";
import { TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hello there" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log("input -> ", input);
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    console.log(messages);

    try {
      //todo get request and wait response

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hello!" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full px-5 sm:px-0 max-w-5xl">
        <div className="h-[65vh] sm:h-[85vh] overflow-y-auto  scroll-p-1">
          {messages.map((m, index) => (
            <div
              key={index}
              className={`mb-4 mx-4 ${
                m.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-md max-w-xl ${
                  m.role === "user" ? "bg-purple-500 text-white" : ""
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="text-left">
              <span className="inline-block px-4 py-2">AI is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <div className="flex w-full justify-between">
            <TextField.Root
              size="3"
              className="flex-grow"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button variant="primary" type="submit" disabled={isLoading}>
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
