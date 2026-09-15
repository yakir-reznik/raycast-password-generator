# Secret Generator for Raycast

Generate a random value with one action, then copy it, close Raycast, or paste it into the app you were using.

## Commands

- Generate 8-, 12-, 16-, 20-, or 24-character passwords.
- Generate simple 8-, 12-, 16-, 24-, or 32-character passwords using unambiguous letters and digits only.
- Generate a 32-character webhook secret using URL-safe characters only (`A-Z`, `a-z`, `2-9`, `-`, `_`).

## Preferences

- **After Generating** — copy and close Raycast (default), copy only, or paste into the previously focused app.
- **Use easy-to-read characters only** — removes ambiguous characters such as `O`, `0`, `I`, `l`, and `1` from password generation.

All values are generated locally with the system cryptographic random number generator. Nothing is sent over the network or stored by the extension.

## Development

Run `pnpm dev` to load the extension in Raycast development mode. Before publishing to the Raycast Store, replace the `author` value in `package.json` with your verified Raycast Store handle.
