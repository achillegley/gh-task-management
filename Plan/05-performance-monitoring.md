# Performance Monitoring and Web Vitals Tracking

## Why This Feature Demonstrates Copilot

- **Analytics Integration**: Copilot can integrate third-party services
- **Performance Patterns**: Shows knowledge of web performance best practices
- **Custom Hooks**: Complex state and effect management
- **Data Visualization**: Chart generation
- **Edge Cases**: Handling browser APIs safely

## Problem

No visibility into application performance, loading times, or user experience metrics. Cannot identify performance bottlenecks.

## Proposed Implementation

### 1. Web Vitals Reporting

```typescript
// lib/web-vitals.ts
- Track Core Web Vitals (LCP, FID, CLS)
- Track custom metrics (API response times)
- Send to analytics endpoint
- Report to console in development
```

### 2. Performance Dashboard

```typescript
// app/performance/page.tsx
- Real-time performance metrics
- Historical trends
- API endpoint performance
- Component render times
- Bundle size tracking
```

### 3. Custom Performance Hooks

```typescript
// hooks/usePerformance.ts
- useRenderTime() - Track component render duration
- useApiLatency() - Track API call performance
- useResourceTiming() - Track asset loading
```

### 4. Performance Alerts

```typescript
// lib/performance-alerts.ts
- Alert on slow API responses (>1s)
- Alert on large client bundles (>500kb)
- Alert on poor Web Vitals scores
- Slack/email notifications
```

### 5. Performance CI Checks

```yaml
# .github/workflows/performance.yml
- Lighthouse CI integration
- Bundle size limits
- Performance budget enforcement
- Block merge if performance degrades
```

## Files Affected

- `lib/web-vitals.ts` - New file
- `lib/analytics.ts` - New file
- `hooks/usePerformance.ts` - New file
- `hooks/useRenderTime.ts` - New file
- `app/performance/page.tsx` - New performance dashboard
- `app/layout.tsx` - Add Web Vitals reporting
- `next.config.ts` - Add performance configuration
- `.github/workflows/performance.yml` - New workflow
- `lighthouserc.json` - Lighthouse CI config

## Copilot Demo Scenario

### Step 1: Web Vitals Setup (4 minutes)

Create `lib/web-vitals.ts`:

```
Prompt: "Create a module that tracks Core Web Vitals (LCP, FID, CLS, FCP, TTFB) and sends them to an analytics endpoint with error handling and TypeScript types"
```

Update `app/layout.tsx`:

```
Prompt: "Add Web Vitals reporting to this root layout that only runs in production"
```

### Step 2: Custom Performance Hooks (5 minutes)

Create `hooks/useRenderTime.ts`:

```
Prompt: "Create a hook that measures component render time using Performance API and reports slow renders (>16ms) to console"
```

Create `hooks/useApiLatency.ts`:

```
Prompt: "Create a hook that wraps API calls and tracks response times with percentiles (p50, p95, p99)"
```

### Step 3: Performance Dashboard (6 minutes)

Create `app/performance/page.tsx`:

```
Prompt: "Create a performance dashboard that displays: real-time Web Vitals, API endpoint latencies with charts, bundle sizes, and component render times. Use recharts for visualization"
```

### Step 4: Lighthouse CI (5 minutes)

Create `lighthouserc.json`:

```
Prompt: "Configure Lighthouse CI with performance budgets: LCP < 2.5s, FID < 100ms, CLS < 0.1, total bundle < 500kb"
```

Create `.github/workflows/performance.yml`:

```
Prompt: "Create a GitHub Actions workflow that runs Lighthouse CI on every PR, fails if budgets are exceeded, and posts results as PR comment"
```

### Step 5: Performance Alerts (4 minutes)

Create `lib/performance-alerts.ts`:

```
Prompt: "Create a system that monitors performance metrics and sends Slack webhook alerts when thresholds are exceeded"
```

### Live Demo Tips

1. Show dashboard with real-time metrics updating
2. Trigger slow API call and show latency spike
3. Show Lighthouse CI failing on PR with performance regression
4. Demonstrate render time tracking on slow component
5. Show bundle size growing and CI blocking merge
6. Display Web Vitals improving after optimization

### Expected Output

- Real-time performance monitoring
- Automatic performance regression detection
- CI blocking bad performance changes
- Visual performance dashboard
- Alerting system for issues
- Historical performance trends
