# MCP Server Discord Webhook

Discord Webhookにメッセージをポストするためのサーバーです。

[English README](./README.md)

## インストール

```bash
npm install @genpm/mcp-server-discord-webhook
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
        "@genpm/mcp-server-discord-webhook"
      ],
      "env": {
        "DISCORD_WEBHOOK_URL": "Discord Webhook URL"
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

## 開発

このプロジェクトでは、GitHub Actionsを使用して継続的インテグレーションとnpmへの自動公開を行っています。新しいバージョンタグ（例：`v1.0.0`）をプッシュすると、以下の処理が自動的に実行されます：

1. パッケージのビルド
2. テストの実行
3. npmへの公開
4. GitHubリリースの作成

リリースプロセスの詳細については、[CHANGELOG.md](./CHANGELOG.md)を参照してください。

## ライセンス

MIT

## 作者

genm