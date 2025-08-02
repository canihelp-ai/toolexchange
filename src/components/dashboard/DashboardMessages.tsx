import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Badge from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { formatRelativeTime } from '../../utils/format';

interface Chat {
  id: string;
  participants: string[];
  lastMessage: {
    content: string;
    created_at: string;
    sender_id: string;
  };
  otherUser: {
    id: string;
    name: string;
    avatar_url: string;
    online: boolean;
  };
  unreadCount: number;
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender: {
    name: string;
    avatar_url: string;
  };
}

const DashboardMessages: React.FC = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (user) {
      loadChats();
    }
  }, [user]);

  const loadChats = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      // Mock data for demonstration
      const mockChats: Chat[] = [
        {
          id: '1',
          participants: [user.id, 'user2'],
          lastMessage: {
            content: 'Hi! Is the drill still available for this weekend?',
            created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            sender_id: 'user2'
          },
          otherUser: {
            id: 'user2',
            name: 'Sarah Johnson',
            avatar_url: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            online: true
          },
          unreadCount: 2
        },
        {
          id: '2',
          participants: [user.id, 'user3'],
          lastMessage: {
            content: 'Thanks for the excavator rental. Everything went smoothly!',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            sender_id: 'user3'
          },
          otherUser: {
            id: 'user3',
            name: 'Mike Wilson',
            avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            online: false
          },
          unreadCount: 0
        },
        {
          id: '3',
          participants: [user.id, 'user4'],
          lastMessage: {
            content: 'Can you provide more details about the tile saw specifications?',
            created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            sender_id: user.id
          },
          otherUser: {
            id: 'user4',
            name: 'John Martinez',
            avatar_url: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            online: true
          },
          unreadCount: 0
        }
      ];

      setChats(mockChats);
      if (mockChats.length > 0) {
        setSelectedChat(mockChats[0]);
        loadMessages(mockChats[0].id);
      }
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (chatId: string) => {
    try {
      // Mock messages for demonstration
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Hi! I saw your DeWalt drill listing. Is it still available?',
          sender_id: 'user2',
          created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          sender: {
            name: 'Sarah Johnson',
            avatar_url: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
          }
        },
        {
          id: '2',
          content: 'Yes, it\'s available! When would you need it?',
          sender_id: user?.id || '',
          created_at: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
          sender: {
            name: user?.name || '',
            avatar_url: user?.avatar_url || ''
          }
        },
        {
          id: '3',
          content: 'Perfect! I need it for this weekend. What\'s the daily rate?',
          sender_id: 'user2',
          created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
          sender: {
            name: 'Sarah Johnson',
            avatar_url: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
          }
        },
        {
          id: '4',
          content: 'It\'s $45 per day. Includes 2 batteries and charger.',
          sender_id: user?.id || '',
          created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
          sender: {
            name: user?.name || '',
            avatar_url: user?.avatar_url || ''
          }
        },
        {
          id: '5',
          content: 'Hi! Is the drill still available for this weekend?',
          sender_id: 'user2',
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          sender: {
            name: 'Sarah Johnson',
            avatar_url: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
          }
        }
      ];

      setMessages(mockMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !user) return;

    setIsSending(true);
    try {
      const message: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender_id: user.id,
        created_at: new Date().toISOString(),
        sender: {
          name: user.name,
          avatar_url: user.avatar_url || ''
        }
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">Communicate with tool owners and renters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <Card padding="none" className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={20} />}
              />
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No conversations yet</p>
                  <p className="text-sm">Start renting tools to begin chatting!</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => {
                        setSelectedChat(chat);
                        loadMessages(chat.id);
                      }}
                      className={`w-full p-3 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-blue-50 border border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={chat.otherUser.avatar_url}
                            alt={chat.otherUser.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {chat.otherUser.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 truncate">
                              {chat.otherUser.name}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(chat.lastMessage.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {chat.lastMessage.content}
                          </p>
                        </div>
                        {chat.unreadCount > 0 && (
                          <Badge variant="error" size="sm">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2">
          {selectedChat ? (
            <Card padding="none" className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedChat.otherUser.avatar_url}
                      alt={selectedChat.otherUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedChat.otherUser.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedChat.otherUser.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedChat.otherUser.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                      message.sender_id === user?.id ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <img
                        src={message.sender.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'}
                        alt={message.sender.name}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1';
                        }}
                      />
                      <div className={`px-4 py-2 rounded-lg ${
                        message.sender_id === user?.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender_id === user?.id ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatRelativeTime(message.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip size={16} />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || isSending}
                    isLoading={isSending}
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardMessages;