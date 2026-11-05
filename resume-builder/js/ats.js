/**
 * ResumeCraft - ATS (Applicant Tracking System) Score Checker & Optimizer
 */
import { ACTION_VERBS } from './data.js';

export function calculateAtsScore(data) {
  let score = 0;
  const checks = [];
  const suggestions = [];

  // 1. Contact Information (Max 20)
  let contactScore = 0;
  const p = data.personal || {};

  if (p.fullName && p.fullName.trim().length > 2) contactScore += 5;
  else suggestions.push({ type: 'warning', text: 'Enter your full professional name.' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (p.email && emailRegex.test(p.email.trim())) contactScore += 5;
  else suggestions.push({ type: 'danger', text: 'Add a valid contact email address.' });

  if (p.phone && p.phone.trim().length >= 7) contactScore += 4;
  else suggestions.push({ type: 'warning', text: 'Add a direct contact phone number.' });

  if (p.location && p.location.trim().length > 2) contactScore += 3;
  else suggestions.push({ type: 'info', text: 'Add your city & country/state (crucial for local ATS filters).' });

  if ((p.linkedin && p.linkedin.trim().length > 3) || (p.website && p.website.trim().length > 3) || (p.github && p.github.trim().length > 3)) {
    contactScore += 3;
  } else {
    suggestions.push({ type: 'info', text: 'Include your LinkedIn profile or portfolio link to boost credibility.' });
  }

  score += contactScore;
  checks.push({ name: 'Contact & Profile Completeness', score: contactScore, max: 20 });

  // 2. Professional Summary (Max 15)
  let summaryScore = 0;
  const summary = (p.summary || '').trim();
  const wordCount = summary ? summary.split(/\s+/).filter(Boolean).length : 0;

  if (wordCount >= 30 && wordCount <= 120) {
    summaryScore += 12;
  } else if (wordCount > 0 && wordCount < 30) {
    summaryScore += 7;
    suggestions.push({ type: 'warning', text: 'Your professional summary is brief. Aim for 40–90 words highlighting your key achievements.' });
  } else if (wordCount > 120) {
    summaryScore += 8;
    suggestions.push({ type: 'info', text: 'Summary might be too long for quick scanning. Condense to under 100 words.' });
  } else {
    suggestions.push({ type: 'danger', text: 'Write a strong 2-4 sentence professional summary to hook recruiters.' });
  }

  // Check for strong verbs in summary
  const summaryHasActionVerbs = ACTION_VERBS.some(v => new RegExp(`\\b${v}\\b`, 'i').test(summary));
  if (summaryHasActionVerbs) summaryScore += 3;

  score += summaryScore;
  checks.push({ name: 'Summary & Impact Statement', score: summaryScore, max: 15 });

  // 3. Work Experience & Impact (Max 25)
  let expScore = 0;
  const experiences = data.experiences || [];

  if (experiences.length > 0) {
    expScore += 7;

    let hasMetrics = false;
    let hasActionVerbs = false;
    let allHaveDates = true;

    experiences.forEach(exp => {
      const desc = exp.description || '';
      // Check for numbers, % signs, dollar signs, metric units (e.g. 45%, $10M, 100+, 2x, 99.99%)
      if (/(\d+([.,]\d+)?\s*(%|\$|M|k|x|\+|users|clients|projects|ms|teams))/i.test(desc) || /\b\d+\b/.test(desc)) {
        hasMetrics = true;
      }
      if (ACTION_VERBS.some(v => new RegExp(`\\b${v}\\b`, 'i').test(desc))) {
        hasActionVerbs = true;
      }
      if (!exp.startDate) {
        allHaveDates = false;
      }
    });

    if (hasMetrics) {
      expScore += 9;
    } else {
      suggestions.push({ type: 'warning', text: 'Quantify your accomplishments with numbers, % growth, $ revenue, or time saved (e.g. "Increased conversion by 25%").' });
    }

    if (hasActionVerbs) {
      expScore += 6;
    } else {
      suggestions.push({ type: 'info', text: 'Start your experience bullet points with dynamic action verbs (e.g., "Spearheaded", "Engineered", "Optimized").' });
    }

    if (allHaveDates) {
      expScore += 3;
    } else {
      suggestions.push({ type: 'warning', text: 'Ensure all roles have start and end dates for ATS timeline parsing.' });
    }
  } else {
    suggestions.push({ type: 'danger', text: 'Add at least one professional or volunteer experience.' });
  }

  score += expScore;
  checks.push({ name: 'Quantified Experience & Achievements', score: expScore, max: 25 });

  // 4. Skills & Keywords (Max 20)
  let skillsScore = 0;
  const skills = data.skills || [];
  let totalSkills = 0;
  skills.forEach(s => {
    totalSkills += (s.items || []).length;
  });

  if (totalSkills >= 8) {
    skillsScore = 20;
  } else if (totalSkills >= 4) {
    skillsScore = 12;
    suggestions.push({ type: 'warning', text: `You have ${totalSkills} skills listed. Aim for at least 8-12 skills to match ATS keywords.` });
  } else if (totalSkills > 0) {
    skillsScore = 6;
    suggestions.push({ type: 'warning', text: 'Expand your skills list to improve resume keyword discovery.' });
  } else {
    suggestions.push({ type: 'danger', text: 'Add a categorized Skills section with target industry keywords.' });
  }

  score += skillsScore;
  checks.push({ name: 'Skills & Keywords Density', score: skillsScore, max: 20 });

  // 5. Education & Credentials (Max 10)
  let eduScore = 0;
  const education = data.education || [];
  if (education.length > 0 && education[0].degree && education[0].school) {
    eduScore = 10;
  } else if (education.length > 0) {
    eduScore = 5;
    suggestions.push({ type: 'warning', text: 'Complete both degree and institution name in Education.' });
  } else {
    suggestions.push({ type: 'danger', text: 'Add your highest education degree or diploma.' });
  }

  score += eduScore;
  checks.push({ name: 'Education & Academic History', score: eduScore, max: 10 });

  // 6. Additional Sections / Boosters (Max 10)
  let extraScore = 0;
  const projects = data.projects || [];
  const certs = data.certifications || [];
  const languages = data.languages || [];

  if (projects.length > 0) extraScore += 4;
  if (certs.length > 0) extraScore += 4;
  if (languages.length > 0) extraScore += 2;

  if (extraScore < 5) {
    suggestions.push({ type: 'info', text: 'Add Certifications, Key Projects, or Languages to differentiate your profile.' });
  }

  score += extraScore;
  checks.push({ name: 'Certifications & Portfolio Boosters', score: extraScore, max: 10 });

  // Ensure 0-100 bounds
  score = Math.min(100, Math.max(0, score));

  // Rating label & color
  let rating = 'Needs Work';
  let badgeColor = '#ef4444'; // Red
  if (score >= 90) {
    rating = 'Outstanding (ATS Ready)';
    badgeColor = '#10b981'; // Green
  } else if (score >= 75) {
    rating = 'Strong Profile';
    badgeColor = '#3b82f6'; // Blue
  } else if (score >= 55) {
    rating = 'Moderate';
    badgeColor = '#f59e0b'; // Amber
  }

  return {
    score,
    rating,
    badgeColor,
    checks,
    suggestions: suggestions.slice(0, 5) // Top 5 priority suggestions
  };
}
