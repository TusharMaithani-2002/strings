import User from '@/app/models/user';
import { connectToDB } from '@/app/utils/database';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const options = {
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_CLIENTID as string,
            clientSecret:process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENTID as string,
            clientSecret:process.env.GOOGLE_SECRET as string
        })
    ],

    callbacks:{
        async jwt({token,user}:any) {
            if(user) token.accessToken = user.accessToken
            return token
        },

        async session({session}:any) {
            const sessionUser = await User.findOne({
                email:session.user.email
            })

            session.user.id = sessionUser?._id.toString();
            return session;
        },

        async signIn({profile}:any) {
            console.log('we are in sign in')
            try {
                await connectToDB();

                const userExists = await User.findOne({
                    email:profile.email
                })

                if(!userExists) {

                    const newUser = new User({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    })

                    await newUser.save();
                }

                return true;
            }
            catch(error:any) {
                throw new Error("Error while signing up! message: "+error.message)
            }
        }

    }
}