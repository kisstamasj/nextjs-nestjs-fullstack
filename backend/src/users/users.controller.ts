import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  DataTableQueryParam,
  IRequestUser,
  RequestUser,
  Serialize,
} from '@app/common';
import { AccessTokenGuard } from '../auth/guards';
import { UserDto } from './dtos/user.dto';

/**
 * The UserController class handles HTTP requests related to user operations.
 */
@Controller('users')
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves the user profile.
   * @param req - The Express request object.
   * @returns The user profile.
   */
  @Get('profile')
  @Serialize(UserDto)
  getProfile(@RequestUser() user: IRequestUser) {
    return this.usersService.findById(user.id);
  }

  /**
   * Creates a new user.
   * @param body - The data for creating the user.
   * @returns A promise that resolves to the newly created user.
   */
  @Post()
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of all users.
   */
  @Get()
  async findAll(
    @Query()
    query: DataTableQueryParam,
  ) {
    const { data, count } = await this.usersService.findAllForDataTable(query);
    return { data, count };
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns A promise that resolves to the user with the specified ID.
   */
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  /**
   * Updates a user with the specified ID using the provided data.
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data to update the user with.
   * @returns A promise that resolves to the updated user.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Deletes a user with the specified ID.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves to the deleted user.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
