import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStatus = () => {
  const auth = getAuth();
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const formData = {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photo: auth.currentUser.photoURL,
        };

        const res = await fetch('http://localhost:4310/api/user/signup', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        const user = data.data.user;
        window.localStorage.setItem('userDetails', JSON.stringify(user));
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return { loggedIn };
};
