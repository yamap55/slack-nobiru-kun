# slack-next-gen-platform-template

## 概要

本リポジトリはSlackの次世代プラットフォーム機能を使用したアプリケーション開発環境のテンプレートリポジトリです。devcontainerの設定をしていますので、VS CodeとDocker、Gitさえあれば各種開発設定済みの開発環境が構築され即時開発可能となっています。GitHubのリポジトリページの「Use this template」を押下して使用してください。

## 使用方法

- アプリ作成
  - `slack create app_name`
  - 例: `slack create slack-emoji-monitor`
- 必要なファイルをコピー

### Deploy & Create Triggers

```
slack deploy
slack triggers create --trigger-def ./triggers/trigger_name.ts
```

### Set Environment Variables

```
slack env add ENVIRONMENT_NAME [ENVIRONMENT_VALUE]
```

## 開発手順

1. VS Code起動
2. `.env` というファイル名で新規ファイルを作成
   - `slack env` を使用しない場合には不要
   - 不要な場合には `docker-compose.yml` も修正が必要
3. 左下の緑色のアイコンクリック
4. 「Remote-Containers: Reopen in Container」クリック
5. しばらく待つ
   - 初回の場合コンテナー、imageの取得や作成が行われる
6. 起動したら開発可能

## その他

- lint
  - `deno lint`
- unittest
  - `deno test`

## 参考リンク

- [Slack 次世代プラットフォーム機能を少しずつ試す](https://qiita.com/seratch/items/b1449132add003e61de6)
- [公式ドキュメント](https://api.slack.com/future)
