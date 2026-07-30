# Provider support matrix

The table separates transport compatibility from account authentication and
from the behavior of the current streaming parser.

| Path | Authentication | Backend | Current status |
| --- | --- | --- | --- |
| OpenAI Platform API | `OPENAI_API_KEY` | Responses | <span class="status status-ready">Ready</span> |
| Codex models exposed by the Platform API | `OPENAI_API_KEY` | Responses | <span class="status status-ready">Ready</span> |
| OpenAI Codex subscription route | ChatGPT browser or device login | Codex Responses route | <span class="status status-roadmap">Roadmap</span> |
| DeepSeek API | `DEEPSEEK_API_KEY` | Chat Completions | <span class="status status-ready">Ready</span> |
| OpenCode Go `minimax-m3` | `OPENCODE_API_KEY` | Messages | <span class="status status-ready">Ready</span> |
| OpenCode Go Chat models listed below | `OPENCODE_API_KEY` | Chat Completions | <span class="status status-partial">Parser patch needed</span> |

## What was exercised

Direct provider calls succeeded for these OpenCode Go Chat models:

- `kimi-k2.7-code`
- `glm-5.2`
- `grok-4.5`
- `kimi-k3`
- `deepseek-v4-flash`
- `deepseek-v4-pro`

Their standard model response is valid. The current grok-build streaming
parser then encounters OpenCode's trailing `inference-cost` event, which has
an empty `choices` array and intentionally does not contain the usual
completion fields. Until that event is ignored or handled separately, these
six models are provider-verified but not fully agent-compatible.

The current Messages implementation has also completed an end-to-end
grok-build run against OpenCode Go with `minimax-m3`.

## OpenAI observations

With an OpenAI Platform key, the tested Responses models included
`gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna`.
`gpt-5.3-codex` also completed an end-to-end grok-build run.

`gpt-5.3-codex-spark` was not available to the tested Platform API project, but
it was available through a signed-in Codex/ChatGPT session. Model entitlement
is account-specific, so treat the catalog returned for your identity as
authoritative.

## Status definitions

- **Ready**: the current workspace implementation supports the route and it
  has completed a representative end-to-end request.
- **Parser patch needed**: the provider accepted the request, but a known
  provider-specific streaming metadata event prevents completion in the
  current harness.
- **Roadmap**: the upstream authentication flow is understood and verified,
  but grok-build does not yet own or integrate it.
