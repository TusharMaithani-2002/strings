"use client";
import React from 'react'
import { useAppContext } from '../context/context';
import { useRouter } from 'next/navigation';

const OnboardingRouting = () => {

    //@ts-ignore
    const {user} = useAppContext();
    const router = useRouter();
    if(user?.onBoarded) return <></>;
    else router.push('/onboarding')

    return <></>;
}

export default OnboardingRouting
