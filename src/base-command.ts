import * as slack from 'slack';

interface CommandParams {
  message: slack.SlackMessage;
  user: any;
  commandName: string;
  text: string;
  args: string[];
}

export type Command = (params: CommandParams) => void;
