# MCP Server Discord Webhook

Discord WebhookにメッセージをポストするためのMCPサーバーです。

## インストール

```bash
npm install @genm/mcp-server-discord-webhook
```

## 設定

MCPの設定ファイルに以下を追加してください：

```json
{
  "mcpServers": {
    "discord-webhook": {
      "command": "npx",
      "args": [
        "-y",
        "@genm/mcp-server-discord-webhook"
      ],
      "env": {
        "DISCORD_WEBHOOK_URL": "あなたのDiscord Webhook URL"
      },
      "alwaysAllow": [
        "send_message"
      ]
    }
  }
}
```

## 機能

### send_message

Discordにメッセージを送信します。

パラメータ:
- `content`: メッセージ内容（必須）
- `username`: 表示名（オプション）
- `avatar_url`: アバターURL（オプション）

使用例:
```typescript
<use_mcp_tool>
<server_name>discord-webhook</server_name>
<tool_name>send_message</tool_name>
<arguments>
{
  "content": "テストメッセージ",
  "username": "カスタム名"
}
</arguments>
</use_mcp_tool>
```

## ライセンス

MIT

## 作者

genm
