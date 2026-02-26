# Job Application Tracker (Lite)

Minimal Next.js + TypeScript app that lists local jobs, supports live filtering, computes straight-line distance from Jaipur center, and lets users apply to jobs with localStorage persistence.

Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

What I built

- Next.js (App Router) + TypeScript app.
- Local job data in `data/jobs.json`.
- Filters: Company text, Type chips, Salary min/max, Distance (0-50 km slider), Reset filters.
- Apply moves job to Applied Jobs list and persists via localStorage.
- Undo/Withdraw returns job to dashboard.
- Distance computed with local Haversine implementation (no external APIs).

Trade-offs & next steps

- UI kept minimal (vanilla CSS). Could add Tailwind or component library for polish.
- E2E tests and unit tests not included (small app). Next step: add tests for filtering logic and persistence.
- Could store more metadata (apply timestamp) and support server sync.
