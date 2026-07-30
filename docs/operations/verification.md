# Verification

Validate the exact binary, identity, endpoint, and model that production will
use. A successful direct provider request is useful, but the end-to-end
grok-build smoke test is the compatibility gate.

## 1. Check the binary

Installed binary:

```bash
grok --version
```

Current workspace:

```bash
cargo run -p xai-grok-pager-bin -- --version
```

Provider and authentication features in the workspace may be newer than an
already-installed binary.

## 2. Check only whether keys exist

Do not print their values:

```bash
test -n "${OPENAI_API_KEY:-}" && echo "OPENAI_API_KEY is set"
test -n "${DEEPSEEK_API_KEY:-}" && echo "DEEPSEEK_API_KEY is set"
test -n "${OPENCODE_API_KEY:-}" && echo "OPENCODE_API_KEY is set"
```

## 3. Confirm the model catalog

```bash
grok models
```

The left-hand value in `[model.<alias>]` is the alias passed to `-m`; the
`model = "..."` value is the provider ID.

## 4. Run an isolated smoke test

```bash
grok \
  -p "Reply with exactly: MODEL_OK" \
  -m YOUR_ALIAS \
  --max-turns 1 \
  --no-subagents \
  --disable-web-search \
  --no-memory \
  --output-format json
```

For the workspace binary:

```bash
cargo run -p xai-grok-pager-bin -- \
  -p "Reply with exactly: MODEL_OK" \
  -m YOUR_ALIAS \
  --max-turns 1 \
  --no-subagents \
  --disable-web-search \
  --no-memory \
  --output-format json
```

The isolation flags keep this test to one primary inference path.

## 5. Verify every auxiliary role

If you pin `session_summary`, `prompt_suggestion`, `image_description`, or
`web_search`, exercise the corresponding feature with non-sensitive input.
Protocol compatibility for normal text does not prove vision or provider-side
tool compatibility.

## 6. Review egress

For a production approval:

- run with `GROK_ENFORCE_ZDR=1` and `GROK_EXTERNAL_OTEL=0`;
- inspect DNS or proxy logs for unexpected destinations;
- ensure the only model destination is the configured provider;
- confirm no key appears in config, output, shell trace, or debug logs; and
- repeat after upgrades.

Use `RUST_LOG=debug` only in a controlled environment. Debug output may contain
request metadata even when credentials are redacted.
