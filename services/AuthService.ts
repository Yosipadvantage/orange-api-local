export default class AuthService {

    private url = '/jsserver';

    public login(user: string, password: string) {
        const parametros = {
            ServiceName: "OrangeBase",
            MethodHash: "com.advantage.bean.account.WorkSession_validateWorkSession_String_String_String_String_String_String",

            ArgumentList: [
                user,
                password
            ]
        }

    }

}