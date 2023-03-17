import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from './Input'

interface Props {
  data: any;
}

const AccountPaper: React.FC<Props> = ({data}) => {

    const defaultValues = {
    email: data?.email,
    password: "",
    firstName: data?.firstName,
    lastName: data?.lastName,
  }

  const schemaSignup = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: " Password must be 6 or more characters" }),
    firstName: z.string().min(2, { message: "Fist Name must be 2 or more characters" }),
    lastName: z.string().min(2, { message: "Last Name must be 2 or more characters" }),
  })
    const {register, handleSubmit, getValues, formState} = useForm({resolver: zodResolver(schemaSignup), defaultValues: defaultValues});
    const {errors} = formState;

  const onSubmit = useCallback(async (formValues: object) => {
    try {
      await axios.put('/api/user', formValues).catch(function (error:string) {
      throw new Error(error);
      });
     } catch (error: any) {
      console.error('Error in the auth submit function: ' + error);
      // throw new Error(error);
     }

  },[])

  return (
    <div className="bg-black p-10 rounded-lg items-center w-full md:w-3/4 lg:w-3/5 m-auto content-center">
          <h1 className='text-3xl font-bold mb-10'>Account Settings</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Input disabled error={errors['email']?.message} register={register} getValues={() => getValues()} placeholder="email"/>
                  <Input disabled isPassword error={errors['password']?.message} register={register} getValues={() => getValues()} placeholder="password" />
                  <Input error={errors['firstName']?.message} register={register} getValues={() => getValues()} placeholder="firstName" />
                  <Input error={errors['lastName']?.message} register={register} getValues={() => getValues()} placeholder="lastName" />
                </div>
                  <div>
                    <button type="submit" className="w-fit mt-10 bg-red-700 text-white px-5 py-3 rounded-md text-sm font-bold transition hover:bg-red-600">
                      Update Account
                    </button>
                </div>
              </form>
            </div>
  )
}

export default AccountPaper