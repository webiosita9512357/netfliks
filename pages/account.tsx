import AccountPaper from '@/components/AccountPaper';
import FullSiteLoader from '@/components/FullSiteLoader';
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
      <FullSiteLoader isLoading={isLoading}/>
      <NavBar isDashboard/>
      <div className="grid h-screen place-items-center text-white">
        {data && <AccountPaper data={data} />}
      </div>
    </>
  )
}

export default Account