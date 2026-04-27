import { useMemo, useState } from 'react'
import { usePortfolioData } from '../context/PortfolioDataContext'

const inputClass =
  'w-full rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 text-sm text-slate-100 outline-none transition-colors focus:border-sky-500'
const textareaClass =
  'w-full min-h-24 rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 text-sm text-slate-100 outline-none transition-colors focus:border-sky-500'
const sectionClass =
  'rounded-2xl border border-slate-800/90 bg-slate-900/70 p-4 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-5 md:p-6'
const itemClass = 'rounded-xl border border-slate-700/90 bg-slate-900/85 p-3 space-y-3 sm:p-4'
const secondaryButtonClass =
  'w-full rounded-lg border border-slate-600 px-4 py-2 text-center text-sm font-medium text-slate-200 transition-colors hover:border-slate-400 sm:w-auto'
const primaryButtonClass =
  'w-full rounded-lg bg-sky-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
const dangerButtonClass =
  'w-full rounded-lg border border-rose-500 px-4 py-2 text-center text-sm font-medium text-rose-300 transition-colors hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'

const quickNavItems = [
  { id: 'admin-hero', label: 'Hero' },
  { id: 'admin-proof', label: 'Proof' },
  { id: 'admin-about', label: 'About' },
  { id: 'admin-experience', label: 'Experience' },
  { id: 'admin-skills', label: 'Skills' },
  { id: 'admin-projects', label: 'Projects' },
  { id: 'admin-certificates', label: 'Certificates' },
  { id: 'admin-whyhire', label: 'Why Hire' },
  { id: 'admin-learning', label: 'Learning' },
  { id: 'admin-contact', label: 'Contact' },
  { id: 'admin-sidebar', label: 'Sidebar' },
]

const splitLines = (value) =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const joinLines = (value) => (Array.isArray(value) ? value.join('\n') : '')

const splitCsv = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

const joinCsv = (value) => (Array.isArray(value) ? value.join(', ') : '')

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read selected file.'))

    reader.readAsDataURL(file)
  })

const cloneData = (value) => JSON.parse(JSON.stringify(value))

const AdminDashboard = () => {
  const { content, saveContent, defaultContent, isCloudEnabled, isSyncing, syncError, lastSyncedAt } =
    usePortfolioData()
  const [draft, setDraft] = useState(() => cloneData(content))
  const [statusMessage, setStatusMessage] = useState('')
  const hasUnsavedChanges = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content])
  const lastSyncedLabel = useMemo(() => {
    if (!lastSyncedAt) {
      return ''
    }

    const parsedDate = new Date(lastSyncedAt)

    if (Number.isNaN(parsedDate.getTime())) {
      return ''
    }

    return parsedDate.toLocaleString()
  }, [lastSyncedAt])

  const setSectionField = (section, field, value) => {
    setDraft((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [field]: value,
      },
    }))
  }

  const updateListItem = (section, listKey, index, field, value) => {
    setDraft((previous) => {
      const list = [...(previous[section]?.[listKey] ?? [])]
      list[index] = {
        ...(list[index] ?? {}),
        [field]: value,
      }

      return {
        ...previous,
        [section]: {
          ...previous[section],
          [listKey]: list,
        },
      }
    })
  }

  const updatePrimitiveListItem = (section, listKey, index, value) => {
    setDraft((previous) => {
      const list = [...(previous[section]?.[listKey] ?? [])]
      list[index] = value

      return {
        ...previous,
        [section]: {
          ...previous[section],
          [listKey]: list,
        },
      }
    })
  }

  const addListItem = (section, listKey, item) => {
    setDraft((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [listKey]: [...(previous[section]?.[listKey] ?? []), item],
      },
    }))
  }

  const removeListItem = (section, listKey, index) => {
    setDraft((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [listKey]: (previous[section]?.[listKey] ?? []).filter((_, itemIndex) => itemIndex !== index),
      },
    }))
  }

  const updateSkillGroupField = (groupIndex, field, value) => {
    setDraft((previous) => {
      const groups = [...(previous.skills?.groups ?? [])]
      groups[groupIndex] = {
        ...(groups[groupIndex] ?? {}),
        [field]: value,
      }

      return {
        ...previous,
        skills: {
          ...previous.skills,
          groups,
        },
      }
    })
  }

  const addSkillGroup = () => {
    addListItem('skills', 'groups', {
      title: 'New Group',
      skills: [
        {
          name: 'New Skill',
          icon: 'FaCode',
          color: 'text-sky-400',
        },
      ],
    })
  }

  const removeSkillGroup = (groupIndex) => {
    removeListItem('skills', 'groups', groupIndex)
  }

  const updateSkillItem = (groupIndex, skillIndex, field, value) => {
    setDraft((previous) => {
      const groups = [...(previous.skills?.groups ?? [])]
      const group = { ...(groups[groupIndex] ?? {}) }
      const skills = [...(group.skills ?? [])]

      skills[skillIndex] = {
        ...(skills[skillIndex] ?? {}),
        [field]: value,
      }

      group.skills = skills
      groups[groupIndex] = group

      return {
        ...previous,
        skills: {
          ...previous.skills,
          groups,
        },
      }
    })
  }

  const addSkillItem = (groupIndex) => {
    setDraft((previous) => {
      const groups = [...(previous.skills?.groups ?? [])]
      const group = { ...(groups[groupIndex] ?? {}) }

      group.skills = [
        ...(group.skills ?? []),
        {
          name: 'New Skill',
          icon: 'FaCode',
          color: 'text-sky-400',
        },
      ]

      groups[groupIndex] = group

      return {
        ...previous,
        skills: {
          ...previous.skills,
          groups,
        },
      }
    })
  }

  const removeSkillItem = (groupIndex, skillIndex) => {
    setDraft((previous) => {
      const groups = [...(previous.skills?.groups ?? [])]
      const group = { ...(groups[groupIndex] ?? {}) }

      group.skills = (group.skills ?? []).filter((_, index) => index !== skillIndex)
      groups[groupIndex] = group

      return {
        ...previous,
        skills: {
          ...previous.skills,
          groups,
        },
      }
    })
  }

  const uploadThumbnail = async (section, index, file) => {
    if (!file) {
      return
    }

    try {
      const dataUrl = await readFileAsDataUrl(file)
      updateListItem(section, 'items', index, 'thumbnail', dataUrl)
      setStatusMessage(`Thumbnail uploaded for ${section.slice(0, -1)} ${index + 1}.`)
    } catch (error) {
      setStatusMessage(error.message)
    }
  }

  const uploadHeroProfileImage = async (file) => {
    if (!file) {
      return
    }

    try {
      const dataUrl = await readFileAsDataUrl(file)
      setSectionField('hero', 'profileImage', dataUrl)
      setStatusMessage('Hero profile image uploaded.')
    } catch (error) {
      setStatusMessage(error.message)
    }
  }

  const uploadHeroResume = async (file) => {
    if (!file) {
      return
    }

    const allowedResumeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!allowedResumeTypes.includes(file.type)) {
      setStatusMessage('Please upload a valid resume file (.pdf, .doc, .docx).')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setStatusMessage('Please keep resume file size under 2MB for reliable local storage.')
      return
    }

    try {
      const dataUrl = await readFileAsDataUrl(file)
      setDraft((previous) => ({
        ...previous,
        hero: {
          ...previous.hero,
          secondaryButtonHref: dataUrl,
          resumeFileName: file.name,
        },
      }))
      setStatusMessage('Resume uploaded. Download Resume button is now linked to this file.')
    } catch (error) {
      setStatusMessage(error.message)
    }
  }

  const saveChanges = async () => {
    const clonedDraft = cloneData(draft)
    const result = await saveContent(clonedDraft)

    setDraft(clonedDraft)

    if (result.persistedToCloud) {
      setStatusMessage('Dashboard content saved to Supabase successfully.')
      return
    }

    if (result.ok) {
      setStatusMessage(result.message)
      return
    }

    setStatusMessage(`Saved locally, but cloud sync failed: ${result.message}`)
  }

  const discardDraft = () => {
    setDraft(cloneData(content))
    setStatusMessage('Unsaved changes were discarded.')
  }

  const resetToDefault = async () => {
    if (!window.confirm('Reset all portfolio content to default values?')) {
      return
    }

    const defaults = cloneData(defaultContent)
    setDraft(defaults)

    const result = await saveContent(defaults)

    if (result.persistedToCloud) {
      setStatusMessage('Portfolio content reset and synced to Supabase.')
      return
    }

    if (result.ok) {
      setStatusMessage('Portfolio content reset locally. Configure Supabase to sync online.')
      return
    }

    setStatusMessage(`Portfolio reset locally, but cloud sync failed: ${result.message}`)
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-4 text-slate-100 sm:py-6 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/88 p-4 shadow-[0_18px_36px_rgba(2,6,23,0.45)] backdrop-blur-md sm:p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">Portfolio Admin Dashboard</h1>
              <p className="mt-2 text-sm text-slate-400">
                Manage content section-by-section with quick navigation, live previews, and structured controls.
              </p>
              <p
                className={`mt-3 inline-flex rounded-md border px-2.5 py-1 text-xs font-medium ${hasUnsavedChanges
                  ? 'border-amber-400/50 bg-amber-400/10 text-amber-300'
                  : 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300'}`}
              >
                {hasUnsavedChanges ? 'Unsaved changes' : 'All changes saved'}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap md:w-auto">
              <a
                href="/"
                className={secondaryButtonClass}
              >
                Back to Portfolio
              </a>
              <button
                type="button"
                onClick={discardDraft}
                className={secondaryButtonClass}
                disabled={isSyncing}
              >
                Discard Draft
              </button>
              <button
                type="button"
                onClick={saveChanges}
                className={primaryButtonClass}
                disabled={isSyncing}
              >
                {isSyncing ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={resetToDefault}
                className={dangerButtonClass}
                disabled={isSyncing}
              >
                Reset All
              </button>
            </div>
          </div>

          <nav className="mt-4 border-t border-slate-800 pt-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickNavItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="shrink-0 whitespace-nowrap rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-sky-400/70 hover:text-sky-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          {statusMessage && (
            <p className="mt-4 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-sm text-sky-300">
              {statusMessage}
            </p>
          )}

          {syncError && (
            <p className="mt-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
              Cloud sync warning: {syncError}
            </p>
          )}
        </header>

        <section id="admin-hero" className={`${sectionClass} scroll-mt-28`}>
          <h2 className="mb-4 text-xl font-semibold text-sky-300">Hero Section</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Name</label>
              <input
                className={inputClass}
                value={draft.hero?.name ?? ''}
                onChange={(event) => setSectionField('hero', 'name', event.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Profile Image URL</label>
              <input
                className={inputClass}
                value={draft.hero?.profileImage ?? ''}
                onChange={(event) =>
                  setSectionField('hero', 'profileImage', event.target.value)
                }
                placeholder="https://example.com/profile.jpg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-slate-300">Upload Profile Image</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-sky-500 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-slate-950"
                onChange={(event) => uploadHeroProfileImage(event.target.files?.[0])}
              />
              {draft.hero?.profileImage && (
                <img
                  src={draft.hero.profileImage}
                  alt="Hero profile preview"
                  className="mt-3 h-24 w-24 rounded-full border border-slate-600 object-cover"
                />
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Roles (one per line)</label>
              <textarea
                className={textareaClass}
                value={joinLines(draft.hero?.roles)}
                onChange={(event) =>
                  setSectionField('hero', 'roles', splitLines(event.target.value))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-slate-300">Description</label>
              <textarea
                className={textareaClass}
                value={draft.hero?.description ?? ''}
                onChange={(event) => setSectionField('hero', 'description', event.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Primary Button Text</label>
              <input
                className={inputClass}
                value={draft.hero?.primaryButtonText ?? ''}
                onChange={(event) =>
                  setSectionField('hero', 'primaryButtonText', event.target.value)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Primary Button Link</label>
              <input
                className={inputClass}
                value={draft.hero?.primaryButtonHref ?? ''}
                onChange={(event) =>
                  setSectionField('hero', 'primaryButtonHref', event.target.value)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Secondary Button Text</label>
              <input
                className={inputClass}
                value={draft.hero?.secondaryButtonText ?? ''}
                onChange={(event) =>
                  setSectionField('hero', 'secondaryButtonText', event.target.value)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Secondary Button Link</label>
              <input
                className={inputClass}
                value={draft.hero?.secondaryButtonHref ?? ''}
                onChange={(event) =>
                  setSectionField('hero', 'secondaryButtonHref', event.target.value)
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-slate-300">Upload Resume (PDF/DOC/DOCX, max 2MB)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="block w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 file:mr-3 file:rounded-md file:border-0 file:bg-sky-500 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-slate-950"
                onChange={(event) => uploadHeroResume(event.target.files?.[0])}
              />
              {draft.hero?.resumeFileName && (
                <p className="mt-2 text-xs text-slate-400">Current uploaded resume: {draft.hero.resumeFileName}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-slate-300">Badges (one per line)</label>
              <textarea
                className={textareaClass}
                value={joinLines(draft.hero?.badges)}
                onChange={(event) =>
                  setSectionField('hero', 'badges', splitLines(event.target.value))
                }
              />
            </div>
          </div>
        </section>

        <section id="admin-proof" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">Proof Section</h2>
            <button
              type="button"
              onClick={() =>
                addListItem('proof', 'metrics', {
                  icon: '⭐',
                  number: '0',
                  label: 'New Metric',
                })
              }
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Metric
            </button>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-300">Section Title</label>
            <input
              className={inputClass}
              value={draft.proof?.title ?? ''}
              onChange={(event) => setSectionField('proof', 'title', event.target.value)}
            />
          </div>

          <div className="space-y-3">
            {(draft.proof?.metrics ?? []).map((metric, index) => (
              <div key={`metric-${index}`} className={itemClass}>
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    className={inputClass}
                    value={metric.icon ?? ''}
                    onChange={(event) =>
                      updateListItem('proof', 'metrics', index, 'icon', event.target.value)
                    }
                    placeholder="Icon"
                  />
                  <input
                    className={inputClass}
                    value={metric.number ?? ''}
                    onChange={(event) =>
                      updateListItem('proof', 'metrics', index, 'number', event.target.value)
                    }
                    placeholder="Number"
                  />
                  <input
                    className={inputClass}
                    value={metric.label ?? ''}
                    onChange={(event) =>
                      updateListItem('proof', 'metrics', index, 'label', event.target.value)
                    }
                    placeholder="Label"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeListItem('proof', 'metrics', index)}
                  className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                >
                  Remove Metric
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="admin-about" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">About Section</h2>
            <button
              type="button"
              onClick={() => addListItem('about', 'paragraphs', 'New paragraph')}
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Paragraph
            </button>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-300">Section Title</label>
            <input
              className={inputClass}
              value={draft.about?.title ?? ''}
              onChange={(event) => setSectionField('about', 'title', event.target.value)}
            />
          </div>

          <div className="space-y-3">
            {(draft.about?.paragraphs ?? []).map((paragraph, index) => (
              <div key={`paragraph-${index}`} className={itemClass}>
                <textarea
                  className={textareaClass}
                  value={paragraph}
                  onChange={(event) =>
                    updatePrimitiveListItem('about', 'paragraphs', index, event.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeListItem('about', 'paragraphs', index)}
                  className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                >
                  Remove Paragraph
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="admin-experience" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">Experience Section</h2>
            <button
              type="button"
              onClick={() =>
                addListItem('experience', 'items', {
                  role: 'New Role',
                  company: 'Company Name',
                  period: '2026',
                  location: 'Remote',
                  type: 'Full-time',
                  description: 'Experience summary',
                  highlights: ['Key impact highlight'],
                  tech: ['React'],
                })
              }
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Experience
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Section Title</label>
              <input
                className={inputClass}
                value={draft.experience?.title ?? ''}
                onChange={(event) => setSectionField('experience', 'title', event.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Intro</label>
              <textarea
                className={textareaClass}
                value={draft.experience?.intro ?? ''}
                onChange={(event) => setSectionField('experience', 'intro', event.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {(draft.experience?.items ?? []).map((item, index) => (
              <div key={`experience-${index}`} className={itemClass}>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className={inputClass}
                    value={item.role ?? ''}
                    onChange={(event) =>
                      updateListItem('experience', 'items', index, 'role', event.target.value)
                    }
                    placeholder="Role"
                  />
                  <input
                    className={inputClass}
                    value={item.company ?? ''}
                    onChange={(event) =>
                      updateListItem('experience', 'items', index, 'company', event.target.value)
                    }
                    placeholder="Company"
                  />
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    className={inputClass}
                    value={item.period ?? ''}
                    onChange={(event) =>
                      updateListItem('experience', 'items', index, 'period', event.target.value)
                    }
                    placeholder="Period"
                  />
                  <input
                    className={inputClass}
                    value={item.location ?? ''}
                    onChange={(event) =>
                      updateListItem('experience', 'items', index, 'location', event.target.value)
                    }
                    placeholder="Location"
                  />
                  <input
                    className={inputClass}
                    value={item.type ?? ''}
                    onChange={(event) =>
                      updateListItem('experience', 'items', index, 'type', event.target.value)
                    }
                    placeholder="Type"
                  />
                </div>

                <textarea
                  className={textareaClass}
                  value={item.description ?? ''}
                  onChange={(event) =>
                    updateListItem('experience', 'items', index, 'description', event.target.value)
                  }
                  placeholder="Experience summary"
                />

                <textarea
                  className={textareaClass}
                  value={joinLines(item.highlights)}
                  onChange={(event) =>
                    updateListItem(
                      'experience',
                      'items',
                      index,
                      'highlights',
                      splitLines(event.target.value),
                    )
                  }
                  placeholder="Highlights, one per line"
                />

                <input
                  className={inputClass}
                  value={joinCsv(item.tech)}
                  onChange={(event) =>
                    updateListItem('experience', 'items', index, 'tech', splitCsv(event.target.value))
                  }
                  placeholder="Tech stack separated by commas"
                />

                <button
                  type="button"
                  onClick={() => removeListItem('experience', 'items', index)}
                  className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                >
                  Remove Experience
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="admin-skills" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">Skills Section</h2>
            <button
              type="button"
              onClick={addSkillGroup}
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Skill Group
            </button>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-300">Section Title</label>
            <input
              className={inputClass}
              value={draft.skills?.title ?? ''}
              onChange={(event) => setSectionField('skills', 'title', event.target.value)}
            />
          </div>

          <div className="space-y-4">
            {(draft.skills?.groups ?? []).map((group, groupIndex) => (
              <div key={`group-${groupIndex}`} className={itemClass}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <input
                    className={inputClass}
                    value={group.title ?? ''}
                    onChange={(event) =>
                      updateSkillGroupField(groupIndex, 'title', event.target.value)
                    }
                    placeholder="Group title"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkillGroup(groupIndex)}
                    className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                  >
                    Remove Group
                  </button>
                </div>

                <div className="space-y-3">
                  {(group.skills ?? []).map((skill, skillIndex) => (
                    <div key={`skill-${groupIndex}-${skillIndex}`} className="grid gap-3 md:grid-cols-4">
                      <input
                        className={inputClass}
                        value={skill.name ?? ''}
                        onChange={(event) =>
                          updateSkillItem(groupIndex, skillIndex, 'name', event.target.value)
                        }
                        placeholder="Skill name"
                      />
                      <input
                        className={inputClass}
                        value={skill.icon ?? ''}
                        onChange={(event) =>
                          updateSkillItem(groupIndex, skillIndex, 'icon', event.target.value)
                        }
                        placeholder="Icon key (example: FaReact)"
                      />
                      <input
                        className={inputClass}
                        value={skill.color ?? ''}
                        onChange={(event) =>
                          updateSkillItem(groupIndex, skillIndex, 'color', event.target.value)
                        }
                        placeholder="Tailwind color class"
                      />
                      <button
                        type="button"
                        onClick={() => removeSkillItem(groupIndex, skillIndex)}
                        className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                      >
                        Remove Skill
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addSkillItem(groupIndex)}
                  className="rounded-lg border border-slate-600 px-3 py-2 text-xs hover:border-slate-400"
                >
                  Add Skill
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="admin-projects" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">Projects Section</h2>
            <button
              type="button"
              onClick={() =>
                addListItem('projects', 'items', {
                  title: 'New Project',
                  link: '#',
                  repoUrl: '',
                  description: 'Short project description',
                  details: 'Project details',
                  tech: ['React'],
                  thumbnail: '',
                })
              }
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Project
            </button>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-300">Section Title</label>
            <input
              className={inputClass}
              value={draft.projects?.title ?? ''}
              onChange={(event) => setSectionField('projects', 'title', event.target.value)}
            />
          </div>

          <div className="space-y-4">
            {(draft.projects?.items ?? []).map((project, index) => (
              <div key={`project-${index}`} className={itemClass}>
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    className={inputClass}
                    value={project.title ?? ''}
                    onChange={(event) =>
                      updateListItem('projects', 'items', index, 'title', event.target.value)
                    }
                    placeholder="Project title"
                  />
                  <input
                    className={inputClass}
                    value={project.link ?? ''}
                    onChange={(event) =>
                      updateListItem('projects', 'items', index, 'link', event.target.value)
                    }
                    placeholder="Live URL"
                  />
                  <input
                    className={inputClass}
                    value={project.repoUrl ?? ''}
                    onChange={(event) =>
                      updateListItem('projects', 'items', index, 'repoUrl', event.target.value)
                    }
                    placeholder="GitHub Repo URL"
                  />
                </div>
                <input
                  className={inputClass}
                  value={project.description ?? ''}
                  onChange={(event) =>
                    updateListItem('projects', 'items', index, 'description', event.target.value)
                  }
                  placeholder="Short description"
                />
                <textarea
                  className={textareaClass}
                  value={project.details ?? ''}
                  onChange={(event) =>
                    updateListItem('projects', 'items', index, 'details', event.target.value)
                  }
                  placeholder="Detailed explanation"
                />
                <input
                  className={inputClass}
                  value={joinCsv(project.tech)}
                  onChange={(event) =>
                    updateListItem('projects', 'items', index, 'tech', splitCsv(event.target.value))
                  }
                  placeholder="Tech stack separated by commas"
                />
                <input
                  className={inputClass}
                  value={project.thumbnail ?? ''}
                  onChange={(event) =>
                    updateListItem('projects', 'items', index, 'thumbnail', event.target.value)
                  }
                  placeholder="Thumbnail image URL"
                />
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Upload Thumbnail Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className={inputClass}
                    onChange={(event) =>
                      uploadThumbnail('projects', index, event.target.files?.[0])
                    }
                  />
                </div>
                {project.thumbnail && (
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} thumbnail`}
                    className="h-40 w-full rounded-lg object-cover md:max-w-sm"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeListItem('projects', 'items', index)}
                  className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                >
                  Remove Project
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="admin-certificates" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">Certificates Section</h2>
            <button
              type="button"
              onClick={() =>
                addListItem('certificates', 'items', {
                  title: 'New Certificate',
                  issuer: 'Issuer',
                  date: '2026',
                  credentialUrl: '#',
                  description: 'Certificate description',
                  thumbnail: '',
                })
              }
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Certificate
            </button>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-300">Section Title</label>
            <input
              className={inputClass}
              value={draft.certificates?.title ?? ''}
              onChange={(event) => setSectionField('certificates', 'title', event.target.value)}
            />
          </div>

          <div className="space-y-4">
            {(draft.certificates?.items ?? []).map((certificate, index) => (
              <div key={`certificate-${index}`} className={itemClass}>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className={inputClass}
                    value={certificate.title ?? ''}
                    onChange={(event) =>
                      updateListItem('certificates', 'items', index, 'title', event.target.value)
                    }
                    placeholder="Certificate title"
                  />
                  <input
                    className={inputClass}
                    value={certificate.issuer ?? ''}
                    onChange={(event) =>
                      updateListItem('certificates', 'items', index, 'issuer', event.target.value)
                    }
                    placeholder="Issuer"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    className={inputClass}
                    value={certificate.date ?? ''}
                    onChange={(event) =>
                      updateListItem('certificates', 'items', index, 'date', event.target.value)
                    }
                    placeholder="Date"
                  />
                  <input
                    className={inputClass}
                    value={certificate.credentialUrl ?? ''}
                    onChange={(event) =>
                      updateListItem('certificates', 'items', index, 'credentialUrl', event.target.value)
                    }
                    placeholder="Credential URL"
                  />
                </div>
                <textarea
                  className={textareaClass}
                  value={certificate.description ?? ''}
                  onChange={(event) =>
                    updateListItem('certificates', 'items', index, 'description', event.target.value)
                  }
                  placeholder="Certificate description"
                />
                <input
                  className={inputClass}
                  value={certificate.thumbnail ?? ''}
                  onChange={(event) =>
                    updateListItem('certificates', 'items', index, 'thumbnail', event.target.value)
                  }
                  placeholder="Thumbnail image URL"
                />
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Upload Thumbnail Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className={inputClass}
                    onChange={(event) =>
                      uploadThumbnail('certificates', index, event.target.files?.[0])
                    }
                  />
                </div>
                {certificate.thumbnail && (
                  <img
                    src={certificate.thumbnail}
                    alt={`${certificate.title} thumbnail`}
                    className="h-40 w-full rounded-lg object-cover md:max-w-sm"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeListItem('certificates', 'items', index)}
                  className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                >
                  Remove Certificate
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="admin-whyhire" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">Why Hire Section</h2>
            <button
              type="button"
              onClick={() =>
                addListItem('whyHire', 'items', {
                  icon: '⭐',
                  title: 'New Reason',
                  description: 'Reason description',
                })
              }
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Reason
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Section Title</label>
              <input
                className={inputClass}
                value={draft.whyHire?.title ?? ''}
                onChange={(event) => setSectionField('whyHire', 'title', event.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Closing Statement</label>
              <textarea
                className={textareaClass}
                value={draft.whyHire?.intro ?? ''}
                onChange={(event) => setSectionField('whyHire', 'intro', event.target.value)}
              />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {(draft.whyHire?.items ?? []).map((reason, index) => (
              <div key={`reason-${index}`} className={itemClass}>
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    className={inputClass}
                    value={reason.icon ?? ''}
                    onChange={(event) =>
                      updateListItem('whyHire', 'items', index, 'icon', event.target.value)
                    }
                    placeholder="Icon"
                  />
                  <input
                    className={inputClass}
                    value={reason.title ?? ''}
                    onChange={(event) =>
                      updateListItem('whyHire', 'items', index, 'title', event.target.value)
                    }
                    placeholder="Title"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('whyHire', 'items', index)}
                    className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                  >
                    Remove Reason
                  </button>
                </div>
                <textarea
                  className={textareaClass}
                  value={reason.description ?? ''}
                  onChange={(event) =>
                    updateListItem('whyHire', 'items', index, 'description', event.target.value)
                  }
                  placeholder="Description"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="admin-learning" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">Currently Learning Section</h2>
            <button
              type="button"
              onClick={() =>
                addListItem('learning', 'items', {
                  icon: '📘',
                  title: 'New Topic',
                  description: 'Topic description',
                })
              }
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Topic
            </button>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-300">Section Title</label>
            <input
              className={inputClass}
              value={draft.learning?.title ?? ''}
              onChange={(event) => setSectionField('learning', 'title', event.target.value)}
            />
          </div>

          <div className="space-y-3">
            {(draft.learning?.items ?? []).map((topic, index) => (
              <div key={`topic-${index}`} className={itemClass}>
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    className={inputClass}
                    value={topic.icon ?? ''}
                    onChange={(event) =>
                      updateListItem('learning', 'items', index, 'icon', event.target.value)
                    }
                    placeholder="Icon"
                  />
                  <input
                    className={inputClass}
                    value={topic.title ?? ''}
                    onChange={(event) =>
                      updateListItem('learning', 'items', index, 'title', event.target.value)
                    }
                    placeholder="Title"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('learning', 'items', index)}
                    className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                  >
                    Remove Topic
                  </button>
                </div>
                <textarea
                  className={textareaClass}
                  value={topic.description ?? ''}
                  onChange={(event) =>
                    updateListItem('learning', 'items', index, 'description', event.target.value)
                  }
                  placeholder="Description"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="admin-contact" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">Contact Section</h2>
            <button
              type="button"
              onClick={() =>
                addListItem('contact', 'methods', {
                  icon: 'FaEnvelope',
                  label: 'New Method',
                  value: 'value',
                  href: '#',
                })
              }
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Contact Method
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-slate-300">Section Title</label>
              <input
                className={inputClass}
                value={draft.contact?.title ?? ''}
                onChange={(event) => setSectionField('contact', 'title', event.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Subtitle</label>
              <textarea
                className={textareaClass}
                value={draft.contact?.subtitle ?? ''}
                onChange={(event) => setSectionField('contact', 'subtitle', event.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Primary Button Text</label>
              <input
                className={inputClass}
                value={draft.contact?.primaryButtonText ?? ''}
                onChange={(event) =>
                  setSectionField('contact', 'primaryButtonText', event.target.value)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Primary Button Link</label>
              <input
                className={inputClass}
                value={draft.contact?.primaryButtonHref ?? ''}
                onChange={(event) =>
                  setSectionField('contact', 'primaryButtonHref', event.target.value)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Secondary Button Text</label>
              <input
                className={inputClass}
                value={draft.contact?.secondaryButtonText ?? ''}
                onChange={(event) =>
                  setSectionField('contact', 'secondaryButtonText', event.target.value)
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Secondary Button Link</label>
              <input
                className={inputClass}
                value={draft.contact?.secondaryButtonHref ?? ''}
                onChange={(event) =>
                  setSectionField('contact', 'secondaryButtonHref', event.target.value)
                }
              />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {(draft.contact?.methods ?? []).map((method, index) => (
              <div key={`contact-${index}`} className={itemClass}>
                <div className="grid gap-3 md:grid-cols-4">
                  <input
                    className={inputClass}
                    value={method.icon ?? ''}
                    onChange={(event) =>
                      updateListItem('contact', 'methods', index, 'icon', event.target.value)
                    }
                    placeholder="Icon key"
                  />
                  <input
                    className={inputClass}
                    value={method.label ?? ''}
                    onChange={(event) =>
                      updateListItem('contact', 'methods', index, 'label', event.target.value)
                    }
                    placeholder="Label"
                  />
                  <input
                    className={inputClass}
                    value={method.value ?? ''}
                    onChange={(event) =>
                      updateListItem('contact', 'methods', index, 'value', event.target.value)
                    }
                    placeholder="Display value"
                  />
                  <input
                    className={inputClass}
                    value={method.href ?? ''}
                    onChange={(event) =>
                      updateListItem('contact', 'methods', index, 'href', event.target.value)
                    }
                    placeholder="Link"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeListItem('contact', 'methods', index)}
                  className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                >
                  Remove Method
                </button>
              </div>
            ))}
          </div>
        </section>

        <section id="admin-sidebar" className={`${sectionClass} scroll-mt-28`}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-sky-300">Sidebar Navigation</h2>
            <button
              type="button"
              onClick={() =>
                addListItem('sidebar', 'items', {
                  icon: 'FaCode',
                  label: 'New Item',
                  href: '#',
                })
              }
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:border-slate-400"
            >
              Add Navigation Item
            </button>
          </div>

          <div className="space-y-3">
            {(draft.sidebar?.items ?? []).map((item, index) => (
              <div key={`nav-${index}`} className={itemClass}>
                <div className="grid gap-3 md:grid-cols-4">
                  <input
                    className={inputClass}
                    value={item.icon ?? ''}
                    onChange={(event) =>
                      updateListItem('sidebar', 'items', index, 'icon', event.target.value)
                    }
                    placeholder="Icon key"
                  />
                  <input
                    className={inputClass}
                    value={item.label ?? ''}
                    onChange={(event) =>
                      updateListItem('sidebar', 'items', index, 'label', event.target.value)
                    }
                    placeholder="Label"
                  />
                  <input
                    className={inputClass}
                    value={item.href ?? ''}
                    onChange={(event) =>
                      updateListItem('sidebar', 'items', index, 'href', event.target.value)
                    }
                    placeholder="Href"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('sidebar', 'items', index)}
                    className="rounded-lg border border-rose-500 px-3 py-2 text-xs text-rose-300 hover:bg-rose-500/10"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400 sm:p-5">
          {isCloudEnabled
            ? lastSyncedLabel
              ? `Cloud sync is enabled. Last successful cloud sync: ${lastSyncedLabel}.`
              : 'Cloud sync is enabled. Click Save Changes to store updates online.'
            : 'Cloud sync is disabled. Add Supabase environment keys to store updates online.'}
        </footer>
      </div>
    </div>
  )
}

export default AdminDashboard
