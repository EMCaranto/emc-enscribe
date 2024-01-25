# Enscribe

**Enscribe** is a Notion clone built with the latest Next.js, featuring Shadcn UI for pre-built components, Blocknote for the text editor, Convex for database storage, Clerk for authentication, Tailwind for UI styling, Zustand for state management, Sonner for toast messages, and various other libraries and tools.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Learn More](#learn-more)
- [Deployed on Vercel](#deployed-on-vercel)
- [Live Website](#live-website-vercel)

## Features

- **Notion-like Interface:** Enjoy a user-friendly interface inspired by Notion.
- **Shadcn UI Components:** Leverage pre-built UI components for a consistent design.
- **Blocknote Text Editor:** Utilize Blocknote for a robust text editing experience.
- **Convex Database Storage:** Securely store your data with Convex.
- **Clerk Authentication:** Implement user authentication seamlessly with Clerk.
- **Tailwind Styling:** Customize the UI using the popular Tailwind CSS framework.
- **Zustand State Management:** Manage your application state efficiently with Zustand.
- **Sonner Toast Messages:** Provide users with informative toast messages using Sonner.
- **Emoji Picker React:** Enhance user interaction with an emoji picker.
- **React Dropzone and React Textarea Autosize:** Improve file uploading and text area resizing functionalities.
- **Use Hooks TypeScript:** Leverage TypeScript and custom hooks for enhanced development.

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/your-username/enscribe.git
 cd enscribe
```

2. Install dependencies:

```bash
 npm install
```

3. Set up your environment varialbles:

- Duplicate the `.env.local` file and rename it to `.env`.
- Fill in the required variables such as API keys, database connection strings, etc.

This is the list of variables used on env:

- CONVEX_DEPLOYMENT =
- NEXT_PUBLIC_CONVEX_URL =
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
- CLERK_SECRET_KEY =
- CLERK_JWT_ISSUER_DOMAIN =
- EDGE_STORE_ACCESS_KEY =
- EDGE_STORE_SECRET_KEY =

4. Run the application and also run the convex on separate terminal:

```bash
npm run dev
```

```bash
npx convex dev
```

Visit http://localhost:3000 to see Enscribe in action!

## Usage

- **Authentication** :
  - Users can sign up, log in, and log out securely using Clerk.
- **Creating Notes** :
  - Utilize the Blocknote text editor to create and edit notes.
- **UI Customization** :
  - Tailwind CSS allows you to customize the UI to fit your preferences.
- **Toasts and Notifications** :
  - Sonner is integrated for displaying toast messsages.

## Technologies Used

- [Next JS](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [BlockNote](https://www.blocknotejs.org/)
- [Convex](https://www.convex.dev/)
- [Clerk](https://clerk.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Sonner](https://sonner.emilkowal.ski/)
- [Emoji Picker React](https://github.com/ealush/emoji-picker-react)
- [React Textarea Autosize](https://github.com/Andarist/react-textarea-autosize)
- [Use Hooks TS](https://usehooks-ts.com/)
- [Lucide React](https://lucide.dev/)
- [Open Doodles](https://www.opendoodles.com/)

## Learn More

To learn more about Next.js take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployed on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Live Website (Vercel)

This is the link of my website: [Enscribe](https://enscribe.vercel.app/)
