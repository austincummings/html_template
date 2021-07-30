/**
 * Holds a string that will be inserted into a template with escaping.
 */
export class TrustedString {
  str: string;

  constructor(str: string) {
    this.str = str;
  }
}

/**
 * Helper function for creating a TrustedString
 *
 * @example
 * const htmlContent = "<h1>Hello world</h1>";
 * const doc = html`
 *  <header>${trusted(htmlContent)}</header>
 * `;
 */
export function trusted(str: string): TrustedString {
  return new TrustedString(str);
}

/**
 * Creates an HTML template string.
 *
 * @example
 * const doc = html`
 *  <!DOCTYPE html>
 *  <html>
 *    <head>
 *      <title>Hello world</title>
 *    </head>
 *    <body>
 *      Hello world
 *    </body>
 *  </html>
 * `;
 */
export function html(
  strs: TemplateStringsArray,
  ...values: unknown[]
): string {
  const parts: string[] = [];
  strs.forEach((str, index) => {
    parts.push(str);

    const value = values[index];
    if (value instanceof TrustedString) {
      parts.push(String(value.str));
    } else if (value) {
      parts.push(escapeHTML(String(value)));
    }
  });
  const str = parts.join("");

  return str;
}

/**
 * Escapes an HTML string.
 */
function escapeHTML(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
