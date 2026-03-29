# Contributing to CybeRack

We love your input! We want to make contributing to this blog as easy and transparent as possible.

## Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes (`npm run validate` and `npm run lint:md`).
4. Make sure your code lints.
5. Issue that pull request!

## Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/). Your commit messages must follow this format:
- `feat: added a new article`
- `fix: corrected spelling in article XYZ`
- `docs: updated README`

## Frontmatter Requirements

Every post in `_posts/` must have valid YAML frontmatter:

```yaml
---
title: "Your Title"
description: "Description (120-160 chars)"
ms.date: 2026-03-29
ms.author: omarassaf
ms.topic: conceptual
ms.service: general
tags:
  - tag1
draft: true
---
```

## Content Licensing
By contributing your article or content to this repository, you agree to license your contribution under the [CC BY 4.0 License](LICENSE-CONTENT).