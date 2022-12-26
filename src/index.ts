import React, { ComponentType, createContext, useContext } from "react";
import ReactDOMClient from "react-dom/client";
import * as ReactRouter from "react-router";
import * as ReactRouterDOM from "react-router-dom";
import * as History from "history";
import { Decoder } from "io-ts/Decoder";

// HTTP CLIENT
export type PlainObject = Record<
  string,
  string | number | boolean | null | undefined
>;
export type QueryParams = URLSearchParams | PlainObject;
export type QueryData =
  | string
  | PlainObject
  | ArrayBuffer
  | FormData
  | File
  | Blob;

export interface ApiClient {
  get<T>(
    decoder: Decoder<unknown, T>,
    query: { url: string; params?: QueryParams }
  ): Promise<T>;
  post<T>(
    decoder: Decoder<unknown, T>,
    query: { url: string; params?: QueryParams; data: QueryData }
  ): Promise<T>;
}

// APP CONTEXT
export interface AppContext {
  lang: string;
  api: ApiClient;
}

const context = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = context.Provider;

export const useAppContext = (): AppContext => {
  const value = useContext(context);

  if (value === undefined) {
    throw new Error("ModuleContext is undefined");
  }

  return value;
};

// MODULE
export class UiModule {
  constructor(public readonly Component: ComponentType) {}
}

export function createModule(component: ComponentType) {
  return new UiModule(component);
}

declare global {
  interface Window {
    thReact: unknown;
    thReactDOMClient: unknown;
    thReactRouter: unknown;
    thReactRouterDOM: unknown;
    thHistory: unknown;
  }
}

window.thReact = React;
window.thReactDOMClient = ReactDOMClient;
window.thReactRouter = ReactRouter;
window.thReactRouterDOM = ReactRouterDOM;
window.thHistory = History;
