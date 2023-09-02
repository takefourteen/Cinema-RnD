import React from 'react'

import CreateAccountForm from '@/components/auth-route/CreateAccountForm'

const CreateAccount = () => {
  return (
    <section className='pt-16 w-full justify-center flex gap-y-8 flex-col items-center'>

      {/* heading */}
      <div className='flex flex-col items-center justify-center gap-1'>
        <h1 className='text-4xl font-semibold'>
          Create Your Account
        </h1>
        <p className='text-base tracking-wide'>
          You&apos;ll use this to watch on your favorite devices. 
        </p>
        <p className='text-sm text-white/70'>
          * Indicates a required field
        </p>
      </div>

      {/* form */}
      <CreateAccountForm />
    </section>
  )
}

export default CreateAccount