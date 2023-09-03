export class UserEntity {
  id: number;
  telegramId: number;

  constructor(id: number, telegramId: number) {
    this.id = id;
    this.telegramId = telegramId;
  }
}
