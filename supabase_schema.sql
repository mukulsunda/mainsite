-- 1. Create a table for user profiles
create table public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  email text,
  first_name text,
  last_name text,
  phone text,
  address text,
  city text,
  state text,
  zip_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Create policies
-- Allow users to view their own profile
create policy "Users can view own profile" on public.profiles
  for select using ((select auth.uid()) = id);

-- Allow users to insert their own profile
create policy "Users can insert own profile" on public.profiles
  for insert with check ((select auth.uid()) = id);

-- Allow users to update their own profile
create policy "Users can update own profile" on public.profiles
  for update using ((select auth.uid()) = id);

-- 4. Create a function to handle new user signup
-- This function automatically runs when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 5. Create the trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
