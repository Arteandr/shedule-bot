import {Context} from 'telegraf';

export interface MenuAction {
  text: string;
  identifier: string;
  execute: (ctx: Context) => Promise<boolean>;
}
