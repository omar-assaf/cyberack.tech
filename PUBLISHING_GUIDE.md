# Publishing Guide for CybeRack

This guide explains how to easily create, edit, and publish new blog posts on CybeRack, even if you are non-technical.

---

## 1. How to Create a New Blog Post

To start a new blog post, the easiest way is to use the provided command.

1. Open your terminal (e.g., **PowerShell**, **Bash**, or **Command Prompt**).
2. Go to your blog's folder:
   **PowerShell / Windows:**
   ```powershell
   cd C:\Path\To\cyberack.tech
   ```
   **Bash / Mac / Linux:**
   ```bash
   cd path/to/cyberack.tech
   ```
3. Run the `new-post` command with the title of your post inside quotes:
   ```bash
   npm run new-post "My Awesome New Article"
   ```
4. This will automatically create a new file in the `_posts/` folder. The file will be named with today's date and your title, like `2026-03-29-my-awesome-new-article.md`.

## 2. Where to Edit Your Post

Open the newly created file in the `_posts/` folder using a text editor (like Visual Studio Code or Notepad). 

At the top of the file, you'll see a section called **Frontmatter**, bordered by `---` lines. This tells the blog how to display your post.

```yaml
---
title: "My Awesome New Article"
description: "A short summary that appears on the homepage and search engines (must be 120-160 characters)."
ms.date: 2026-03-29
ms.author: omarassaf
ms.topic: conceptual
ms.service: general
tags:
  - general
draft: true
image: /assets/images/posts/my-cool-image.png
---
```

### Important Fields to Edit:
- **`description`**: Write a catchy summary (120 to 160 characters long).
- **`draft`**: It is set to `true` by default. This means the post won't be visible to the public yet. Leave it as `true` while you're writing.
- **`image`**: This is the big picture at the top of the post. Provide the path to the picture (see section 3).
- **`ms.topic` and `ms.service`**: These help organize your post. Check `_data/taxonomy.yml` for allowed categories.
- **`ms.author`**: The ID of the author. Must match an ID from `_data/authors.yml`.

Write the content of your blog post below the bottom `---` using Markdown formatting.

## 3. Where to Save Pictures and Supporting Files

When writing an article, you often need to include pictures.

1. Save your images inside the `assets/images/posts/` folder. For example, `assets/images/posts/my-screenshot.png`.
2. To use the image in your post's **Frontmatter**, type:
   ```yaml
   image: /assets/images/posts/my-screenshot.png
   ```
3. To include the image *inside* the content of your post, use Markdown syntax:
   ```markdown
   ![A description of the screenshot](/assets/images/posts/my-screenshot.png)
   ```

*Tip: Please compress your images before uploading so the website stays fast!*

## 4. How to Push the Post from Draft to Published

Once you are completely finished writing and reviewing your post, it's time to publish.

1. Open your post file in the `_posts/` folder.
2. At the top of the file, find `draft: true` and change it to `draft: false`.
   ```yaml
   draft: false
   ```
3. Ensure the `ms.date` matches the current date (it cannot be set in the future).
4. Save the file.
5. Open **GitHub Desktop** (or VS Code's Source Control tab).
   - In the summary box, type something like `feat: added new article about my topic`.
   - Click **Commit to main**.
   - Click **Push origin** to upload your changes.
   
   *(Alternatively, if you prefer the terminal (PowerShell or Bash), you can run:)*
   ```bash
   git add .
   git commit -m "feat: added new article"
   git push origin main
   ```

Once you push to the `main` branch, GitHub Actions will automatically check your formatting and publish the new post live within 2-3 minutes!

---

## 5. Maintaining Frequently Used Files

If you need to change the site's navigation, authors, or categories, edit the files in the `_data/` folder:

### Adding a New Author (`_data/authors.yml`)
If someone new is writing for the blog, add their profile to `_data/authors.yml`.

```yaml
new_author_id:
  name: "Jane Doe"
  bio: "Cloud Architect and Developer."
  twitter: "janedoe"
  github: "janedoe"
  avatar: "/assets/images/authors/jane-doe.png"
```
Make sure to put their picture in `assets/images/authors/`. They can now use `ms.author: new_author_id` in their posts.

### Updating Navigation Links (`_data/navigation.yml`)
To add a new link to the top menu, edit `_data/navigation.yml`. Just add the title and the URL.

### Adding New Categories (`_data/taxonomy.yml`)
If you want to create a new topic or service tag (like `kubernetes` or `aws`), add it to the lists in `_data/taxonomy.yml`. If a writer tries to use a category that isn't on this list, the system will block their post to prevent typos.