import React, { useState } from 'react';
import { RegisterUserData } from './types';

interface Props {
  handleRegister: (userData: RegisterUserData) => void;
}

const RegisterForm: React.FC<Props> = ({ handleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister({ email, password, confirmpassword });
  };

  return (
    <form className='limitedwidth mx-auto' onSubmit={onSubmit}>
      <h2>Register</h2>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default RegisterForm;
