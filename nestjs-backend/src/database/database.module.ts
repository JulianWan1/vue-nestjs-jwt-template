import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

require('dotenv').config();

const devConnection = process.env.DB_STRING_DEVELOPMENT;
const prodConnection = process.env.DB_STRING_PROD;

// Created dedicated database module to be exported to app.module
// May have issues, just in case fails, switch this connection directly
// to app.module instead
@Module({
  imports:[ MongooseModule.forRoot(devConnection) ],
  exports:[ MongooseModule.forRoot(devConnection) ]
})
export class DatabaseModule {}
