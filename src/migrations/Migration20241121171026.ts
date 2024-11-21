import { Migration } from '@mikro-orm/migrations';

export class Migration20241121171026 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create table "users"
                 (
                     "id"            serial primary key,
                     "email"         varchar(255) not null,
                     "password_hash" varchar(255) not null,
                     "created_at"    timestamptz  not null
                 );`);
    this.addSql(`alter table "users"
        add constraint "users_email_unique" unique ("email");`);

    this.addSql(`create table "tasks"
                 (
                     "id"          serial primary key,
                     "description" varchar(255) not null,
                     "created_at"  timestamptz  not null,
                     "due_date"    timestamptz null,
                     "user_id"     int          not null
                 );`);

    this.addSql(`alter table "tasks"
        add constraint "tasks_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "tasks" drop constraint "tasks_user_id_foreign";`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "tasks" cascade;`);
  }
}
