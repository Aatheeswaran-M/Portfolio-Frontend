# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contact Form Email Notifications

The contact form uses EmailJS to send inquiry notifications to your email inbox.

1. Copy `.env.example` to `.env`.
2. Add your EmailJS values:
	- `VITE_EMAILJS_SERVICE_ID`
	- `VITE_EMAILJS_TEMPLATE_ID`
	- `VITE_EMAILJS_PUBLIC_KEY`
3. Restart the dev server after saving `.env`.

## Admin Content Cloud Storage (Supabase)

The admin dashboard now saves content to Supabase so updates persist online across devices.

1. Add these environment variables (locally and in your Vercel project settings):
	 - `VITE_SUPABASE_URL`
	 - `VITE_SUPABASE_ANON_KEY`
	 - `VITE_SUPABASE_CONTENT_TABLE` (default: `portfolio_content`)
	 - `VITE_SUPABASE_CONTENT_ROW_ID` (default: `portfolio-main`)

2. Create the table in Supabase SQL editor:

```sql
create table if not exists public.portfolio_content (
	id text primary key,
	content jsonb not null,
	updated_at timestamptz not null default now()
);
```

3. Enable RLS and add policies for the dashboard writes (adjust for your security model):

```sql
alter table public.portfolio_content enable row level security;

create policy "Allow anonymous read portfolio content"
on public.portfolio_content
for select
to anon
using (true);

create policy "Allow anonymous upsert portfolio content"
on public.portfolio_content
for all
to anon
using (true)
with check (true);
```

4. In Vercel, redeploy after adding environment variables.

If cloud save fails, the dashboard still saves to localStorage and shows a cloud sync warning with the error message.
