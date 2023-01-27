export class Const {

  public static get baseServidor(): string { return "http://localhost:8080"}

  public static get baseLogin(): string { return this.baseServidor + "/wero/login"}

  public static get baseUrl(): string { return this.baseServidor + "/wero/usuario"}
}
