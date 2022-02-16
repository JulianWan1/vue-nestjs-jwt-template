import { Document } from 'mongoose'

// Setting the User interface for the users.service file
// Assumption: UserInterface extends to Document to allow it
// to conform with mongoose Document format?
export interface UserInterface extends Document {
  readonly username: string;
  readonly hash: string;
  readonly salt: string;
};