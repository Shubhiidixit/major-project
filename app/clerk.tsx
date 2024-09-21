import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

export default function ClerkSetup({ children }: { children: React.ReactNode }) {
    return <ClerkProvider>{children}</ClerkProvider>;
}
