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
      
      console.log('Loading chats for user:', user.id);
      
      // Get all chats where user is a participant
      const { data: chatsData, error: chatsError } = await supabase
        .from('chats')
        .select(`
          id,
          participants,
          created_at,
          updated_at
        `)
        .contains('participants', [user.id])
        .order('updated_at', { ascending: false });

      if (chatsError) {
        console.error('Error loading chats:', chatsError);
        setChats([]);
        setIsLoading(false);
        return;
      }

      console.log('Found chats:', chatsData?.length || 0);

      const transformedChats: Chat[] = [];
      
      for (const chat of chatsData || []) {
        const otherUserId = chat.participants.find((id: string) => id !== user.id);
        if (!otherUserId) continue;

        const { data: otherUserProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', otherUserId)
          .single();

        if (!otherUserProfile) continue;

        const { data: lastMessageData } = await supabase
          .from('messages')
          .select(`
            id,
            content,
            sender_id,
            created_at,
            read
          `)
          .eq('chat_id', chat.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // Count unread messages
        const { data: unreadMessages } = await supabase
          .from('messages')
          .select('id')
          .eq('chat_id', chat.id)
          .eq('read', false)
          .neq('sender_id', user.id);

        const unreadCount = unreadMessages?.length || 0;

        transformedChats.push({
          id: chat.id,
          participants: chat.participants,
          lastMessage: {
            content: lastMessageData?.content || 'No messages yet',
            created_at: lastMessageData?.created_at || chat.created_at,
            sender_id: lastMessageData?.sender_id || ''
          },
          otherUser: {
            id: otherUserProfile.id,
            name: otherUserProfile.name,
            avatar_url: otherUserProfile.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
            online: Math.random() > 0.5
          },
          unreadCount
        });
      }

      console.log('Transformed chats:', transformedChats.length);
      setChats(transformedChats);
      
      if (transformedChats.length > 0) {
        setSelectedChat(transformedChats[0]);
        loadMessages(transformedChats[0].id);
      }
    } catch (error) {
      console.error('Error loading chats:', error);
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (chatId: string) => {
    try {
      console.log('Loading messages for chat:', chatId);
      
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          sender_id,
          created_at,
          read,
          sender:profiles!messages_sender_id_fkey(
            id,
            name,
            avatar_url
          )
        `)
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error loading messages:', messagesError);
        setMessages([]);
        return;
      }

      console.log('Found messages:', messagesData?.length || 0);

      const transformedMessages: Message[] = (messagesData || []).map((msg: any) => ({
        id: msg.id,
        content: msg.content,
        sender_id: msg.sender_id,
        created_at: msg.created_at,
        sender: {
          name: msg.sender?.name || 'Unknown User',
          avatar_url: msg.sender?.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
        }
      }));

      setMessages(transformedMessages);

      if (transformedMessages.length > 0) {
        await supabase
          .from('messages')
          .update({ read: true })
          .eq('chat_id', chatId)
          .neq('sender_id', user?.id);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !user) return;

    setIsSending(true);
    try {
      const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .insert([{
          chat_id: selectedChat.id,
          sender_id: user.id,
          content: newMessage,
          type: 'text',
          read: false
        }])
        .select(`
          id,
          content,
          sender_id,
          created_at,
          sender:profiles!messages_sender_id_fkey(
            id,
            name,
            avatar_url
          )
        `)
        .single();

      if (messageError) {
        console.error('Error sending message:', messageError);
        return;
      }

      await supabase
        .from('chats')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', selectedChat.id);

      const newMessageObj: Message = {
        id: messageData.id,
        content: messageData.content,
        sender_id: messageData.sender_id,
        created_at: messageData.created_at,
        sender: {
          name: messageData.sender?.name || user.name,
          avatar_url: messageData.sender?.avatar_url || user.avatar_url || ''
        }
      };

      setMessages(prev => [...prev, newMessageObj]);
      setNewMessage('');

      const otherUserId = selectedChat.participants.find(id => id !== user.id);
      if (otherUserId) {
        await supabase
          .from('notifications')
          .insert([{
            user_id: otherUserId,
            type: 'message',
            title: 'New Message',
            message: `${user.name} sent you a message`,
            action_url: '/dashboard/messages'
          }]);
      }

      loadChats();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!selectedChat) return;

    const subscription = supabase
      .channel(`messages:${selectedChat.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_id=eq.${selectedChat.id}`
      }, (payload) => {
        if (payload.new.sender_id !== user?.id) {
          loadMessages(selectedChat.id);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [selectedChat, user?.id]);

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

        <div className="lg:col-span-2">
          {selectedChat ? (
            <Card padding="none" className="h-full flex flex-col">
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