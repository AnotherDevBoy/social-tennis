export class CreateTournamentDTO {
  title: string;
  subtitle?: string;
  admin_password?: string;
  user_password?: string;

  constructor(
    title: string,
    subtitle?: string,
    admin_password?: string,
    user_password?: string
  ) {
    this.title = title;
    this.subtitle = subtitle;
    this.admin_password = admin_password;
    this.user_password = user_password;
  }

  static validate(body: any): { valid: boolean; error?: any } {
    const { title } = body;
    if (!title) {
      return {
        valid: false,
        error: {
          error_code: 'INVALID_TITLE',
          message: 'The "title" is empty'
        }
      };
    }
    return { valid: true };
  }

  static fromRequestBody(body: any): CreateTournamentDTO {
    const { title, subtitle, admin_password, user_password } = body;
    return new CreateTournamentDTO(title, subtitle, admin_password, user_password);
  }
}
