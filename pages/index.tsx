import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useAuth } from '@/src/components/Auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
    session: any;
}

const Home = ({ session }: HomeProps) => {
    console.log(session);
    const router = useRouter()
    const { user } = useAuth()

    return (
        <div className="flex min-h-screen w-full h-screen flex-col items-center pt-20">
            Home
            {!!user}
        </div>
    );
};

export default Home;
