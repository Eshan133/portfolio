import { useEffect, useMemo, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Bot, Send, Settings } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotWidget() {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("https://ishan2121066.app.n8n.cloud/webhook-test/c68494dc-137d-4d9c-bbbd-af5807862e24");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI/ML assistant. Ask me anything about projects, experience, or any other questions you have!",
    },
  ]);
  const [input, setInput] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const pendingRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("n8nWebhookUrl");
    if (saved) setWebhookUrl(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("n8nWebhookUrl", webhookUrl);
  }, [webhookUrl]);

  const canSend = useMemo(() => input.trim().length > 0 && !pendingRef.current, [input]);

  const handleSend = async () => {
    if (!canSend) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);

    if (!webhookUrl) {
      toast({
        title: "Webhook not set",
        description: "Add your n8n webhook URL in settings to deliver messages.",
        variant: "destructive",
      });
      return;
    }

    pendingRef.current = true;
    
    // Add a temporary "typing" indicator
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content: "Thinking...",
      },
    ]);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          source: "portfolio-chatbot",
          timestamp: new Date().toISOString(),
          url: window.location.href,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        
        // Update the last message with the actual response
        setMessages((m) => {
          const newMessages = [...m];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === "assistant" && lastMessage.content === "Thinking...") {
            lastMessage.content = responseData.output || responseData.message || "I've received your message and will respond shortly.";
          }
          console.log(newMessages);
          return newMessages;
        });
        
      } else {
        // Handle error response
        setMessages((m) => {
          const newMessages = [...m];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.role === "assistant" && lastMessage.content === "Thinking...") {
            lastMessage.content = "Sorry, I encountered an error. Please try again later.";
          }
          return newMessages;
        });
      }
    } catch (err) {
      console.error(err);
      
      // Update the last message with error
      setMessages((m) => {
        const newMessages = [...m];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === "assistant" && lastMessage.content === "Thinking...") {
          lastMessage.content = "Sorry, I'm having trouble connecting right now. Please try again later.";
        }
        return newMessages;
      });
      
      toast({ title: "Error", description: "Failed to reach webhook.", variant: "destructive" });
    } finally {
      pendingRef.current = false;
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="hero"
          size="lg"
          className="fixed bottom-6 right-6 z-50 shadow-glow hover-scale"
          aria-label="Open chatbot"
        >
          <Bot /> Chat
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md border-l border-border">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>AI/ML Chatbot</SheetTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowSettings((s) => !s)} aria-label="Settings">
              <Settings className="mr-2" /> Settings
            </Button>
          </div>
          {showSettings && (
            <div className="mt-2 grid gap-2">
              <p className="text-sm text-muted-foreground">
                Webhook is configured and connected to n8n workflow. Messages will be automatically routed.
              </p>
            </div>
          )}
        </SheetHeader>

        <div className="mt-4 flex h-[70vh] flex-col rounded-md border border-border/60 bg-card/50">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] rounded-md bg-primary text-primary-foreground px-3 py-2"
                      : "mr-auto max-w-[85%] rounded-md bg-muted/60 text-foreground px-3 py-2"
                  }
                >
                  {m.content}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t border-border/60 p-3">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <Button onClick={handleSend} disabled={!canSend} aria-label="Send message">
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
