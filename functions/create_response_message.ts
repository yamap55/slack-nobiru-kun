import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { getEmoji, getMessage } from "../resources/mod.ts";
import { extractUserMatch } from "../utils/slack_message.ts";

const createMessage = (
  input_text: string,
): string => {
  const user = getPraisedUser(input_text);
  return `${user} ${getMessage()}${getEmoji()}`;
};

/**
 * メッセージから褒められたユーザーのIDを取得する
 * @param text 対象のメッセージ
 * @returns ユーザーID（ <@U0476GKM8TW> というフォーマット）
 */
const getPraisedUser = (text: string): string => {
  const match = extractUserMatch(text.split("\n")[1]);
  return match ? match[1] : "";
};

export const CreateResponseMessageFunction = DefineFunction({
  callback_id: "create_response_message",
  title: "Create Response Message",
  description: "Create Response Message",
  source_file: "functions/create_response_message.ts",
  input_parameters: {
    properties: {
      input_text: {
        type: Schema.types.string,
        description: "Input Text",
      },
      continue_flag: {
        type: Schema.types.boolean,
        description: "Continue Flag",
      },
    },
    required: ["input_text"],
  },
  output_parameters: {
    properties: {
      response_message: {
        type: Schema.types.string,
        description: "Response Message",
      },
    },
    required: ["response_message"],
  },
});

export default SlackFunction(CreateResponseMessageFunction, ({ inputs }) => {
  const response_message = inputs.continue_flag ? createMessage(inputs.input_text) : "";
  return { outputs: { response_message } };
});
