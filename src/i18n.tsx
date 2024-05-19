import { createContext, useContext, useMemo } from "react";
import { Ctx, Keyset, Content, Params } from "@thinking-home/i18n";

export const context = createContext<Ctx | undefined>(undefined);

export const Provider = context.Provider;

export const useI18nContext = () => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error("i18n context is undefined");
  }

  return ctx;
};

export const useKeyset = <A extends Record<string, Content>>(
  keyset: Keyset<A>
) => {
  const ctx = useI18nContext();

  return useMemo(() => {
    const t = <K extends keyof A>(key: K, params: Params<A[K]["type"]>) =>
      keyset.translate(ctx, key, params);
    const raw = <K extends keyof A>(key: K, params: Params<A[K]["type"]>) =>
      keyset.translateRaw(ctx, key, params);

    return { t, raw };
  }, [keyset, ctx]);
};
