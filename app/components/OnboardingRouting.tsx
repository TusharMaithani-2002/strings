"use client";
import React from 'react'
import { useAppContext } from '../context/context';
import { useRouter } from 'next/navigation';

const OnboardingRouting = () => {

    const {user} = useAppContext();
    const router = useRouter();
    if(user?.onBoarded) return;
    else router.push('/onboarding')
}

export default OnboardingRouting
