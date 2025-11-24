'use client';

import React, { useState, FormEvent } from 'react';
import { FormInput } from './FormInput';
import { validateEmail, validatePassword } from '@/utils/validation';

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time validation
    if (errors[field as keyof typeof errors]) {
      let validation;
      if (field === 'email') {
        validation = validateEmail(value);
      } else if (field === 'password') {
        validation = validatePassword(value);
      }

      if (validation) {
        setErrors((prev) => ({
          ...prev,
          [field]: validation.isValid ? undefined : validation.error,
        }));
      }
    }
  };

  const handleBlur = (field: string) => {
    let validation;
    if (field === 'email') {
      validation = validateEmail(formData.email);
    } else if (field === 'password') {
      validation = validatePassword(formData.password);
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
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    const newErrors: { email?: string; password?: string } = {};

    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, handle submission
      console.log('Login form submitted:', formData);
      // Here you would typically make an API call
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Login successful! (This is a demo)');
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

      <FormInput
        id="login-email"
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

      <FormInput
        id="login-password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
        error={errors.password}
        placeholder="Enter your password"
        showPasswordToggle
        required
        autoComplete="current-password"
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Forgot password?
        </button>
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
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      {onSwitchToRegister && (
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Register
          </button>
        </p>
      )}
    </form>
  );
};

