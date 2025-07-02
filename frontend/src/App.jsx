import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import UploadView from './components/UploadView';

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const formRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    gsap.from('#title', { opacity: 0, y: -20, duration: 1 });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      gsap.from(appRef.current, { opacity: 0, y: 20, duration: 0.5 });
    } else {
      gsap.from(formRef.current, { opacity: 0, scale: 0.95, duration: 0.5 });
    }
  }, [loggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setLoggedIn(true);
    }
  };

  const handleLogout = () => setLoggedIn(false);

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-br from-indigo-50 to-white">
      <h1 id="title" className="text-3xl font-bold mb-6">File Encryptor</h1>
      {loggedIn ? (
        <>
          <button onClick={handleLogout} className="self-end mb-4 px-3 py-1 bg-gray-200 rounded">Logout</button>
          <div ref={appRef} className="w-full flex justify-center">
            <UploadView />
          </div>
        </>
      ) : (
        <form ref={formRef} onSubmit={handleLogin} className="bg-white p-4 rounded shadow w-full max-w-sm">
          <div className="mb-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded w-full">Login</button>
        </form>
      )}
    </div>
  );
}
