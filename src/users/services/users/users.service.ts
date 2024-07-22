import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private fakeData = [{ id: 1, username: 'ahmed', email: 'ahmed@gmail.com' }];
  getAllUsers() {
    return this.fakeData;
  }
  creatUser(userData) {
    this.fakeData.push(userData);
    return;
  }
  deleteUser(id) {
    this.fakeData = this.fakeData.filter((el) => el.id !== id);
    return;
  }
  getUserById(id) {
    const user = this.fakeData.find((el) => el.id === id);
    if (user == undefined) throw new NotFoundException('Resource not found');
    return user;
  }
}
