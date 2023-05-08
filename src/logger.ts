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

export abstract class Logger {
  abstract log<T extends string = string>(
    level: LogLevel,
    template: string,
    a?: T extends `${string}%${string}` ? LoggerArgument : never,
    b?: LoggerArgument,
    c?: LoggerArgument,
    d?: LoggerArgument,
    e?: LoggerArgument,
    f?: LoggerArgument
  ): void;

  abstract child<T extends Record<string, unknown>>(context: T): Logger;

  trace: LogMethod = (t, a, b, c, d, e, f) =>
    this.log(LogLevel.Trace, t, a, b, c, d, e, f);
  debug: LogMethod = (t, a, b, c, d, e, f) =>
    this.log(LogLevel.Debug, t, a, b, c, d, e, f);
  info: LogMethod = (t, a, b, c, d, e, f) =>
    this.log(LogLevel.Information, t, a, b, c, d, e, f);
  warn: LogMethod = (t, a, b, c, d, e, f) =>
    this.log(LogLevel.Warning, t, a, b, c, d, e, f);
  error: LogMethod = (t, a, b, c, d, e, f) =>
    this.log(LogLevel.Error, t, a, b, c, d, e, f);
  fatal: LogMethod = (t, a, b, c, d, e, f) =>
    this.log(LogLevel.Fatal, t, a, b, c, d, e, f);
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
