# Troubleshooting

## `model_not_found`

The provider account cannot access the configured model ID.

1. Check the provider's current model catalog using the same API key.
2. Copy the exact ID into the model's `model` field.
3. Keep using the grok-build alias with `-m`.

Access in a consumer app or subscription does not automatically grant access
to the provider's Platform API.

## Missing API key

Check that the environment variable named by `env_key` is set in the same
process that launches grok-build:

```bash
test -n "${OPENCODE_API_KEY:-}" && echo "key is set"
```

Do not debug this with `echo "$OPENCODE_API_KEY"`.

## 401 or 403

Common causes:

- the key belongs to a different provider or environment;
- the account lacks model entitlement;
- `base_url` points at the wrong product;
- a Messages endpoint requires `auth_scheme = "x_api_key"`; or
- a gateway requires a tenant header supplied through `env_http_headers`.

## 404 on the request path

`base_url` should usually end at the API root. grok-build appends the path for
the selected backend:

- Responses: `/responses`
- Chat Completions: `/chat/completions`
- Messages: `/messages`

Avoid duplicating that suffix in `base_url`.

## OpenCode Go fails after producing tokens

If the log mentions an `inference-cost` event, an empty `choices` array, or a
missing completion `id`, you reached the known Chat streaming limitation. The
provider response succeeded, but the current parser treated the final cost
metadata as a normal completion chunk.

Use an OpenCode Messages-compatible model for now, or apply the parser fix that
recognizes the trailing metadata event. See the
[OpenCode Go guide](/providers/opencode-go).

## Codex login works, but grok-build does not use it

This is expected today. A `codex login` session authenticates the official
Codex client's subscription route. grok-build currently supports the OpenAI
Platform path through `OPENAI_API_KEY`; it does not import the Codex credential
cache.

See [Codex authentication](/providers/codex).

## Installed binary behaves differently from source

Compare:

```bash
grok --version
cargo run -p xai-grok-pager-bin -- --version
```

When testing a feature added in this repository, run the workspace binary until
you install a matching build.

## ZDR still shows provider traffic

That is expected: the configured inference call is allowed. Investigate traffic
to any other destination. Also set `GROK_EXTERNAL_OTEL=0`, because external
OpenTelemetry is controlled independently from product telemetry.
