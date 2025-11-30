# Shukuma Deployment Guide (Render.com)

## Prerequisites
- GitHub account with this repository pushed
- Render.com account (free tier available)

## Deployment Steps

### 1. Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

### 2. Deploy Backend on Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Fill in:
   - **Name**: `shukuma-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add Environment Variables:
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `JWT_SECRET`: (generate a strong secret or use Render's auto-generate)
6. Click "Create Web Service"

### 3. Deploy Frontend on Render

1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Fill in:
   - **Name**: `shukuma-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://shukuma-backend.onrender.com/api` (replace with your backend URL)
5. Click "Create Static Site"

### 4. Configure CORS

Make sure your backend CORS is configured correctly. In `backend/src/server.js`:
\`\`\`javascript
app.use(cors({
  origin: ['https://shukuma-frontend.onrender.com', 'http://localhost:3000'],
  credentials: true
}))
\`\`\`

### 5. Database Persistence

By default, SQLite database is stored in memory on Render. For production:
- Upgrade to Render's Postgres database
- Or use a free PostgreSQL on Railway/Supabase
- Or store database on a persistent volume

### 6. Monitor & Debug

1. Go to your service dashboard on Render
2. Check "Logs" for any errors
3. Monitor "Metrics" for performance

## Environment Variables Needed

**Backend (.env)**:
- `PORT=5000`
- `NODE_ENV=production`
- `JWT_SECRET=your-secret-key`
- `DATABASE_URL=postgresql://...` (if using PostgreSQL)

**Frontend (.env.production)**:
- `REACT_APP_API_URL=https://your-backend-url.onrender.com/api`

## Cost
- **Free Tier**: Backend and Frontend each get 0.5 CPU, 0.5 GB RAM (will spin down after 15 min of inactivity)
- **Hobby Plan**: $7/month per service (always on, good for development)

## Troubleshooting

### CORS Errors
- Check that frontend URL matches CORS origin in backend
- Ensure `credentials: true` if needed

### Database Issues
- SQLite may not persist on Render; consider upgrading to PostgreSQL
- Check file permissions

### Build Failures
- Check logs for specific errors
- Ensure all dependencies are in package.json
- Verify build commands are correct

## Next Steps

1. Add actual database (PostgreSQL)
2. Setup custom domain
3. Add SSL certificate
4. Monitor performance and errors
5. Setup backup strategy
