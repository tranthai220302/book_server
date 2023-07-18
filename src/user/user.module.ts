import { Module } from '@nestjs/common';
import { ControllerController } from './controller/controller.controller';
import { ServiceService } from './service/service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Entity/user';
import { Postt } from '../Entity/post';
@Module({
  imports:[TypeOrmModule.forFeature([User, Postt])],
  controllers: [ControllerController],
  providers: [ServiceService]
})
export class UserModule {}
