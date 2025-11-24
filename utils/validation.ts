export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface PasswordStrength {
  score: number; // 0-4
  strength: 'weak' | 'medium' | 'strong';
  feedback: string[];
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: 'Name is required' };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }

  if (name.trim().length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }

  return { isValid: true };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const missingRequirements: string[] = [];
  if (!hasUpperCase) missingRequirements.push('uppercase letter');
  if (!hasLowerCase) missingRequirements.push('lowercase letter');
  if (!hasNumber) missingRequirements.push('number');
  if (!hasSpecialChar) missingRequirements.push('special character');

  if (missingRequirements.length > 0) {
    return {
      isValid: false,
      error: `Password must contain at least one ${missingRequirements.join(', ')}`,
    };
  }

  return { isValid: true };
};

// Password strength checker
export const checkPasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return { score: 0, strength: 'weak', feedback: [] };
  }

  let score = 0;
  const feedback: string[] = [];

  // Length check
  if (password.length >= 8) score += 1;
  else feedback.push('At least 8 characters');

  // Uppercase check
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Uppercase letter');

  // Lowercase check
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Lowercase letter');

  // Number check
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Number');

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else feedback.push('Special character');

  let strength: 'weak' | 'medium' | 'strong';
  if (score <= 2) {
    strength = 'weak';
  } else if (score <= 3) {
    strength = 'medium';
  } else {
    strength = 'strong';
  }

  return { score, strength, feedback };
};

// Confirm password validation
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true };
};

// Real-time validation helper
export const validateField = (
  fieldName: string,
  value: string,
  password?: string
): ValidationResult => {
  switch (fieldName) {
    case 'email':
      return validateEmail(value);
    case 'name':
      return validateName(value);
    case 'password':
      return validatePassword(value);
    case 'confirmPassword':
      if (!password) {
        return { isValid: false, error: 'Please enter password first' };
      }
      return validateConfirmPassword(password, value);
    default:
      return { isValid: true };
  }
};

