// client/src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      router.push('/login');
    }
  }, [router]);
};

export default useAuth;