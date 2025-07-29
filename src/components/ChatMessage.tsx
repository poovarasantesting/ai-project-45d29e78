import { cn } from "@/lib/utils";

type ChatMessageProps = {
  message: {
    id: string;
    text: string;
    isUser: boolean;
  };
};

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
          message.isUser
            ? "bg-white text-purple-900 rounded-tr-none"
            : "bg-purple-600 text-white rounded-tl-none"
        )}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
}