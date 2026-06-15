import { useState } from 'react'
import { RARIDADE_CONFIG } from '../lib/utils'

const RARIDADES = Object.keys(RARIDADE_CONFIG)

const INITIAL = { nome: '', arma: '', preco: '', raridade: 'Secreta', imagem_url: '' }

export default function AddSkinForm({ onAdd }) {
  const [form,    setForm]    = useState(INITIAL)
  const [saving,  setSaving]  = useState(false)
  const [success, setSuccess] = useState(false)
  const [err,     setErr]     = useState(null)

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr(null)

    if (!form.nome.trim() || !form.arma.trim() || !form.preco) {
      setErr('Preencha nome, arma e preço.')
      return
    }

    setSaving(true)
    try {
      await onAdd({
        nome:       form.nome.trim(),
        arma:       form.arma.trim(),
        preco:      parseFloat(form.preco),
        raridade:   form.raridade,
        imagem_url: form.imagem_url.trim() || null,
      })
      setForm(INITIAL)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      setErr(error.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full bg-cs-bg border border-cs-border rounded-lg px-3 py-2.5 text-sm text-cs-text font-body ' +
    'placeholder:text-cs-muted focus:outline-none focus:border-cs-orange transition-colors'

  const labelClass = 'block text-[11px] font-body font-semibold uppercase tracking-widest text-cs-muted mb-1.5'

  return (
    <section id="add" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-5 rounded-full bg-cs-orange inline-block" />
        <h2 className="font-display font-bold text-xl text-cs-text uppercase tracking-widest">
          Adicionar Skin
        </h2>
      </div>

      <div className="bg-cs-surface border border-cs-border rounded-2xl p-6 max-w-2xl">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label className={labelClass}>Nome da Skin *</label>
              <input
                type="text"
                value={form.nome}
                onChange={set('nome')}
                placeholder="ex: Dragon Lore"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Arma *</label>
              <input
                type="text"
                value={form.arma}
                onChange={set('arma')}
                placeholder="ex: AWP"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Preço (R$) *</label>
              <input
                type="number"
                value={form.preco}
                onChange={set('preco')}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Raridade</label>
              <select
                value={form.raridade}
                onChange={set('raridade')}
                className={inputClass}
              >
                {RARIDADES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>URL da Imagem</label>
              <input
                type="url"
                value={form.imagem_url}
                onChange={set('imagem_url')}
                placeholder="https://..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Feedback */}
          {err && (
            <p className="mt-4 text-sm text-red-400 font-body bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {err}
            </p>
          )}
          {success && (
            <p className="mt-4 text-sm text-green-400 font-body bg-green-400/10 border border-green-400/20 rounded-lg px-3 py-2">
              ✓ Skin adicionada com sucesso!
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-5 w-full sm:w-auto px-8 py-2.5 rounded-lg bg-cs-orange text-white font-body font-semibold text-sm
                       hover:bg-orange-500 active:scale-95 transition-all duration-150
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Salvando…' : 'Adicionar Skin'}
          </button>
        </form>
      </div>
    </section>
  )
}
