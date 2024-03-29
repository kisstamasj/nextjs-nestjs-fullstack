import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { DataTableQueryParam, Password } from '@app/common';

/**
 * The `UserService` class is responsible for handling user-related operations such as creating a new user, finding a user by their ID or email, updating a user's information, and deleting a user.
 * It interacts with the `User` entity and the `UserRepository` to perform database operations.
 * The class also utilizes the `CreateUserDto` to validate and sanitize user input, and the `Password` class to hash and compare passwords.
 */
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  /**
   * Creates a new user.
   * @param userData - The data for creating a new user.
   * @returns The newly created user object.
   * @throws BadRequestException if the email is already in use.
   */
  async create(userData: CreateUserDto) {
    const user = await this.repo.findOneBy({ email: userData.email });
    if (user) {
      throw new BadRequestException('This email is already in use');
    }

    const password = await Password.toHash(userData.password);
    const newUser = this.repo.create({ ...userData, password });
    return this.repo.save(newUser);
  }

  /**
   * Get all users
   * @returns The user array with all of the users
   */
  async findAll() {
    return this.repo.find();
  }

  /**
   * Find all records for data table.
   *
   * @param {DataTableQueryParam} query - the query parameter
   */
  async findAllForDataTable(query: DataTableQueryParam) {
    const take = query.pagination.limit || 10;
    const skip = query.pagination.skip || 0;
    let where = {};
    if (query.filter) {
      where = query.filter.map((filter) => {
        if (filter.id === 'createdAt' || filter.id === 'updatedAt') {
          return {
            [filter.id]: Equal(new Date(filter.value)),
          };
        }
        return {
          [filter.id]: Like(`%${filter.value}%`),
        };
      });
    }

    const [result, total] = await this.repo.findAndCount({
      order: {
        [query.sort.field]: query.sort.order,
      },
      where,
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns The user object with the specified ID.
   * @throws NotFoundException if the user is not found.
   */
  async findById(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('The user is not found');
    }

    return user;
  }

  /**
   * Finds a user by their email.
   * @param email - The email of the user to find.
   * @returns The user object with the specified email.
   */
  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  /**
   * Updates a user's information.
   * @param id - The ID of the user to update.
   * @param attrs - The attributes to update.
   */
  async update(id: string, attrs: Partial<User>) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User is not found');
    }

    if (attrs.email) {
      const userWithSameEmail = await this.repo.findOneBy({
        email: attrs.email,
      });
      if (userWithSameEmail && userWithSameEmail.id !== id) {
        throw new BadRequestException('This email is already in use');
      }
    }

    if (attrs.password) {
      attrs.password = await Password.toHash(attrs.password);
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  /**
   * Remove a user.
   * @param id - The ID of the user to remove.
   */
  async remove(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User is not found');
    }

    return this.repo.remove(user);
  }
}
