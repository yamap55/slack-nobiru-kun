import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const { TARGET_CHANNEL_ID } = config();
export const GetTargetChannelFunction = DefineFunction({
  callback_id: "get_target_channel",
  title: "Get Target Channel",
  description: "Get Target Channel",
  source_file: "functions/get_target_channel.ts",
  output_parameters: {
    properties: { target_channel_id: { type: Schema.types.string, description: "Channel ID" } },
    required: ["target_channel_id"],
  },
});
export default SlackFunction(
  GetTargetChannelFunction,
  () => {
    return { outputs: { target_channel_id: TARGET_CHANNEL_ID } };
  },
  // ({ env }) => {
  //   return { outputs: { target_channel_id: env.TARGET_CHANNEL_ID } };
  // },
);
