import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
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

NotifyWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: target_channel_id.outputs.target_channel_id,
  message: `Hey <@${NotifyWorkflow.inputs.user_id}>, what's up? ${NotifyWorkflow.inputs.data}`,
});

export default NotifyWorkflow;
