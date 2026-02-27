# Automated PR Descriptions and Code Review Assistant

## Why This Feature Demonstrates Copilot

- **Context Understanding**: Copilot analyzes git diff
- **Natural Language**: Generates human-readable summaries
- **Code Review**: Suggests potential issues
- **Best Practices**: Identifies anti-patterns
- **CI Integration**: Automated PR enhancement

## Problem

PRs often lack proper descriptions, making code review difficult. Reviewers spend time understanding changes instead of evaluating logic.

## Proposed Implementation

### 1. Auto-Generated PR Descriptions

```typescript
// .github/workflows/pr-description.yml
- Analyze git diff
- Generate description of changes
- List modified files with purpose
- Suggest reviewers based on code ownership
- Add relevant labels
```

### 2. Code Review Checklist

```typescript
// Auto-add checklist based on changes:
- [ ] Added tests for new features
- [ ] Updated documentation
- [ ] No console.logs
- [ ] Accessibility checked
- [ ] Performance impact assessed
```

### 3. Automated Code Review Comments

```typescript
// .github/workflows/code-review.yml
- Suggest improvements
- Flag potential bugs
- Check best practices
- Verify test coverage
- Security vulnerability scan
```

### 4. Breaking Change Detection

```typescript
// Detect and highlight:
- API changes
- Type signature changes
- Removed exports
- Database schema changes
```

### 5. PR Size Analyzer

```typescript
// Flag large PRs:
- Suggest splitting if >500 lines
- Calculate review time estimate
- Identify refactor opportunities
```

## Files Affected

- `.github/workflows/pr-description.yml` - Auto PR description
- `.github/workflows/code-review.yml` - Automated review
- `.github/pr-template.md` - Enhanced PR template
- `scripts/analyze-pr.ts` - PR analysis script
- `scripts/generate-pr-description.ts` - Description generator
- `.github/CODEOWNERS` - Code ownership
- `.github/labeler.yml` - Auto-labeling rules

## Copilot Demo Scenario

### Step 1: PR Description Generator (6 minutes)

Create `scripts/generate-pr-description.ts`:

```
Prompt: "Create a script that analyzes git diff, generates a PR description with: summary of changes, list of modified files with purpose, breaking changes, testing notes, and deployment considerations"
```

Create `.github/workflows/pr-description.yml`:

```
Prompt: "Create a GitHub Actions workflow that runs on PR open, generates description using the script, and posts as PR comment if description is empty"
```

### Step 2: Smart Checklist Generator (5 minutes)

In `scripts/generate-pr-description.ts`:

```
Prompt: "Add functionality to generate a custom checklist based on changed files: tests required if src/ changed, docs if API changed, a11y if components changed"
```

### Step 3: Code Review Bot (7 minutes)

Create `scripts/automated-review.ts`:

```
Prompt: "Create a script that analyzes PR diff and posts review comments for: missing error handling, console.logs, hardcoded values, large functions, missing type annotations, accessibility issues"
```

Create `.github/workflows/code-review.yml`:

```
Prompt: "Create a workflow that runs automated code review on every PR, posts suggestions as review comments, and assigns severity labels"
```

### Step 4: Breaking Change Detection (5 minutes)

In `scripts/analyze-pr.ts`:

```
Prompt: "Create a function that detects breaking changes by analyzing: exported function signature changes, removed exports, API route changes, and database schema modifications"
```

### Step 5: PR Size Analyzer (4 minutes)

In `scripts/analyze-pr.ts`:

```
Prompt: "Add PR size analysis: calculate lines changed, estimate review time (1 minute per 10 lines), flag PRs >500 lines, and suggest splitting into multiple PRs"
```

### Step 6: Auto Labeler (4 minutes)

Create `.github/labeler.yml`:

```
Prompt: "Configure auto-labeling for PRs based on changed files: 'frontend' for components/, 'backend' for api/, 'tests' for tests/, 'docs' for docs/, 'breaking' if types changed"
```

### Step 7: Reviewer Suggestions (3 minutes)

Create `.github/CODEOWNERS`:

```
Prompt: "Create CODEOWNERS file assigning: frontend team to components/, backend team to api/, DevOps to .github/"
```

### Live Demo Tips

1. Create a PR with no description
2. Show bot auto-generating comprehensive description
3. Demonstrate checklist appearing based on changes
4. Show code review bot commenting on potential issues
5. Display breaking change detection and warning
6. Show PR labeled automatically based on files changed
7. Demonstrate reviewer auto-assignment
8. Show PR size warning for large changes
9. View estimated review time

### Expected Output

- Auto-generated PR descriptions
- Context-aware checklists
- Automated code review comments
- Breaking change detection
- Smart labeling system
- Reviewer suggestions
- PR size analysis
- Review time estimates
- Reduced manual PR work by 80%
