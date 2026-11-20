/** Keep Vinext's progressively appended hydration scripts inside the document. */
export function validHtmlResponse(response: Response): Response {
  if (!response.body || !/^text\/html\b/i.test(response.headers.get("content-type") ?? "")) return response;

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let pending = "";
  let closingTags = "";

  function emit(text: string, controller: TransformStreamDefaultController<Uint8Array>) {
    if (text) controller.enqueue(encoder.encode(text));
  }

  const stream = response.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      const text = pending + decoder.decode(chunk, { stream: true });
      pending = "";
      if (closingTags) { emit(text, controller); return; }

      // React escapes '<' inside its embedded JSON, so this matches document
      // markup rather than text within the hydration payload. Keep a short tail
      // until the next chunk so closing tags can straddle stream boundaries.
      const closing = /<\/body>\s*<\/html>/i.exec(text);
      if (closing) {
        closingTags = closing[0];
        emit(text.slice(0, closing.index) + text.slice(closing.index + closing[0].length), controller);
      } else {
        let split = Math.max(0, text.length - 32);
        if (split > 0 && text.charCodeAt(split - 1) >= 0xd800 && text.charCodeAt(split - 1) <= 0xdbff) split--;
        emit(text.slice(0, split), controller);
        pending = text.slice(split);
      }
    },
    flush(controller) {
      emit(pending + decoder.decode(), controller);
      emit(closingTags, controller);
    },
  }));
  const headers = new Headers(response.headers);
  headers.delete("content-length");
  return new Response(stream, { status: response.status, statusText: response.statusText, headers });
}
