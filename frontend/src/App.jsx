import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { gsap } from 'gsap';
import UploadView from './components/UploadView';

export default function App() {
  React.useEffect(() => {
    gsap.from('#title', { opacity: 0, y: -20, duration: 1 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 id="title" className="text-3xl font-bold mb-6">File Encryptor</h1>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="self-end mb-4">
          <UserButton />
        </div>
        <UploadView />
      </SignedIn>
    </div>
  );
}
