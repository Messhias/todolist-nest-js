import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import mikroOrmConfig from './mikro-orm.config';
import { UsersController } from './users/users.controller';
import { TasksController } from './tasks/tasks.controller';
import { UsersService } from './users/users.service';
import { TasksService } from './tasks/tasks.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController, TasksController],
  providers: [AppService, UsersService, TasksService],
})
export class AppModule {}
