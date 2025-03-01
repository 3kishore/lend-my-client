import { EErrorState } from './error-state.enum';

export interface IEmpty {
  iconPath: string;
  type: EErrorState;
  title: string;
  descriptions: Array<string>;
  subTitle?: string;
  hasRetryBtn?: boolean;
  btnAction?: Function;
}
