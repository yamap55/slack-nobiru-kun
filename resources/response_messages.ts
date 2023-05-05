/** メッセージ群  */
export const MESSAGES = [
  "のことほんま尊敬するわ",
  "相変わらずすごいやつやな",
  "みたいなすごいやつになりたいわ",
  "の頑張りはほんまにすごいわ",
  "は俺らの憧れの存在やわ",
  "に圧倒的RESPECTを送りたいわ",
  "はいつも輝いているわ",
  "よう頑張ってくれたな！ほんまお疲れ様やで",
  "は真のプロフェッショナルやで",
  "はやっぱり超一流やわ",
  "は何をやらせてもピカイチやわ",
  "のすごさにはいつも圧倒されるわ",
  "ほんまにめっちゃ助かったで",
  "！いつもほんまにさんきゅーやで",
  "のおかげで今の俺らがあるんやわ",
  "お前がおらんかったら無理やったで！サンキューな",
  "いつも俺らのこと助けてくれてサンキューな",
  "と一緒に働けて俺らはほんまに幸せやで",
  "ほんまサンキューな！これからもよろしくやで",
  "に圧倒的感謝を送りたいわ",
];

/** 絵文字 */
export const EMOJIS = [
  ":star:",
  ":stars:",
  ":rose:",
  ":blossom:",
  ":sunflower:",
  ":hibiscus:",
  ":bouquet:",
  ":four_leaf_clover:",
  ":tada:",
  ":female_fairy:",
  ":smiling_face_with_3_hearts:",
  ":laughing:",
  ":bird:",
  ":sheep:",
  ":penguin:",
  ":unicorn_face:",
  ":panda_face:",
  ":tiger:",
  ":lion_face:",
  ":dolphin:",
];

/**
 * 配列からランダムな要素を取得
 * @param array 配列
 * @returns ランダムに取得された要素
 */
const getRandomElement = (array: string[]): string => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

export const getEmoji = (): string => getRandomElement(EMOJIS);
export const getMessage = (): string => getRandomElement(MESSAGES);
