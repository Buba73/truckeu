-- Tabulka pro německé uzavírky a stavební práce z autobahn.de
create table if not exists roadworks (
  id           bigserial primary key,
  identifier   text unique not null,
  autobahn     text not null,
  type         text not null check (type in ('roadworks', 'closure')),
  title_cs     text not null,
  description_cs text not null default '',
  start_date   timestamptz,
  coordinates  jsonb,
  updated_at   timestamptz not null default now()
);

create index if not exists roadworks_autobahn_idx on roadworks (autobahn);
create index if not exists roadworks_updated_idx on roadworks (updated_at desc);
create index if not exists roadworks_type_idx on roadworks (type);

-- Row Level Security – čtení veřejné, zápis jen service role
alter table roadworks enable row level security;

create policy "public read" on roadworks
  for select using (true);

create policy "service write" on roadworks
  for all using (auth.role() = 'service_role');
