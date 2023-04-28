import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const signin = () => {
	const { data: session } = useSession();

	if (session) {
		return (
			<div>
				<p>You are logged in {session.user?.email}</p>
        <img src={session.user?.image as string}></img>
				<button onClick={() => signOut()}>Sign Out</button>
			</div>
		);
	}
	return (
		<div>
			<p>You are not signed in</p>
			<button onClick={() => signIn()}>Sign In</button>
		</div>
	);
};

export default signin;
