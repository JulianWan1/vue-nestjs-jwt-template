import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

// Importing the MongooseModule.forFeature 
// - to set up the user model (which follows UserSchema) in the db
// - to be used by UsersService for any CRUD operations
@Module({
  imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]) ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
