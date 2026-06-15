import { supabase } from './supabase'

// ─── Buscar todas as skins ────────────────────────────────────────────────────
// Retorna as skins ordenadas por preço (mais caras primeiro).
export async function fetchSkins() {
  const { data, error } = await supabase
    .from('ideias')
    .select('*')
    .order('preco', { ascending: false })

  if (error) throw new Error(`Erro ao buscar skins: ${error.message}`)
  return data
}

// ─── Buscar skins do carrossel (top 8 mais caras) ─────────────────────────────
export async function fetchCarouselSkins() {
  const { data, error } = await supabase
    .from('ideias')
    .select('*')
    .order('preco', { ascending: false })
    .limit(8)

  if (error) throw new Error(`Erro ao buscar carrossel: ${error.message}`)
  return data
}

// ─── Inserir nova skin ────────────────────────────────────────────────────────
// Campos esperados na tabela `ideias`:
//   id         uuid (gerado automaticamente)
//   nome       text
//   arma       text
//   preco      numeric
//   raridade   text   ('Consumível' | 'Industrial' | 'Mil-spec' | 'Restrita' | 'Classificada' | 'Secreta' | 'Contrabandeada')
//   imagem_url text
//   criado_em  timestamptz (default now())
export async function insertSkin({ nome, arma, preco, raridade, imagem_url }) {
  const { data, error } = await supabase
    .from('ideias')
    .insert([{ nome, arma, preco, raridade, imagem_url }])
    .select()
    .single()

  if (error) throw new Error(`Erro ao inserir skin: ${error.message}`)
  return data
}

// ─── Deletar skin por id ──────────────────────────────────────────────────────
export async function deleteSkin(id) {
  const { error } = await supabase
    .from('ideias')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Erro ao deletar skin: ${error.message}`)
}
