import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * A class representing a user in the database.
 * Attributes:
 *    id (str): The unique identifier of the user.
 *    email (str): The email address of the user.
 *    firstName (str): The first name of the user.
 *    lastName (str): The last name of the user.
 *    password (str): The password of the user.
 */
@Entity()
export class User {
  /**
   * The unique identifier of the user.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The email address of the user.
   */
  @Column({ unique: true, collation: 'utf8mb4_general_ci' })
  email: string;

  /**
   * The name of the user.
   */
  @Column({ collation: 'utf8mb4_general_ci' })
  name: string;

  /**
   * The password of the user.
   */
  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
