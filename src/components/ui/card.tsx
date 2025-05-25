import React from 'react';
// import { cn } from '../../lib/utils';


// export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
//   return (
//     <div className={cn('rounded-2xl shadow p-4 bg-white border', className)}>
//       {children}
//     </div>
//   );
// };

// export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
//   return (
//     <div className={cn('mt-2', className)}>
//       {children}
//     </div>
//   );
// };
// src/components/ui/card.tsx
export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-lg shadow-md">{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
