import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  private fakeData = [
    { id: 1, username: 'ahmed', email: 'ahmed@gmail.com', age: 30 },
  ];
  getAllUsers() {
    return this.fakeData;
  }
  creatUser(userData) {
    this.fakeData.push(userData);
    return;
  }
  deleteUser(id) {
    const user = this.fakeData.find((el) => el.id === id);
    if (user) this.fakeData = this.fakeData.filter((el) => el.id !== id);
    return user;
  }
  getUserById(id) {
    const user = this.fakeData.find((el) => el.id === id);
    return user;
  }
  editUserById(id, userData) {
    this.fakeData = this.fakeData.map((el) => {
      if (el.id === id) return { ...el, ...userData };
      else return el;
    });
    return this.fakeData.find((user) => user.id === id);
  }
}
