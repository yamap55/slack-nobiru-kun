import { Trigger } from "deno-slack-api/types.ts";
import NotifyWorkflow from "../workflows/nobiru_kun.ts";

const trigger: Trigger<typeof NotifyWorkflow.definition> = {
  type: "event",
  name: "Trigger the Nobiru kun workflow",
  workflow: `#/workflows/${NotifyWorkflow.definition.callback_id}`,
  event: {
    event_type: "slack#/events/message_posted",
    channel_ids: ["C04H8294NUB"],
    // filterは必須
    filter: {
      version: 1,
      root: { statement: "1 == 1" },
    },
  },
  inputs: {
    channel_id: { value: "{{data.channel_id}}" },
    text: { value: "{{data.text}}" },
  },
};

// トリガーの作成には `slack triggers create --trigger-def [ファイルパス]` を実行する
// Trigger 形の定義オブジェクトを export default さえしていれば
// そのソースファイルを使用できる
export default trigger;
