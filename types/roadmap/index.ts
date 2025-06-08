import { IFramwork } from "../framwork";

export type IRoadmap = {
  _id: string;
  title: string;
  icon: string;
  link: string;
  framework: IFramwork;
  createdAt: string;
};
