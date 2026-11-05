/**
 * ResumeCraft - Master Application Logic & Reactive Store
 */
import { INITIAL_DATA, SAMPLE_PRESETS, COLOR_PALETTES, FONT_OPTIONS, ACTION_VERBS, SUMMARY_TEMPLATES } from './data.js';
import { renderResume } from './templates.js';
import { calculateAtsScore } from './ats.js';

class ResumeCraftApp {
  constructor() {
    this.STORAGE_KEY = 'resumecraft_saved_data_v2';
    this.zoomLevel = 0.85; // Default comfortable preview scale
    this.state = this.loadState();
    this.currentTab = 'personal';

    this.init();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved state from localStorage:', e);
    }
    // Deep clone initial data
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
    this.renderPreview();
    this.updateAtsScore();
  }

  init() {
    this.setupThemeControls();
    this.setupTabNavigation();
    this.setupZoomControls();
    this.populateEditorForms();
    this.setupEventDelegation();
    this.setupAtsModal();
    this.setupExportImport();
    this.renderPreview();
    this.updateAtsScore();
    this.initLucide();
  }

  initLucide() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  // ----------------------------------------------------
  // Live Preview Rendering & Typography
  // ----------------------------------------------------
  renderPreview() {
    const container = document.getElementById('resume-container');
    const paper = document.getElementById('resume-paper');
    if (!container || !paper) return;

    // Apply template HTML
    container.innerHTML = renderResume(this.state);

    // Apply typography & spacing classes to paper
    const theme = this.state.theme || {};
    
    // Clear old font and spacing classes
    paper.className = 'resume-paper';
    
    // Add font family class
    const fontClass = `font-${(theme.fontFamily || 'Inter').replace(/\s+/g, '-')}`;
    paper.classList.add(fontClass);

    // Add font size class
    paper.classList.add(`font-size-${theme.fontSize || 'medium'}`);

    // Add spacing density class
    paper.classList.add(`spacing-${theme.spacing || 'normal'}`);

    // Update zoom transform
    this.applyZoom();
  }

  applyZoom() {
    const wrapper = document.getElementById('resume-paper-wrapper');
    if (wrapper) {
      wrapper.style.transform = `scale(${this.zoomLevel})`;
    }
    const zoomText = document.getElementById('zoom-percentage');
    if (zoomText) {
      zoomText.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }
  }

  setupZoomControls() {
    document.getElementById('zoom-in-btn')?.addEventListener('click', () => {
      this.zoomLevel = Math.min(1.4, this.zoomLevel + 0.1);
      this.applyZoom();
    });

    document.getElementById('zoom-out-btn')?.addEventListener('click', () => {
      this.zoomLevel = Math.max(0.4, this.zoomLevel - 0.1);
      this.applyZoom();
    });

    document.getElementById('zoom-fit-btn')?.addEventListener('click', () => {
      const viewport = document.getElementById('preview-viewport');
      if (viewport) {
        // 210mm in pixels at 96dpi is ~794px + padding
        const viewportWidth = viewport.clientWidth - 48;
        this.zoomLevel = Math.min(1.0, Math.max(0.4, viewportWidth / 820));
        this.applyZoom();
      }
    });

    // Mobile View Toggle Tabs
    const mobileTabEditor = document.getElementById('mobile-tab-editor');
    const mobileTabPreview = document.getElementById('mobile-tab-preview');
    const editorPanel = document.getElementById('editor-panel');
    const previewViewport = document.getElementById('preview-viewport');

    mobileTabEditor?.addEventListener('click', () => {
      editorPanel.classList.remove('hidden');
      previewViewport.classList.add('hidden');
      mobileTabEditor.classList.add('bg-blue-600', 'text-white');
      mobileTabPreview.classList.remove('bg-blue-600', 'text-white');
    });

    mobileTabPreview?.addEventListener('click', () => {
      editorPanel.classList.add('hidden');
      previewViewport.classList.remove('hidden');
      mobileTabPreview.classList.add('bg-blue-600', 'text-white');
      mobileTabEditor.classList.remove('bg-blue-600', 'text-white');
      // Trigger fit
      document.getElementById('zoom-fit-btn')?.click();
    });
  }

  // ----------------------------------------------------
  // Navigation Tabs (Personal, Experience, Skills, etc.)
  // ----------------------------------------------------
  setupTabNavigation() {
    const tabs = document.querySelectorAll('.editor-tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        this.currentTab = targetTab;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach(p => {
          if (p.id === `tab-${targetTab}`) {
            p.classList.remove('hidden');
          } else {
            p.classList.add('hidden');
          }
        });
      });
    });
  }

  // ----------------------------------------------------
  // Theme & Styling Controls
  // ----------------------------------------------------
  setupThemeControls() {
    const theme = this.state.theme || {};

    // Template selector buttons
    const templateButtons = document.querySelectorAll('.template-btn');
    templateButtons.forEach(btn => {
      const tmpl = btn.getAttribute('data-template');
      if (tmpl === theme.template) {
        btn.classList.add('ring-2', 'ring-blue-500', 'border-blue-500');
      }
      btn.addEventListener('click', () => {
        templateButtons.forEach(b => b.classList.remove('ring-2', 'ring-blue-500', 'border-blue-500'));
        btn.classList.add('ring-2', 'ring-blue-500', 'border-blue-500');
        this.state.theme.template = tmpl;
        this.saveState();
      });
    });

    // Color Swatches
    const paletteContainer = document.getElementById('color-palettes-container');
    if (paletteContainer) {
      paletteContainer.innerHTML = COLOR_PALETTES.map(p => `
        <button 
          type="button" 
          class="color-swatch ${theme.primaryColor.toLowerCase() === p.hex.toLowerCase() ? 'active' : ''}" 
          style="background-color: ${p.hex};" 
          data-color="${p.hex}" 
          title="${p.name}">
        </button>
      `).join('');

      paletteContainer.querySelectorAll('.color-swatch').forEach(btn => {
        btn.addEventListener('click', () => {
          paletteContainer.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const hex = btn.getAttribute('data-color');
          this.state.theme.primaryColor = hex;
          const hexInput = document.getElementById('custom-color-input');
          if (hexInput) hexInput.value = hex;
          this.saveState();
        });
      });
    }

    // Custom Hex Color Input
    const hexInput = document.getElementById('custom-color-input');
    if (hexInput) {
      hexInput.value = theme.primaryColor || '#2563eb';
      hexInput.addEventListener('input', (e) => {
        this.state.theme.primaryColor = e.target.value;
        this.saveState();
      });
    }

    // Font Family Select
    const fontSelect = document.getElementById('font-family-select');
    if (fontSelect) {
      fontSelect.innerHTML = FONT_OPTIONS.map(f => `
        <option value="${f.id}" ${theme.fontFamily === f.id ? 'selected' : ''}>${f.name}</option>
      `).join('');
      fontSelect.addEventListener('change', (e) => {
        this.state.theme.fontFamily = e.target.value;
        this.saveState();
      });
    }

    // Font Size Radio/Select
    const fontSizeSelect = document.getElementById('font-size-select');
    if (fontSizeSelect) {
      fontSizeSelect.value = theme.fontSize || 'medium';
      fontSizeSelect.addEventListener('change', (e) => {
        this.state.theme.fontSize = e.target.value;
        this.saveState();
      });
    }

    // Spacing Density Select
    const spacingSelect = document.getElementById('spacing-select');
    if (spacingSelect) {
      spacingSelect.value = theme.spacing || 'normal';
      spacingSelect.addEventListener('change', (e) => {
        this.state.theme.spacing = e.target.value;
        this.saveState();
      });
    }

    // Photo Visibility Toggle
    const showPhotoToggle = document.getElementById('toggle-show-photo');
    if (showPhotoToggle) {
      showPhotoToggle.checked = theme.showPhoto !== false;
      showPhotoToggle.addEventListener('change', (e) => {
        this.state.theme.showPhoto = e.target.checked;
        this.saveState();
      });
    }
  }

  // ----------------------------------------------------
  // Form Populations & Bindings
  // ----------------------------------------------------
  populateEditorForms() {
    this.populatePersonalForm();
    this.renderExperienceList();
    this.renderEducationList();
    this.renderSkillsList();
    this.renderProjectsList();
    this.renderCertificationsList();
    this.renderLanguagesList();
    this.renderCustomSectionsList();
    this.populateHelperChips();
  }

  populatePersonalForm() {
    const p = this.state.personal || {};
    const fields = ['fullName', 'jobTitle', 'email', 'phone', 'location', 'website', 'linkedin', 'github', 'summary'];
    
    fields.forEach(field => {
      const el = document.getElementById(`input-${field}`);
      if (el) {
        el.value = p[field] || '';
        el.addEventListener('input', (e) => {
          this.state.personal[field] = e.target.value;
          this.saveState();
        });
      }
    });

    // Photo input
    const photoInput = document.getElementById('photo-upload-input');
    const photoPreview = document.getElementById('photo-avatar-preview');
    const removePhotoBtn = document.getElementById('remove-photo-btn');

    if (photoPreview && p.photo) {
      photoPreview.src = p.photo;
      photoPreview.classList.remove('hidden');
    }

    photoInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.state.personal.photo = event.target.result;
          if (photoPreview) {
            photoPreview.src = event.target.result;
            photoPreview.classList.remove('hidden');
          }
          this.saveState();
        };
        reader.readAsDataURL(file);
      }
    });

    removePhotoBtn?.addEventListener('click', () => {
      this.state.personal.photo = '';
      if (photoPreview) {
        photoPreview.src = '';
        photoPreview.classList.add('hidden');
      }
      if (photoInput) photoInput.value = '';
      this.saveState();
    });
  }

  populateHelperChips() {
    // Action Verbs Chips
    const verbContainer = document.getElementById('action-verbs-chips');
    if (verbContainer) {
      verbContainer.innerHTML = ACTION_VERBS.slice(0, 12).map(verb => `
        <button type="button" class="action-verb-chip px-2 py-0.5 rounded text-xs bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 border border-slate-700 transition-colors" data-verb="${verb}">
          + ${verb}
        </button>
      `).join('');

      verbContainer.querySelectorAll('.action-verb-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          const verb = btn.getAttribute('data-verb');
          const summaryInput = document.getElementById('input-summary');
          if (summaryInput) {
            const start = summaryInput.selectionStart;
            const end = summaryInput.selectionEnd;
            const text = summaryInput.value;
            const insertion = verb + ' ';
            summaryInput.value = text.substring(0, start) + insertion + text.substring(end);
            this.state.personal.summary = summaryInput.value;
            this.saveState();
            summaryInput.focus();
            summaryInput.selectionStart = summaryInput.selectionEnd = start + insertion.length;
          }
        });
      });
    }

    // Summary Template Selector
    const summaryPresetSelect = document.getElementById('summary-preset-select');
    if (summaryPresetSelect) {
      summaryPresetSelect.innerHTML = `
        <option value="">⚡ Insert starter summary template...</option>
        ${SUMMARY_TEMPLATES.map((tmpl, idx) => `
          <option value="${idx}">${tmpl.role}</option>
        `).join('')}
      `;
      summaryPresetSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val !== '') {
          const tmpl = SUMMARY_TEMPLATES[parseInt(val, 10)];
          if (tmpl) {
            const summaryInput = document.getElementById('input-summary');
            if (summaryInput) {
              summaryInput.value = tmpl.text;
              this.state.personal.summary = tmpl.text;
              this.saveState();
            }
          }
          e.target.value = '';
        }
      });
    }
  }

  // ----------------------------------------------------
  // Dynamic Experience Section
  // ----------------------------------------------------
  renderExperienceList() {
    const list = document.getElementById('experience-list');
    if (!list) return;

    list.innerHTML = (this.state.experiences || []).map((exp, idx) => `
      <div class="exp-item p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 relative space-y-3" data-id="${exp.id}">
        <div class="flex items-center justify-between pb-2 border-b border-slate-700">
          <span class="text-xs font-bold text-blue-400 uppercase tracking-wider">#${idx + 1} • ${exp.role || 'New Position'}</span>
          <button type="button" class="btn-delete-exp text-slate-400 hover:text-red-400 p-1 text-xs" data-id="${exp.id}" title="Delete experience">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="input-label">Role / Job Title</label>
            <input type="text" class="input-field exp-field" data-field="role" value="${exp.role || ''}" placeholder="e.g. Lead Software Engineer">
          </div>
          <div>
            <label class="input-label">Company Name</label>
            <input type="text" class="input-field exp-field" data-field="company" value="${exp.company || ''}" placeholder="e.g. Acme Tech">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="input-label">Location</label>
            <input type="text" class="input-field exp-field" data-field="location" value="${exp.location || ''}" placeholder="e.g. New York, NY">
          </div>
          <div>
            <label class="input-label">Start Date</label>
            <input type="text" class="input-field exp-field" data-field="startDate" value="${exp.startDate || ''}" placeholder="e.g. 2021-04">
          </div>
          <div>
            <label class="input-label">End Date</label>
            <input type="text" class="input-field exp-field" data-field="endDate" value="${exp.endDate || ''}" placeholder="e.g. Present" ${exp.current ? 'disabled' : ''}>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <input type="checkbox" id="curr-${exp.id}" class="exp-current-checkbox rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700" ${exp.current ? 'checked' : ''}>
          <label for="curr-${exp.id}" class="text-xs text-slate-300 font-medium cursor-pointer">I currently work here</label>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="input-label mb-0">Key Responsibilities & Achievements (1 per line)</label>
            <span class="text-2xs text-slate-400">💡 Start with action verbs & metrics</span>
          </div>
          <textarea rows="4" class="input-field exp-field font-mono text-xs leading-relaxed" data-field="description" placeholder="• Spearheaded automated deployment pipeline, saving 12 engineer-hours weekly...&#10;• Increased client retention by 18%...">${exp.description || ''}</textarea>
        </div>
      </div>
    `).join('');

    // Attach listeners
    list.querySelectorAll('.exp-item').forEach(card => {
      const id = card.getAttribute('data-id');
      const item = this.state.experiences.find(e => e.id === id);
      if (!item) return;

      // Fields
      card.querySelectorAll('.exp-field').forEach(input => {
        input.addEventListener('input', (e) => {
          const field = input.getAttribute('data-field');
          item[field] = e.target.value;
          this.saveState();
        });
      });

      // Current checkbox
      card.querySelector('.exp-current-checkbox')?.addEventListener('change', (e) => {
        item.current = e.target.checked;
        if (item.current) {
          item.endDate = 'Present';
          const endInput = card.querySelector('[data-field="endDate"]');
          if (endInput) {
            endInput.value = 'Present';
            endInput.disabled = true;
          }
        } else {
          item.endDate = '';
          const endInput = card.querySelector('[data-field="endDate"]');
          if (endInput) {
            endInput.value = '';
            endInput.disabled = false;
          }
        }
        this.saveState();
      });

      // Delete button
      card.querySelector('.btn-delete-exp')?.addEventListener('click', () => {
        this.state.experiences = this.state.experiences.filter(e => e.id !== id);
        this.renderExperienceList();
        this.saveState();
      });
    });
  }

  // ----------------------------------------------------
  // Dynamic Education Section
  // ----------------------------------------------------
  renderEducationList() {
    const list = document.getElementById('education-list');
    if (!list) return;

    list.innerHTML = (this.state.education || []).map((edu, idx) => `
      <div class="edu-item p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-3" data-id="${edu.id}">
        <div class="flex items-center justify-between pb-2 border-b border-slate-700">
          <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">#${idx + 1} • ${edu.degree || 'Degree / Diploma'}</span>
          <button type="button" class="btn-delete-edu text-slate-400 hover:text-red-400 p-1 text-xs" data-id="${edu.id}" title="Delete education">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="input-label">Degree & Major</label>
            <input type="text" class="input-field edu-field" data-field="degree" value="${edu.degree || ''}" placeholder="e.g. B.S. in Computer Science">
          </div>
          <div>
            <label class="input-label">School / University</label>
            <input type="text" class="input-field edu-field" data-field="school" value="${edu.school || ''}" placeholder="e.g. Stanford University">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="input-label">Location</label>
            <input type="text" class="input-field edu-field" data-field="location" value="${edu.location || ''}" placeholder="e.g. Stanford, CA">
          </div>
          <div>
            <label class="input-label">Start Date</label>
            <input type="text" class="input-field edu-field" data-field="startDate" value="${edu.startDate || ''}" placeholder="e.g. 2016-09">
          </div>
          <div>
            <label class="input-label">End / Graduation Date</label>
            <input type="text" class="input-field edu-field" data-field="endDate" value="${edu.endDate || ''}" placeholder="e.g. 2020-06">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="input-label">Grade / GPA (Optional)</label>
            <input type="text" class="input-field edu-field" data-field="grade" value="${edu.grade || ''}" placeholder="e.g. 3.9 GPA">
          </div>
          <div>
            <label class="input-label">Honors & Activities (Optional)</label>
            <input type="text" class="input-field edu-field" data-field="honors" value="${edu.honors || ''}" placeholder="e.g. Magna Cum Laude">
          </div>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.edu-item').forEach(card => {
      const id = card.getAttribute('data-id');
      const item = this.state.education.find(e => e.id === id);
      if (!item) return;

      card.querySelectorAll('.edu-field').forEach(input => {
        input.addEventListener('input', (e) => {
          const field = input.getAttribute('data-field');
          item[field] = e.target.value;
          this.saveState();
        });
      });

      card.querySelector('.btn-delete-edu')?.addEventListener('click', () => {
        this.state.education = this.state.education.filter(e => e.id !== id);
        this.renderEducationList();
        this.saveState();
      });
    });
  }

  // ----------------------------------------------------
  // Dynamic Skills Section
  // ----------------------------------------------------
  renderSkillsList() {
    const list = document.getElementById('skills-list');
    if (!list) return;

    list.innerHTML = (this.state.skills || []).map((group, idx) => `
      <div class="skill-group-card p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-3" data-idx="${idx}">
        <div class="flex items-center justify-between pb-2 border-b border-slate-700">
          <div class="flex-1 mr-4">
            <input type="text" class="input-field font-bold text-white skill-category-input" value="${group.category || ''}" placeholder="Category (e.g. Frontend, Tools, Management)">
          </div>
          <button type="button" class="btn-delete-skill-group text-slate-400 hover:text-red-400 p-1 text-xs" data-idx="${idx}" title="Delete category">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>

        <div>
          <label class="input-label">Skills in this category (press Enter or Comma to add)</label>
          <div class="flex flex-wrap gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-700 min-h-[44px] items-center skill-tags-container" data-idx="${idx}">
            ${(group.items || []).map((skill, sIdx) => `
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-600/30 text-blue-200 border border-blue-500/40">
                ${skill}
                <button type="button" class="btn-remove-tag text-blue-300 hover:text-white" data-group-idx="${idx}" data-skill-idx="${sIdx}">&times;</button>
              </span>
            `).join('')}
            <input type="text" class="skill-tag-input bg-transparent border-none text-xs text-white outline-none flex-1 min-w-[120px] p-1" placeholder="Type skill & press Enter...">
          </div>
        </div>
      </div>
    `).join('');

    // Attach listeners
    list.querySelectorAll('.skill-group-card').forEach(card => {
      const idx = parseInt(card.getAttribute('data-idx'), 10);
      const group = this.state.skills[idx];
      if (!group) return;

      // Category input
      card.querySelector('.skill-category-input')?.addEventListener('input', (e) => {
        group.category = e.target.value;
        this.saveState();
      });

      // Delete group
      card.querySelector('.btn-delete-skill-group')?.addEventListener('click', () => {
        this.state.skills.splice(idx, 1);
        this.renderSkillsList();
        this.saveState();
      });

      // Tag input (Enter or comma)
      const tagInput = card.querySelector('.skill-tag-input');
      tagInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const val = tagInput.value.replace(/,/g, '').trim();
          if (val) {
            if (!group.items) group.items = [];
            group.items.push(val);
            tagInput.value = '';
            this.renderSkillsList();
            this.saveState();
          }
        }
      });

      // Remove single tag button
      card.querySelectorAll('.btn-remove-tag').forEach(rmBtn => {
        rmBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const sIdx = parseInt(rmBtn.getAttribute('data-skill-idx'), 10);
          group.items.splice(sIdx, 1);
          this.renderSkillsList();
          this.saveState();
        });
      });
    });
  }

  // ----------------------------------------------------
  // Dynamic Projects Section
  // ----------------------------------------------------
  renderProjectsList() {
    const list = document.getElementById('projects-list');
    if (!list) return;

    list.innerHTML = (this.state.projects || []).map((proj, idx) => `
      <div class="proj-item p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-3" data-id="${proj.id}">
        <div class="flex items-center justify-between pb-2 border-b border-slate-700">
          <span class="text-xs font-bold text-purple-400 uppercase tracking-wider">#${idx + 1} • ${proj.title || 'Project Name'}</span>
          <button type="button" class="btn-delete-proj text-slate-400 hover:text-red-400 p-1 text-xs" data-id="${proj.id}" title="Delete project">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="input-label">Project Title</label>
            <input type="text" class="input-field proj-field" data-field="title" value="${proj.title || ''}" placeholder="e.g. DevPulse Cloud">
          </div>
          <div>
            <label class="input-label">Technologies Used</label>
            <input type="text" class="input-field proj-field" data-field="tech" value="${proj.tech || ''}" placeholder="e.g. React, Node.js, AWS">
          </div>
        </div>

        <div>
          <label class="input-label">Project URL / GitHub Link</label>
          <input type="text" class="input-field proj-field" data-field="link" value="${proj.link || ''}" placeholder="e.g. https://github.com/username/project">
        </div>

        <div>
          <label class="input-label">Description & Impact</label>
          <textarea rows="2" class="input-field proj-field text-xs" data-field="description" placeholder="Short description of what you engineered and results...">${proj.description || ''}</textarea>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.proj-item').forEach(card => {
      const id = card.getAttribute('data-id');
      const item = this.state.projects.find(p => p.id === id);
      if (!item) return;

      card.querySelectorAll('.proj-field').forEach(input => {
        input.addEventListener('input', (e) => {
          const field = input.getAttribute('data-field');
          item[field] = e.target.value;
          this.saveState();
        });
      });

      card.querySelector('.btn-delete-proj')?.addEventListener('click', () => {
        this.state.projects = this.state.projects.filter(p => p.id !== id);
        this.renderProjectsList();
        this.saveState();
      });
    });
  }

  // ----------------------------------------------------
  // Dynamic Certifications & Languages
  // ----------------------------------------------------
  renderCertificationsList() {
    const list = document.getElementById('certifications-list');
    if (!list) return;

    list.innerHTML = (this.state.certifications || []).map((cert, idx) => `
      <div class="cert-item p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-2" data-id="${cert.id}">
        <div class="flex items-center justify-between">
          <input type="text" class="input-field font-semibold text-xs cert-field flex-1 mr-2" data-field="name" value="${cert.name || ''}" placeholder="Certification Name">
          <button type="button" class="btn-delete-cert text-slate-400 hover:text-red-400 p-1" data-id="${cert.id}">&times;</button>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <input type="text" class="input-field text-xs cert-field" data-field="issuer" value="${cert.issuer || ''}" placeholder="Issuer (e.g. AWS)">
          <input type="text" class="input-field text-xs cert-field" data-field="date" value="${cert.date || ''}" placeholder="Year / Date (e.g. 2023)">
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.cert-item').forEach(card => {
      const id = card.getAttribute('data-id');
      const item = this.state.certifications.find(c => c.id === id);
      if (!item) return;

      card.querySelectorAll('.cert-field').forEach(input => {
        input.addEventListener('input', (e) => {
          item[input.getAttribute('data-field')] = e.target.value;
          this.saveState();
        });
      });

      card.querySelector('.btn-delete-cert')?.addEventListener('click', () => {
        this.state.certifications = this.state.certifications.filter(c => c.id !== id);
        this.renderCertificationsList();
        this.saveState();
      });
    });
  }

  renderLanguagesList() {
    const list = document.getElementById('languages-list');
    if (!list) return;

    list.innerHTML = (this.state.languages || []).map((lang, idx) => `
      <div class="lang-item flex items-center gap-2" data-idx="${idx}">
        <input type="text" class="input-field text-xs lang-field" data-field="language" value="${lang.language || ''}" placeholder="Language (e.g. French)">
        <input type="text" class="input-field text-xs lang-field" data-field="fluency" value="${lang.fluency || ''}" placeholder="Fluency (e.g. Fluent, Native)">
        <button type="button" class="btn-delete-lang text-slate-400 hover:text-red-400 px-2 py-1 text-sm" data-idx="${idx}">&times;</button>
      </div>
    `).join('');

    list.querySelectorAll('.lang-item').forEach(card => {
      const idx = parseInt(card.getAttribute('data-idx'), 10);
      const item = this.state.languages[idx];
      if (!item) return;

      card.querySelectorAll('.lang-field').forEach(input => {
        input.addEventListener('input', (e) => {
          item[input.getAttribute('data-field')] = e.target.value;
          this.saveState();
        });
      });

      card.querySelector('.btn-delete-lang')?.addEventListener('click', () => {
        this.state.languages.splice(idx, 1);
        this.renderLanguagesList();
        this.saveState();
      });
    });
  }

  // ----------------------------------------------------
  // Dynamic Custom Sections
  // ----------------------------------------------------
  renderCustomSectionsList() {
    const list = document.getElementById('custom-sections-list');
    if (!list) return;

    list.innerHTML = (this.state.customSections || []).map((sec, sIdx) => `
      <div class="custom-sec-item p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 space-y-3" data-id="${sec.id}">
        <div class="flex items-center justify-between pb-2 border-b border-slate-700">
          <input type="text" class="input-field font-bold text-amber-400 sec-title-input flex-1 mr-3" value="${sec.title || ''}" placeholder="Section Title (e.g. Publications, Volunteer, Awards)">
          <button type="button" class="btn-delete-custom-sec text-slate-400 hover:text-red-400 p-1 text-xs" data-id="${sec.id}">&times;</button>
        </div>
        <div class="space-y-2 sec-items-container">
          ${(sec.items || []).map((it, iIdx) => `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input type="text" class="input-field text-xs sec-item-field sm:col-span-2" data-item-idx="${iIdx}" data-field="title" value="${it.title || ''}" placeholder="Title / Recognition">
              <input type="text" class="input-field text-xs sec-item-field" data-item-idx="${iIdx}" data-field="date" value="${it.date || ''}" placeholder="Year / Subtitle">
            </div>
          `).join('')}
        </div>
        <button type="button" class="btn-add-sec-item text-xs text-blue-400 hover:text-blue-300 font-semibold" data-id="${sec.id}">+ Add Item</button>
      </div>
    `).join('');

    list.querySelectorAll('.custom-sec-item').forEach(card => {
      const id = card.getAttribute('data-id');
      const sec = this.state.customSections.find(s => s.id === id);
      if (!sec) return;

      card.querySelector('.sec-title-input')?.addEventListener('input', (e) => {
        sec.title = e.target.value;
        this.saveState();
      });

      card.querySelector('.btn-delete-custom-sec')?.addEventListener('click', () => {
        this.state.customSections = this.state.customSections.filter(s => s.id !== id);
        this.renderCustomSectionsList();
        this.saveState();
      });

      card.querySelectorAll('.sec-item-field').forEach(input => {
        input.addEventListener('input', (e) => {
          const iIdx = parseInt(input.getAttribute('data-item-idx'), 10);
          const fld = input.getAttribute('data-field');
          if (sec.items[iIdx]) {
            sec.items[iIdx][fld] = e.target.value;
            this.saveState();
          }
        });
      });

      card.querySelector('.btn-add-sec-item')?.addEventListener('click', () => {
        if (!sec.items) sec.items = [];
        sec.items.push({ title: '', subtitle: '', date: '' });
        this.renderCustomSectionsList();
        this.saveState();
      });
    });
  }

  // ----------------------------------------------------
  // Event Delegation for "Add New" Buttons & Presets
  // ----------------------------------------------------
  setupEventDelegation() {
    // Add Experience Button
    document.getElementById('btn-add-experience')?.addEventListener('click', () => {
      if (!this.state.experiences) this.state.experiences = [];
      const newId = 'exp-' + Date.now();
      this.state.experiences.unshift({
        id: newId,
        role: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '• '
      });
      this.renderExperienceList();
      this.saveState();
    });

    // Add Education Button
    document.getElementById('btn-add-education')?.addEventListener('click', () => {
      if (!this.state.education) this.state.education = [];
      const newId = 'edu-' + Date.now();
      this.state.education.unshift({
        id: newId,
        degree: '',
        school: '',
        location: '',
        startDate: '',
        endDate: '',
        grade: '',
        honors: ''
      });
      this.renderEducationList();
      this.saveState();
    });

    // Add Skill Category Button
    document.getElementById('btn-add-skill-group')?.addEventListener('click', () => {
      if (!this.state.skills) this.state.skills = [];
      this.state.skills.push({
        category: 'New Category',
        items: []
      });
      this.renderSkillsList();
      this.saveState();
    });

    // Add Project Button
    document.getElementById('btn-add-project')?.addEventListener('click', () => {
      if (!this.state.projects) this.state.projects = [];
      const newId = 'proj-' + Date.now();
      this.state.projects.unshift({
        id: newId,
        title: '',
        tech: '',
        link: '',
        description: ''
      });
      this.renderProjectsList();
      this.saveState();
    });

    // Add Certification Button
    document.getElementById('btn-add-cert')?.addEventListener('click', () => {
      if (!this.state.certifications) this.state.certifications = [];
      this.state.certifications.push({
        id: 'cert-' + Date.now(),
        name: '',
        issuer: '',
        date: '',
        link: ''
      });
      this.renderCertificationsList();
      this.saveState();
    });

    // Add Language Button
    document.getElementById('btn-add-lang')?.addEventListener('click', () => {
      if (!this.state.languages) this.state.languages = [];
      this.state.languages.push({ language: '', fluency: '' });
      this.renderLanguagesList();
      this.saveState();
    });

    // Add Custom Section Button
    document.getElementById('btn-add-custom-sec')?.addEventListener('click', () => {
      if (!this.state.customSections) this.state.customSections = [];
      this.state.customSections.push({
        id: 'custom-' + Date.now(),
        title: 'Volunteer Experience',
        items: [{ title: '', subtitle: '', date: '' }]
      });
      this.renderCustomSectionsList();
      this.saveState();
    });

    // Preset Loader
    document.querySelectorAll('.preset-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const presetKey = btn.getAttribute('data-preset');
        if (presetKey === 'blank') {
          if (confirm('Start with a blank resume? This will clear current fields.')) {
            this.state = {
              theme: { ...INITIAL_DATA.theme },
              personal: { fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '', photo: '', summary: '' },
              experiences: [],
              education: [],
              skills: [{ category: 'Core Skills', items: [] }],
              projects: [],
              certifications: [],
              languages: [],
              customSections: []
            };
            this.populateEditorForms();
            this.setupThemeControls();
            this.saveState();
          }
        } else if (SAMPLE_PRESETS[presetKey]) {
          if (confirm(`Load the ${btn.textContent.trim()} template? Your current unsaved changes will be replaced.`)) {
            this.state = JSON.parse(JSON.stringify(SAMPLE_PRESETS[presetKey]));
            this.populateEditorForms();
            this.setupThemeControls();
            this.saveState();
          }
        }
      });
    });
  }

  // ----------------------------------------------------
  // ATS Score Tracker & Optimizer Modal
  // ----------------------------------------------------
  updateAtsScore() {
    const ats = calculateAtsScore(this.state);
    
    // Update navbar mini meter
    const navScore = document.getElementById('ats-nav-score');
    const navPill = document.getElementById('btn-open-ats');
    if (navScore) navScore.textContent = `${ats.score}/100`;
    if (navPill) {
      navPill.style.borderColor = ats.badgeColor;
    }

    // Modal contents
    const modalScore = document.getElementById('ats-modal-score');
    const modalRating = document.getElementById('ats-modal-rating');
    const modalChecks = document.getElementById('ats-modal-checks');
    const modalSuggestions = document.getElementById('ats-modal-suggestions');

    if (modalScore) modalScore.textContent = ats.score;
    if (modalRating) {
      modalRating.textContent = ats.rating;
      modalRating.style.color = ats.badgeColor;
    }

    if (modalChecks) {
      modalChecks.innerHTML = ats.checks.map(c => `
        <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-700/60">
          <span class="text-slate-300">${c.name}</span>
          <span class="font-bold font-mono ${c.score >= c.max * 0.7 ? 'text-green-400' : 'text-amber-400'}">${c.score} / ${c.max}</span>
        </div>
      `).join('');
    }

    if (modalSuggestions) {
      if (ats.suggestions.length === 0) {
        modalSuggestions.innerHTML = `
          <div class="p-3 bg-green-900/30 border border-green-700/50 rounded-lg text-xs text-green-300 flex items-center gap-2">
            <span>🎉 Outstanding job! Your resume is highly optimized for modern ATS parsers and human recruiters.</span>
          </div>
        `;
      } else {
        modalSuggestions.innerHTML = ats.suggestions.map(s => `
          <div class="flex items-start gap-2 p-2.5 rounded-md text-xs ${
            s.type === 'danger' ? 'bg-red-950/40 border border-red-800/60 text-red-300' :
            s.type === 'warning' ? 'bg-amber-950/40 border border-amber-800/60 text-amber-300' :
            'bg-blue-950/40 border border-blue-800/60 text-blue-300'
          }">
            <span class="font-bold flex-shrink-0">${s.type === 'danger' ? '❌' : s.type === 'warning' ? '⚠️' : '💡'}</span>
            <span class="leading-relaxed">${s.text}</span>
          </div>
        `).join('');
      }
    }
  }

  setupAtsModal() {
    const modal = document.getElementById('ats-modal');
    const openBtn = document.getElementById('btn-open-ats');
    const closeBtn = document.getElementById('btn-close-ats');

    openBtn?.addEventListener('click', () => {
      this.updateAtsScore();
      modal?.classList.remove('hidden');
    });

    closeBtn?.addEventListener('click', () => {
      modal?.classList.add('hidden');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }

  // ----------------------------------------------------
  // Export & Import Tools (PDF, JSON, Print)
  // ----------------------------------------------------
  setupExportImport() {
    // Print Dialog (Ctrl+P / Print Button)
    document.getElementById('btn-print-resume')?.addEventListener('click', () => {
      window.print();
    });

    // PDF Download via html2pdf
    document.getElementById('btn-download-pdf')?.addEventListener('click', () => {
      const element = document.getElementById('resume-container');
      const filename = `${(this.state.personal.fullName || 'resume').toLowerCase().replace(/\s+/g, '_')}_resume.pdf`;

      const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      if (window.html2pdf) {
        const btn = document.getElementById('btn-download-pdf');
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span class="animate-spin inline-block mr-1">⏳</span> Generating PDF...`;
        btn.disabled = true;

        window.html2pdf().set(opt).from(element).save().then(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }).catch(err => {
          console.error('html2pdf error:', err);
          btn.innerHTML = originalText;
          btn.disabled = false;
          // Fallback to browser print
          window.print();
        });
      } else {
        window.print();
      }
    });

    // JSON Export
    document.getElementById('btn-export-json')?.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state, null, 2));
      const downloadAnchor = document.createElement('a');
      const filename = `${(this.state.personal.fullName || 'resume').toLowerCase().replace(/\s+/g, '_')}_data.json`;
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', filename);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });

    // JSON Import
    const importFileInput = document.getElementById('import-json-input');
    document.getElementById('btn-trigger-import')?.addEventListener('click', () => {
      importFileInput?.click();
    });

    importFileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedData = JSON.parse(event.target.result);
            if (importedData.personal && importedData.theme) {
              this.state = importedData;
              this.populateEditorForms();
              this.setupThemeControls();
              this.saveState();
              alert('Resume data successfully imported!');
            } else {
              alert('Invalid resume JSON format.');
            }
          } catch (err) {
            alert('Error parsing JSON file: ' + err.message);
          }
        };
        reader.readAsText(file);
      }
    });

    // Reset All Data Button
    document.getElementById('btn-reset-data')?.addEventListener('click', () => {
      if (confirm('Reset to initial default demo resume?')) {
        this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
        this.populateEditorForms();
        this.setupThemeControls();
        this.saveState();
      }
    });
  }
}

// Initialize on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new ResumeCraftApp();
});
