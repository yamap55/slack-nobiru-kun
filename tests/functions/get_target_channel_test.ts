import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "dev:asserts";
import GetTargetChannel from "../../functions/get_target_channel.ts";

const { createContext } = SlackFunctionTester("get_target_channel");

Deno.test("Normal Case", async () => {
  const env = { TARGET_CHANNEL_ID: "C12345678" };
  const { outputs } = await GetTargetChannel(createContext({ inputs: {}, env }));
  const actual = outputs?.target_channel_id;
  const expected = "C12345678";
  assertEquals(actual, expected);
});
