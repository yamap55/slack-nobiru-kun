import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CreateResponseMessageFunction } from "../functions/create_response_message.ts";
import { GetTargetChannelFunction } from "../functions/get_target_channel.ts";

const NotifyWorkflow = DefineWorkflow({
  callback_id: "nobiru_kun-workflow",
  title: "Nobiru kun Workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      channel_type: { type: Schema.types.string },
      user_id: { type: Schema.slack.types.user_id },
      text: { type: Schema.types.string },
      message_ts: { type: Schema.types.string },
      data: { type: Schema.types.object },
    },
    required: [
      "channel_id",
      "channel_type",
      "user_id",
      "text",
      "message_ts",
      "data",
    ],
  },
});

const target_channel_id = NotifyWorkflow.addStep(GetTargetChannelFunction, {});
const create_response_message = NotifyWorkflow.addStep(CreateResponseMessageFunction, {
  "input_text": NotifyWorkflow.inputs.data.text,
});

NotifyWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: target_channel_id.outputs.target_channel_id,
  message: create_response_message.outputs.response_message,
});

export default NotifyWorkflow;
