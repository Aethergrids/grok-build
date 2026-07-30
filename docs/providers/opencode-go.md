# OpenCode Go

OpenCode Go provides OpenAI-compatible and Anthropic-compatible endpoints under
`https://opencode.ai/zen/go/v1`. Authentication uses `OPENCODE_API_KEY`.

## Add the key

```bash
export OPENCODE_API_KEY="your-opencode-go-api-key"
```

## Configure the Chat Completions models

The six models below use the OpenAI-compatible Chat Completions endpoint:

```toml
[model_providers.opencode-go]
base_url = "https://opencode.ai/zen/go/v1"
api_backend = "chat_completions"
env_key = "OPENCODE_API_KEY"
context_window = 200000

[model.kimi-k2-7-code]
model = "kimi-k2.7-code"
model_provider = "opencode-go"
name = "Kimi K2.7 Code"

[model.glm-5-2]
model = "glm-5.2"
model_provider = "opencode-go"
name = "GLM-5.2"

[model.grok-4-5-go]
model = "grok-4.5"
model_provider = "opencode-go"
name = "Grok 4.5 · OpenCode Go"

[model.kimi-k3]
model = "kimi-k3"
model_provider = "opencode-go"
name = "Kimi K3"

[model.deepseek-v4-flash-go]
model = "deepseek-v4-flash"
model_provider = "opencode-go"
name = "DeepSeek V4 Flash · OpenCode Go"

[model.deepseek-v4-pro-go]
model = "deepseek-v4-pro"
model_provider = "opencode-go"
name = "DeepSeek V4 Pro · OpenCode Go"
```

::: warning Current streaming limitation
Direct calls succeeded for all six model IDs, but the current grok-build Chat
stream parser rejects OpenCode's trailing `inference-cost` SSE event. That
event has an empty `choices` array and no normal completion `id`. The harness
must ignore or separately parse this metadata event before these models are
fully agent-compatible.
:::

## Messages models

For a model listed by OpenCode as Anthropic Messages compatible, configure the
protocol and `x-api-key` authentication on the model:

```toml
[model.opencode-messages]
model = "minimax-m3"
base_url = "https://opencode.ai/zen/go/v1"
api_backend = "messages"
auth_scheme = "x_api_key"
env_key = "OPENCODE_API_KEY"
context_window = 200000
extra_headers = { "anthropic-version" = "2023-06-01" }
```

This path has completed an end-to-end grok-build smoke test with `minimax-m3`.
Confirm the current model catalog before using a different ID.

## Inspect the current catalog

This prints model IDs without printing the key:

```bash
curl --fail --silent \
  -H "Authorization: Bearer ${OPENCODE_API_KEY}" \
  https://opencode.ai/zen/go/v1/models
```

## Provider ZDR statement

OpenCode states that Go requests have zero retention and are not used for
training. Treat that as the provider's policy statement and verify the current
terms for your account before approving sensitive workloads.

Official references:

- [OpenCode Go endpoints](https://opencode.ai/docs/go/#endpoints)
- [OpenCode Go privacy](https://opencode.ai/docs/go/#privacy)
