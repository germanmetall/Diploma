class MainTexts {
    constructor(path){
        this.localPath = `${path}/text`;
    }

    async get(){
        return await fetch(`${this.localPath}`);
    }
}

class Courses {
    constructor(path){
        this.localPath = `${path}/courses`;
    }

    async get(){
        return await fetch(`${this.localPath}`);
    }
    async getById(id){
        return await fetch(`${this.localPath}/${id}`);
    }
}

class Blog {
    constructor(path){
        this.localPath = `${path}/blogs`;
    }

    async get(){
        return await fetch(`${this.localPath}`);
    }
    async getById(id){
        return await fetch(`${this.localPath}/${id}`);
    }
}

class FAQ {
    constructor(path){
        this.localPath = `${path}/faqs`;
    }

    async get(){
        return await fetch(`${this.localPath}`);
    }
}

class Contacts {
    constructor(path){
        this.localPath = `${path}/contacts?populate=%2A`;
    }

    async get(){
        return await fetch(`${this.localPath}`);
    }
}

const landingAPI = {
    data() {
        let path = "https://polonska-diploma.herokuapp.com/api";
        return {
            Text: new MainTexts(path),
            Courses: new Courses(path),
            Blog: new Blog(path),
            FAQ: new FAQ(path),
            Contacts: new Contacts(path)
        }
    }
}

export default { landingAPI };