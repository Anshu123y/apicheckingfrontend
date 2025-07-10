import SignInUpLofinForm from '@/components/SignInUpLofinForm';
import React, { useState } from 'react';

const SignupForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      name,
      email,
      password
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("https://shop-now-backend-chi.vercel.app/api/auth/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Signup Success:", result);
        // Optional: Show success message or redirect
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        
      });
  };
  
  return (
    <>
      <SignInUpLofinForm

        setOpen={setOpen}
        open={open}
        setPassword={setPassword}
        password={password}
        setEmail={setEmail}
        email={email}
        setName={setName}
        name={name}
        handleSubmit={handleSubmit}
      />
      <div onClick={()=>setOpen(true)}>Click</div>
  </>
  );
};

export default SignupForm;
