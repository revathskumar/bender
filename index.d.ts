type ConfigAction = {
  name?: string;
  label: string;
  action: string;
};

type Config = {
  version: string;
  actions: ConfigAction[];
};
