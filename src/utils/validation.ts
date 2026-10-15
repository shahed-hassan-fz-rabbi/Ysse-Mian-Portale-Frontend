export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^[\d\s\-+()]{7,20}$/.test(phone)
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0
}

export function minLength(value: string, min: number): boolean {
  return value.trim().length >= min
}

export function maxLength(value: string, max: number): boolean {
  return value.trim().length <= max
}

export interface ValidationRule {
  validate: (value: string) => boolean
  message: string
}

export function validateField(
  value: string,
  rules: ValidationRule[],
): string | null {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message
    }
  }
  return null
}

export const requiredRule: ValidationRule = {
  validate: isRequired,
  message: 'This field is required.',
}

export const emailRule: ValidationRule = {
  validate: isValidEmail,
  message: 'Please enter a valid email address.',
}

export const phoneRule: ValidationRule = {
  validate: isValidPhone,
  message: 'Please enter a valid phone number.',
}
