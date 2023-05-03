import { Trigger } from "deno-slack-api/types.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import NotifyWorkflow from "../workflows/nobiru_kun.ts";

const { TARGET_CHANNEL_ID } = config();

const trigger: Trigger<typeof NotifyWorkflow.definition> = {
  type: "event",
  name: "Trigger the Nobiru kun workflow",
  workflow: `#/workflows/${NotifyWorkflow.definition.callback_id}`,
  event: {
    event_type: "slack#/events/message_posted",
    channel_ids: [TARGET_CHANNEL_ID],
    // filterは必須
    filter: {
      version: 1,
      root: { statement: "1 == 1" },
    },
  },
  inputs: {
    channel_id: { value: "{{data.channel_id}}" },
    channel_type: { value: "{{data.channel_type}}" },
    user_id: { value: "{{data.user_id}}" },
    text: { value: "{{data.text}}" },
    message_ts: { value: "{{data.message_ts}}" },
    data: { value: "{{data}}" },
  },
};

// トリガーの作成には `slack triggers create --trigger-def [ファイルパス]` を実行する
// Trigger 形の定義オブジェクトを export default さえしていれば
// そのソースファイルを使用できる
export default trigger;
