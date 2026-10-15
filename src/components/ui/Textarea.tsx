import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  required?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, required, className = '', id, ...props }, ref) => {
    const textareaId = id || label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-charcoal mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-charcoal
            placeholder:text-muted/60 transition-colors duration-200 resize-y min-h-[120px]
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
            ${error ? 'border-red-400' : 'border-border'}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'

export default Textarea
