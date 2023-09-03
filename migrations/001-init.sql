----------------------------
-- Up
----------------------------
create table users
(
  id         integer primary key,
  telegramId integer not null
);

create table groups
(
  id   integer primary key,
  name varchar(255) not null
);

create table items
(
  id   integer primary key,
  name varchar(255) not null
);

create table lessons
(
  id   integer primary key,
  date timestamp not null
);

create table lesson_items
(
  lessonId integer not null,
  itemId   integer not null,
  constraint lesson_items_fk_lesson foreign key (lessonId)
    references lessons (id) on update cascade on delete cascade,
  constraint lesson_items_fk_item foreign key (itemId)
    references items (id) on update cascade on delete cascade
);

----------------------------
-- Down
----------------------------
drop table lesson_items;
drop table lessons;
drop table items;
