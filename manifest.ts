import { Manifest } from "deno-slack-sdk/mod.ts";
import NotifyWorkflow from "./workflows/nobiru_kun.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "slack-nobiru-kun",
  description: "誰かを褒めると粋なひとことコメントを返すbot",
  icon: "assets/animal_smile_neko.png",
  functions: [],
  workflows: [NotifyWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "channels:history",
  ],
});
