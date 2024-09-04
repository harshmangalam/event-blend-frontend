import { $, component$, type PropsOf } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { LuSearch } from "@qwikest/icons/lucide";

type InputProps = PropsOf<"input"> & {
  error?: string;
};

export const SearchInput = component$<InputProps>(
  ({
    name,
    error,
    id,
    ["bind:value"]: valueSig,
    value,
    onInput$,
    ...props
  }) => {
    const inputId = id || name;

    return (
      <>
        <div class="relative">
          <input
            type="search"
            {...props}
            aria-errormessage={`${inputId}-error`}
            aria-invaid={!!error}
            // workaround to support two way data-binding on the Input component (https://github.com/QwikDev/qwik/issues/3926)
            value={valueSig ? valueSig.value : value}
            onInput$={
              valueSig ? $((__, el) => (valueSig.value = el.value)) : onInput$
            }
            class={cn(
              "flex h-12 w-full rounded-base border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              props.class,
            )}
            id={inputId}
            name={name}
          />
          <div class="absolute left-4 top-1/2 -translate-y-1/2">
            <LuSearch class="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        {error && (
          <div id={`${inputId}-error`} class="mt-1 text-sm text-alert">
            {error}
          </div>
        )}
      </>
    );
  },
);
