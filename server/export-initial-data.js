import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getInitialData } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = getInitialData();
const tsContent = `import { CompanySettings, Service, PortfolioProject, FounderAchievement, PosterItem, SpecialOffer } from '../types';

export const initialCompanySettings: CompanySettings = ${JSON.stringify(data.company_settings, null, 2)};

export const initialServices: Service[] = ${JSON.stringify(data.services, null, 2)};

export const initialProjects: PortfolioProject[] = ${JSON.stringify(data.portfolio_projects, null, 2)};

export const initialAchievements: FounderAchievement[] = ${JSON.stringify(data.achievements, null, 2)};

export const initialPosters: PosterItem[] = ${JSON.stringify(data.poster_gallery, null, 2)};

export const initialOffers: SpecialOffer[] = ${JSON.stringify(data.special_offers, null, 2)};
`;

const outputPath = path.join(__dirname, '..', 'src', 'data', 'initialData.ts');
fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log('✅ src/data/initialData.ts successfully created with full default dataset!');
