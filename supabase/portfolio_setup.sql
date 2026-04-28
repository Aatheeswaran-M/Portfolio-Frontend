-- Portfolio Supabase setup
-- Run this in the Supabase SQL Editor for the project used by this app.

begin;

-- =========================
-- 1. Portfolio content table
-- =========================

create table if not exists public.portfolio_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_portfolio_content_updated_at on public.portfolio_content;

create trigger set_portfolio_content_updated_at
before update on public.portfolio_content
for each row
execute function public.set_updated_at();

alter table public.portfolio_content enable row level security;

drop policy if exists "Allow anonymous read portfolio content" on public.portfolio_content;
create policy "Allow anonymous read portfolio content"
on public.portfolio_content
for select
to anon
using (true);

drop policy if exists "Allow anonymous insert portfolio content" on public.portfolio_content;
create policy "Allow anonymous insert portfolio content"
on public.portfolio_content
for insert
to anon
with check (true);

drop policy if exists "Allow anonymous update portfolio content" on public.portfolio_content;
create policy "Allow anonymous update portfolio content"
on public.portfolio_content
for update
to anon
using (true)
with check (true);

insert into public.portfolio_content (id, content)
values ('portfolio-main', '{}'::jsonb)
on conflict (id) do nothing;

-- =========================
-- 2. Optional media bucket
-- =========================
-- Keep this section if you want to store images and resumes in Supabase Storage.
-- If you use Cloudinary only, you can still run it safely or remove this section.

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view site-media files" on storage.objects;
create policy "Public can view site-media files"
on storage.objects
for select
to public
using (bucket_id = 'site-media');

drop policy if exists "Anon can upload site-media files" on storage.objects;
create policy "Anon can upload site-media files"
on storage.objects
for insert
to anon
with check (bucket_id = 'site-media');

drop policy if exists "Anon can update site-media files" on storage.objects;
create policy "Anon can update site-media files"
on storage.objects
for update
to anon
using (bucket_id = 'site-media')
with check (bucket_id = 'site-media');

drop policy if exists "Anon can delete site-media files" on storage.objects;
create policy "Anon can delete site-media files"
on storage.objects
for delete
to anon
using (bucket_id = 'site-media');

commit;
