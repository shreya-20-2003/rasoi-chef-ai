import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "Namaste beta! 🙏 Kya pakayein aaj? What would you like to cook today?"
    },
    {
      role: "assistant",
      content: "I can help you with:\n• Healthy recipe suggestions\n• Step-by-step cooking guidance\n• Ingredient substitutions\n• Regional specialties"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-recipe", {
        body: { message: userMessage }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <Button
          size="lg"
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-warm animate-pulse-slow z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-8 right-8 w-96 h-[500px] shadow-warm z-50 flex flex-col">
          <div className="gradient-hero p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Chef Sanjeev</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <p className="text-xs text-white/90">Online</p>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-muted/20">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`${msg.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-card'} rounded-2xl ${msg.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} p-4 shadow-sm max-w-[80%] ${msg.role === 'user' ? 'ml-auto' : ''}`}
              >
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="bg-card rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                <p className="text-sm text-muted-foreground">Chef is thinking...</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-full bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              <Button 
                size="sm" 
                className="rounded-full px-4"
                onClick={handleSend}
                disabled={isLoading || !message.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FloatingChat;