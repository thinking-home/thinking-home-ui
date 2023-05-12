import { createContext, useContext } from "react";

export enum LogLevel {
  Trace = 10,
  Debug = 20,
  Information = 30,
  Warning = 40,
  Error = 50,
  Fatal = 60,
}

export type JsonValue =
  | string
  | number
  | boolean
  | { [x: string]: JsonValue }
  | Array<JsonValue>
  | null
  | undefined;

export interface Logger {
  log(level: LogLevel, message: string): void;
  child(context: Record<string, JsonValue>): Logger;
}

const context = createContext<Logger | undefined>(undefined);

export const LoggerProvider = context.Provider;

export const useLogger = (): Logger => {
  const value = useContext(context);

  if (value === undefined) {
    throw new Error("Logger is undefined");
  }

  return value;
};
