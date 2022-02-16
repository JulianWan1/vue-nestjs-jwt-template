// To define how data will be sent over the network
export class UserDto {
  readonly username: string;
  readonly hash: string;
  readonly salt: string;
}