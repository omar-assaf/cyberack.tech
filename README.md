# CybeRack Tech Blog

Welcome to the repository for [cyberack.tech](https://cyberack.tech). This is a technical blog built with Jekyll, Tailwind CSS, and GitHub Pages.

## 🚀 Quick Start

To run this site locally, you'll need Ruby (for Jekyll) and Node.js (for Tailwind and tooling).

1. **Install dependencies**
   ```bash
   bundle install
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```
   *Note: This runs Tailwind in watch mode. You should run `bundle exec jekyll serve --drafts --livereload` in another terminal.*

## 📝 Creating a New Post

Use our scaffolding script to ensure your frontmatter is correct:

```bash
npm run new-post "Your Post Title"
```

This will create a new file in `_posts/` with the correct YAML frontmatter structure. 

## ✅ Validating Your Changes

Before committing, run the validation suite:

```bash
npm run validate   # Checks frontmatter structure against taxonomy
npm run lint:md    # Runs Markdown formatting rules
```

## 📄 License

This repository is dual-licensed:
* All **code** (layouts, scripts, CSS) is licensed under the [MIT License](LICENSE).
* All **content** (articles in `_posts/` and `_drafts/`) is licensed under the [CC BY 4.0 License](LICENSE-CONTENT).

## 🤝 Contributing

Please see our [Contributing Guide](CONTRIBUTING.md) for details on our PR process, conventional commits, and frontmatter specifications.

## 🛡️ Security

Please see our [Security Policy](SECURITY.md) for vulnerability disclosure. 
*Note: Due to GitHub Pages limitations, we cannot set the `X-Content-Type-Options` or `X-Frame-Options`/`frame-ancestors` headers via `meta` tags.*