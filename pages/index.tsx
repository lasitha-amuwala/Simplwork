import { Inter } from 'next/font/google';
import { useAuth } from '@/src/components/Auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
	const { user } = useAuth();

	return <div className='flex min-h-screen w-full h-screen flex-col items-center pt-20'>Home</div>;
};

export default Home;
