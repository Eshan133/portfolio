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
  const [webhookUrl, setWebhookUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI/ML assistant. Ask anything about projects, experience, or leave a message. Connect an n8n webhook to route messages.",
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
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          message: text,
          source: "portfolio-chatbot",
          timestamp: new Date().toISOString(),
          url: window.location.href,
        }),
      });

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Thanks! Your message was sent to the n8n workflow. Check your n8n execution history for delivery.",
        },
      ]);
    } catch (err) {
      console.error(err);
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
              <label htmlFor="webhook" className="text-sm text-muted-foreground">
                n8n Webhook URL
              </label>
              <Input
                id="webhook"
                placeholder="https://your-n8n-host/webhook/xxxx"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Messages will be POSTed as JSON using no-cors mode. Configure your n8n webhook to accept JSON.
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
