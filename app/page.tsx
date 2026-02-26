"use client";
import React, { useEffect, useMemo, useState } from "react";
import jobsData from "../data/jobs.json";
import type { Job } from "../types/job";
import { haversineDistanceKm } from "../lib/distance";
import Filters, { FiltersState } from "../components/Filters";
import JobList from "../components/JobList";
import AppliedList from "../components/AppliedList";

const JAIPUR = { lat: 26.9124, lon: 75.7873 };
const STORAGE_KEY = "appliedJobIds";

export default function Page() {
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<"dashboard" | "applied">("dashboard");
  const [mounted, setMounted] = useState(false);

  const [filters, setFilters] = useState<FiltersState>({
    company: "",
    types: [],
    salaryMin: null,
    salaryMax: null,
    maxDistanceKm: 50,
  });

  // On mount, load applied IDs from localStorage, then mark mounted.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setApplied(new Set(JSON.parse(raw)));
    } catch (e) {
      // ignore
    } finally {
      setMounted(true);
    }
  }, []);

  // Persist applied IDs but only after we've rehydrated from storage (mounted)
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(applied)));
  }, [applied, mounted]);

  // attach computed distance to job objects (non-mutating copy)
  const jobs: Job[] = useMemo(() => {
    return (jobsData as Job[]).map(
      (j) =>
        ({
          ...j,
          distanceKm: haversineDistanceKm(
            JAIPUR.lat,
            JAIPUR.lon,
            j.location.lat,
            j.location.lon,
          ),
        }) as any,
    );
  }, []);

  function apply(id: string) {
    setApplied((prev) => new Set([...Array.from(prev), id]));
  }

  function withdraw(id: string) {
    setApplied((prev) => {
      const s = new Set(prev);
      s.delete(id);
      return s;
    });
  }

  function resetFilters() {
    setFilters({
      company: "",
      types: [],
      salaryMin: null,
      salaryMax: null,
      maxDistanceKm: 50,
    });
  }

  // dashboard jobs are those not applied and matching filters
  const dashboardJobs = useMemo(() => {
    return jobs
      .filter((j) => !applied.has(j.id))
      .filter((j) => {
        if (
          filters.company &&
          !j.company.toLowerCase().includes(filters.company.toLowerCase())
        )
          return false;
        if (filters.types.length > 0 && !filters.types.includes(j.type))
          return false;
        if (filters.salaryMin != null && j.salary < filters.salaryMin)
          return false;
        if (filters.salaryMax != null && j.salary > filters.salaryMax)
          return false;
        if ((j as any).distanceKm > filters.maxDistanceKm) return false;
        return true;
      });
  }, [jobs, applied, filters]);

  const appliedJobs = useMemo(
    () => jobs.filter((j) => applied.has(j.id)),
    [jobs, applied],
  );

  return (
    <div>
      <div className="header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <div>
            <div className="title">Job Tracker</div>
            <div className="subtitle">Find and apply to jobs near Jaipur</div>
          </div>
        </div>
        <div className="tabs">
          <button
            className={"tab " + (tab === "dashboard" ? "active" : "")}
            onClick={() => setTab("dashboard")}
          >
            <span>Open Jobs</span>
            <span className="badge">{mounted ? dashboardJobs.length : ""}</span>
          </button>
          <button
            className={"tab " + (tab === "applied" ? "active" : "")}
            onClick={() => setTab("applied")}
          >
            <span>Applied</span>
            <span className="badge">{mounted ? applied.size : ""}</span>
          </button>
        </div>
      </div>

      {tab === "dashboard" ? (
        <div className="panel">
          <Filters state={filters} setState={setFilters} reset={resetFilters} />
          <div className="results">
            <div style={{ marginBottom: 8 }} className="small">
              Showing {mounted ? dashboardJobs.length : ""} jobs
            </div>
            {dashboardJobs.length === 0 ? (
              <div className="empty">No jobs match your filters</div>
            ) : (
              <JobList
                jobs={dashboardJobs as any}
                onApply={apply}
                appliedIds={applied}
              />
            )}
          </div>
        </div>
      ) : (
        <AppliedList jobs={appliedJobs as any} onWithdraw={withdraw} />
      )}
    </div>
  );
}
