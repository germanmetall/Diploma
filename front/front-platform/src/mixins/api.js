class Auth {
    constructor(path){
        this.localPath = `${path}`;
    }

    async login(email, password){
        return await fetch(`${this.localPath}/auth/local`, {
            method: "POST",
            body: JSON.stringify({
                identifier: email,
                password: password
            }),
            headers: {
                "content-type": "application/json"
            }
        });
    }
}
class Profile{
    constructor(path){
        this.localPath = `${path}/users`;
    }

    async me(){
        let token = localStorage.getItem("jwt");
        return await fetch(`${this.localPath}/me?populate[0]=avatar&populate[1]=Platform_levels`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async getLevel(userID){
        let token = localStorage.getItem("jwt");
        return await fetch(`${this.localPath}/${userID}?populate[0]=Platform_levels`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async update(username, contacts){
        let resp = await this.me();
        let body = await resp.json();
        let id = body.id;
        let token = localStorage.getItem("jwt");
        console.log(token);
        return await fetch(`${this.localPath}/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                username: username,
                Contacts: contacts
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        });
    }
}
class Courses {
    constructor(path){
        this.path = path;
        this.localPath = `${path}/platform-courses`;
    }

    async get(){
        let token = localStorage.getItem("jwt");
        return await fetch(`${this.localPath}?populate=%2A`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async getMine(){
        let all = await this.get();
        let body = await all.json();
        console.log(body);
        let courses = body.data;
        let me = await (new Profile(this.path).me());
        body = await me.json();
        console.log(body, courses);

        courses = courses.filter(el => {
            for(let i=0; i<el.attributes.students.data.length; i++){
                if(el.attributes.students.data[i].attributes.email===body.email) return true;
            }
        });
        return courses;
    }

    async getById(id){
        let token = localStorage.getItem("jwt");
        let level = 1;
        let populateFilterQuery = `populate[platform_events][filters][level][$gte]=0&populate[platform_materials][populate]=Included_files&populate[students][populate]=avatar&populate[platform_materials][filters][level][$gte]=0&populate[platform_tasks][populate]=platform_tasks&populate[platform_tasks][filters][level][$gte]=0`;
        return await fetch(`${this.localPath}/${id}?${populateFilterQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async getAvatar(id){
        let token = localStorage.getItem("jwt");
        let populateFilterQuery = `populate[0]=Avatar`;
        return await fetch(`${this.localPath}/${id}?${populateFilterQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // TODO ?
    async register(email, id){
        let token = localStorage.getItem("jwt");
        let resp = await this.getMine(email);
        let body = await resp.json();
        let levels = JSON.parse(body.levels);
        levels.push({
            id: id,
            level: 0
        });
        return await fetch(`${path}/platform-users/${email}`, {
            method: "PUT",
            body: JSON.stringify({
                data: {
                    levels: levels
                }
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        });
    }
}
class Tasks {
    constructor(path){
        this.localPath = `${path}`;
    }

    async getById(id){
        let token = localStorage.getItem("jwt");
        return await fetch(`${this.localPath}/platform-tasks/${id}?populate=*`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async send(task_id, answersAndIds){
        let resp, body;
        let token = localStorage.getItem("jwt");

        let idArr = [];
        for(let i=0; i<answersAndIds.length; i++){
            // answers-to-one-task
            resp = await fetch(`${this.localPath}/platform-answer-to-one-tasks`, {
                method: "POST",
                body: JSON.stringify({
                    data:{
                        studentAnswer: answersAndIds[i].answer,
                        platform_one_task: answersAndIds[i].id
                    }
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json"
                }
            })
            body = await resp.json();
            console.log(body.data);
            idArr.push(body.data.id);
        }

        // answers-to-task
        console.log(JSON.stringify({
            data:{
                platform_task: task_id,
                platform_answer_to_one_tasks: idArr,
                users: body.id
            }
        }));
        let me = await (new Profile(this.localPath).me());
        body = await me.json();
        console.log(body);
        resp = await fetch(`${this.localPath}/answers`, {
            method: "POST",
            body: JSON.stringify({
                data:{
                    platform_task: task_id,
                    platform_answer_to_one_tasks: idArr,
                    users: body.id
                }
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        })
        body = await resp.json();

        // check if right
        let isRightData = [];
        for(let i=0; i<answersAndIds.length; i++){
            isRightData[i] = {
                taskID: answersAndIds[i].id,
                answer: answersAndIds[i].answer,
                answerID: idArr[i]
            };
        }

        resp = await fetch("https://polonska-diploma.herokuapp.com:1338",{
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                listAnswers: isRightData
            })
        });
        body = await resp.json();
        console.log(body);
        return body;
    }
}
const platformAPI = {
    data() {
        let path = "https://polonska-diploma.herokuapp.com/api";
        return {
            Auth: new Auth(path),
            Courses: new Courses(path),
            Tasks: new Tasks(path),
            Profile: new Profile(path)
        }
    }
}

export default { platformAPI };