import { Trigger } from "deno-slack-api/types.ts";
import NotifyWorkflow from "../workflows/nobiru_kun.ts";

// Incoming Webhooks によるトリガー
const trigger: Trigger<typeof NotifyWorkflow.definition> = {
  type: "webhook",
  name: "Hello World Trigger",
  // 上記のワークフローを参照する必要がある
  workflow: `#/workflows/${NotifyWorkflow.definition.callback_id}`,
  inputs: {},
};

// トリガーの作成には `slack triggers create --trigger-def [ファイルパス]` を実行する
// Trigger 形の定義オブジェクトを export default さえしていれば
// そのソースファイルを使用できる
export default trigger;
