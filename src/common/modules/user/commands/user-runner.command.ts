import mongoose from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';
import * as bcrypt from 'bcrypt';

import { APIConfigService } from '../../api-config/api-config.service';
import { User, UserSchema } from '../../user/entities/user.entity';

@Command({
  name: 'users:seed',
  options: { isDefault: false },
})
export class UsersRunner implements CommandRunner {
  private readonly users = [
    { username: 'admin', password: '12345', isAdmin: true },
  ];

  constructor(private apiConfigService: APIConfigService) {}

  async run(): Promise<void> {
    console.log('------------------------------------------------------------');
    console.log('Begin user seeds');

    await mongoose.connect(
      `${this.apiConfigService.env.database.connection}://${this.apiConfigService.env.database.host}:${this.apiConfigService.env.database.port}`,
      {
        user: this.apiConfigService.env.database.user,
        pass: this.apiConfigService.env.database.pass,
        dbName: this.apiConfigService.env.database.name,
      },
    );

    for (const key in this.users) {
      const item = this.users[key];
      const userModel = mongoose.model(User.name, UserSchema);
      const user = await userModel.findOne({ username: item.username }).exec();
      if (!user) {
        const hash = await bcrypt.hash(
          item.password,
          this.apiConfigService.env.hash.salt,
        );
        item.password = hash;
        console.log(item);
        await userModel.create(item);
      }
    }
    await mongoose.disconnect();

    console.log('End user seeds');
    console.log('------------------------------------------------------------');
  }
}
