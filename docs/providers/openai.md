# OpenAI API

Use the OpenAI Platform API with `OPENAI_API_KEY`. The Responses backend is the
recommended path for current Codex and GPT agent models.

## Add the key

```bash
export OPENAI_API_KEY="your-platform-api-key"
```

Keep this command out of shell history in managed environments. Prefer the
platform's secret injection mechanism for CI.

## Configure the provider

Add the shared provider and any models available to your OpenAI project:

```toml
[model_providers.openai]
base_url = "https://api.openai.com/v1"
api_backend = "responses"
env_key = "OPENAI_API_KEY"
context_window = 200000

[model.openai-codex]
model = "gpt-5.3-codex"
model_provider = "openai"
name = "GPT-5.3 Codex"

[model.openai-sol]
model = "gpt-5.6-sol"
model_provider = "openai"
name = "GPT-5.6 Sol"

[model.openai-terra]
model = "gpt-5.6-terra"
model_provider = "openai"
name = "GPT-5.6 Terra"

[model.openai-luna]
model = "gpt-5.6-luna"
model_provider = "openai"
name = "GPT-5.6 Luna"

[models]
default = "openai-sol"
session_summary = "openai-sol"
prompt_suggestion = "openai-sol"
```

The `200000` context value is a conservative local compaction ceiling. Replace
it with the documented limit for the exact model if that limit is lower.

## Verify

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

The Responses client sends `store: false` by default. OpenAI account policy and
applicable API terms still determine provider-side handling.

## Codex model versus Codex login

Using a model with `codex` in its ID does not require Codex subscription
authentication when the model is available to your Platform API project. It is
still a normal `OPENAI_API_KEY` request to `api.openai.com`.

ChatGPT/Codex subscription authentication is a different route. See
[Codex authentication](/providers/codex).

## Availability errors

If OpenAI returns `model_not_found`, the model is not visible to that Platform
project or API key. Choose a model returned by the account's model catalog; do
not assume that access in the Codex app implies access through the Platform
API.

Official references:

- [OpenAI API authentication](https://platform.openai.com/docs/api-reference/authentication)
- [Responses API](https://platform.openai.com/docs/api-reference/responses)
