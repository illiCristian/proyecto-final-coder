export class CreateUserDto {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.password = user.password;
    this.rol = user.rol;
    this.cart = user.cart;
  }
}
/* Agregue el user.cart para poder manejarlo desde el front */
export class GetUserDto {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.cart = user.cart;
  }
}
