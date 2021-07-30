# html_template

Template literal function for creating HTML templates in Deno. Useful for server
side or Worker HTML generation.

## Simple Usage

```ts
const doc = html`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Hello world</title>
    </head>
    <body>
      <p>Hello world</p>
    </body>
  </html>
`;
```

## Inserting Values

You can use normal JS template literal interpolation to insert values. These
values will be HTML escaped to prevent XSS in the default usage.

```ts
const message = "Hello world";
const doc = html`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Hello world</title>
    </head>
    <body>
      <p>${message}</p>
    </body>
  </html>
`;
```

## Inserting HTML into the document

To insert HTML into your document, use `TrustedString` values for interpolation.
There is an easy helper function, `trusted`, that will create a `TrustedString`
and allow for raw HTML interpolation.

```ts
const rawHtml = "<h1>My raw HTML</h1>";
const doc = html`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Hello world</title>
    </head>
    <body>
      <p>${trusted(rawHtml)}</p>
    </body>
  </html>
`;
```
