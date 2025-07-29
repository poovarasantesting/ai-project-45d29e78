import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "@/components/ChatMessage";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const botResponses = [
  "Hello! How can I help you today?",
  "That's an interesting question. Let me think about that.",
  "I'm a simple chatbot. I don't have all the answers yet.",
  "Could you tell me more about that?",
  "Thanks for sharing! Is there anything else you'd like to discuss?",
  "I'm learning every day, just like humans!",
  "That's a great point. I appreciate your perspective.",
  "I'm here to assist you with any questions you might have.",
  "Let me know if you need more information on any topic."
];

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      // Get random response
      const botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      toast({
        title: "New message",
        description: "You received a new message from the chatbot",
      });
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <header className="p-4 text-white text-center">
        <h1 className="text-2xl font-bold">AI Chatbot</h1>
        <p className="opacity-80">Ask me anything!</p>
      </header>
      
      <main className="flex-1 p-4 max-w-3xl mx-auto w-full flex flex-col">
        <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-lg p-4 overflow-y-auto mb-4 shadow-xl">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center text-white/70 text-sm">
                <div className="flex space-x-1 ml-2">
                  <span className="animate-bounce delay-0">●</span>
                  <span className="animate-bounce delay-150">●</span>
                  <span className="animate-bounce delay-300">●</span>
                </div>
                <span className="ml-2">Bot is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-white/20 backdrop-blur-sm border-none placeholder:text-white/50 text-white"
          />
          <Button type="submit" className="bg-white text-purple-700 hover:bg-white/90">
            <Send size={18} />
          </Button>
        </form>
      </main>
      
      <footer className="p-4 text-center text-white/70 text-sm">
        <p>© 2025 AI Chatbot with Gradient Design</p>
      </footer>
    </div>
  );
}