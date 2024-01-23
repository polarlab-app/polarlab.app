'use client'

import { useEffect, useState } from 'react';

export default function Page() {
    const [user, setUser] = useState(null);

    useEffect(() => {
       const userCookie = document.cookie.split('; ').find(row => row.startsWith('user=')).split('=')[1];
       const userData = JSON.parse(decodeURIComponent(userCookie));
   
       setUser(userData);
    }, []);

    return (
        <div>
          {user ? (
            <div>
              <h2>{user.username}</h2>
              <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="User avatar" />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
     );
}
