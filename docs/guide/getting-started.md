# Getting started

This guide builds the current workspace version, enables the ZDR guard, and
runs one provider-backed model.

## Prerequisites

- Rust and Cargo compatible with the repository toolchain
- Git
- a provider API key for the model you intend to use
- Node.js 20 or newer only if you want to run this documentation site

## Build the harness

From the repository root:

```bash
cargo build -p xai-grok-pager-bin
cargo run -p xai-grok-pager-bin -- --version
```

During development, use `cargo run -p xai-grok-pager-bin --` anywhere this site
shows the installed `grok` command.

## Enable the ZDR guard

Create or update `~/.grok/config.toml`:

```toml
[features]
enforce_zdr = true
telemetry = false
feedback = false

[telemetry]
trace_upload = false
```

For an auditable launch, set the corresponding process-level guardrails:

```bash
export GROK_ENFORCE_ZDR=1
export GROK_TELEMETRY_ENABLED=0
export GROK_TELEMETRY_TRACE_UPLOAD=0
export GROK_EXTERNAL_OTEL=0
```

The environment values are useful in shells, containers, and CI because the
effective policy does not depend only on a user's config file.

## Add a provider

Choose one recipe:

- [OpenAI API](/providers/openai)
- [DeepSeek](/providers/deepseek)
- [OpenCode Go](/providers/opencode-go)
- [Codex authentication status](/providers/codex)

Each recipe reads its secret from an environment variable. Do not paste an API
key into `config.toml`.

## Select and run a model

List the catalog:

```bash
grok models
```

Start an interactive session with a configured alias:

```bash
grok -m openai-sol
```

Or run a deterministic smoke test:

```bash
grok \
  -p "Reply with exactly: MODEL_OK" \
  -m openai-sol \
  --max-turns 1 \
  --no-subagents \
  --disable-web-search \
  --no-memory \
  --output-format json
```

In the TUI, use `/model <alias>`. From the scrollback pane, `Ctrl+M` opens the
model picker.

## Run this documentation site

```bash
cd docs
npm install
npm run docs:dev
```

Use `npm run docs:build` for a production build and `npm run docs:preview` to
serve that build locally.

## Next step

Read [The ZDR boundary](/guide/zdr-harness) before moving real repository
content through an external provider.
