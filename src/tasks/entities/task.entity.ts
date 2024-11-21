import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'tasks' })
export class Task {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  id: bigint;

  @Property({ type: 'string' })
  description: string;

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
    name: 'created_at',
  })
  creationDate: Date = new Date();

  @Property({ type: 'datetime', nullable: true, name: 'due_date' })
  dueDate?: Date;

  @ManyToOne(() => User)
  user: User;
}
