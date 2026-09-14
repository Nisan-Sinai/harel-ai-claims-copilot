create or replace function public.list_claims()
returns setof public.claims
language sql
security definer
set search_path = public
as $$
  select * from public.claims order by created_at desc limit 50;
$$;

create or replace function public.get_claim(p_id uuid)
returns setof public.claims
language sql
security definer
set search_path = public
as $$
  select * from public.claims where id = p_id limit 1;
$$;

create or replace function public.create_claim(
  p_description text,
  p_analysis jsonb,
  p_ai_provider text,
  p_model text
)
returns setof public.claims
language plpgsql
security definer
set search_path = public
as $$
begin
  if char_length(p_description) < 15 or char_length(p_description) > 5000 then
    raise exception 'Invalid description length';
  end if;
  return query
  insert into public.claims(description, analysis, ai_provider, model, status)
  values (p_description, p_analysis, p_ai_provider, p_model, 'needs_review')
  returning *;
end;
$$;

create or replace function public.review_claim(
  p_id uuid,
  p_action text,
  p_notes text,
  p_analysis jsonb default null
)
returns setof public.claims
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_action not in ('approve', 'correct') then
    raise exception 'Invalid review action';
  end if;
  return query
  update public.claims
  set status = case when p_action = 'approve' then 'approved' else 'corrected' end,
      reviewer_notes = p_notes,
      analysis = case when p_action = 'correct' and p_analysis is not null then p_analysis else analysis end,
      reviewed_at = now()
  where id = p_id
  returning *;
end;
$$;

revoke all on function public.list_claims() from public;
revoke all on function public.get_claim(uuid) from public;
revoke all on function public.create_claim(text, jsonb, text, text) from public;
revoke all on function public.review_claim(uuid, text, text, jsonb) from public;
grant execute on function public.list_claims() to anon, authenticated;
grant execute on function public.get_claim(uuid) to anon, authenticated;
grant execute on function public.create_claim(text, jsonb, text, text) to anon, authenticated;
grant execute on function public.review_claim(uuid, text, text, jsonb) to anon, authenticated;
