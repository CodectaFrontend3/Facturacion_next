export type ConfigurationSectionAction =
  | {
      type: "route";
      href: string;
    }
  | {
      type: "modal";
      modalId: string;
    };

export interface ConfigurationSection {
  id: string;
  label: string;
  backgroundImage: string;
  image: string;
  action: ConfigurationSectionAction;
}
