-- ────────────────────────────────────────────────────────────────────────────
-- CS Skins — Schema Supabase
-- Execute no SQL Editor do seu projeto Supabase
-- ────────────────────────────────────────────────────────────────────────────

create table if not exists public.ideias (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null,
  arma        text not null,
  preco       numeric(12, 2) not null default 0,
  raridade    text not null default 'Mil-spec',
  imagem_url  text,
  criado_em   timestamptz not null default now()
);

-- Índice para ordenação por preço (consultas mais rápidas)
create index if not exists ideias_preco_idx on public.ideias (preco desc);

-- Row Level Security (RLS) — habilite de acordo com sua necessidade
alter table public.ideias enable row level security;

-- Política pública de leitura (qualquer visitante pode ver as skins)
create policy "leitura_publica" on public.ideias
  for select using (true);

-- Política de escrita apenas para usuários autenticados
-- (remova ou ajuste se quiser inserções anônimas)
create policy "insercao_autenticada" on public.ideias
  for insert with check (auth.role() = 'authenticated');

create policy "exclusao_autenticada" on public.ideias
  for delete using (auth.role() = 'authenticated');

-- ────────────────────────────────────────────────────────────────────────────
-- Seeds — dados iniciais para teste
-- ────────────────────────────────────────────────────────────────────────────
insert into public.ideias (nome, arma, preco, raridade, imagem_url) values
  ('Dragon Lore',    'AWP',      18500.00, 'Contrabandeada', null),
  ('Howl',           'M4A4',     12000.00, 'Contrabandeada', null),
  ('Fire Serpent',   'AK-47',     8900.00, 'Contrabandeada', null),
  ('Fade',           'Karambit',  4200.00, 'Secreta',        null),
  ('Asiimov',        'AWP',        980.00, 'Secreta',        null),
  ('Hyper Beast',    'M4A1-S',     650.00, 'Secreta',        null),
  ('Neon Rider',     'M4A1-S',     320.00, 'Classificada',   null),
  ('Vulcan',         'AK-47',      290.00, 'Classificada',   null),
  ('Redline',        'AK-47',       85.00, 'Classificada',   null),
  ('Desolate Space', 'M4A1-S',      62.00, 'Restrita',       null);
