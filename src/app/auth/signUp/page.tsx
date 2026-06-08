


import SignUpForm from '@/components/auth/signUp-form'
import { Toaster } from '@/components/ui/sonner'
import React from 'react'

export default function SignUp() {
  return (
    <div className="flex justify-center mt-10">
      <SignUpForm></SignUpForm>
      <Toaster className='bg-red-400' richColors position="top-center" />
    </div>
  )
}
