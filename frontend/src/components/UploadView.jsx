import React, { useState } from 'react';
import HowItWorks from './HowItWorks';

export default function UploadView() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleEncrypt = async () => {
    if (!file) return;
    setProcessing(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://localhost:3000/encrypt', {
      method: 'POST',
      body: formData
    });
    const blob = await res.blob();
    setProcessing(false);
    setMessage('File encrypted');
    downloadBlob(blob, file.name + '.enc');
  };

  const handleDecrypt = async () => {
    if (!file) return;
    setProcessing(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://localhost:3000/decrypt', {
      method: 'POST',
      body: formData
    });
    const blob = await res.blob();
    setProcessing(false);
    setMessage('File decrypted');
    downloadBlob(blob, file.name.replace(/\.enc$/, '.dec'));
  };

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded shadow">
      <div className="mb-4">
        <input
          type="file"
          accept=".txt,.enc"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleEncrypt}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Encrypt
        </button>
        <button
          onClick={handleDecrypt}
          className="px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Decrypt
        </button>
      </div>
      {processing && <p className="mt-4 text-sm text-gray-500">Processing...</p>}
      {message && <p className="mt-2 text-sm text-green-700">{message}</p>}
      <HowItWorks />
    </div>
  );
}
