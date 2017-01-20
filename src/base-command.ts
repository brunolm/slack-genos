interface CommandParams {
  user: any;
  commandName: string;
  text: string;
  args: string[];
}

export type Command = (params: CommandParams) => void;
