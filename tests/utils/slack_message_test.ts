import { assertEquals } from "dev:asserts";
import { extractUserMatch } from "../../utils/slack_message.ts";

Deno.test("extractUserMatch - マッチしないテストケース", () => {
  const actual = extractUserMatch("test");
  const expected = null;
  assertEquals(actual, expected);
});

Deno.test("extractUserMatch - マッチするテストケース。ユーザIDのみ", () => {
  const result = extractUserMatch("<@U0123456789>");
  // RegExpMatchArrayはそのまま比較が難しいので配列に変換して比較する
  const actual = Array.from(result || []);
  const expected = ["<@U0123456789>", "<@U0123456789>"];
  assertEquals(actual, expected);
});

Deno.test("extractUserMatch - マッチするテストケース。ユーザID以外の文字列が含まれる", () => {
  const result = extractUserMatch("aaaa<@U0123456789>bbbb");
  // RegExpMatchArrayはそのまま比較が難しいので配列に変換して比較する
  const actual = Array.from(result || []);
  const expected = ["<@U0123456789>", "<@U0123456789>"];
  assertEquals(actual, expected);
});
