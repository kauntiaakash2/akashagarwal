import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'

export function ContactForm({ recipient, firstName }: { recipient: string; firstName: string }) {
  const [draftUrl, setDraftUrl] = useState('')

  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    // Native validation handles formats and length; also reject whitespace-only fields.
    for (const field of ['name', 'message']) {
      const input = form.elements.namedItem(field)
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        input.setCustomValidity(input.value.trim() ? '' : 'Please fill out this field.')
      }
    }
    if (!form.reportValidity()) return

    const subject = `Portfolio enquiry from ${name}`
    const body = `Hi ${firstName},\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
    const url = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setDraftUrl(url)
    window.location.assign(url)
  }

  return <form className="contact-form" onSubmit={openDraft} onInput={event => {
    const input = event.target
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) input.setCustomValidity('')
    setDraftUrl('')
  }}>
    <div className="form-top">
      <label><span className="sr-only">Your name</span><input name="name" placeholder="Your name" required maxLength={100} autoComplete="name" /></label>
      <label><span className="sr-only">Email address</span><input name="email" type="email" placeholder="Your email" required maxLength={254} autoComplete="email" /></label>
    </div>
    <label><span className="sr-only">Your message</span><textarea name="message" placeholder="Message…" required maxLength={5000} rows={5} /></label>
    <button className="send-button" type="submit">Send <ArrowUpRight size={17} /></button>
    <p className="form-note">Opens a prefilled draft in your email app. You send it from there.</p>
    {draftUrl && <p className="draft-fallback" role="status">If your email app didn’t open, <a href={draftUrl}>open the draft again <ArrowUpRight size={13} /></a>.</p>}
  </form>
}
