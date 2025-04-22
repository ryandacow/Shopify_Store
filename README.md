# 🧸 Personalized Toy & Book Recommender

A simple, parent-friendly web app that helps match children to toys and books based on their unique personality traits.  
Powered by a custom-trained OCEAN personality detection model and a clean, responsive Next.js frontend.

---

## ✨ Features

- 🧠 **OCEAN Trait Analyzer** – Accepts child behavior input and determines their dominant personality trait
- 🎁 **Gift Suggestions** – Provides tailored toy/book recommendations based on the trait
- 💻 **Minimalist UI** – Soft color scheme and layout designed to appeal to parents
- 🚀 **Deployed with Render + Vercel** – Fast API and frontend hosting on free plans

---

## 🧠 How It Works

1. Parents describe their child in a few sentences (e.g., "My child is curious and loves building things.")
2. The backend Flask API analyzes the text and predicts their personality traits (OCEAN model)
3. The site displays the **dominant trait**, an interpretation, and gift suggestions
4. Future: Traits will be used to filter actual Shopify products

---

## 🛠 Tech Stack

| Layer       | Tech                           |
|------------|----------------------------------|
| Frontend    | Next.js, Tailwind CSS           |
| Backend     | Flask (hosted on Render)        |
| Model       | Logistic Regression (TF-IDF, OCEAN traits) |
| Hosting     | Vercel (frontend), Render (API) |
| Tools       | GitHub, VS Code, Heroicons      |

---

