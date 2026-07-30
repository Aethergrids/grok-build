# Configuration model

grok-build reads user configuration from `~/.grok/config.toml`. Provider
definitions hold shared connection settings; model definitions supply the
provider's model ID and the alias shown in grok-build.

## A minimal provider and model

```toml
[model_providers.example]
base_url = "https://api.example.com/v1"
api_backend = "responses"
env_key = "EXAMPLE_API_KEY"
context_window = 200000

[model.example-code]
model = "example-code-model"
model_provider = "example"
name = "Example Code"
```

Use the alias `example-code` in `grok -m example-code`. The `model` value is
the identifier sent to the provider.

## Supported backends

| `api_backend` | Protocol | Request path |
| --- | --- | --- |
| `chat_completions` | OpenAI-compatible Chat Completions | `/chat/completions` below `base_url` |
| `responses` | OpenAI-compatible Responses | `/responses` below `base_url` |
| `messages` | Anthropic-compatible Messages | `/messages` below `base_url` |

`chat_completions` is the default when `api_backend` is omitted. Prefer the
provider's native, documented protocol.

## Model fields

Common model fields:

```toml
[model.example-code]
model = "provider-model-id"
base_url = "https://api.example.com/v1"
name = "Display name"
description = "Optional picker description"
env_key = "EXAMPLE_API_KEY"
api_backend = "responses"
auth_scheme = "bearer"
context_window = 200000
max_completion_tokens = 16384
temperature = 0.7
top_p = 0.95
```

`auth_scheme` may be `bearer` or `x_api_key`. Shared provider blocks currently
use bearer authentication by default; put `auth_scheme = "x_api_key"` on an
individual model when a Messages endpoint requires it.

`context_window` tells the harness when to compact a session. It is a local
scheduling value, not a claim about the provider's maximum. Set it to a
conservative value that does not exceed the model's documented limit.

## Secret resolution

Credentials resolve in this order:

1. `api_key` on the model;
2. the first non-empty environment variable named by `env_key`;
3. the grok-build signed-in session, when the model has no provider credential;
4. `XAI_API_KEY` as the global fallback.

Prefer `env_key`. For a secret carried in a custom header, map the header to an
environment variable:

```toml
[model.secure-gateway]
model = "model-id"
base_url = "https://gateway.example/v1"
env_http_headers = { "X-Tenant-Token" = "TENANT_TOKEN" }
```

Static `extra_headers` and `query_params` are also supported, but query
parameters are saved with session configuration. Never place a secret there.

## Defaults and auxiliary roles

```toml
[models]
default = "example-code"
session_summary = "example-code"
prompt_suggestion = "example-code"
```

Optional roles also include `image_description` and `web_search`. Each target
must support the content type and tool behavior required by that role.

## Single-model form

Repeating the connection settings directly on a model is valid and sometimes
clearer:

```toml
[model.deepseek-v4-pro]
model = "deepseek-v4-pro"
base_url = "https://api.deepseek.com"
api_backend = "chat_completions"
env_key = "DEEPSEEK_API_KEY"
context_window = 200000
```

Use shared `[model_providers.<id>]` blocks when several models use the same
endpoint and credential.
