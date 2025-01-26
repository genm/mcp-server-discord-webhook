#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';

interface SendMessageArgs {
  content: string;
  username?: string;
  avatar_url?: string;
}

const isValidSendMessageArgs = (args: unknown): args is SendMessageArgs => {
  if (typeof args !== 'object' || args === null) {
    return false;
  }
  const { content } = args as Record<string, unknown>;
  return typeof content === 'string';
};

class DiscordWebhookServer {
  private server: Server;
  private webhookUrl: string;

  constructor() {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('DISCORD_WEBHOOK_URL environment variable is required');
    }
    this.webhookUrl = webhookUrl;

    this.server = new Server(
      {
        name: 'discord-webhook-mcp',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // エラーハンドリング
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'send_message',
          description: 'Discordにメッセージを送信します',
          inputSchema: {
            type: 'object',
            properties: {
              content: {
                type: 'string',
                description: '送信するメッセージ内容',
              },
              username: {
                type: 'string',
                description: '表示名（オプション）',
              },
              avatar_url: {
                type: 'string',
                description: 'アバターURL（オプション）',
              }
            },
            required: ['content'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== 'send_message') {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
      }

      if (!isValidSendMessageArgs(request.params.arguments)) {
        throw new McpError(
          ErrorCode.InvalidParams,
          'Invalid arguments for send_message'
        );
      }

      try {
        await axios.post(this.webhookUrl, {
          content: request.params.arguments.content,
          username: request.params.arguments.username,
          avatar_url: request.params.arguments.avatar_url,
        });

        return {
          content: [
            {
              type: 'text',
              text: 'メッセージを送信しました',
            },
          ],
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return {
            content: [
              {
                type: 'text',
                text: `Discord Webhook エラー: ${
                  error.response?.data?.message ?? error.message
                }`,
              },
            ],
            isError: true,
          };
        }
        throw error;
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Discord Webhook MCP server running on stdio');
  }
}

const server = new DiscordWebhookServer();
server.run().catch(console.error);
