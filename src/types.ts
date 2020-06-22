export abstract class AbstractApp {
  constructor(protected config: IConfig) {}
  abstract async run(): Promise<IData>;
}

export interface IConfig {
  name: string;
  version: string;
  cache: string;
  args: string[];
}

export interface IData {
  [key: string]: any;
}

export abstract class AbstractController {
  constructor(
    protected actions: AbstractAction[],
    protected context: AbstractContext,
  ) {}
  abstract async run(): Promise<IData>;
}

export abstract class AbstractAction {
  constructor(protected fn: (data: IData) => Promise<IData>) {}
  abstract run(data: IData): Promise<IData>;
  abstract args(): IData;
}

export abstract class AbstractContext {
  constructor(protected data: IData) {}
  abstract contains(data: IData): boolean;
  abstract apply(data: IData): void;
  abstract read(): IData;
}

export abstract class AbstractInput {
  constructor(protected name: string, protected version: string) {}
  abstract async read(args: string[]): Promise<IData>;
}

export abstract class AbstractTemplate {
  constructor(protected template: string) {}
  abstract build(data: IData): string;
}

export interface ISource {
  description: string;
  args: IArg[];
  url: string;
  model: Model;
}

export interface Source extends ISource {}
export class Source {
  constructor(data: ISource) {
    Object.assign(this, data);
  }
}

interface IArg {
  name: string;
  description: string;
  config: IArgConfig;
}

interface IArgConfig {
  default?: any;
}

export interface IModel {
  root: string;
  body: IModelBody;
  template: string;
}

export interface Model extends IModel {}
export class Model implements IModel {
  constructor(data: IModel) {
    Object.assign(this, data);
  }
}

interface IModelBody {
  [key: string]: Model | Field;
}

export interface IField {
  selector: string;
  index?: number;
  attr?: string;
  template?: string;
}

export interface Field extends IField {}
export class Field {
  constructor(data: IField) {
    Object.assign(this, data);
  }
}

export abstract class AbstractParser {
  constructor(protected html: string, protected model: Model) {}
  abstract parse(): IData;
}

export interface ICheerioStatic {
  root(): ICheerio;
  (selector: string | ICheerioElement): ICheerio;
}

export interface ICheerio {
  [index: number]: ICheerioElement;
  find(selector: string): ICheerio;
  each(func: (index: number, element: ICheerioElement) => void): ICheerio;
  text(): string;
  attr(name: string): string;
}

export interface ICheerioElement {
}

export abstract class AbstractFormatter {
  constructor(protected data: IData, protected model: Model) {}
  abstract format(): string;
}
