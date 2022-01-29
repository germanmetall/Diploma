class Auth {
    constructor(path){
        this.localPath = `${path}/auth`;
    }

    async login(email, password){
        return await fetch(`${this.localPath}/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
    }

    async register(email, password){
        return await fetch(`${this.localPath}/register`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
    }
}

const API = {
    data() {
        let path = "http://localhost:1337/api";
        return {
            Auth: new Auth(path)
        }
    }
}

export default { API };