// ─── Raridade → classe de cor ─────────────────────────────────────────────────
export const RARIDADE_CONFIG = {
  'Contrabandeada': { label: 'Contrabandeada', color: '#FF4E9F', glow: 'rgba(255,78,159,0.35)' },
  'Secreta':        { label: 'Secreta',        color: '#FF6B35', glow: 'rgba(255,107,53,0.35)' },
  'Classificada':   { label: 'Classificada',   color: '#4A9EFF', glow: 'rgba(74,158,255,0.35)' },
  'Restrita':       { label: 'Restrita',       color: '#9B59B6', glow: 'rgba(155,89,182,0.35)' },
  'Mil-spec':       { label: 'Mil-spec',       color: '#4A6EFF', glow: 'rgba(74,110,255,0.35)' },
  'Industrial':     { label: 'Industrial',     color: '#6BB8FF', glow: 'rgba(107,184,255,0.25)' },
  'Consumível':     { label: 'Consumível',     color: '#A0A0B8', glow: 'rgba(160,160,184,0.20)' },
}

export function getRaridade(raridade) {
  return RARIDADE_CONFIG[raridade] ?? RARIDADE_CONFIG['Consumível']
}

export function formatPrice(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor)
}

// ─── Mock data (usado quando Supabase não está configurado) ───────────────────
export const MOCK_SKINS = [
  { id: '1', nome: 'Dragon Lore',       arma: 'AWP',          preco: 18500, raridade: 'Contrabandeada', imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id: '2', nome: 'Howl',              arma: 'M4A4',         preco: 12000, raridade: 'Contrabandeada', imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id: '3', nome: 'Fire Serpent',      arma: 'AK-47',        preco: 8900,  raridade: 'Contrabandeada', imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id: '4', nome: 'Fade',              arma: 'Karambit',     preco: 4200,  raridade: 'Secreta',        imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id: '5', nome: 'Asiimov',           arma: 'AWP',          preco: 980,   raridade: 'Secreta',        imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id: '6', nome: 'Hyper Beast',       arma: 'M4A1-S',       preco: 650,   raridade: 'Secreta',        imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id: '7', nome: 'Neon Rider',        arma: 'M4A1-S',       preco: 320,   raridade: 'Classificada',   imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id: '8', nome: 'Vulcan',            arma: 'AK-47',        preco: 290,   raridade: 'Classificada',   imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id: '9', nome: 'Redline',           arma: 'AK-47',        preco: 85,    raridade: 'Classificada',   imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id:'10', nome: 'Desolate Space',    arma: 'M4A1-S',       preco: 62,    raridade: 'Restrita',       imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id:'11', nome: 'Cyrex',             arma: 'M4A1-S',       preco: 48,    raridade: 'Restrita',       imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
  { id:'12', nome: 'Bloodsport',        arma: 'AK-47',        preco: 38,    raridade: 'Restrita',       imagem_url: 'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I4ipSrpav3tEFlpAXk8QJQwNxRSA2//500x500' },
]
