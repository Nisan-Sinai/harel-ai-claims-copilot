create extension if not exists pgcrypto;
create table if not exists public.claims (id uuid primary key default gen_random_uuid(),description text not null check (char_length(description) between 15 and 5000),analysis jsonb not null,ai_provider text not null default 'unknown',model text not null default 'unknown',status text not null default 'needs_review' check (status in ('new','needs_review','approved','corrected')),reviewer_notes text,reviewed_at timestamptz,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create index if not exists claims_created_at_idx on public.claims (created_at desc); create index if not exists claims_status_idx on public.claims (status); create index if not exists claims_type_idx on public.claims ((analysis->>'claimType'));
create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists claims_set_updated_at on public.claims; create trigger claims_set_updated_at before update on public.claims for each row execute procedure public.set_updated_at();
alter table public.claims enable row level security;
