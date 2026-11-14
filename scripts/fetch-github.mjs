import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_FILE = path.join(ROOT, 'src', 'generated', 'github.json')
const CV_FILE = path.join(ROOT, 'public', 'CV_Nguyen_Dung.pdf')

const USERNAME = 'Dungnguyen831'
const TRACKED_REPOS = [
  'Traffic-Posts',
  'QuanLyThuVien_BE',
  'QuanLyThuVien_FE',
  'MusicAPP_FE',
  'MusicAPP_BE',
  'Portfolio',
  'Valorant_BanPick',
  'Deploy_Web',
]

const LANGUAGE_COLORS = {
  Dart: '#00B4AB',
  JavaScript: '#F7DF1E',
  Java: '#B07219',
  PHP: '#777BB4',
  TypeScript: '#3178C6',
}

const CORE_LANGUAGES = new Set(['Dart', 'JavaScript', 'Java', 'PHP', 'TypeScript'])

// Verified baseline from GitHub API so unauthenticated local rate-limits never zero out real data
const VERIFIED_BASELINE = {
  languages: [
    { name: 'Dart', bytes: 1079940, share: '40.2%', percent: 40.2, repos: 3, color: '#00B4AB' },
    { name: 'JavaScript', bytes: 863920, share: '32.1%', percent: 32.1, repos: 4, color: '#F7DF1E' },
    { name: 'Java', bytes: 364691, share: '13.6%', percent: 13.6, repos: 4, color: '#B07219' },
    { name: 'PHP', bytes: 356054, share: '13.2%', percent: 13.2, repos: 1, color: '#777BB4' },
    { name: 'TypeScript', bytes: 24605, share: '0.9%', percent: 0.9, repos: 1, color: '#3178C6' },
  ],
  repoCommits: {
    'Traffic-Posts': 232,
    QuanLyThuVien_BE: 137,
    QuanLyThuVien_FE: 193,
    MusicAPP_FE: 14,
    MusicAPP_BE: 9,
    Portfolio: 4,
    Valorant_BanPick: 5,
    Deploy_Web: 3,
  },
}

const headers = {
  'User-Agent': 'Dungnguyen831-Portfolio-Build',
  Accept: 'application/vnd.github+json',
}
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

async function readExisting() {
  try {
    const raw = await fs.readFile(OUT_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function fetchJson(url) {
  const res = await fetch(url, { headers })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`)
  }
  return res.json()
}

async function fetchCommitCount(repo, fallback = 0) {
  try {
    const url = `https://api.github.com/repos/${USERNAME}/${repo}/commits?per_page=1`
    const res = await fetch(url, { headers })
    if (!res.ok) return fallback
    const link = res.headers.get('link')
    if (link) {
      const match = link.match(/[?&]page=(\d+)>;\s*rel="last"/)
      if (match) return Number(match[1])
    }
    const data = await res.json()
    return Array.isArray(data) && data.length > 0 ? data.length : fallback
  } catch {
    return fallback
  }
}

async function fetchContributionsCalendar() {
  const url = `https://github.com/users/${USERNAME}/contributions`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Dungnguyen831-Portfolio-Build' },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`)
  }
  const html = await res.text()

  const totalMatch = html.match(/(\d[\d,]*)\s+contributions?\s+in\s+the\s+last\s+year/i)
  const totalContributions = totalMatch
    ? Number(totalMatch[1].replace(/,/g, ''))
    : 0

  const tooltipCounts = new Map()
  const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g
  let tm
  while ((tm = tooltipRegex.exec(html)) !== null) {
    const id = tm[1]
    const text = tm[2].trim()
    const numMatch = text.match(/^(\d+)\s+contribution/i)
    tooltipCounts.set(id, numMatch ? Number(numMatch[1]) : 0)
  }

  const dayRegex = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*data-level="(\d)"[^>]*>/g
  const days = []
  let dm
  while ((dm = dayRegex.exec(html)) !== null) {
    const date = dm[1]
    const id = dm[2]
    const level = Number(dm[3])
    const count = tooltipCounts.get(id) ?? (level > 0 ? level : 0)
    days.push({ date, level, count })
  }

  days.sort((a, b) => a.date.localeCompare(b.date))

  let activeDays = 0
  let longestStreak = 0
  let runningStreak = 0
  let peakDay = { date: '', count: 0 }

  for (const d of days) {
    if (d.count > 0) {
      activeDays++
      runningStreak++
      if (runningStreak > longestStreak) longestStreak = runningStreak
      if (d.count > peakDay.count) peakDay = { date: d.date, count: d.count }
    } else {
      runningStreak = 0
    }
  }

  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return {
    totalContributions,
    activeDays,
    longestStreak,
    peakDay,
    weeks,
  }
}

async function main() {
  console.log(`[sync:github] Fetching live GitHub metrics for @${USERNAME}...`)
  const existing = await readExisting()

  let cvSizeKb = 109
  try {
    const stat = await fs.stat(CV_FILE)
    cvSizeKb = Math.round(stat.size / 1024)
  } catch {
    // ignore
  }

  // Always fetch the contribution calendar (does not count against api.github.com rate limit)
  let calendar = existing?.contributions || null
  try {
    const cal = await fetchContributionsCalendar()
    if (cal.totalContributions > 0 && cal.weeks.length > 0) {
      calendar = {
        totalLastYear: cal.totalContributions,
        activeDays: cal.activeDays,
        longestStreak: cal.longestStreak,
        peakDay: cal.peakDay,
        weeks: cal.weeks,
      }
    }
  } catch (err) {
    console.warn(`[sync:github] Calendar fetch warning: ${err.message}`)
  }

  let profile = existing?.profile || {
    login: USERNAME,
    publicRepos: 21,
    nonForkRepos: 21,
    activeRepos: 17,
    followers: 0,
    createdAt: '2024-01-11T13:28:52Z',
    totalStars: 1,
  }

  let languages =
    existing?.languages?.length >= VERIFIED_BASELINE.languages.length
      ? existing.languages
      : VERIFIED_BASELINE.languages
  let repoMetrics = existing?.repos || {}

  // Ensure baseline commits are never 0
  for (const [repoName, baseCommits] of Object.entries(VERIFIED_BASELINE.repoCommits)) {
    if (!repoMetrics[repoName]) {
      repoMetrics[repoName] = {
        name: repoName,
        commits: baseCommits,
        stars: repoName === 'QuanLyThuVien_BE' ? 1 : 0,
        forks: 0,
        url: `https://github.com/${USERNAME}/${repoName}`,
      }
    } else if (!repoMetrics[repoName].commits || repoMetrics[repoName].commits < baseCommits) {
      repoMetrics[repoName].commits = baseCommits
    }
  }

  try {
    const [user, repos] = await Promise.all([
      fetchJson(`https://api.github.com/users/${USERNAME}`),
      fetchJson(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`),
    ])

    const ownRepos = repos.filter((r) => !r.fork && r.size > 0)
    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)

    profile = {
      login: user.login,
      publicRepos: user.public_repos,
      nonForkRepos: repos.filter((r) => !r.fork).length,
      activeRepos: ownRepos.length,
      followers: user.followers,
      createdAt: user.created_at,
      totalStars,
    }

    // Fetch commit counts for tracked repos first (only 8 requests)
    await Promise.all(
      TRACKED_REPOS.map(async (repoName) => {
        const found = repos.find((r) => r.name.toLowerCase() === repoName.toLowerCase())
        const fallbackCommits =
          repoMetrics[repoName]?.commits || VERIFIED_BASELINE.repoCommits[repoName] || 1
        const commits = await fetchCommitCount(repoName, fallbackCommits)
        if (found) {
          repoMetrics[repoName] = {
            name: found.name,
            commits,
            stars: found.stargazers_count,
            forks: found.forks_count,
            language: found.language,
            sizeKb: found.size,
            pushedAt: found.pushed_at,
            createdAt: found.created_at,
            homepage: found.homepage || null,
            url: found.html_url,
          }
        }
      }),
    )

    // Only fetch per-repo language bytes when GITHUB_TOKEN is available or we have quota
    if (process.env.GITHUB_TOKEN) {
      const langBytesAll = {}
      const langRepoCount = {}
      await Promise.all(
        ownRepos.map(async (r) => {
          if (r.language) {
            langRepoCount[r.language] = (langRepoCount[r.language] || 0) + 1
          }
          try {
            const langs = await fetchJson(r.languages_url)
            for (const [lang, bytes] of Object.entries(langs)) {
              langBytesAll[lang] = (langBytesAll[lang] || 0) + bytes
            }
          } catch {
            // ignore
          }
        }),
      )

      const coreEntries = Object.entries(langBytesAll)
        .filter(([lang]) => CORE_LANGUAGES.has(lang))
        .sort((a, b) => b[1] - a[1])
      const coreTotalBytes = coreEntries.reduce((acc, [, b]) => acc + b, 0)

      if (coreTotalBytes > 0) {
        languages = coreEntries.map(([name, bytes]) => ({
          name,
          bytes,
          share: `${((bytes / coreTotalBytes) * 100).toFixed(1)}%`,
          percent: Number(((bytes / coreTotalBytes) * 100).toFixed(1)),
          repos: langRepoCount[name] || 1,
          color: LANGUAGE_COLORS[name] || '#8b93a3',
        }))
      }
    }
  } catch (err) {
    console.warn(`[sync:github] REST API rate-limited or offline (${err.message}); preserving verified metrics.`)
  }

  const totalTrackedCommits = Object.values(repoMetrics).reduce(
    (sum, r) => sum + (r.commits || 0),
    0,
  )

  const payload = {
    updatedAt: new Date().toISOString(),
    profile,
    contributions: calendar,
    languages,
    repos: repoMetrics,
    summary: {
      totalTrackedCommits,
      cvSizeKb,
    },
  }

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true })
  await fs.writeFile(OUT_FILE, JSON.stringify(payload, null, 2) + '\n', 'utf8')
  console.log(
    `[sync:github] Saved ${OUT_FILE} (${calendar?.totalLastYear} contributions, ${profile.publicRepos} repos, ${totalTrackedCommits} tracked commits, ${languages.length} core languages).`,
  )
}

main()
