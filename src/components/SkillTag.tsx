import React from 'react';

interface SkillTagProps {
  skill: string;
  type: 'offered' | 'wanted';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
}

export function SkillTag({ skill, type, size = 'md', interactive = false, onClick }: SkillTagProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const typeStyles = type === 'offered' 
    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/50 text-cyan-300'
    : 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-400/50 text-pink-300';

  const glowEffect = type === 'offered'
    ? 'shadow-cyan-500/25'
    : 'shadow-pink-500/25';

  return (
    <span
      className={`
        inline-block rounded-full border backdrop-blur-sm font-medium transition-all duration-300
        ${sizeClasses[size]}
        ${typeStyles}
        ${interactive ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''}
        ${glowEffect}
        ${interactive && type === 'offered' ? 'hover:shadow-cyan-500/40' : ''}
        ${interactive && type === 'wanted' ? 'hover:shadow-pink-500/40' : ''}
      `}
      onClick={onClick}
    >
      {skill}
    </span>
  );
}