import { createContext, useContext, useMemo } from "react";
import { Context, Keyset, Content, Params } from "@thinking-home/i18n";

const context = createContext<Context | undefined>(undefined);

export const I18nProvider = context.Provider;

export const useKeyset = <A extends Record<string, Content>>(
  keyset: Keyset<A>
) => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error("i18n context is undefined");
  }

  return useMemo(() => {
    const t = <K extends keyof A>(key: K, params?: Params<A[K]["type"]>) =>
      keyset.translate(ctx, key, params);
    const raw = <K extends keyof A>(key: K, params?: Params<A[K]["type"]>) =>
      keyset.translateRaw(ctx, key, params);

    return { t, raw };
  }, [keyset, ctx]);
};
