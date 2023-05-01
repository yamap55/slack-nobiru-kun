import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const { TARGET_CHANNEL_ID } = config();

const NotifyWorkflow = DefineWorkflow({
  callback_id: "hello-world-workflow",
  title: "Hello World Workflow",
  input_parameters: {
    properties: {},
    required: [],
  },
});

// 標準ファンクションを使ってメッセージを投稿
// channel_id は Slack UI 上から入手してください
NotifyWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: TARGET_CHANNEL_ID,
  message: "Hello World!",
});

export default NotifyWorkflow;
