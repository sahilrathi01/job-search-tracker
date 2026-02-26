"use client"
import React from 'react'
import type { Job } from '../types/job'

function IconMoney() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1v22" stroke="#c04b3b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 5H7a4 4 0 000 8h10a4 4 0 010 8H7" stroke="#c04b3b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconPin() {
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 11.5a3 3 0 100-6 3 3 0 000 6z" stroke="#6b6b6b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 11.5c0 6-9 11-9 11s-9-5-9-11a9 9 0 1118 0z" stroke="#6b6b6b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function JobCard({ job, onApply, onUndo, applied = false }: { job: Job; onApply?: (id: string) => void; onUndo?: (id: string) => void; applied?: boolean }) {
  return (
    <div className="job-card">
      <div className="job-left">
        <div className="job-title-row">
          <div className="avatar">{job.company.charAt(0)}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{job.title}</div>
            <div style={{color:'#6b6b6b',fontSize:14}}>{job.company}</div>
          </div>
        </div>
        <div className="meta small">
          <span><IconMoney />₹{job.salary}/day</span>
          <span><IconPin />{typeof (job as any).distanceKm === 'number' && isFinite((job as any).distanceKm) ? `${(job as any).distanceKm.toFixed(1)} km` : '0 km'}</span>
          <span>{job.type}</span>
        </div>
        <div className="job-id">{job.id}</div>
      </div>
      <div className="row actions">
        {!applied ? (
          <button onClick={() => onApply && onApply(job.id)}>Apply</button>
        ) : (
          <button className="secondary" onClick={() => onUndo && onUndo(job.id)}>Withdraw</button>
        )}
      </div>
    </div>
  )
}
