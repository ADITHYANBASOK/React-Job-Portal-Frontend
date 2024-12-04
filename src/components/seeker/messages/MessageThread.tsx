import  { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

interface Props {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export default function MessageThread({ messages, onSendMessage }: Props) {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'me'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}