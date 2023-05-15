import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react'
import { CredentialResponse } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

type UserType = {
    name: string,
    firstName: string,
    lastName: string
    image: string,
    email: string
}

export type AuthContextType = {
    user: UserType | null,
    setCredential: (user: CredentialResponse | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => useContext(AuthContext) as AuthContextType

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [credential, setCredential] = useState<CredentialResponse | null>(null)
    const [user, setUser] = useState<UserType | null>(null)

    useEffect(() => {
        if (credential) {
            const userData = jwt_decode(credential.credential as string) as any
            console.log(userData)
            const { name, family_name: lastName, given_name: firstName, picture: image, email } = userData
            setUser({ name, firstName, lastName, image, email })
        }
    }, [credential])

    return (
        <AuthContext.Provider value={{ user, setCredential }}>{children}</AuthContext.Provider>
    )
}