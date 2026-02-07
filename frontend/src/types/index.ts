export interface Page {
  id: string;
  slug: string;
  type: PageType;
  published: boolean;
  order: number;
  content: PageContent[];
  sections: PageSection[];
  seo: PageSEO[];
}

export enum PageType {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  PROJECTS = 'PROJECTS',
  REFERENCES = 'REFERENCES',
  CONTACT = 'CONTACT',
  CUSTOM = 'CUSTOM',
}

export interface PageContent {
  id: string;
  language: Language;
  title: string;
  description?: string;
}

export interface PageSection {
  id: string;
  type: SectionType;
  order: number;
  visible: boolean;
  settings: any;
  content: SectionContent[];
}

export enum SectionType {
  HERO = 'HERO',
  TEXT_IMAGE = 'TEXT_IMAGE',
  SERVICES = 'SERVICES',
  PROJECTS_GRID = 'PROJECTS_GRID',
  STATISTICS = 'STATISTICS',
  LOGO_CAROUSEL = 'LOGO_CAROUSEL',
  CTA = 'CTA',
  CUSTOM_HTML = 'CUSTOM_HTML',
  VIDEO = 'VIDEO',
  GALLERY = 'GALLERY',
  TEAM = 'TEAM',
  TIMELINE = 'TIMELINE',
}

export interface SectionContent {
  id: string;
  language: Language;
  data: any;
}

export interface PageSEO {
  id: string;
  language: Language;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  ogImage?: string;
}

export interface Project {
  id: string;
  slug: string;
  featured: boolean;
  published: boolean;
  status: ProjectStatus;
  year?: number;
  location?: string;
  coverImage?: string;
  order: number;
  content: ProjectContent[];
  categories: ProjectCategoryRelation[];
  gallery: ProjectGallery[];
  highlights: ProjectHighlight[];
}

export enum ProjectStatus {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  PLANNED = 'PLANNED',
}

export interface ProjectContent {
  id: string;
  language: Language;
  title: string;
  description: string;
  details?: string;
}

export interface Category {
  id: string;
  slug: string;
  order: number;
  names: CategoryName[];
}

export interface CategoryName {
  id: string;
  language: Language;
  name: string;
}

export interface ProjectCategoryRelation {
  category: Category;
}

export interface ProjectGallery {
  id: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  order: number;
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface ProjectHighlight {
  id: string;
  language: Language;
  text: string;
  order: number;
}

export interface Reference {
  id: string;
  slug: string;
  logo: string;
  order: number;
  published: boolean;
  content: ReferenceContent[];
}

export interface ReferenceContent {
  id: string;
  language: Language;
  name: string;
  testimonial?: string;
  author?: string;
  position?: string;
}

export interface ContactInfo {
  id: string;
  language: Language;
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
  whatsapp?: string;
  workingHours?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnail?: string;
  alt?: string;
  createdAt: string;
}

export enum Language {
  TR = 'TR',
  EN = 'EN',
  AR = 'AR',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}
