# slack-genos

Class S hero bot for Slack!

## How it works

It uses `slack` package to connect to Slack events and starts listening to all messages.

When it sees a message that starts with `.` it reads that message as a command.

When it sees `.help` it will look for the `src/commands/help` file, and if the file is found it will run the command.

## How do I configure a bot for me?

- [Create a bot here](https://my.slack.com/services/new/bot)
- Get the NAME and TOKEN, export to environment variables

Powershell:

```powershell
$env:BOT_NAME="genos"
$env:BOT_TOKEN="xoxb-......."
```

Bash:

```bash
export BOT_NAME="genos"
export BOT_TOKEN="xoxb-......."
```

- Start it: `npm start`
