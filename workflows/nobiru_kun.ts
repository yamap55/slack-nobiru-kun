import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { CheckContinueFunction } from "../functions/check_continue.ts";
import { CreateResponseMessageFunction } from "../functions/create_response_message.ts";
import { MySendMessageFunction } from "../functions/my_send_message.ts";
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

const check_continue = NotifyWorkflow.addStep(CheckContinueFunction, {
  input_text: NotifyWorkflow.inputs.text,
});
const create_response_message = NotifyWorkflow.addStep(CreateResponseMessageFunction, {
  input_text: NotifyWorkflow.inputs.text,
  continue_flag: check_continue.outputs.continue_flag,
});
NotifyWorkflow.addStep(MySendMessageFunction, {
  channel_id: NotifyWorkflow.inputs.channel_id,
  message: create_response_message.outputs.response_message,
  continue_flag: check_continue.outputs.continue_flag,
});

export default NotifyWorkflow;
