import * as mongoose from 'mongoose'

// Schema created defines the structure of the model within the collection
export const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
})