import { useAuth } from "@components/Auth/AuthProvider";

export const LogoutButton = () => {
	const { signOut } = useAuth();
	return (
		<button className='button' onClick={signOut}>
			Sign Out
		</button>
	);
};
