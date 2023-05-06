import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { extractUserMatch } from "../utils/slack_message.ts";

const checkContinue = (
  input_text: string,
): boolean => {
  const has_new_line = input_text.includes("\n");
  // 対象のテキストが1行以上かつ2行目にユーザーIDが含まれているか
  return has_new_line && !!extractUserMatch(input_text.split("\n")[1]);
};

export const CheckContinueFunction = DefineFunction({
  callback_id: "check_continue",
  title: "Check Continue",
  description: "Check Continue",
  source_file: "functions/check_continue.ts",
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
      continue_flag: {
        type: Schema.types.boolean,
        description: "Continue Flag",
      },
    },
    required: ["continue_flag"],
  },
});

export default SlackFunction(CheckContinueFunction, ({ inputs }) => {
  const continue_flag = checkContinue(inputs.input_text);
  return { outputs: { continue_flag } };
});
