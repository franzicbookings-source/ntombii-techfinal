import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../worker/document-stream.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const { validHtmlResponse } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);

function responseFromChunks(chunks, contentType = "text/html; charset=utf-8") {
  return new Response(new ReadableStream({ start(controller) { chunks.forEach(chunk => controller.enqueue(chunk)); controller.close(); } }), { headers: { "content-type": contentType, "cache-control": "no-cache", "content-length": "999" } });
}

test("document end follows hydration scripts regardless of UTF-8 or closing-tag chunk boundaries", async () => {
  const prefix = '<!DOCTYPE html><html lang="en-ZA"><head><title>Test</title></head><body><p>Ntombii 🌍 — café</p>';
  const scripts = '<script>self.__VINEXT_RSC_CHUNKS__=["\\u003cbody\\u003e"]</script><script>self.__VINEXT_RSC_DONE__=true</script>';
  const input = new TextEncoder().encode(prefix + "</body></html>" + scripts);
  const expected = prefix + scripts + "</body></html>";
  for (let cut = 1; cut < input.length; cut++) {
    const response = validHtmlResponse(responseFromChunks([input.slice(0, cut), input.slice(cut)]));
    assert.equal(await response.text(), expected, `byte boundary ${cut}`);
    assert.equal(response.headers.get("cache-control"), "no-cache");
    assert.equal(response.headers.get("content-length"), null);
  }
  assert.equal(await validHtmlResponse(responseFromChunks([...input].map(byte => new Uint8Array([byte])))).text(), expected);
});

test("already valid HTML and Unicode are preserved", async () => {
  const input = '<!DOCTYPE html><html lang="en-ZA"><head><title>✓</title></head><body>🌍' + "a".repeat(31) + "</body></html>";
  assert.equal(await validHtmlResponse(responseFromChunks([new TextEncoder().encode(input)])).text(), input);
});

test("RSC, JSON, images and responses without a body are untouched", async () => {
  for (const type of ["text/x-component", "application/json", "image/svg+xml"]) {
    const response = responseFromChunks([new TextEncoder().encode("</body></html>")], type);
    assert.equal(validHtmlResponse(response), response);
    assert.equal(await response.text(), "</body></html>");
  }
  const empty = new Response(null, { status: 304 });
  assert.equal(validHtmlResponse(empty), empty);
});
