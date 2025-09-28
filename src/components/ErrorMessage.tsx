import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-5 text-center">
      <AlertCircle size={48} className="text-red-500 mb-4" />

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Something went wrong
      </h3>

      <p className="text-gray-500 max-w-md mb-6">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-3 rounded-lg transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
