import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users?name=${username}`
        );
        const user = await res.json();
        if (username === user[0].name && password === user[0].username) {
          // console.log(user[0]);
          return user[0]
          // return {
            // name: user[0].name,
            // email: user[0].email,
          // };
        }
        throw new Error("Account un");
        ;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
});
