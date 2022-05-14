import { ConsoleLogger } from '@nestjs/common';
import { SystemMessage } from 'src/model/system_message.model';
import { DatabaseQuery } from './firebase.database';

export class Verification {
  private static systemMessage = new SystemMessage();

  static async verifyID(id: string) {
    if (await DatabaseQuery.hasID(id)) {
      throw this.systemMessage.error(506);
    }
  }
}
