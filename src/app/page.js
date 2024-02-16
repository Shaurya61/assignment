// pages/search.js
"use client"
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function SearchPage() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await fetch(`https://lichess.org/api/user/${username}`);
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
        setError(null);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error searching user:', error);
      setUserData(null);
      setError(error.message);
    }
  };

  return (
    <div className='bg-purple-100'>
      <h1 className='text-xl font-weight-200 font-bold pl-7 pt-5'>Lichess User Search</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className='m-4 rounded-full placeholder:p-[20px] h-[40px]'
      />
      <Button className="rounded-full" onClick={handleSearch}>Search</Button>
      {error && <p>Error: {error}</p>}
      {userData && (
        <div>
          <h2>User Data</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>  
      )}
      
    </div>
  );
}
