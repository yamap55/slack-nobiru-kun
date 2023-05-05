import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "dev:asserts";
import CreateResponseMessage from "../../functions/create_response_message.ts";

const { createContext } = SlackFunctionTester("create_response_message");

Deno.test("Normal Case", async () => {
  const { outputs } = await CreateResponseMessage(createContext({
    inputs: {
      input_text: "Hello, World!",
    },
  }));
  const actual = outputs?.response_message;
  const expected = "input_text: Hello, World!";
  assertEquals(actual, expected);
});
