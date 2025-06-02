
import { useState } from "react";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isOptions?: boolean;
  options?: string[];
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [messageIdCounter, setMessageIdCounter] = useState(1);

  const prebuiltAnswers = {
    "Product Information": "We offer a wide range of gym equipment including treadmills, dumbbells, resistance bands, yoga mats, and more. All our products are high-quality and designed for both home and commercial use.",
    "Shipping & Delivery": "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, and express delivery is available for 1-2 business days with additional charges.",
    "Returns & Warranty": "All products come with a 30-day return policy and manufacturer warranty. Defective items can be returned within 30 days for a full refund or replacement.",
    "Payment Methods": "We accept all major credit cards, PayPal, and bank transfers. All transactions are secure and encrypted for your safety.",
    "Customer Support": "Our customer support team is available Monday-Friday 8 AM to 8 PM, Saturday 9 AM to 6 PM, and Sunday 10 AM to 4 PM. You can reach us via phone, email, or this chat."
  };

  const startConversation = () => {
    if (messages.length === 0) {
      const greeting: Message = {
        id: messageIdCounter,
        text: "Hi there! 👋 Welcome to FitHaven! How can I help you today?",
        isUser: false,
        isOptions: true,
        options: Object.keys(prebuiltAnswers)
      };
      setMessages([greeting]);
      setMessageIdCounter(prev => prev + 1);
    }
    setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    // Add user's selection
    const userMessage: Message = {
      id: messageIdCounter,
      text: option,
      isUser: true
    };
    
    // Add bot's response
    const botResponse: Message = {
      id: messageIdCounter + 1,
      text: prebuiltAnswers[option as keyof typeof prebuiltAnswers],
      isUser: false
    };

    // Add follow-up question
    const followUp: Message = {
      id: messageIdCounter + 2,
      text: "Is there anything else I can help you with?",
      isUser: false,
      isOptions: true,
      options: [...Object.keys(prebuiltAnswers), "Contact Support"]
    };

    setMessages(prev => [...prev, userMessage, botResponse, followUp]);
    setMessageIdCounter(prev => prev + 3);
  };

  const handleContactSupport = () => {
    const supportMessage: Message = {
      id: messageIdCounter,
      text: "Contact Support",
      isUser: true
    };

    const emailRequest: Message = {
      id: messageIdCounter + 1,
      text: "I'd be happy to connect you with our support team! Please provide your email address and any specific message you'd like to send:",
      isUser: false
    };

    setMessages(prev => [...prev, supportMessage, emailRequest]);
    setShowEmailForm(true);
    setMessageIdCounter(prev => prev + 2);
  };

  const handleEmailSubmit = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const confirmationMessage: Message = {
      id: messageIdCounter,
      text: `Thank you! Our team will get back to you soon at ${email}. We typically respond within 24 hours.`,
      isUser: false
    };

    setMessages(prev => [...prev, confirmationMessage]);
    setShowEmailForm(false);
    setEmail("");
    setCustomMessage("");
    setMessageIdCounter(prev => prev + 1);
    
    toast.success("Your message has been sent to our support team!");
  };

  const resetChat = () => {
    setMessages([]);
    setShowEmailForm(false);
    setEmail("");
    setCustomMessage("");
    setMessageIdCounter(1);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={startConversation}
          className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">FitHaven Assistant</h3>
            <div className="flex gap-2">
              <button
                onClick={resetChat}
                className="text-white hover:text-gray-200 text-sm"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.isUser
                      ? "bg-primary-600 text-white ml-auto"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
                
                {message.isOptions && message.options && (
                  <div className="mt-2 space-y-1">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => 
                          option === "Contact Support" 
                            ? handleContactSupport()
                            : handleOptionClick(option)
                        }
                        className="block w-full text-left p-2 text-sm bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Email Form */}
          {showEmailForm && (
            <div className="p-4 border-t border-gray-200 space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
              />
              <Input
                placeholder="Your message (optional)"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="text-sm"
              />
              <Button
                onClick={handleEmailSubmit}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                size="sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AIAssistant;
