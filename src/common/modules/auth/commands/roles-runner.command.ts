import mongoose from 'mongoose';
import { Command, CommandRunner } from 'nest-commander';
import { APIConfigService } from '../../api-config/api-config.service';
import { User, UserSchema } from '../../user/entities/user.entity';
import { Role, RoleSchema } from '../entities/role.entity';

@Command({
  name: 'roles:seed',
  options: { isDefault: false },
})
export class RolesRunner implements CommandRunner {
  private readonly roles = [{ name: 'default', isDefault: true }];

  constructor(private apiConfigService: APIConfigService) {}

  async run(): Promise<void> {
    console.log('------------------------------------------------------------');
    console.log('Begin role seeds');

    await mongoose.connect(
      `${this.apiConfigService.env.database.connection}://${this.apiConfigService.env.database.host}:${this.apiConfigService.env.database.port}`,
      {
        user: this.apiConfigService.env.database.user,
        pass: this.apiConfigService.env.database.pass,
        dbName: this.apiConfigService.env.database.name,
      },
    );
    const userModel = mongoose.model(User.name, UserSchema);
    const user = await userModel.findOne({ isAdmin: true }).exec();
    for (const key in this.roles) {
      const item = this.roles[key];
      const roleModel = mongoose.model(Role.name, RoleSchema);
      const role = await roleModel.findOne({ name: item.name }).exec();
      if (!role) {
        console.log(item);
        await roleModel.create({
          ...item,
          createdBy: user.id,
          updatedBy: user.id,
        });
      }
    }
    await mongoose.disconnect();

    console.log('End role seeds');
    console.log('------------------------------------------------------------');
  }
}
