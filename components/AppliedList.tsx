"use client"
import React from 'react'
import type { Job } from '../types/job'
import JobCard from './JobCard'

export default function AppliedList({ jobs, onWithdraw }: { jobs: Job[]; onWithdraw: (id: string) => void }) {
  if (jobs.length === 0) return <div className="applied-list empty">No applied jobs yet</div>
  return (
    <div className="applied-list">
      <div style={{fontWeight:600,marginBottom:8}}>Applied Jobs</div>
      {jobs.map(j => (
        <JobCard key={j.id} job={j} onUndo={onWithdraw} applied />
      ))}
    </div>
  )
}
