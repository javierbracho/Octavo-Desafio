class userDto {
    constructor(first_name, last_name, email, role, cartId) {
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.role = role,
        this.cartId = cartId.toString();    }
}

export default userDto