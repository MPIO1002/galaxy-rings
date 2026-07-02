import { Button } from "@/components/ui/button";

interface TableErrorProps {
  message: string;
  onRetry: () => void;
}

export default function TableError({ message, onRetry }: TableErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <p className="text-sm text-destructive font-medium mb-3">{message}</p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        className="cursor-pointer"
      >
        Thử lại
      </Button>
    </div>
  );
}
