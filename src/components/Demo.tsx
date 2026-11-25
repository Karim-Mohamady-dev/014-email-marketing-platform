import { useState } from 'react'
import { CheckCircle, PaperPlaneTilt } from '@phosphor-icons/react'
import type { Dict, TArrFn, TFn } from '../App.tsx'

function str(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

export default function Demo({ t, ta }: { t: TFn; ta: TArrFn }) {
  const templates = ta('demo.templates')
  const audiences = ta('demo.audiences').map((a) => str(a.name))
  const [selected, setSelected] = useState(0)
  const [subject, setSubject] = useState(() => str(templates[0]?.subject))
  const [audience, setAudience] = useState(0)
  const [sent, setSent] = useState(false)

  const pick = (i: number) => {
    setSelected(i)
    setSubject(str(templates[i]?.subject))
    setSent(false)
  }

  const tpl: Dict = (templates[selected] ?? {}) as Dict

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 md:p-8">
      <p className="title-2">{t('demo.boardTitle')}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="title-3">{t('demo.pickTemplate')}</p>
          <div className="mt-4 flex flex-col gap-2" role="group" aria-label={t('demo.pickTemplate')}>
            {templates.map((tplItem, i) => (
              <button
                key={i}
                type="button"
                onClick={() => pick(i)}
                aria-pressed={selected === i}
                className={`rounded-xl border p-4 text-start transition-colors duration-300 ${selected === i ? 'border-accent bg-paper' : 'border-line bg-paper hover:border-accent'}`}
              >
                <span className="title-3 block">{str(tplItem.name)}</span>
                <span className="body-6 mt-2 block text-muted">{str(tplItem.desc)}</span>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <label htmlFor="campaign-subject" className="title-3 block">
              {t('demo.subjectLabel')}
            </label>
            <input
              id="campaign-subject"
              type="text"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value)
                setSent(false)
              }}
              className="body-3 mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="campaign-audience" className="title-3 block">
              {t('demo.audienceLabel')}
            </label>
            <select
              id="campaign-audience"
              value={audience}
              onChange={(e) => setAudience(Number(e.target.value))}
              className="body-3 mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2"
            >
              {audiences.map((name, i) => (
                <option key={i} value={i}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setSent(true)}
            className="button-md mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-3 py-2 text-white transition-opacity duration-300 hover:opacity-90"
          >
            <PaperPlaneTilt size={16} />
            {t('demo.sendTest')}
          </button>
          {sent && (
            <p role="status" className="body-5 mt-4 flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2">
              <CheckCircle size={18} className="shrink-0 text-accent" />
              {t('demo.sentMessage')}
            </p>
          )}
        </div>

        <div>
          <p className="title-3">{t('demo.previewLabel')}</p>
          <article className="mt-4 overflow-hidden rounded-2xl border border-line bg-paper">
            <div className="border-b border-line px-4 py-2">
              <p className="caption-4 text-muted">{t('demo.fromLabel')}</p>
              <p className="title-3 mt-2">{subject || t('demo.noSubject')}</p>
            </div>
            <div className="p-4">
              <div className="flex h-24 items-center justify-center rounded-xl bg-accent/10">
                <span className="title-2 text-accent">{str(tpl.hero)}</span>
              </div>
              <p className="body-3 mt-4">{str(tpl.body)}</p>
              <p className="button-md mt-4 inline-flex rounded-xl bg-accent px-3 py-2 text-white">{str(tpl.cta)}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-line p-4 text-center">
              {ta('demo.stats').map((s, i) => (
                <div key={i}>
                  <p className="title-2">{str(s.value)}</p>
                  <p className="caption-5 text-muted">{str(s.label)}</p>
                </div>
              ))}
            </div>
          </article>
          <p className="caption-5 mt-4 text-muted">{t('demo.note')}</p>
        </div>
      </div>
    </div>
  )
}
