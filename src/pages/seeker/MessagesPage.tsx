import ConversationList from '@/components/seeker/messages/ConversationList';
import MessageThread from '@/components/seeker/messages/MessageThread';
import axios from 'axios';
import  { useState } from 'react';

// import ConversationList from '../components/messages/ConversationList';
// import MessageThread from '../components/messages/MessageThread';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  unread: number;
}

export default function SeekerMessagesPage() {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      lastMessage: 'Thanks for your application!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      unread: 2,
    },
    {
      id: '2',
      name: 'Bob Smith',
      lastMessage: 'When can you start?',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      unread: 0,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! I saw your application.',
      sender: 'them',
      timestamp: '10:00 AM',
    },
    {
      id: '2',
      content: "Thanks! I'm very interested in the position.",
      sender: 'me',
      timestamp: '10:05 AM',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = async (content : string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/messages/messages', {
        content,
        sender: 'me',
      });
      setMessages((prevMessages) => [...prevMessages, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-7rem)] flex rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow">
      <ConversationList
        conversations={filteredConversations}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <MessageThread
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}