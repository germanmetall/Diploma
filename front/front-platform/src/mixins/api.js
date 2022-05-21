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
class Courses {
    constructor(path){
        this.localPath = `${path}/platform-courses`;
    }

    async get(){
        return await fetch(`${this.localPath}?populate=%2A`);
    }

    // TODO implement norm
    async getMine(){
        return await fetch(`${this.localPath}?populate=%2A`);
    }

    async getById(id){
        let populateQuery = `populate[0]=teacher.avatar&populate[1]=platform_events&populate[2]=students.avatar&populate[3]=platform_materials.Included_files&populate[4]=platform_tasks.platform_tasks`;
        return await fetch(`${this.localPath}/${id}?${populateQuery}`);
    }
}
class Tasks {
    constructor(path){
        this.localPath = `${path}/platform-tasks`;
    }

    async getById(id){
        return await fetch(`${this.localPath}/${id}?populate=*`);
    }
}
const API = {
    data() {
        let path = "http://localhost:1337/api";
        return {
            Auth: new Auth(path),
            Courses: new Courses(path),
            Tasks: new Tasks(path)
        }
    }
}

export default { API };