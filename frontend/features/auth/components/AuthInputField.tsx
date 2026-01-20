import {Eye, EyeOff} from 'lucide-react';
import {Input} from '@/components/ui/input';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
  id: string;
  type: string;
  value: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

const AuthInputField: React.FC<InputFieldProps> = ({
  label,
  htmlFor,
  id,
  type,
  value,
  onChange,
  placeholder,
  onTogglePassword,
  showPassword,
  ...props
}) => {
  const isPassword = type === 'password';

  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Input
          required
          id={id}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-neutral-300/70 bg-white px-3.5 py-2.5 ${
            isPassword ? 'pr-10' : ''
          } h-12 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInputField;
