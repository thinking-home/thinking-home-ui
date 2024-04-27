import { createContext, useContext, useMemo } from "react";
import { Ctx, I18n, Keyset, Params } from "@thinking-home/i18n";

export const context = createContext<Ctx | undefined>(undefined);

export const Provider = context.Provider;

export const useKeyset = <A extends Keyset>(keyset: A) => {
  const ctx = useContext(context);
  const i18n = useMemo(() => new I18n(keyset, ctx!), [keyset, ctx]);

  if (!ctx) {
    throw new Error("");
  }

  const t = <K extends keyof A>(key: K, params: Params<A[K]["type"]>) =>
    i18n.translate(key, params);
  const raw = <K extends keyof A>(key: K, params: Params<A[K]["type"]>) =>
    i18n.translateRaw(key, params);

  return { t, raw };
};
