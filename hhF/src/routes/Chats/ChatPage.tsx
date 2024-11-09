import React, {useEffect, useState} from "react";
import { io, Socket } from 'socket.io-client';

const SERVER_URL = "http://localhost:5176";

const ChatPage:React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const newSocket = io(SERVER_URL);
        setSocket(newSocket);

        newSocket.on("chat message", (msg:string) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            newSocket.disconnect();
        }
    }, [])

    const handleSendMessage = () => {
        if (socket && message) {
            socket.emit('chat message', message);
            setMessage('')
        }
    };

    return (
        <div>
            <h2>Chat Page</h2>
            <div>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

export default ChatPage;