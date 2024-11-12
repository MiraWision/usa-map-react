import React from "react";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TStateAbbreviation, StatePaths } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type MapSettings = {
  props?: React.SVGProps<SVGSVGElement>;
  hideStates?: TStateAbbreviation[];
};

type Props = {
  defaultState?: { props: React.SVGProps<SVGPathElement> };
  customStates?: {
    [key in TStateAbbreviation]?: { props: React.SVGProps<SVGPathElement> };
  };
  mapSettings?: MapSettings;
  setHoveredState?: React.Dispatch<
    React.SetStateAction<TStateAbbreviation | "">
  >;
  setClickedState?: React.Dispatch<
    React.SetStateAction<TStateAbbreviation | "">
  >;
};

export function USAMap({
  defaultState,
  customStates,
  mapSettings,
  setClickedState,
  setHoveredState,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 959 593"
      onMouseLeave={() => setHoveredState && setHoveredState("")}
      {...mapSettings?.props}
    >
      <g className="outlines">
        {Object.entries(StatePaths)
          .map(([abbreviation, path]) => {
            if (
              mapSettings?.hideStates?.includes(
                abbreviation as TStateAbbreviation,
              )
            ) {
              return null;
            }

            const c = customStates?.[abbreviation as TStateAbbreviation];
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
                  setClickedState &&
                  setClickedState(abbreviation as TStateAbbreviation)
                }
                onMouseOver={() =>
                  setHoveredState &&
                  setHoveredState(abbreviation as TStateAbbreviation)
                }
                onMouseLeave={() => setHoveredState && setHoveredState("")}
                {...defaultState}
                {...c}
              />
            );
          })
          .filter((f) => f !== null)}

        {!mapSettings?.hideStates?.includes("DC") && (
          <g className="DC state">
            <circle
              className="dc2"
              onClick={() => setClickedState && setClickedState("DC")}
              onMouseOver={() => setHoveredState && setHoveredState("DC")}
              data-name={"DC"}
              fill={
                customStates?.["DC"]?.props?.fill ?? defaultState?.props?.fill
              }
              stroke={
                customStates?.["DC"]?.props?.stroke ??
                defaultState?.props?.stroke
              }
              strokeWidth="1.5"
              cx="801.3"
              cy="251.8"
              r="5"
              opacity="1"
            />
          </g>
        )}
      </g>
    </svg>
  );
}
