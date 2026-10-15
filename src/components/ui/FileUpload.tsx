import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'

interface FileUploadProps {
  label: string
  accept?: string
  onChange: (file: File | null) => void
  error?: string
  required?: boolean
  helpText?: string
}

export default function FileUpload({
  label,
  accept = '.pdf,.doc,.docx',
  onChange,
  error,
  required,
  helpText,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null
    setFileName(file?.name || null)
    onChange(file)
  }

  function handleRemove() {
    setFileName(null)
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-charcoal mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div
        className={`
          rounded-lg border-2 border-dashed px-4 py-6 text-center cursor-pointer
          transition-colors duration-200 hover:border-primary/50 hover:bg-mint/30
          ${error ? 'border-red-400' : 'border-border'}
        `}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={label}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          aria-invalid={error ? 'true' : 'false'}
        />
        {fileName ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-charcoal font-medium">{fileName}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
              className="text-muted hover:text-red-500 transition-colors"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="h-6 w-6 text-muted mx-auto mb-2" />
            <p className="text-sm text-muted">
              Click to upload or drag and drop
            </p>
            {helpText && (
              <p className="text-xs text-muted/70 mt-1">{helpText}</p>
            )}
          </>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  )
}
