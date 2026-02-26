"use client";
import React from "react";
import type { Job } from "../types/job";
import JobCard from "./JobCard";

export default function JobList({
  jobs,
  onApply,
  appliedIds,
}: {
  jobs: Job[];
  onApply: (id: string) => void;
  appliedIds: Set<string>;
}) {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onApply={onApply}
          applied={appliedIds.has(job.id)}
        />
      ))}
    </div>
  );
}
