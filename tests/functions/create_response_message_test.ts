import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "dev:asserts";
import { returnsNext, stub } from "dev:mock";
import CreateResponseMessage from "../../functions/create_response_message.ts";
const { createContext } = SlackFunctionTester("create_response_message");

Deno.test("Normal Case", async () => {
  // NOTE: "../resources/response_messages.ts" のgetEmoji, getMessageを直接モックしたいがわからないためrandomをモックする
  const stubRandom = stub(Math, "random", returnsNext([0, 0]));
  const input_text = `:ぽっ: 称賛の送り先
<@U0123456789> さん！
:両目: 称賛の種類
:力こぶ:リーダーシップ
:拍手:称賛したいこと
すばらしいです
:ラブレター: 称賛を送った人
<@U0123456789>`;
  const { outputs } = await CreateResponseMessage(createContext({
    inputs: {
      input_text: input_text,
    },
  }));
  const actual = outputs?.response_message;
  const expected = "<@U0123456789> のことほんま尊敬するわ:star:";
  assertEquals(actual, expected);

  stubRandom.restore();
});
