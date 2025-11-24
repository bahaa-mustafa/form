'use client';

import React from 'react';
import { PasswordStrength as PasswordStrengthType } from '@/utils/validation';

interface PasswordStrengthProps {
  strength: PasswordStrengthType;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  strength,
}) => {
  if (strength.score === 0) {
    return null;
  }

  const getStrengthColor = () => {
    switch (strength.strength) {
      case 'weak':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'strong':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStrengthText = () => {
    switch (strength.strength) {
      case 'weak':
        return 'Weak';
      case 'medium':
        return 'Medium';
      case 'strong':
        return 'Strong';
      default:
        return '';
    }
  };

  const getStrengthTextColor = () => {
    switch (strength.strength) {
      case 'weak':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'strong':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-600">
          Password Strength:
        </span>
        <span className={`text-xs font-semibold ${getStrengthTextColor()}`}>
          {getStrengthText()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        />
      </div>
      {strength.feedback.length > 0 && (
        <ul className="mt-2 text-xs text-gray-600 space-y-1">
          {strength.feedback.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2 text-red-500">•</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

