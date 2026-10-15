import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className = '', id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-charcoal
            placeholder:text-muted/60 transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
            ${error ? 'border-red-400' : 'border-border'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
