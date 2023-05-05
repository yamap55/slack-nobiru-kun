import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { getEmoji, getMessage } from "../resources/mod.ts";

const createMessage = (
  input_text: string,
): string => {
  const user = getPraisedUser(input_text);
  return `${user} ${getMessage()}${getEmoji()}`;
};

/** SlackのユーザーIDフォーマットを抽出する正規表現パターン */
const SLACK_USER_ID_REGEX = /(<@\w+>)/;

/**
 * メッセージから褒められたユーザーのIDを取得する
 * @param text 対象のメッセージ
 * @returns ユーザーID（ <@U0476GKM8TW> というフォーマット）
 */
const getPraisedUser = (text: string): string => {
  const match = text.split("\n")[1].match(SLACK_USER_ID_REGEX);
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
  const response_message = createMessage(inputs.input_text);
  return { outputs: { response_message } };
});
