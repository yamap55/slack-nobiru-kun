/** SlackのユーザーIDフォーマットを抽出する正規表現パターン */
const SLACK_USER_ID_REGEX = /(<@\w+>)/;

/**
 * 対象のメッセージからユーザーIDのフォーマットを抽出する
 * @param text 対象のメッセージ
 * @returns ユーザーID（ <@U0476GKM8TW> というフォーマット）にマッチするかどうか
 */
export const extractUserMatch = (text: string): RegExpMatchArray | null => {
  return text.match(SLACK_USER_ID_REGEX);
};
