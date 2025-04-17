<h2 align="center">Backcourt | NBA Stats & News</h2>
<p align="center"><i>Repository for the Backcourt Frontend</i></p>

<div align="center">
  
![GitHub top language](https://img.shields.io/github/languages/top/kaikyMoura/Backcourt)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ce1f958181d743b98107dbc70dfac5ed)](https://app.codacy.com/gh/kaikyMoura/Backcourt/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
![Repository size](https://img.shields.io/github/repo-size/kaikyMoura/Backcourt)
![Github last commit](https://img.shields.io/github/last-commit/kaikyMoura/Backcourt)
![License](https://img.shields.io/aur/license/LICENSE)
![Languages count](https://img.shields.io/github/languages/count/kaikyMoura/Backcourt)

</div>

<br/>

### 1. About the Project
This project is the frontend implementation for the [Backcourt-api](https://github.com/kaikyMoura/Backcourt-api), wich collect and provide advanced basketball statistics from various online sources. The API fetches articles and data related to basketball using web scraping techniques, processes the extracted information, and serves it through RESTful endpoints. Also, it uses the nba_api retrieve official NBA statistics. 
The frontend is built with Next.js, TypeScript, and Tailwind CSS.

<br/>

### 2. Key Features
- Secure user authentication and login with tokens issued by the back-end.
- Access management using token-based authorization.
- News and articles display.
- Detailed player and team stats.
- Player and team comparison.
- Search for players and teams.
- Player and team profiles.
- Stats Analysis.
- Games Schedule.
<!-- - Live Scores.
- Live Game Stats.
- Live Game Lineups.
- Live Game Box Score. -->

<br/>

### 3. Technologies & Dependencies
<div display="inline-block" gap="6">
  <img alt="next-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
  <img alt="typescript-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
  <img alt="tailwindcss-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg" />
  <img alt="sass-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" />
  <img alt="react-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
</div> 


#### Main Dependencies:

- [axios](https://axios-http.com/docs/intro):  
  <br/>A promise-based HTTP client for making requests to APIs, supporting request/response interception and automatic transformations.

- [@emotion/react](https://emotion.sh/docs/introduction):  
  <br/>A library designed for writing CSS styles with JavaScript, providing powerful styling capabilities with high performance.

- [@emotion/styled](https://emotion.sh/docs/styled):  
  <br/>A flexible styling library that allows defining styles for components using template literals.

- [@giphy/js-fetch-api](https://github.com/giphy/js-fetch-api):
  <br/>A JavaScript library for fetching data from the Giphy API.

- [jest](https://jestjs.io/):  
  <br/>A powerful JavaScript testing framework focused on simplicity and efficiency, widely used for unit and integration testing.

- [js-cookie](https://github.com/js-cookie/js-cookie):  
  <br/>A simple JavaScript library for handling browser cookies with an easy-to-use API.

- [next.js](https://nextjs.org/):  
  <br/>A React framework for production, offering hybrid static and server rendering, route pre-fetching, and API routes.

- [react](https://react.dev/):  
  <br/>A JavaScript library for building user interfaces with a component-based architecture.

- [react-icons](https://react-icons.github.io/react-icons/):  
  <br/>A collection of popular icon libraries as React components, supporting FontAwesome, Material Icons, and more.

- [react-tooltip](https://react-tooltip.com/):  
  <br/>A library for creating customizable tooltips in React applications.

- [sass](https://sass-lang.com/):  
  <br/>A CSS preprocessor that adds features like variables, nested rules, and mixins to enhance styling.

- [scss](https://sass-lang.com/documentation/syntax#scss):  
  <br/>A syntax for Sass that is similar to CSS, providing additional features for styling.

- [tailwindcss](https://tailwindcss.com/):
  <br/>A utility-first CSS framework for rapidly creating custom user interfaces.

- [typescript](https://www.typescriptlang.org/):
  <br/>A typed superset of JavaScript that adds static typing and features like classes and interfaces.

<br/>


### 4. Architecture

The project follows a **modular architecture** with a clear separation of concerns, utilizing Next.js's built-in routing and API capabilities.

#### 📂 Project Structure:
- src/
  - components/ # Reusable UI components
      - Button/
        - index.tsx
        - Button.tsx
        - Button.module.scss
          
  - app/ # Next.js routing system
    - page.tsx # Landing page
    - login/
      - page.tsx # Login page
      - page.module.scss
        
  - hooks/ # Custom React hooks

  - lib/ # Utility functions

  - services/ # API and business logic
    - index.ts # Axios instance and request handlers
      
  - context/ # Global state management
    
  - utils/ # Helper functions
    
  - types/ # TypeScript interfaces and types
    - Player.ts
      
  - styles/ # Global styles
    - globals.css

<br/>
  
### 5. Installation and Setup

### Prerequisites:
Before running the project, ensure that **Node.js** is installed on your machine. If not, you can download it from the [official Node.js website](https://nodejs.org/en/) (LTS version recommended).

To verify your Node.js installation, run:

```console
node -v
npm -v
```

#### Clone the repository to your local machine:

```console
git clone https://github.com/kaikyMoura/BackCourt.git
```

Navigate to the project's root directory:

```console
cd BackCourt
```

### Installing dependencies:
Use npm or yarn to install the project dependencies:

```console
npm install
# or
pnpm install
# or
yarn install
```

#### Running the Application:
Once the dependencies are installed, you can start the development server with:

```console
npm run dev
# or
pnpm run dev
# or
yarn dev
```

#### The application will be available on:

```console
http://localhost:3000
```

<br/>

### 6. 🚀 Deploy
### Deployment on Vercel with Continuous Integration

The deployment of the project is done on **Vercel**, leveraging **Continuous Integration** for automatic builds and deployments. Any changes pushed to the repository on GitHub are automatically built and deployed to Vercel. 

#### Key Points:
- The project is automatically built and deployed whenever changes are pushed to the GitHub repository.
- **Environment Variables** are configured directly in the Vercel dashboard, ensuring seamless integration between build and deployment.
- **Custom Domain** can be configured for the deployed application, with automatic SSL certificate setup by Vercel.
  
The application is accessible via the unique Vercel-generated URL:

```bash
# https://backcourt.vercel.app
```

<br/>

### 7. Pages Documentation

|  Page |  Description |
| --- | --- |
|  `/registration`	 |  Register new user  |
|  `/login`  |	Authenticate and get token |
|  `/`  |  Main page  |
|  `/news`  |  Display news/articles  |
|  `/players`  |  Display players  |
|  `/players/[player_name]`  |  Display player info and stats  |
|  `/teams`  |  Display teams  |
|  `/games`  |  Display games  |
|  `/analytics`  |  Display analytics  |

> ⚠️ **Important**
> </br> When new pages are added, the path will be included in the documentation

<br/>

### 8. 📝 Terms of Use
- **Non-commercial** project.
- All rights related to user data and privacy are respected.
- This project aims to serve as a learning and portfolio tool.