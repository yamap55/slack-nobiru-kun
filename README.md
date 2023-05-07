# slack-nobiru-kun

## 概要

Slackの既定チャンネルで誰かを褒めると一緒に褒めてくれるアプリケーションです。

以下のリポジトリにインスパイヤされました。（Inspired by the following repositories）
https://github.com/yamazaki-seiya/nobiru_kun

## 環境情報

- Slackの次世代プラットフォーム機能

## 環境変数

※現バージョンでは使用していない

| environmental variables | value                                                           |
| ----------------------- | --------------------------------------------------------------- |
| OPENAI_API_KEY          | [OpenAPIから取得](https://platform.openai.com/account/api-keys) |
| TARGET_CHANNEL_ID       | メッセージを送信するチャンネルのID                              |

## Deploy & Create Triggers

```
slack deploy
slack triggers create --trigger-def ./triggers/nobiru_kun.ts
```

### Set Environment Variables

※現バージョンでは使用していない

```
slack env add TARGET_CHANNEL_ID [TARGET_CHANNEL_ID]
slack env add OPENAI_API_KEY [OPENAI_API_KEY]
```

## 開発手順

1. VS Code起動
2. `.env` というファイル名で新規ファイルを作成
   - 上記、環境変数セクションを参照し値を記載
   - ※現バージョンでは使用していないため空ファイルを作成
3. 左下のアイコンクリック
4. 「Reopen in Container」クリック
5. しばらく待つ
   - 初回の場合コンテナー、imageの取得や作成が行われる
6. 起動したら開発可能

## その他

- lint
  - `deno lint`
- unittest
  - `deno test`
