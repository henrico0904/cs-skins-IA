// ─── Raridades Oficiais do CS2 com as cores solicitadas pelo usuário ────────────────
export const RARIDADE_CONFIG = {
  'Contrabandeada': { label: 'Contrabandeada', color: '#FFD700', glow: 'rgba(255, 215, 0, 0.3)' }, // Dourado
  'Secreta':        { label: 'Secreta',        color: '#FFD700', glow: 'rgba(255, 215, 0, 0.3)' }, // Dourado
  'Classificada':   { label: 'Classificada',   color: '#A335EE', glow: 'rgba(163, 53, 238, 0.3)' }, // Roxo
  'Restrita':       { label: 'Restrita',       color: '#A335EE', glow: 'rgba(163, 53, 238, 0.3)' }, // Roxo
  'Mil-spec':       { label: 'Mil-spec',       color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.2)' }, // Branco
  'Industrial':     { label: 'Industrial',     color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.2)' }, // Branco
  'Consumível':     { label: 'Consumível',     color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.2)' }, // Branco
}

export function getRaridade(raridade) {
  return RARIDADE_CONFIG[raridade] || RARIDADE_CONFIG['Consumível']
}

export function formatPrice(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor)
}

export const WEAR_LEVELS = [
  { id: 'FN', name: 'Nova de Fábrica', multiplier: 1.5, float: '0.00 - 0.07' },
  { id: 'MW', name: 'Pouco Usada',    multiplier: 1.0, float: '0.07 - 0.15' },
  { id: 'FT', name: 'Testada em Campo', multiplier: 0.7, float: '0.15 - 0.37' },
  { id: 'WW', name: 'Bem Desgastada',  multiplier: 0.5, float: '0.37 - 0.45' },
  { id: 'BS', name: 'Veterana de Guerra', multiplier: 0.3, float: '0.45 - 1.00' },
]

export const MOCK_SKINS = [
  { id: '1', nome: 'Dragon Lore', arma: 'AWP', preco: 18500, raridade: 'Contrabandeada', imagem_url: '' },
]
