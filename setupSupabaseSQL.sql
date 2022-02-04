-- Create a table for Public Profiles
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text,
  avatar_url text,
  github_profile json,
  projects json,
  

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;


create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );


  -- inserts a row into public.profiles
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


  -- Create a table for projects
create table projects (
  id uuid not null,
  creator uuid references auth.users not null,
  name text not null,
  description text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  backlog json,
  users json,
  tags json,
  tutorials json,

  primary key (id)
);

alter table projects enable row level security;

-- Policy for projects
CREATE POLICY "User can check projects"
  on projects for select
  using ( true );

create policy "User can insert projects"
  on projects for insert
  with check ( true );

create policy "User can update projects"
  on projects for update
  using ( auth.uid() = creator );
  -- Create a table for admin
create table admin_list (
  id uuid not null,
  isadmin boolean,

  primary key (id)
);

alter table admin_list enable row level security;

create function push_projectid_to_profile()
returns trigger as $$
begin
  update profiles
  set projects = array_append(projects, new.id::text)
  where id = new.creator;
  return new;
  end;
$$ language plpgsql security definer;

create trigger on_project_created
  after insert on projects
  for each row execute procedure push_projectid_to_profile();