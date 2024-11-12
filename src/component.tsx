import React from "react";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TStateAbbreviation, StatePaths } from "./data";

export type USAMapProps<T extends TStateAbbreviation | string> = {
  defaultState?: { props: React.SVGProps<SVGPathElement> };
  customStates?: {
    [key in TStateAbbreviation]?: key extends "DC"
      ? { props: React.SVGProps<SVGCircleElement> } // DC is a <circle>
      : { props: React.SVGProps<SVGPathElement> }; // Everything else is a <path>
  };
  mapSettings?: {
    svgProps?: React.SVGProps<SVGSVGElement>;
    groupProps?: React.SVGProps<SVGGElement>;
    hideStates?: TStateAbbreviation[];
  };
  setHoveredState?: React.Dispatch<React.SetStateAction<T | "">>;
  setClickedState?: React.Dispatch<React.SetStateAction<T | "">>;
};

export function USAMap<
  // This generic is just so the caller can disable the typing of state abbreviations.
  T extends string | TStateAbbreviation = TStateAbbreviation,
>({
  defaultState,
  customStates,
  mapSettings,
  setClickedState,
  setHoveredState,
}: USAMapProps<T>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 959 593"
      onMouseLeave={() => setHoveredState && setHoveredState("")}
      {...mapSettings?.svgProps}
    >
      <g {...mapSettings?.groupProps}>
        {Object.entries(StatePaths)
          .map(([abbreviation, path]) => {
            if (
              mapSettings?.hideStates?.includes(
                abbreviation as TStateAbbreviation,
              )
            ) {
              return null;
            }

            const c =
              customStates?.[abbreviation as Exclude<TStateAbbreviation, "DC">];

            return (
              <path
                key={abbreviation}
                d={path}
                data-name={abbreviation}
                className={cn(
                  defaultState?.props?.className,
                  c?.props?.className,
                )}
                fill={c?.props?.fill ?? defaultState?.props?.fill ?? "#ffffff"}
                stroke={
                  c?.props?.stroke ?? defaultState?.props?.stroke ?? "#000000"
                }
                onClick={() =>
                  setClickedState && setClickedState(abbreviation as T)
                }
                onMouseOver={() =>
                  setHoveredState && setHoveredState(abbreviation as T)
                }
                onMouseLeave={() => setHoveredState && setHoveredState("")}
                {...defaultState}
                {...c}
              />
            );
          })
          .filter((f) => f !== null)}

        {!mapSettings?.hideStates?.includes("DC") && (
          <circle
            className={cn(
              defaultState?.props?.className,
              customStates?.["DC"]?.props?.className,
            )}
            onClick={() => setClickedState && setClickedState("DC" as T)}
            onMouseOver={() => setHoveredState && setHoveredState("DC" as T)}
            data-name={"DC"}
            fill={
              customStates?.["DC"]?.props?.fill ??
              defaultState?.props?.fill ??
              "#ffffff"
            }
            stroke={
              customStates?.["DC"]?.props?.stroke ??
              defaultState?.props?.stroke ??
              "#000000"
            }
            strokeWidth="1.5"
            cx="801.3"
            cy="251.8"
            r="5"
            opacity="1"
            {...customStates?.["DC"]?.props}
          />
        )}
      </g>
    </svg>
  );
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

