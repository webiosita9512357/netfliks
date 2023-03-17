import AccountPaper from '@/components/AccountPaper';
import Input from '@/components/Input';
import NavBar from '@/components/navBar';
import useAuthenticatedUser from '@/hooks/useAuthenticatedUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {}
  };
}

const Account = () => {
  const {isLoading, data} = useAuthenticatedUser();



  return (
    <>
      <div className={`bg-gray-800 bg-opacity-85 fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center ${isLoading? "visible": "hidden"}`}>
        <div className="animate-spin rounded-full h-48 w-48 border-t-2 border-b-2 border-red-600"/>
      </div>
      <NavBar isDashboard/>
      <div className="grid h-screen place-items-center text-white">
        {data && <AccountPaper data={data} />}
      </div>
    </>
  )
}

export default Account