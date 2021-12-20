import bcrypto from 'bcryptjs'
import { Strategy as LocalStrategy } from 'passport-local'
import { findUser } from './controllers/mainControllers.js'

export default function passportInput(passport) {

    passport.use(new LocalStrategy(

        {
            usernameField: 'loginid',
            passwordField: 'passwd'
        },
        async (loginid, passwd, done) => {

            const user = await findUser(loginid)

            if (!user) return done(null, false)

            if (user) {
                bcrypto.compare(passwd, user[0].passwd, (err, result) => {
                    if (err) {
                        console.log(err)
                        console.log("비밀번호 에러");
                        return done(null, false)
                    }

                    if (result) {

                        return done(null, user[0])
                    }

                    else { return done(null, false) }
                })
            }

        }

    )
    )



    passport.serializeUser((user, done) => {
        console.log('serializeUser', user);
        done(null, user.loginid)
    })


    passport.deserializeUser(async (user, done) => {

        const userData = await findUser(user)
        if (userData) {

            const userInformation = {
                loginid: userData[0].loginid,
                nickname: userData[0].nickname,
                location: userData[0].location
            }

            done(null, userInformation)
        }

    })

    console.log("passport 실행");
}


