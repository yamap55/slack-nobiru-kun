import { SlackAPI } from "deno-slack-api/mod.ts";
import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

// DefineFunction でファンクションのメタデータを定義
export const MySendMessageFunction = DefineFunction({
  callback_id: "my-send-message",
  title: "My SendMessage",
  source_file: "functions/my_send_message.ts",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      message: { type: Schema.types.string },
      continue_flag: { type: Schema.types.boolean },
    },
    required: ["channel_id", "message", "continue_flag"],
  },
  output_parameters: {
    properties: { ts: { type: Schema.types.string } },
    required: [],
  },
});

export default SlackFunction(MySendMessageFunction, async ({ inputs, token }) => {
  if (!inputs.continue_flag) {
    return { outputs: {} };
  }
  const client = SlackAPI(token);
  // 自前で chat.postMessage API を呼び出して、指定されたチャンネルにメッセージ投稿
  const newMessageResponse = await client.chat.postMessage({
    channel: inputs.channel_id,
    text: inputs.message,
  });
  const ts = newMessageResponse.ts;
  return { outputs: { ts } };
});
