import UserModel from '../model/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel();

    }

    createUser(username, fullname, password, email, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status) {
        if (!this.userModel.getAll().some(user => user.username === username)) {
            this.userModel.create(username, fullname, password, email, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status);
        } else {
            throw Error(`User with username "${username}" already exists!`);
        }
    }

    loginUser(loginUsername, loginPassword) {
        if (this.userModel.getAll().some(user => { return user.username === loginUsername && user.password === loginPassword && user.admin === "false" && user.status === "available" })) {

            this.userModel.userLogin(loginUsername);

            return true;
        } else if (this.userModel.getAll().some(user => { return user.username === loginUsername && user.password === loginPassword && user.admin === "true" })) {

            this.userModel.adminLogin(loginUsername);
            return true;

        } else {
            throw Error(`Invalid login!`);
        }
    }

    logoutUser() {
        this.userModel.logout();
    }

    getUsers() {
        this.userModel.getAll()
    }
    LoginStatus() {
        this.loggedUser = document.getElementById('name');
        this.imageUser = document.getElementById('image');
        if (sessionStorage.getItem('loggedUser') !== null) {
            this.personLogged = sessionStorage.getItem('loggedUser')
            this.loggedUser.innerHTML = this.personLogged
            return this.personLogged
        } else if (sessionStorage.getItem('loggedAdmin') !== null) {
            this.personLogged = sessionStorage.getItem('loggedAdmin')
            this.loggedUser.innerHTML = this.personLogged
            return this.personLogged
        } else {
            location.href = '../HTML/login.html';
        }
    }

    CheckAdminLogin() {
        if (sessionStorage.getItem('loggedAdmin') !== null) {
            return true;
        } else if (sessionStorage.getItem('loggedUser') !== null) {
            return false
        }
    }

    getUserSettings(username) {

        const users = this.userModel.getAll();
        for (const user of users) {
            if (user.username === username) {

                return user.email;
            }
        }
    }

    getPhoto(username) {
        const users = this.userModel.getAll();
        for (const user of users) {
            if (user.username === username) {
                return user.image;
            }
        }
    }

    getName(username) {
        const users = this.userModel.getAll();
        for (const user of users) {
            if (user.username === username) {
                return user.fullname;
            }
        }
    }



    updateSettings(nPassword, nConfPassword, nEmail) {
        this.samePasswordUpdate = false
        this.passwordUpdate = false;
        this.emailUpdate = false;
        for (const user of this.getUsers()) {
            if (user.username === this.LoginStatus()) {
                if (nPassword === "" && nConfPassword === "") {
                    this.samePasswordUpdate = true;
                    //this.userModel.updatePassword(user.id, user.username, user.fullname, user.password, user.email, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status)
                } else if (nPassword !== nConfPassword) {
                    throw Error(`Password don't match!`);
                } else if (nPassword === nConfPassword && nPassword === user.password) {
                    throw Error(`Your new password can't be the same as the old!`)
                } else if (nPassword === nConfPassword && nPassword !== user.password) {
                    this.passwordUpdate = true;
                    //this.userModel.updatePassword(user.id, user.username, user.fullname, nPassword, user.email, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status)
                }
            }
        }

        if (nEmail === "") {
            throw Error(`Please enter your email!`);
        } else {
            for (const user of this.getUsers()) {
                if (user.email === nEmail && user.username != this.LoginStatus()) {
                    throw Error(`Email : ${nEmail} already exists!`)
                } else if (user.email === nEmail && user.username === this.LoginStatus()) {
                    this.emailUpdate = true
                        //this.userModel.updateEmail(user.id, user.username, user.fullname, user.password, nEmail, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status);
                } else if (user.email !== nEmail && user.username === this.LoginStatus()) {
                    this.emailUpdate = true
                        //this.userModel.updateEmail(user.id, user.username, user.fullname, user.password, nEmail, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status);
                }
            }
        }

        for (const user of this.getUsers()) {
            if (user.username === this.LoginStatus()) {
                if (this.emailUpdate === true && this.passwordUpdate === true) {
                    //this.userModel.updatePassword(user.id, user.username, user.fullname, nPassword, user.email, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status)
                    this.userModel.updateSettings(user.id, user.username, user.fullname, nPassword, nEmail, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status)
                        //this.userModel.updateEmail(user.id, user.username, user.fullname, user.password, nEmail, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status);
                } else if (this.emailUpdate === true && this.samePasswordUpdate === true) {
                    //this.userModel.updatePassword(user.id, user.username, user.fullname, user.password, user.email, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status)
                    this.userModel.updateSettings(user.id, user.username, user.fullname, user.password, nEmail, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status)
                        //this.userModel.updateEmail(user.id, user.username, user.fullname, user.password, nEmail, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status);
                }
            }
        }

    }

    uploadPhoto(nImage) {
        for (const user of this.userModel.getAll()) {
            if (sessionStorage.getItem('loggedUser') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    this.userModel.updatePhoto(user.id, user.username, user.fullname, user.password, user.email, user.birth, nImage, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status)
                }
            } else if (sessionStorage.getItem('loggedAdmin') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    this.userModel.updatePhoto(user.id, user.username, user.fullname, user.password, user.email, user.birth, nImage, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status)
                }
            }
        }
    }

    updateRunData(nStride, nDistance, nEventType) {
        for (const user of this.userModel.getAll()) {
            if (sessionStorage.getItem('loggedUser') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    this.userModel.updateRunData(user.id, user.username, user.fullname, user.password, user.email, user.birth, user.image, user.admin, nStride, nDistance, nEventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, user.status);
                }
            }
        }
    }

    updateEquipmentData(nShirt, nShorts, nShoes) {
        for (const user of this.userModel.getAll()) {
            if (sessionStorage.getItem('loggedUser') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    this.userModel.updateEquipmentData(user.id, user.username, user.fullname, user.password, user.email, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, nShirt, nShorts, nShoes, user.pontos, user.eventsCount, user.status);
                }
            }
        }
    }

    updatePoints(id, username, fullname, password, email, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status) {
        this.userModel.updatePointsEvents(id, username, fullname, password, email, birth, image, admin, stride, distance, eventType, shirt, shorts, shoes, pontos, eventsCount, status);
    }




    getUserRunData() {
        const users = this.userModel.getAll();
        for (const user of users) {
            if (sessionStorage.getItem('loggedUser') !== null) {
                if (sessionStorage.getItem('loggedUser') === user.username) {
                    return user.stride;
                }
            }
        }
    }



    getUsers() {
        const users = this.userModel.getAll()
        return users;
    }

    removeUser(name) {
        this.userModel.remove(name)
    }

    blockUsers(username) {
        const users = this.getUsers()
        this.status = "blocked"
        for (const user of users) {
            if (user.username === username) {
                this.userModel.block(user.id, user.username, user.name, user.password, user.email, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, this.status);
            }
        }

    }

    unblockUsers(username) {
        const users = this.getUsers()
        this.status = "available"
        for (const user of users) {
            if (user.username === username) {
                this.userModel.block(user.id, user.username, user.name, user.password, user.email, user.birth, user.image, user.admin, user.stride, user.distance, user.eventType, user.shirt, user.shorts, user.shoes, user.pontos, user.eventsCount, this.status);
            }
        }

    }
}