// ─── Raridade → cores oficiais do CS2 ─────────────────────────────────────────
export const RARIDADE_CONFIG = {
  'Contrabandeada': { label: 'Contrabandeada', color: '#e4ae39', glow: 'rgba(228, 174, 57, 0.3)' }, // Gold
  'Secreta':        { label: 'Secreta',        color: '#eb4b4b', glow: 'rgba(235, 75, 75, 0.3)' },  // Red
  'Classificada':   { label: 'Classificada',   color: '#d32ce6', glow: 'rgba(211, 44, 230, 0.25)' }, // Pink/Purple
  'Restrita':       { label: 'Restrita',       color: '#8847ff', glow: 'rgba(136, 71, 255, 0.2)' },  // Purple/Blue
  'Mil-spec':       { label: 'Mil-spec',       color: '#4b69ff', glow: 'rgba(75, 105, 255, 0.15)' }, // Blue
  'Industrial':     { label: 'Industrial',     color: '#5e98d9', glow: 'rgba(94, 152, 217, 0.1)' },  // Light Blue
  'Consumível':     { label: 'Consumível',     color: '#b0c3d9', glow: 'rgba(176, 195, 217, 0.1)' }, // Grey
}

export function getRaridade(raridade) {
  // Tenta encontrar a raridade ou retorna Consumível como padrão
  return RARIDADE_CONFIG[raridade] || RARIDADE_CONFIG['Consumível']
}

export function formatPrice(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(valor)
}

// MOCK_SKINS atualizado com raridades corretas para teste
export const MOCK_SKINS = [
  { id: '1', nome: 'Dragon Lore', arma: 'AWP', preco: 18500, raridade: 'Contrabandeada', imagem_url: '' },
  { id: '2', nome: 'Howl', arma: 'M4A4', preco: 12000, raridade: 'Contrabandeada', imagem_url: '' },
]
