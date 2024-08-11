import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserCreatedListener {
  @OnEvent('user.created')
  handleUserCreatedEvent(username) {
    console.log(
      `the user with username: ${username} has been created successfully `,
    );
  }
}
