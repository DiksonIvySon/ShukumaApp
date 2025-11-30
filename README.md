# Shukuma - Body Weight Fitness App

A modern, full-stack fitness app featuring a 52-card deck of body-weight exercises with video tutorials, progress tracking, and challenge system.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: SQLite (development) / PostgreSQL (production)
- **Deployment**: Render.com

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:
\`\`\`bash
git clone <repo-url>
cd shukuma
\`\`\`

2. Install dependencies:
\`\`\`bash
npm run install-all
\`\`\`

3. Start development servers:
\`\`\`bash
npm run dev
\`\`\`

Frontend will run on `http://localhost:3000`
Backend will run on `http://localhost:5000`

### Project Structure

\`\`\`
shukuma/
├── backend/                 # Express.js server
│   ├── src/
│   │   ├── server.js       # Server entry point
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & utilities
│   │   ├── db/             # Database setup
│   │   └── data/           # Card data
│   └── package.json
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── pages/          # React pages
│   │   ├── components/     # Reusable components
│   │   ├── lib/            # Utilities & API
│   │   └── index.css       # Styles
│   └── package.json
└── README.md
\`\`\`

## Features

- **52-Card Deck**: Randomized body-weight exercises with illustrations
- **Flip Cards**: Interactive 3D card flipping UI
- **Video Tutorials**: Demo videos for each exercise
- **Workout Tracking**: Log completed workouts and monitor stats
- **Progress Dashboard**: Weekly activity charts and personal records
- **Challenges**: Create and track fitness goals
- **User Authentication**: Secure JWT-based auth

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Render deployment instructions.

## API Documentation

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Login

### Workouts
- `GET /api/workouts/cards` - Get all exercise cards
- `GET /api/workouts/random` - Get random card
- `POST /api/workouts/complete` - Log completed workout
- `GET /api/workouts/history` - Get user's workout history

### Progress
- `GET /api/progress/stats` - Get user stats
- `GET /api/progress/weekly` - Get weekly breakdown

### Challenges
- `GET /api/challenges` - Get active challenges
- `POST /api/challenges/create` - Create new challenge
- `PUT /api/challenges/:id/progress` - Update challenge progress

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.
