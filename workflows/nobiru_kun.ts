import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CreateResponseMessageFunction } from "../functions/create_response_message.ts";

const NotifyWorkflow = DefineWorkflow({
  callback_id: "nobiru_kun-workflow",
  title: "Nobiru kun Workflow",
  input_parameters: {
    properties: {
      channel_id: { type: Schema.slack.types.channel_id },
      text: { type: Schema.types.string },
    },
    required: [
      "channel_id",
      "text",
    ],
  },
});

const create_response_message = NotifyWorkflow.addStep(CreateResponseMessageFunction, {
  "input_text": NotifyWorkflow.inputs.text,
});

NotifyWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: NotifyWorkflow.inputs.channel_id,
  message: create_response_message.outputs.response_message,
});

export default NotifyWorkflow;
