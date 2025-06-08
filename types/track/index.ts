import { ISection } from "../sections";

export type ITrack = {
  _id: string;
  title: string;
  icon: string;
  icon3D: string;
  body: string;
  section: ISection;
};
