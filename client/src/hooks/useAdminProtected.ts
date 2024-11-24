import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useAdminProtected = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = Cookies.get('authToken');
        
        if (!token) {
          router.back();
          return;
        }

        const response = await fetch('http://localhost:5000/api/user/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          if (userData.role !== 'admin') {
            router.back();
          }
        } else {
          router.back();
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.back();
      }
    };

    checkAdmin();
  }, [router]);
};