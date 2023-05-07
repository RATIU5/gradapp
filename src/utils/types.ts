import type { PostgrestError } from "@supabase/supabase-js";

type WithData<T> = {
  data: T;
  error: undefined;
};
type WithError<E> = { data: undefined; error: E };
export type Response<T> = WithData<T> | WithError<PostgrestError>;
