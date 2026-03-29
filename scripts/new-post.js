const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const titleArg = args[0];

if (!titleArg) {
    console.error("Please provide a title for the new post. Usage: npm run new-post \"My Post Title\"");
    process.exit(1);
}

const date = new Date();
const dateString = date.toISOString().split('T')[0];
const slug = titleArg.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
const filename = `${dateString}-${slug}.md`;
const filePath = path.join(__dirname, '../_posts', filename);

const frontmatter = `---
title: "${titleArg}"
description: "A short description of the post (120-160 characters)"
ms.date: ${dateString}
ms.author: omarassaf
ms.topic: conceptual
ms.service: general
tags:
  - tag1
  - tag2
draft: true
image: /assets/images/posts/placeholder.png
---

Write your post content here.
`;

// Create _posts dir if it doesn't exist
const postsDir = path.dirname(filePath);
if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
}

if (fs.existsSync(filePath)) {
    console.error(`Post already exists at: ${filePath}`);
    process.exit(1);
}

fs.writeFileSync(filePath, frontmatter, 'utf8');
console.log(`✅ New post created at: _posts/${filename}`);
console.log(`Don't forget to update the draft status and description!`);