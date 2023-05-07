import { createContext, useContext } from "react";

export enum LogLevel {
  /** Log level for very low severity diagnostic messages. */
  Trace = 0,
  /** Log level for low severity diagnostic messages. */
  Debug = 1,
  /** Log level for informational diagnostic messages. */
  Information = 2,
  /** Log level for diagnostic messages that indicate a non-fatal problem. */
  Warning = 3,
  /** Log level for diagnostic messages that indicate a failure in the current operation. */
  Error = 4,
  /** Log level for diagnostic messages that indicate a failure that will terminate the entire application. */
  Fatal = 5,
}

export type LoggerArgument = boolean | number | string | null;

export type LogMethod = {
  <T extends string = string>(
    template: string,
    a?: T extends `${string}%${string}` ? LoggerArgument : never,
    b?: LoggerArgument,
    c?: LoggerArgument,
    d?: LoggerArgument,
    e?: LoggerArgument,
    f?: LoggerArgument
  ): void;
};

export interface Logger {
  log<T extends string = string>(
    level: LogLevel,
    template: string,
    a?: T extends `${string}%${string}` ? LoggerArgument : never,
    b?: LoggerArgument,
    c?: LoggerArgument,
    d?: LoggerArgument,
    e?: LoggerArgument,
    f?: LoggerArgument
  ): void;

  trace: LogMethod;
  debug: LogMethod;
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  fatal: LogMethod;
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
