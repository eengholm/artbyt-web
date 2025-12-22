import { createKysely } from "@vercel/postgres-kysely";
import { AuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare, hash } from "bcrypt";
import { db } from "@/app/database/database";

const authOptions: AuthOptions = {
    // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await db.selectFrom('users')
          .selectAll()
          .where('username', '=', credentials.username)
          .executeTakeFirst()

        if (!user) {
          return null
        }

        const passwordMatch = await compare(credentials.password, user.password)

  
        return passwordMatch ? user : null
      }
    })
  ]
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }
