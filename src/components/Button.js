import React from 'react';

const Button = ({ children, onClick, className = 'button', type = 'button', disabled }) =>
  <button type={type} className={className} disabled={disabled} onClick={onClick}>{children}</button>

export default Button;