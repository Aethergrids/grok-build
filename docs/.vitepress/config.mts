import { defineConfig } from "vitepress";

export default defineConfig({
  title: "grok-build ZDR",
  description:
    "Use the ZDR-enhanced grok-build harness with Codex, OpenAI, DeepSeek, and OpenCode Go models.",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#151515" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: "grok-build ZDR" }],
    [
      "meta",
      {
        property: "og:description",
        content:
          "Private-by-design agent workflows across OpenAI, DeepSeek, and OpenCode Go.",
      },
    ],
  ],
  themeConfig: {
    logo: {
      light:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23151515'/%3E%3Cpath d='M8 9h16v4H12v6h8v-2h-4v-4h8v10H8z' fill='%23fff'/%3E%3C/svg%3E",
      dark:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23f4f4f0'/%3E%3Cpath d='M8 9h16v4H12v6h8v-2h-4v-4h8v10H8z' fill='%23151515'/%3E%3C/svg%3E",
    },
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Providers", link: "/reference/support-matrix" },
      { text: "Verify", link: "/operations/verification" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Getting started", link: "/guide/getting-started" },
          { text: "The ZDR boundary", link: "/guide/zdr-harness" },
        ],
      },
      {
        text: "Configuration",
        items: [
          { text: "Configuration model", link: "/configuration/overview" },
          { text: "Support matrix", link: "/reference/support-matrix" },
        ],
      },
      {
        text: "Providers",
        items: [
          { text: "OpenAI API", link: "/providers/openai" },
          { text: "Codex authentication", link: "/providers/codex" },
          { text: "DeepSeek", link: "/providers/deepseek" },
          { text: "OpenCode Go", link: "/providers/opencode-go" },
        ],
      },
      {
        text: "Operations",
        items: [
          { text: "Verification", link: "/operations/verification" },
          { text: "Troubleshooting", link: "/operations/troubleshooting" },
        ],
      },
    ],
    search: {
      provider: "local",
    },
    outline: {
      level: [2, 3],
      label: "On this page",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/xai-org/grok-build",
      },
    ],
    footer: {
      message: "Documentation for the ZDR-enhanced grok-build harness.",
      copyright:
        "Provider retention policies and model availability remain the provider's responsibility.",
    },
  },
});
