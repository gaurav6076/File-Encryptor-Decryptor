import React from 'react';
import { gsap } from 'gsap';

export default function HowItWorks() {
  React.useEffect(() => {
    gsap.from('#how-title', { opacity: 0, y: 10, duration: 0.5 });
  }, []);

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded shadow text-sm">
      <h2 id="how-title" className="text-xl font-semibold mb-2">How it Works</h2>
      <ol className="list-decimal ml-4 space-y-1">
        <li>Upload a text file.</li>
        <li>The server encrypts it using AES-256-CBC.</li>
        <li>Download the encrypted file and keep it safe.</li>
        <li>You can also decrypt previously encrypted files.</li>
      </ol>
    </div>
  );
}
