"use client"
import { registerUser } from '@/app/actiions/auth/registerUser';
import React from 'react'

export default function RegisterForm() {

    const handleRegister = async (e)=>{
        e.preventDefault();
        const form = e.target;
        const username = form.userName.value;
        const email = form.email.value;
        const password = form.password.value;
        
        const payload = {
            username,
            email,
            password
        }

        const result = await registerUser(payload)

        console.log(result);
        form.reset();
    }

  return (
    <div >
        <p className='text-2xl font-bold mb-4'>Register page</p>
        <form onSubmit={handleRegister} action="submit">
            <input className='mt-2 px-2 py-1 bg-slate-50 text-black' type="userName" name='userName' placeholder='Enter Username' />
            <br />
            <input className='mt-2 px-2 py-1 bg-slate-50 text-black'  type="email" name='email' placeholder='Enter Your Email' />
            <br />
            <input className='mt-2 px-2 py-1 bg-slate-50 text-black'  type="password" name="password" id="" placeholder='Enter Pasword' />
            <br />
            <button className='mt-2 px-2 py-1 bg-blue-500'  type="submit">Register</button>
        </form>
    </div>
  )
}
