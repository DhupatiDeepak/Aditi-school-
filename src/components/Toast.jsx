import React, { useEffect } from 'react';

export default function Toast({ message, isError, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${isError ? 'error' : ''}`}>
      <span>{isError ? '⚠️' : '🎉'}</span>
      <p>{message}</p>
    </div>
  );
}
