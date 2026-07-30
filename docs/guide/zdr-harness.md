# The ZDR boundary

The enhanced harness is designed so that, with ZDR enforcement active, the
configured model inference call is the intended network path for agent
content. Local file access, shell execution, patching, session state, and
normal orchestration stay on the machine.

## What the guard controls

`[features] enforce_zdr = true` or `GROK_ENFORCE_ZDR=1` activates the
application's ZDR enforcement. It suppresses product paths such as remote
session synchronization, sharing, feedback, and product telemetry.

It does **not** make inference local. The prompt, relevant conversation
history, tool schemas, and selected workspace context still go to the model
endpoint you configure.

```text
Local machine                         Configured provider
┌────────────────────────────┐        ┌──────────────────────┐
│ files, shell, patches      │        │ model inference      │
│ tool execution and state  │───────▶│ provider retention   │
│ session orchestration     │ request│ policy applies here  │
└────────────────────────────┘        └──────────────────────┘
```

## Recommended strict profile

Use both persistent configuration and launch-time environment controls:

```toml
# ~/.grok/config.toml
[features]
enforce_zdr = true
telemetry = false
feedback = false

[telemetry]
trace_upload = false
```

```bash
export GROK_ENFORCE_ZDR=1
export GROK_TELEMETRY_ENABLED=0
export GROK_TELEMETRY_TRACE_UPLOAD=0
export GROK_EXTERNAL_OTEL=0
```

External OpenTelemetry is an independent path. Setting `GROK_EXTERNAL_OTEL=0`
closes it even if `OTEL_*` variables exist in the surrounding environment.

## Pin auxiliary inference

The main chat model is not necessarily the only model the application may
invoke. Session titles, compaction summaries, prompt suggestions, image
description, and backend search can use auxiliary models.

For a single-provider deployment, pin compatible auxiliary roles:

```toml
[models]
default = "openai-sol"
session_summary = "openai-sol"
prompt_suggestion = "openai-sol"
```

Only set `image_description` when the chosen endpoint supports image input.
Only set `web_search` when the model and backend support provider-side web
search. Otherwise disable those features for the run, such as with
`--disable-web-search`.

::: tip Why pin these aliases?
A strict egress policy should cover every inference call, not only the model
visible in the picker. Pinning makes routing reviewable.
:::

## Provider retention is separate

Before approving a provider, record:

1. the exact endpoint and account or workspace used;
2. the provider's retention and training policy for that product;
3. whether abuse monitoring or legal exceptions apply;
4. which region handles the request; and
5. whether prompts, outputs, and tool calls have different treatment.

OpenCode describes Go as zero-retention and not used for training. That is a
provider statement, not a guarantee made or independently verified by this
repository. OpenAI and DeepSeek likewise apply the terms of the particular API
account and service in use.

## Responses API storage

For the OpenAI-compatible Responses backend, the harness sends `store: false`
by default. This is a useful request-level control, but it does not replace the
provider's contractual retention policy.

## Production checklist

- Pin provider base URLs; do not accept an unreviewed runtime endpoint.
- Supply secrets through environment variables or a secrets manager.
- Disable shell tracing before exporting keys.
- Keep provider keys out of config, session files, logs, and screenshots.
- Test from the same network and identity used in production.
- Re-run smoke tests after changing the model, backend, or provider account.
