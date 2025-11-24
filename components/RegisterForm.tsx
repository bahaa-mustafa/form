'use client';

import React, { useState, FormEvent } from 'react';
import { FormInput } from './FormInput';
import { PasswordStrength } from './PasswordStrength';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  checkPasswordStrength,
} from '@/utils/validation';

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [passwordStrength, setPasswordStrength] = useState(
    checkPasswordStrength('')
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time password strength check
    if (field === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // Real-time validation
    if (errors[field as keyof typeof errors]) {
      let validation;
      if (field === 'name') {
        validation = validateName(value);
      } else if (field === 'email') {
        validation = validateEmail(value);
      } else if (field === 'password') {
        validation = validatePassword(value);
      } else if (field === 'confirmPassword') {
        validation = validateConfirmPassword(formData.password, value);
      }

      if (validation) {
        setErrors((prev) => ({
          ...prev,
          [field]: validation.isValid ? undefined : validation.error,
        }));
      }
    }

    // Validate confirm password when password changes
    if (field === 'password' && formData.confirmPassword) {
      const confirmValidation = validateConfirmPassword(
        value,
        formData.confirmPassword
      );
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmValidation.isValid
          ? undefined
          : confirmValidation.error,
      }));
    }
  };

  const handleBlur = (field: string) => {
    let validation;
    if (field === 'name') {
      validation = validateName(formData.name);
    } else if (field === 'email') {
      validation = validateEmail(formData.email);
    } else if (field === 'password') {
      validation = validatePassword(formData.password);
    } else if (field === 'confirmPassword') {
      validation = validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      );
    }

    if (validation) {
      setErrors((prev) => ({
        ...prev,
        [field]: validation.isValid ? undefined : validation.error,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error;
    }

    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    if (!confirmPasswordValidation.isValid) {
      newErrors.confirmPassword = confirmPasswordValidation.error;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, handle submission
      console.log('Register form submitted:', {
        name: formData.name,
        email: formData.email,
        // Don't log password in production
      });
      // Here you would typically make an API call
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Registration successful! (This is a demo)');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setPasswordStrength(checkPasswordStrength(''));
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>

      <FormInput
        id="register-name"
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        onBlur={() => handleBlur('name')}
        error={errors.name}
        placeholder="Enter your full name"
        required
        autoComplete="name"
      />

      <FormInput
        id="register-email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={errors.email}
        placeholder="Enter your email"
        required
        autoComplete="email"
      />

      <div>
        <FormInput
          id="register-password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          error={errors.password}
          placeholder="Enter your password"
          showPasswordToggle
          required
          autoComplete="new-password"
        />
        {formData.password && (
          <PasswordStrength strength={passwordStrength} />
        )}
      </div>

      <FormInput
        id="register-confirm-password"
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        onBlur={() => handleBlur('confirmPassword')}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        showPasswordToggle
        required
        autoComplete="new-password"
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          required
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
          I agree to the{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Terms and Conditions
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-2 px-4 rounded-lg font-semibold text-white
          transition-all duration-200
          ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }
        `}
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>

      {onSwitchToLogin && (
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Login
          </button>
        </p>
      )}
    </form>
  );
};

