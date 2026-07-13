import { RESUME_DATA } from "@/data/resume-data";

const SITE_URL = "https://jyxu0621.github.io/";

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: RESUME_DATA.name,
    alternateName: RESUME_DATA.initials,
    description: RESUME_DATA.about,
    url: SITE_URL,
    image: RESUME_DATA.avatarUrl,
    sameAs: RESUME_DATA.contact.social.map((social) => social.url),
    alumniOf: RESUME_DATA.education.map((education) => ({
      "@type": "EducationalOrganization",
      name: education.school,
    })),
  };
}

export function generateResumeStructuredData() {
  const person = generatePersonStructuredData();

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: person,
    about: person,
    name: `${RESUME_DATA.name} - Personal Homepage`,
    description: RESUME_DATA.about,
    url: SITE_URL,
  };
}
