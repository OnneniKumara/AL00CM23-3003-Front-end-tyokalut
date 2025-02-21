export class PersonalData {

  // käyttäjälomakkemallin määrittely
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.id = this.randomInt(1, 1000);
    this.username = "";
    this.firstname = "";
    this.lastname = "";
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
  }

  // satunnaisen kokonaisluvun generointi
  // 'olevinaan' käyttäjätunnuksen id:ksi,
  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
