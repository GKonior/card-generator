import React from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';

const Button = ({ children, variant, onClick }: ButtonProps) => {
  return (
    <MuiButton fullWidth variant={variant} color="primary" onClick={onClick}>
      {children}
    </MuiButton>
  );
};

export default Button;
