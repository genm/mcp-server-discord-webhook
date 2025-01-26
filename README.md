# MCP Server Discord Webhook

An MCP server for posting messages to Discord webhooks.

[日本語のREADME](./README.ja.md)

## Installation

```bash
npm install @genpm/mcp-server-discord-webhook
```

## Configuration

Add the following to your MCP configuration file:

```json
{
  "mcpServers": {
    "discord-webhook": {
      "command": "npx",
      "args": [
        "-y",
        "@genpm/mcp-server-discord-webhook"
      ],
      "env": {
        "DISCORD_WEBHOOK_URL": "your-discord-webhook-url"
      },
      "alwaysAllow": [
        "send_message"
      ]
    }
  }
}
```

## Features

### send_message

Sends a message to Discord.

Parameters:
- `content`: Message content (required)
- `username`: Display name (optional)
- `avatar_url`: Avatar URL (optional)

Example:
```typescript
<use_mcp_tool>
<server_name>discord-webhook</server_name>
<tool_name>send_message</tool_name>
<arguments>
{
  "content": "Test message",
  "username": "Custom Name"
}
</arguments>
</use_mcp_tool>
```

## License

MIT

## Author

genm
