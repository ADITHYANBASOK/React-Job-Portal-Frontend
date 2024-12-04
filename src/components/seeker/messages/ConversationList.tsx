import { Search } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  unread: number;
}

interface Props {
  conversations: Conversation[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectConversation?: (id: string) => void;
}

export default function ConversationList({
  conversations,
  searchQuery,
  onSearchChange,
  onSelectConversation,
}: Props) {
  return (
    <div className="w-1/3 border-r dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100%-5rem)]">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelectConversation?.(conversation.id)}
          >
            <div className="flex items-center">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {conversation.name}
                  </h3>
                  {conversation.unread > 0 && (
                    <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}