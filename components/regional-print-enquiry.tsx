"use client";

import { trackQuoteHandoff } from "./analytics";
import { useState, type FormEvent } from "react";

export function RegionalPrintEnquiry() {
  const [messageUrl, setMessageUrl] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const town = String(data.get("town") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();
    if (!town || !details) {
      setMessageUrl("");
      setError(!town ? "Please enter your town." : "Please add the job or printer details.");
      event.currentTarget.querySelector<HTMLInputElement | HTMLTextAreaElement>(!town ? "input[name='town']" : "textarea[name='details']")?.focus();
      return;
    }
    setError("");
    const message = `Hi Ntombii Tech, please help me with a quote.\n\nService: ${data.get("service")}\nTown: ${town}\n\nDetails: ${details}\n\nPlease confirm availability, cost and the collection, delivery or fitting options for my request.`;
    const url = `https://wa.me/27812360230?text=${encodeURIComponent(message)}`;
    setMessageUrl(url);
    trackQuoteHandoff("kzn_print");
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return <form className="regional-enquiry-form" onSubmit={submit}>
    <div className="regional-form-row"><label>What do you need?<select name="service" defaultValue="" required><option value="" disabled>Choose a service</option><option>Signage</option><option>Business printing</option><option>Ink and toner</option><option>T-shirt printing ink</option></select></label><label>Your town<input name="town" placeholder="e.g. Newcastle, Utrecht or Durban" autoComplete="address-level2" maxLength={100} required /></label></div>
    <label>Tell us about the job<textarea name="details" placeholder="For example: printer model and cartridge code, print quantity, or sign dimensions." rows={4} maxLength={1600} required /></label>
    <button className="button button-blue" type="submit">Prepare WhatsApp enquiry <span aria-hidden="true">↗</span></button>
    {error ? <p className="regional-enquiry-error" role="alert">{error}</p> : null}
    {messageUrl ? <p role="status">Your message is ready. Review it in WhatsApp and tap Send.</p> : null}
    {messageUrl ? <a className="text-link" href="https://wa.me/27812360230" target="_blank" rel="noreferrer" onClick={event => { event.preventDefault(); event.stopPropagation(); window.open(messageUrl, "_blank", "noopener,noreferrer"); }}>Open your WhatsApp message <span aria-hidden="true">↗</span></a> : null}
  </form>;
}
