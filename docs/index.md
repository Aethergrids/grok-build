---
layout: home

hero:
  name: "grok-build ZDR"
  text: "Your agent. Your provider boundary."
  tagline: Run the grok-build harness with explicit egress controls and provider configurations you can verify.
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Provider support
      link: /reference/support-matrix

features:
  - title: ZDR-enhanced harness
    details: Keep workspace tools and agent state local while allowing only the configured inference path to cross the boundary.
  - title: Multiple providers
    details: Copy-ready recipes for OpenAI Responses, DeepSeek Chat Completions, and OpenCode Go endpoints.
  - title: Honest compatibility
    details: Separate supported paths from provider-tested paths and planned Codex subscription authentication.
---

## What this documentation covers

This site documents the ZDR-enhanced version of grok-build in this repository:

- building and running the agent;
- defining custom model providers in `~/.grok/config.toml`;
- selecting models from the CLI or TUI;
- tightening the local data-egress boundary; and
- testing OpenAI, DeepSeek, and OpenCode Go configurations without exposing keys.

Start with [Getting started](/guide/getting-started), then choose a provider from
the [support matrix](/reference/support-matrix).

::: warning Two different promises
The harness controls **which application paths may send data**. A provider's
retention, training, and abuse-monitoring terms control **what happens after an
inference request reaches that provider**. Confirm both before treating a
deployment as end-to-end ZDR.
:::
