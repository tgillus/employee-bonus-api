export class MessagesService {
  async all(): Promise<string[]> {
    return [''];
  }

  async save(message: string): Promise<string[]> {
    return [message];
  }
}
