# Codex authentication

There are two OpenAI authentication paths, and grok-build currently supports
only one of them natively.

| Path | Identity | Endpoint family | grok-build |
| --- | --- | --- | --- |
| OpenAI Platform API | API project key | `api.openai.com/v1` | Supported |
| Codex subscription | ChatGPT browser/device login | ChatGPT Codex backend | Not yet integrated |

## Supported today: Platform API key

If a Codex model is exposed to your OpenAI Platform project, configure it with
`OPENAI_API_KEY` and the Responses backend:

```toml
[model.openai-codex]
model = "gpt-5.3-codex"
base_url = "https://api.openai.com/v1"
api_backend = "responses"
env_key = "OPENAI_API_KEY"
context_window = 200000
```

This is described fully in [OpenAI API](/providers/openai).

## Verified upstream: ChatGPT and device login

The official Codex CLI supports:

```bash
codex login
codex login --device-auth
codex login status
```

Browser login and device login produce a Codex/ChatGPT session rather than an
OpenAI Platform API key. Availability and policy follow the ChatGPT workspace
used for login.

::: warning Not a current grok-build credential
`grok login --device-auth` is grok-build's existing xAI/enterprise OIDC flow.
It does not authenticate to OpenAI Codex. Do not point grok-build at a Codex
credential cache or copy tokens out of `~/.codex`.
:::

## What native support requires

A grok-build integration needs to own the complete lifecycle:

1. start OpenAI browser or device authorization;
2. store and refresh the resulting credential securely;
3. identify the selected ChatGPT account or workspace;
4. send Responses requests to the Codex subscription route with the required
   account context; and
5. surface expiration, workspace policy, and entitlement errors clearly.

OpenCode demonstrates that this is technically possible: its Codex plugin
performs OAuth, refreshes credentials, extracts the ChatGPT account identifier,
and adapts requests to the Codex Responses route. That implementation is a
useful interoperability reference, but copying its private credential cache or
assuming the public Platform API contract would be unsafe.

## Recommended design

Add a dedicated `openai_codex` auth provider and transport. Keep it separate
from `OPENAI_API_KEY` so logs, policy checks, endpoint allowlists, and UI labels
cannot confuse subscription traffic with Platform API traffic.

Until that exists:

- use `OPENAI_API_KEY` for OpenAI models available to your Platform project; or
- use Codex/OpenCode directly when subscription authentication is required.

Official and implementation references:

- [Codex authentication](https://learn.chatgpt.com/docs/auth)
- [OpenCode Codex plugin](https://github.com/anomalyco/opencode/blob/dev/packages/opencode/src/plugin/codex.ts)
