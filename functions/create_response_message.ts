import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

const createMessage = (
  input_text: string,
): string => {
  // TODO: Implement your business logic here.
  return `input_text: ${input_text}`;
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
