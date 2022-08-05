export type StateType = IState | undefined;

export interface IState {
  id: number;
  name: string;
  letter: string;
  iso: number;
  status: boolean;
}
