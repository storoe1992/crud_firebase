

export default class User{
    constructor(id,email,name){
        this.id = id;
        this.email = email;
        this.name = name;
    }

    update(user){
        this.name = user.name;
        this.email = user.email;
    }
}