# DeepSeek

DeepSeek exposes an OpenAI-compatible Chat Completions endpoint and uses bearer
authentication.

## Add the key

```bash
export DEEPSEEK_API_KEY="your-deepseek-api-key"
```

## Configure the provider

```toml
[model_providers.deepseek]
base_url = "https://api.deepseek.com"
api_backend = "chat_completions"
env_key = "DEEPSEEK_API_KEY"
context_window = 200000

[model.deepseek-v4-flash]
model = "deepseek-v4-flash"
model_provider = "deepseek"
name = "DeepSeek V4 Flash"

[model.deepseek-v4-pro]
model = "deepseek-v4-pro"
model_provider = "deepseek"
name = "DeepSeek V4 Pro"
```

Model catalogs change. Use only IDs returned for your DeepSeek account and set
`context_window` no higher than the chosen model's documented limit.

## Verify

```bash
grok \
  -p "Reply with exactly: MODEL_OK" \
  -m deepseek-v4-pro \
  --max-turns 1 \
  --no-subagents \
  --disable-web-search \
  --no-memory \
  --output-format json
```

If your account exposes different model IDs, update both `model` and the alias
used with `-m`.

Official reference:

- [DeepSeek API documentation](https://api-docs.deepseek.com/)
