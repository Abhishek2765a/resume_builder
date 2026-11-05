/**
 * ResumeCraft - Multi-Template Resume Render Engines
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderBullets(text) {
  if (!text) return '';
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return '';
  
  const listItems = lines.map(line => {
    // Strip leading bullet symbols or hyphens if present
    const clean = line.replace(/^[•\-\*]\s*/, '');
    return `<li class="relative pl-4 mb-1 text-slate-700 leading-relaxed before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">${escapeHtml(clean)}</li>`;
  }).join('');
  
  return `<ul class="list-none my-1.5">${listItems}</ul>`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  if (dateStr.toLowerCase() === 'present') return 'Present';
  const parts = dateStr.split('-');
  if (parts.length === 2) {
    const year = parts[0];
    const month = parseInt(parts[1], 10);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (month >= 1 && month <= 12) {
      return `${months[month - 1]} ${year}`;
    }
  }
  return dateStr;
}

// ----------------------------------------------------
// Template 1: Modern Tech
// ----------------------------------------------------
export function renderModernTemplate(data) {
  const p = data.personal || {};
  const theme = data.theme || {};
  const primary = theme.primaryColor || '#2563eb';

  return `
    <div class="resume-sheet modern-template p-8 sm:p-10 font-sans text-slate-800" style="--primary: ${primary};">
      <!-- Header -->
      <header class="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b-2 border-slate-200">
        ${theme.showPhoto && p.photo ? `
          <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md flex-shrink-0 border-2" style="border-color: ${primary};">
            <img src="${escapeHtml(p.photo)}" alt="${escapeHtml(p.fullName)}" class="w-full h-full object-cover">
          </div>
        ` : ''}
        <div class="flex-1 text-center sm:text-left">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1">${escapeHtml(p.fullName || 'Your Name')}</h1>
          <p class="text-lg font-semibold mb-3" style="color: ${primary};">${escapeHtml(p.jobTitle || 'Professional Title')}</p>
          
          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-y-1.5 gap-x-4 text-xs sm:text-sm text-slate-600">
            ${p.email ? `<span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>${escapeHtml(p.email)}</span>` : ''}
            ${p.phone ? `<span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>${escapeHtml(p.phone)}</span>` : ''}
            ${p.location ? `<span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>${escapeHtml(p.location)}</span>` : ''}
            ${p.website ? `<span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>${escapeHtml(p.website.replace(/^https?:\/\//, ''))}</span>` : ''}
            ${p.linkedin ? `<span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>${escapeHtml(p.linkedin)}</span>` : ''}
            ${p.github ? `<span class="inline-flex items-center gap-1.5"><svg class="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>${escapeHtml(p.github)}</span>` : ''}
          </div>
        </div>
      </header>

      <!-- Main Body -->
      <div class="mt-6 space-y-6">
        <!-- Summary -->
        ${p.summary ? `
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style="color: ${primary};">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${primary};"></span>
              Professional Summary
            </h2>
            <p class="text-sm text-slate-700 leading-relaxed">${escapeHtml(p.summary)}</p>
          </section>
        ` : ''}

        <!-- Experience -->
        ${data.experiences && data.experiences.length > 0 ? `
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style="color: ${primary};">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${primary};"></span>
              Work Experience
            </h2>
            <div class="space-y-4">
              ${data.experiences.map(exp => `
                <div class="relative pl-4 border-l-2 border-slate-200">
                  <div class="flex flex-col sm:flex-row sm:items-baseline justify-between mb-0.5">
                    <h3 class="text-base font-bold text-slate-900">${escapeHtml(exp.role || 'Role')}</h3>
                    <span class="text-xs font-semibold text-slate-500">${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs font-medium text-slate-600 mb-1.5">
                    <span class="font-semibold" style="color: ${primary};">${escapeHtml(exp.company || 'Company')}</span>
                    ${exp.location ? `<span>• ${escapeHtml(exp.location)}</span>` : ''}
                  </div>
                  <div class="text-xs sm:text-sm">
                    ${renderBullets(exp.description)}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Skills -->
        ${data.skills && data.skills.length > 0 ? `
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style="color: ${primary};">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${primary};"></span>
              Skills & Expertise
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              ${data.skills.map(skillGroup => `
                <div class="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  <div class="font-bold text-slate-900 mb-1.5">${escapeHtml(skillGroup.category)}</div>
                  <div class="flex flex-wrap gap-1.5">
                    ${(skillGroup.items || []).map(skill => `
                      <span class="px-2 py-0.5 rounded-md bg-white text-slate-700 font-medium text-xs border border-slate-200 shadow-2xs">${escapeHtml(skill)}</span>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Projects -->
        ${data.projects && data.projects.length > 0 ? `
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style="color: ${primary};">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${primary};"></span>
              Featured Projects
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              ${data.projects.map(proj => `
                <div class="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div class="flex items-baseline justify-between mb-1">
                    <h3 class="text-sm font-bold text-slate-900">${escapeHtml(proj.title)}</h3>
                    ${proj.link ? `<a href="${escapeHtml(proj.link)}" target="_blank" class="text-xs font-semibold hover:underline" style="color: ${primary};">Link ↗</a>` : ''}
                  </div>
                  ${proj.tech ? `<div class="text-xs font-medium text-slate-500 mb-1.5">${escapeHtml(proj.tech)}</div>` : ''}
                  <p class="text-xs text-slate-700 leading-relaxed">${escapeHtml(proj.description)}</p>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- 2 Column Footer: Education & Certifications -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <!-- Education -->
          ${data.education && data.education.length > 0 ? `
            <section>
              <h2 class="text-sm font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2" style="color: ${primary};">
                <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${primary};"></span>
                Education
              </h2>
              <div class="space-y-3">
                ${data.education.map(edu => `
                  <div>
                    <div class="text-sm font-bold text-slate-900">${escapeHtml(edu.degree)}</div>
                    <div class="text-xs font-semibold" style="color: ${primary};">${escapeHtml(edu.school)}</div>
                    <div class="flex justify-between text-xs text-slate-500 mt-0.5">
                      <span>${escapeHtml(edu.location || '')}</span>
                      <span>${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}</span>
                    </div>
                    ${edu.grade || edu.honors ? `<div class="text-xs text-slate-600 mt-0.5">${escapeHtml(edu.grade || '')}${edu.grade && edu.honors ? ' • ' : ''}${escapeHtml(edu.honors || '')}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Certifications & Languages -->
          <div class="space-y-4">
            ${data.certifications && data.certifications.length > 0 ? `
              <section>
                <h2 class="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style="color: ${primary};">
                  <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${primary};"></span>
                  Certifications
                </h2>
                <div class="space-y-2 text-xs">
                  ${data.certifications.map(cert => `
                    <div>
                      <span class="font-bold text-slate-800">${escapeHtml(cert.name)}</span>
                      <div class="text-slate-500">${escapeHtml(cert.issuer)} ${cert.date ? `(${escapeHtml(cert.date)})` : ''}</div>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            ${data.languages && data.languages.length > 0 ? `
              <section>
                <h2 class="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style="color: ${primary};">
                  <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${primary};"></span>
                  Languages
                </h2>
                <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  ${data.languages.map(lang => `
                    <span class="text-slate-700"><strong class="text-slate-900">${escapeHtml(lang.language)}:</strong> ${escapeHtml(lang.fluency)}</span>
                  `).join('')}
                </div>
              </section>
            ` : ''}
          </div>
        </div>

        <!-- Custom Sections -->
        ${data.customSections && data.customSections.length > 0 ? data.customSections.map(cSec => `
          <section>
            <h2 class="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style="color: ${primary};">
              <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${primary};"></span>
              ${escapeHtml(cSec.title)}
            </h2>
            <div class="space-y-2">
              ${(cSec.items || []).map(item => `
                <div class="text-xs sm:text-sm">
                  <div class="font-bold text-slate-800">${escapeHtml(item.title)}</div>
                  <div class="text-slate-600">${escapeHtml(item.subtitle || '')} ${item.date ? `(${escapeHtml(item.date)})` : ''}</div>
                </div>
              `).join('')}
            </div>
          </section>
        `).join('') : ''}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// Template 2: Classic Executive
// ----------------------------------------------------
export function renderClassicTemplate(data) {
  const p = data.personal || {};
  const theme = data.theme || {};
  const primary = theme.primaryColor || '#1e3a8a';

  return `
    <div class="resume-sheet classic-template p-8 sm:p-12 font-serif text-slate-900" style="--primary: ${primary};">
      <!-- Centered Header -->
      <header class="text-center pb-5 border-b-2" style="border-color: ${primary};">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-1 font-serif">${escapeHtml(p.fullName || 'Your Name')}</h1>
        <p class="text-base sm:text-lg font-medium italic mb-3 font-sans" style="color: ${primary};">${escapeHtml(p.jobTitle || 'Professional Title')}</p>
        
        <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm font-sans text-slate-600">
          ${p.location ? `<span>${escapeHtml(p.location)}</span>` : ''}
          ${p.phone ? `<span>• ${escapeHtml(p.phone)}</span>` : ''}
          ${p.email ? `<span>• ${escapeHtml(p.email)}</span>` : ''}
          ${p.linkedin ? `<span>• ${escapeHtml(p.linkedin)}</span>` : ''}
          ${p.website ? `<span>• ${escapeHtml(p.website.replace(/^https?:\/\//, ''))}</span>` : ''}
        </div>
      </header>

      <div class="mt-6 space-y-6">
        <!-- Summary -->
        ${p.summary ? `
          <section>
            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-800 pb-1 border-b border-slate-300 mb-2 font-sans">Professional Summary</h2>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">${escapeHtml(p.summary)}</p>
          </section>
        ` : ''}

        <!-- Experience -->
        ${data.experiences && data.experiences.length > 0 ? `
          <section>
            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-800 pb-1 border-b border-slate-300 mb-3 font-sans">Professional Experience</h2>
            <div class="space-y-4 font-sans">
              ${data.experiences.map(exp => `
                <div>
                  <div class="flex flex-col sm:flex-row justify-between sm:items-baseline">
                    <span class="text-sm font-bold text-slate-900">${escapeHtml(exp.role)}</span>
                    <span class="text-xs font-medium text-slate-600">${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <div class="flex justify-between text-xs italic text-slate-700 mb-1.5">
                    <span>${escapeHtml(exp.company)}</span>
                    <span>${escapeHtml(exp.location || '')}</span>
                  </div>
                  <div class="text-xs sm:text-sm">
                    ${renderBullets(exp.description)}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Education -->
        ${data.education && data.education.length > 0 ? `
          <section>
            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-800 pb-1 border-b border-slate-300 mb-2 font-sans">Education</h2>
            <div class="space-y-2 font-sans">
              ${data.education.map(edu => `
                <div class="flex flex-col sm:flex-row justify-between text-xs sm:text-sm">
                  <div>
                    <span class="font-bold text-slate-900">${escapeHtml(edu.degree)}</span> — <span class="italic text-slate-700">${escapeHtml(edu.school)}</span>
                    ${edu.grade ? `<span class="text-slate-500"> (${escapeHtml(edu.grade)})</span>` : ''}
                  </div>
                  <span class="text-slate-600 text-xs">${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}</span>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Skills -->
        ${data.skills && data.skills.length > 0 ? `
          <section>
            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-800 pb-1 border-b border-slate-300 mb-2 font-sans">Core Competencies & Skills</h2>
            <div class="space-y-1.5 text-xs sm:text-sm font-sans">
              ${data.skills.map(skillGroup => `
                <div>
                  <strong class="text-slate-900">${escapeHtml(skillGroup.category)}:</strong>
                  <span class="text-slate-700"> ${(skillGroup.items || []).join(', ')}</span>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Projects & Certifications -->
        ${(data.projects && data.projects.length > 0) || (data.certifications && data.certifications.length > 0) ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1 font-sans">
            ${data.projects && data.projects.length > 0 ? `
              <div>
                <h2 class="text-xs font-bold uppercase tracking-widest text-slate-800 pb-1 border-b border-slate-300 mb-2">Key Projects</h2>
                <div class="space-y-2 text-xs">
                  ${data.projects.map(proj => `
                    <div>
                      <div class="font-bold text-slate-900">${escapeHtml(proj.title)}</div>
                      <p class="text-slate-700 mt-0.5">${escapeHtml(proj.description)}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            ${data.certifications && data.certifications.length > 0 ? `
              <div>
                <h2 class="text-xs font-bold uppercase tracking-widest text-slate-800 pb-1 border-b border-slate-300 mb-2">Certifications</h2>
                <div class="space-y-1.5 text-xs">
                  ${data.certifications.map(cert => `
                    <div>
                      <strong class="text-slate-900">${escapeHtml(cert.name)}</strong>
                      <div class="text-slate-600">${escapeHtml(cert.issuer)} ${cert.date ? `(${escapeHtml(cert.date)})` : ''}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// Template 3: Minimalist Nordic
// ----------------------------------------------------
export function renderMinimalTemplate(data) {
  const p = data.personal || {};
  const theme = data.theme || {};
  const primary = theme.primaryColor || '#0369a1';

  return `
    <div class="resume-sheet minimal-template p-8 sm:p-12 font-sans text-slate-800" style="--primary: ${primary};">
      <!-- Minimal Header -->
      <header class="mb-8">
        <h1 class="text-4xl font-light tracking-tight text-slate-900 mb-1">${escapeHtml(p.fullName || 'Your Name')}</h1>
        <p class="text-sm uppercase tracking-widest font-semibold" style="color: ${primary};">${escapeHtml(p.jobTitle || 'Professional Title')}</p>
        
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-3 font-mono">
          ${p.email ? `<span>${escapeHtml(p.email)}</span>` : ''}
          ${p.phone ? `<span>/ ${escapeHtml(p.phone)}</span>` : ''}
          ${p.location ? `<span>/ ${escapeHtml(p.location)}</span>` : ''}
          ${p.website ? `<span>/ ${escapeHtml(p.website.replace(/^https?:\/\//, ''))}</span>` : ''}
        </div>
      </header>

      <div class="space-y-6">
        <!-- Summary -->
        ${p.summary ? `
          <div class="text-sm text-slate-600 leading-relaxed font-normal">
            ${escapeHtml(p.summary)}
          </div>
        ` : ''}

        <!-- Experience -->
        ${data.experiences && data.experiences.length > 0 ? `
          <section>
            <div class="text-xs font-mono tracking-widest text-slate-400 uppercase mb-4">// EXPERIENCE</div>
            <div class="space-y-5">
              ${data.experiences.map(exp => `
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <div class="sm:col-span-1 text-xs text-slate-400 font-mono">
                    ${formatDate(exp.startDate)} — ${exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                  <div class="sm:col-span-3">
                    <h3 class="text-sm font-semibold text-slate-900">${escapeHtml(exp.role)}</h3>
                    <div class="text-xs text-slate-500 mb-1.5 font-medium">${escapeHtml(exp.company)} ${exp.location ? `• ${escapeHtml(exp.location)}` : ''}</div>
                    <div class="text-xs text-slate-600">
                      ${renderBullets(exp.description)}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Skills -->
        ${data.skills && data.skills.length > 0 ? `
          <section>
            <div class="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">// SKILLS</div>
            <div class="space-y-2">
              ${data.skills.map(sg => `
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-1 text-xs">
                  <span class="text-slate-400 font-mono">${escapeHtml(sg.category)}</span>
                  <span class="sm:col-span-3 text-slate-700">${(sg.items || []).join('  •  ')}</span>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Education -->
        ${data.education && data.education.length > 0 ? `
          <section>
            <div class="text-xs font-mono tracking-widest text-slate-400 uppercase mb-3">// EDUCATION</div>
            <div class="space-y-3">
              ${data.education.map(edu => `
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-1 text-xs">
                  <span class="text-slate-400 font-mono">${formatDate(edu.startDate)} — ${formatDate(edu.endDate)}</span>
                  <div class="sm:col-span-3">
                    <span class="font-semibold text-slate-900">${escapeHtml(edu.degree)}</span>
                    <span class="text-slate-500">, ${escapeHtml(edu.school)}</span>
                    ${edu.grade ? `<span class="text-slate-400 block sm:inline"> (${escapeHtml(edu.grade)})</span>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// Template 4: Creative Sidebar (Two Column)
// ----------------------------------------------------
export function renderCreativeTemplate(data) {
  const p = data.personal || {};
  const theme = data.theme || {};
  const primary = theme.primaryColor || '#7c3aed';

  return `
    <div class="resume-sheet creative-template flex flex-col md:flex-row min-h-full font-sans text-slate-800" style="--primary: ${primary};">
      <!-- Left Sidebar (Accent Tint) -->
      <aside class="w-full md:w-5/12 bg-slate-900 text-slate-100 p-8 flex flex-col justify-between">
        <div>
          <!-- Photo & Intro -->
          ${theme.showPhoto && p.photo ? `
            <div class="w-28 h-28 mx-auto md:mx-0 rounded-full overflow-hidden border-3 border-white/30 shadow-lg mb-5">
              <img src="${escapeHtml(p.photo)}" alt="${escapeHtml(p.fullName)}" class="w-full h-full object-cover">
            </div>
          ` : ''}

          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">${escapeHtml(p.fullName || 'Your Name')}</h1>
          <p class="text-sm font-medium text-slate-300 mb-6" style="color: #a78bfa;">${escapeHtml(p.jobTitle || 'Professional Title')}</p>

          <!-- Contact Details -->
          <div class="space-y-2.5 text-xs text-slate-300 mb-8 border-t border-slate-700/80 pt-5">
            ${p.email ? `<div class="flex items-center gap-2"><svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><span class="break-all">${escapeHtml(p.email)}</span></div>` : ''}
            ${p.phone ? `<div class="flex items-center gap-2"><svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>${escapeHtml(p.phone)}</div>` : ''}
            ${p.location ? `<div class="flex items-center gap-2"><svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>${escapeHtml(p.location)}</div>` : ''}
            ${p.website ? `<div class="flex items-center gap-2"><svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>${escapeHtml(p.website.replace(/^https?:\/\//, ''))}</div>` : ''}
            ${p.linkedin ? `<div class="flex items-center gap-2"><svg class="w-3.5 h-3.5 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>${escapeHtml(p.linkedin)}</div>` : ''}
          </div>

          <!-- Skills Badges in Sidebar -->
          ${data.skills && data.skills.length > 0 ? `
            <div class="mb-8">
              <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills & Expertise</h2>
              <div class="space-y-3">
                ${data.skills.map(sg => `
                  <div>
                    <div class="text-xs font-semibold text-slate-200 mb-1.5">${escapeHtml(sg.category)}</div>
                    <div class="flex flex-wrap gap-1.5">
                      ${(sg.items || []).map(skill => `
                        <span class="px-2 py-0.5 rounded text-2xs bg-slate-800 text-slate-200 border border-slate-700 font-medium">${escapeHtml(skill)}</span>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Education in Sidebar -->
          ${data.education && data.education.length > 0 ? `
            <div class="mb-6">
              <h2 class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5">Education</h2>
              <div class="space-y-3 text-xs">
                ${data.education.map(edu => `
                  <div>
                    <div class="font-bold text-white">${escapeHtml(edu.degree)}</div>
                    <div class="text-slate-300">${escapeHtml(edu.school)}</div>
                    <div class="text-slate-400 text-2xs">${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </aside>

      <!-- Right Main Column -->
      <main class="w-full md:w-7/12 p-8 bg-white flex flex-col justify-between">
        <div class="space-y-6">
          <!-- Summary -->
          ${p.summary ? `
            <section>
              <h2 class="text-xs font-bold uppercase tracking-widest mb-2 font-mono" style="color: ${primary};">Profile Summary</h2>
              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">${escapeHtml(p.summary)}</p>
            </section>
          ` : ''}

          <!-- Experience -->
          ${data.experiences && data.experiences.length > 0 ? `
            <section>
              <h2 class="text-xs font-bold uppercase tracking-widest mb-3 font-mono" style="color: ${primary};">Experience History</h2>
              <div class="space-y-4">
                ${data.experiences.map(exp => `
                  <div>
                    <div class="flex justify-between items-baseline mb-0.5">
                      <h3 class="text-sm font-bold text-slate-900">${escapeHtml(exp.role)}</h3>
                      <span class="text-xs text-slate-500">${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                    </div>
                    <div class="text-xs font-semibold mb-1" style="color: ${primary};">${escapeHtml(exp.company)}</div>
                    <div class="text-xs sm:text-sm">
                      ${renderBullets(exp.description)}
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Projects -->
          ${data.projects && data.projects.length > 0 ? `
            <section>
              <h2 class="text-xs font-bold uppercase tracking-widest mb-2.5 font-mono" style="color: ${primary};">Key Projects</h2>
              <div class="space-y-3">
                ${data.projects.map(proj => `
                  <div class="text-xs">
                    <div class="font-bold text-slate-900 flex justify-between">
                      <span>${escapeHtml(proj.title)}</span>
                      ${proj.link ? `<a href="${escapeHtml(proj.link)}" class="hover:underline" style="color: ${primary};">View ↗</a>` : ''}
                    </div>
                    ${proj.tech ? `<div class="text-slate-500 text-2xs mb-1 font-mono">${escapeHtml(proj.tech)}</div>` : ''}
                    <p class="text-slate-700 leading-relaxed">${escapeHtml(proj.description)}</p>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Certifications & Languages -->
          ${data.certifications && data.certifications.length > 0 ? `
            <section>
              <h2 class="text-xs font-bold uppercase tracking-widest mb-2 font-mono" style="color: ${primary};">Certifications</h2>
              <div class="space-y-1 text-xs">
                ${data.certifications.map(cert => `
                  <div>
                    <span class="font-bold text-slate-900">${escapeHtml(cert.name)}</span>
                    <span class="text-slate-500">— ${escapeHtml(cert.issuer)}</span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </main>
    </div>
  `;
}

// ----------------------------------------------------
// Template 5: Ivy League / Academic
// ----------------------------------------------------
export function renderAcademicTemplate(data) {
  const p = data.personal || {};
  const theme = data.theme || {};
  const primary = theme.primaryColor || '#09090b';

  return `
    <div class="resume-sheet academic-template p-8 sm:p-12 font-serif text-slate-900 leading-normal" style="--primary: ${primary};">
      <header class="text-center pb-4 mb-4 border-b border-slate-900">
        <h1 class="text-3xl font-serif tracking-normal uppercase font-bold text-slate-950 mb-1">${escapeHtml(p.fullName || 'Your Name')}</h1>
        <div class="text-xs font-serif text-slate-700 flex flex-wrap justify-center gap-x-2">
          ${p.location ? `<span>${escapeHtml(p.location)}</span>` : ''}
          ${p.phone ? `<span>|</span><span>${escapeHtml(p.phone)}</span>` : ''}
          ${p.email ? `<span>|</span><span>${escapeHtml(p.email)}</span>` : ''}
          ${p.website ? `<span>|</span><span>${escapeHtml(p.website.replace(/^https?:\/\//, ''))}</span>` : ''}
          ${p.linkedin ? `<span>|</span><span>${escapeHtml(p.linkedin)}</span>` : ''}
        </div>
      </header>

      <div class="space-y-5">
        <!-- Education First for Academic -->
        ${data.education && data.education.length > 0 ? `
          <section>
            <h2 class="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-400 mb-2">Education</h2>
            <div class="space-y-2">
              ${data.education.map(edu => `
                <div>
                  <div class="flex justify-between text-xs sm:text-sm font-bold text-slate-950">
                    <span>${escapeHtml(edu.school)}</span>
                    <span class="font-normal italic">${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}</span>
                  </div>
                  <div class="flex justify-between text-xs text-slate-800 italic">
                    <span>${escapeHtml(edu.degree)}</span>
                    <span>${escapeHtml(edu.location || '')}</span>
                  </div>
                  ${edu.grade || edu.honors ? `<div class="text-xs text-slate-700 mt-0.5">${escapeHtml(edu.grade || '')} ${edu.honors ? `• ${escapeHtml(edu.honors)}` : ''}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Experience -->
        ${data.experiences && data.experiences.length > 0 ? `
          <section>
            <h2 class="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-400 mb-2">Research & Professional Experience</h2>
            <div class="space-y-3.5">
              ${data.experiences.map(exp => `
                <div>
                  <div class="flex justify-between text-xs sm:text-sm font-bold text-slate-950">
                    <span>${escapeHtml(exp.company)}</span>
                    <span class="font-normal italic">${formatDate(exp.startDate)} – ${exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <div class="flex justify-between text-xs text-slate-800 italic mb-1">
                    <span>${escapeHtml(exp.role)}</span>
                    <span>${escapeHtml(exp.location || '')}</span>
                  </div>
                  <div class="text-xs">
                    ${renderBullets(exp.description)}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Summary -->
        ${p.summary ? `
          <section>
            <h2 class="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-400 mb-1.5">Research Interests & Summary</h2>
            <p class="text-xs sm:text-sm text-slate-800 leading-relaxed">${escapeHtml(p.summary)}</p>
          </section>
        ` : ''}

        <!-- Skills -->
        ${data.skills && data.skills.length > 0 ? `
          <section>
            <h2 class="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-400 mb-1.5">Technical Skills & Methodologies</h2>
            <div class="space-y-1 text-xs">
              ${data.skills.map(sg => `
                <div>
                  <strong class="font-bold text-slate-950">${escapeHtml(sg.category)}:</strong>
                  <span class="text-slate-800"> ${(sg.items || []).join(', ')}</span>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Custom Sections (e.g. Publications, Speaking) -->
        ${data.customSections && data.customSections.length > 0 ? data.customSections.map(cSec => `
          <section>
            <h2 class="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-400 mb-2">${escapeHtml(cSec.title)}</h2>
            <div class="space-y-1.5 text-xs">
              ${(cSec.items || []).map(item => `
                <div>
                  <span class="font-bold text-slate-950">${escapeHtml(item.title)}</span>
                  ${item.subtitle ? `<span class="italic text-slate-700">, ${escapeHtml(item.subtitle)}</span>` : ''}
                  ${item.date ? `<span class="text-slate-500"> (${escapeHtml(item.date)})</span>` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        `).join('') : ''}
      </div>
    </div>
  `;
}

// Master Render Function
export function renderResume(data) {
  const template = data.theme?.template || 'modern';
  switch (template) {
    case 'classic':
      return renderClassicTemplate(data);
    case 'minimal':
      return renderMinimalTemplate(data);
    case 'creative':
      return renderCreativeTemplate(data);
    case 'academic':
      return renderAcademicTemplate(data);
    case 'modern':
    default:
      return renderModernTemplate(data);
  }
}
