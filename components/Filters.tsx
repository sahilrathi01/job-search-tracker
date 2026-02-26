"use client";
import React from "react";

export type FiltersState = {
  company: string;
  types: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  maxDistanceKm: number;
};

export default function Filters({
  state,
  setState,
  reset,
}: {
  state: FiltersState;
  setState: (s: FiltersState) => void;
  reset: () => void;
}) {
  const types = ["Full-time", "Part-time", "Shift", "Contract"];

  function toggleType(t: string) {
    const next = state.types.includes(t)
      ? state.types.filter((x) => x !== t)
      : [...state.types, t];
    setState({ ...state, types: next });
  }

  return (
    <div className="filters">
      <div style={{ marginBottom: 8 }}>
        <strong>Filters</strong>
      </div>
      <div style={{ marginBottom: 10 }}>
        <label className="small">Company</label>
        <input
          value={state.company}
          onChange={(e) => setState({ ...state, company: e.target.value })}
          placeholder="Search company..."
          style={{ width: "100%", padding: 10, marginTop: 6 }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label className="small">Type</label>
        <div style={{ marginTop: 6 }}>
          {types.map((t) => (
            <button
              key={t}
              className={"chip " + (state.types.includes(t) ? "active" : "")}
              onClick={() => toggleType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label className="small">Salary range</label>
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <input
            type="number"
            value={state.salaryMin ?? ""}
            onChange={(e) =>
              setState({
                ...state,
                salaryMin:
                  e.target.value === "" ? null : Number(e.target.value),
              })
            }
            style={{ width: "50%", padding: 10 }}
            placeholder="min"
          />
          <input
            type="number"
            value={state.salaryMax ?? ""}
            onChange={(e) =>
              setState({
                ...state,
                salaryMax:
                  e.target.value === "" ? null : Number(e.target.value),
              })
            }
            style={{ width: "50%", padding: 10 }}
            placeholder="max"
          />
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label className="small">Distance: 0 - {state.maxDistanceKm} km</label>
        <input
          type="range"
          min={0}
          max={50}
          value={state.maxDistanceKm}
          onChange={(e) =>
            setState({ ...state, maxDistanceKm: Number(e.target.value) })
          }
          style={{
            background: `linear-gradient(90deg, var(--accent-2) ${(state.maxDistanceKm / 50) * 100}%, #eee ${(state.maxDistanceKm / 50) * 100}%)`,
          }}
        />
        <div className="small" style={{ marginTop: 8 }}>
          Showing within {state.maxDistanceKm} km
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={reset} className="secondary">
          Reset filters
        </button>
      </div>
    </div>
  );
}
