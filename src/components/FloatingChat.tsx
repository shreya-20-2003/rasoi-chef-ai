import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="bg-card rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
              <p className="text-sm">
                Namaste beta! 🙏 Kya pakayein aaj?
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                What would you like to cook today?
              </p>
            </div>

            <div className="bg-card rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
              <p className="text-sm">
                I can help you with:
              </p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                <li>• Healthy recipe suggestions</li>
                <li>• Step-by-step cooking guidance</li>
                <li>• Ingredient substitutions</li>
                <li>• Regional specialties</li>
              </ul>
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm" className="rounded-full px-6">
                Send
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FloatingChat;