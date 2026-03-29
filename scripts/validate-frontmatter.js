const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

// Directories to scan
const postsDir = path.join(__dirname, '../_posts');
const draftsDir = path.join(__dirname, '../_drafts');

// Data files
const authorsFile = path.join(__dirname, '../_data/authors.yml');
const taxonomyFile = path.join(__dirname, '../_data/taxonomy.yml');

// Helper to get files
function getFiles(dir, ext) {
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);
    let result = [];
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            result = result.concat(getFiles(fullPath, ext));
        } else if (file.endsWith(ext)) {
            result.push(fullPath);
        }
    });
    return result;
}

function parseFrontmatter(content, filePath) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
        throw new Error(`[${path.basename(filePath)}] Missing or invalid YAML frontmatter block.`);
    }
    try {
        return yaml.load(match[1]);
    } catch (e) {
        throw new Error(`[${path.basename(filePath)}] YAML Parsing Error: ${e.message}`);
    }
}

function loadTaxonomy() {
    try {
        const content = fs.readFileSync(taxonomyFile, 'utf8');
        return yaml.load(content) || {};
    } catch (e) {
        console.warn(`Warning: Could not load taxonomy from ${taxonomyFile}. Skipping controlled vocab checks.`);
        return { services: [], topics: [] };
    }
}

function loadAuthors() {
    try {
        const content = fs.readFileSync(authorsFile, 'utf8');
        return yaml.load(content) || {};
    } catch (e) {
        console.warn(`Warning: Could not load authors from ${authorsFile}. Skipping author checks.`);
        return {};
    }
}

function validateFile(filePath, taxonomy, authors) {
    const content = fs.readFileSync(filePath, 'utf8');
    let errors = [];
    let fm;

    try {
        fm = parseFrontmatter(content, filePath);
    } catch (e) {
        return [e.message];
    }

    const filename = path.basename(filePath);

    // 1. Required fields
    const required = ['title', 'description', 'ms.date', 'ms.author', 'ms.topic', 'ms.service', 'tags', 'draft'];
    required.forEach(field => {
        if (fm[field] === undefined) {
            errors.push(`Missing required field: '${field}'`);
        }
    });

    // 2. Title length
    if (fm.title && fm.title.length > 60) {
        errors.push(`Title exceeds 60 characters (${fm.title.length})`);
    }

    // 3. Description length
    if (fm.description) {
        if (fm.description.length < 120) {
            errors.push(`Description is too short. Minimum 120 characters (${fm.description.length})`);
        }
        if (fm.description.length > 160) {
            errors.push(`Description exceeds 160 characters (${fm.description.length})`);
        }
    }

    // 4. Date and Draft status
    if (fm['ms.date']) {
        const postDate = new Date(fm['ms.date']);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        if (isNaN(postDate.getTime())) {
            errors.push(`ms.date is not a valid date format (expected YYYY-MM-DD)`);
        } else if (postDate > today && fm.draft !== true) {
            errors.push(`Post is future-dated (${fm['ms.date']}) but draft is not set to true.`);
        }
    }

    // 5. Draft boolean check
    if (fm.draft !== undefined && typeof fm.draft !== 'boolean') {
        errors.push(`draft must be a boolean (true or false)`);
    }

    // 6. Tags
    if (fm.tags) {
        if (!Array.isArray(fm.tags)) {
            errors.push(`tags must be an array/list`);
        } else {
            if (fm.tags.length < 1 || fm.tags.length > 5) {
                errors.push(`Must have between 1 and 5 tags (found ${fm.tags.length})`);
            }
            fm.tags.forEach(tag => {
                if (typeof tag !== 'string' || !/^[a-z0-9-]+$/.test(tag)) {
                    errors.push(`Tag '${tag}' is invalid. Tags must be lowercase, alphanumeric, and hyphenated.`);
                }
            });
        }
    }

    // 7. Controlled vocabulary
    if (taxonomy.services && taxonomy.services.length > 0 && fm['ms.service']) {
        if (!taxonomy.services.includes(fm['ms.service'])) {
            errors.push(`Invalid ms.service '${fm['ms.service']}'. Allowed values: ${taxonomy.services.join(', ')}`);
        }
    }

    if (taxonomy.topics && taxonomy.topics.length > 0 && fm['ms.topic']) {
        if (!taxonomy.topics.includes(fm['ms.topic'])) {
            errors.push(`Invalid ms.topic '${fm['ms.topic']}'. Allowed values: ${taxonomy.topics.join(', ')}`);
        }
    }

    // 8. Author check
    if (Object.keys(authors).length > 0 && fm['ms.author']) {
        if (!authors[fm['ms.author']]) {
            errors.push(`Author '${fm['ms.author']}' not found in _data/authors.yml`);
        }
    }

    // 9. Image existence (simplified local check)
    if (fm.image) {
        // Assume image paths in frontmatter are root-relative, e.g., /assets/images/...
        const imagePath = path.join(__dirname, '..', fm.image.startsWith('/') ? fm.image.substring(1) : fm.image);
        if (!fs.existsSync(imagePath)) {
            errors.push(`Image path does not exist: ${fm.image} (checked ${imagePath})`);
        }
    }

    return errors.map(err => `[${filename}] ${err}`);
}

function main() {
    const files = [...getFiles(postsDir, '.md'), ...getFiles(draftsDir, '.md')];
    
    if (files.length === 0) {
        console.log("No markdown files found to validate.");
        return;
    }

    const taxonomy = loadTaxonomy();
    const authors = loadAuthors();
    let allErrors = [];

    files.forEach(file => {
        const errors = validateFile(file, taxonomy, authors);
        if (errors.length > 0) {
            allErrors = allErrors.concat(errors);
        }
    });

    if (allErrors.length > 0) {
        console.error("\n❌ Frontmatter Validation Failed:");
        allErrors.forEach(err => console.error(`   ${err}`));
        process.exit(1);
    } else {
        console.log(`\n✅ Successfully validated ${files.length} files.`);
    }
}

main();