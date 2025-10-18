import { HiOutlineRefresh } from 'react-icons/hi';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <HiOutlineRefresh className={`${sizeClasses[size]} text-primary animate-reverse-spin`} />
      {text && <span className={`${textSizeClasses[size]} text-gray-400`}>{text}</span>}
    </div>
  );
}
