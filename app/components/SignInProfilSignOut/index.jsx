'use client'

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function SignInProfilSignOut() {
    const session = useSession()
    return (
        <div>
            {session?.status === "authenticated" ?
                (
                    <div className="flex gap-4">
                        <Link href='/profile'>Profil</Link>
                        <Link href='#' onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Link>
                    </div>
                )
                :
                (
                    <Link href={'/api/auth/signin'}>Sign In</Link>)
            }
        </div>
    )
}
