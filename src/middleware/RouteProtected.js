'use client'
import { useRouter } from 'next/navigation';

const RouteProtected = ({ children }) => {
    let logged = false;
    if (typeof window !== 'undefined') {
        logged = sessionStorage.getItem('logged') === 'true';
    }
    const router = useRouter();
    if (!logged && typeof window !== 'undefined') { // Verifica si estás en el lado del cliente
        router.push('/login');
        return null;
    }
    return children;
};

export default RouteProtected;