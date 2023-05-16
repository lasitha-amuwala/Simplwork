// import axios from 'axios';
// import Image from 'next/image';
// import { useGoogleLogin } from '@react-oauth/google';
// import { useAuth } from './AuthProvider';
// import { useRouter } from 'next/router';

// export const GoogleButton = ({ text }: { text: string }) => {
//     const router = useRouter()
//     const { setCredential } = useAuth()

//     const googleLogin = useGoogleLogin({
//         flow: 'auth-code',
//         onSuccess: async tokenResponse => {

//             console.log(tokenResponse);
//             const userInfo = await axios.get(
//                 'https://www.googleapis.com/oauth2/v3/userinfo',
//                 { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
//             );
//             console.log(userInfo.data);
//             router.push('/')
//         },
//         onError: errorResponse => console.log(errorResponse)
//     })

//     return (
//         <button onClick={() => googleLogin()} className='cursor-pointer bg-white'>
//             <div className='flex border border-neutral-400 py-2 px-4 rounded-lg w-[300px] items-center justify-center'>
//                 <Image src='./google.svg' alt='google' width={25} height={25}></Image>
//                 <h1 className='pl-7 text-lg flex-grow text-center font-medium'>{`${text} with Google`}</h1>
//             </div>
//         </button>
//     );
// }
