class UserDTO {
    constructor(user) {
        this.id = user.user_id;
        this.name = user.name;
        this.surname = user.surname;
        this.username = user.username;
    }
}

export default UserDTO;