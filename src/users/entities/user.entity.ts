import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  id: bigint;

  @Property({ type: 'string', name: 'email' })
  @Unique()
  email: string;

  @Property({ type: 'string', name: 'password_hash' })
  passwordHash: string;

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
    name: 'created_at',
  })
  createdAt: Date = new Date();
}
