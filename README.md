# 🚀 Intern Portal - Modern Donation Management System

A comprehensive React.js application for managing intern donations, tracking progress, and fostering community engagement through a modern, responsive interface.

![Intern Portal](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=Intern+Portal)

## 🎯 Core Features

- **User Dashboard** - Comprehensive overview of donations, rank, and progress
- **User Profile** - Detailed profile page with donation history and statistics
- **Leaderboard System** - Real-time ranking with bar graph visualization
- **Referral System** - Share referral codes with one-click copy functionality
- **Progress Tracking** - Milestone-based progress with visual indicators
- **Rewards System** - Achievement badges and unlockable rewards
- **User Dropdown Menu** - Profile access and sign out functionality
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## 📸 Screenshots

### 🏠 Dashboard
![Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Dashboard)
*Main dashboard with user statistics, progress tracking, and quick actions*

### 📊 Leaderboard
![Leaderboard](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Leaderboard)
*Interactive leaderboard with bar graph visualization of top performers*

### 🏆 Rewards Section
![Rewards](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Rewards+Section)
*Achievement system with progress tracking and unlockable rewards*

### 👤 User Profile
![Profile](https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Profile+Page)
*Comprehensive user profile with donation history and statistics*

## 🛠 Tech Stack

### Frontend
- **React.js 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **File System (fs)** - JSON data management

### Development Tools
- **npm** - Package manager
- **Git** - Version control
- **VS Code** - Recommended IDE

## 📁 Project Structure

```
internapp/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dashboard.js # Main dashboard component
│   │   │   ├── Leaderboard.js # Leaderboard component
│   │   │   ├── Login.js     # Login component
│   │   │   ├── Profile.js   # User profile component
│   │   │   └── Rewards.js   # Rewards component
│   │   ├── App.js           # Main app component with routing
│   │   ├── index.js         # Entry point
│   │   └── input.css        # Tailwind CSS imports
│   ├── package.json         # Frontend dependencies
│   └── README.md           # Frontend documentation
├── backend/                 # Node.js backend server
│   ├── data/               # JSON data files
│   │   ├── user.json       # User data
│   │   └── leaderboard.json # Leaderboard data
│   ├── server.js           # Express server with API endpoints
│   ├── package.json        # Backend dependencies
│   └── README.md          # Backend documentation
├── README.md              # This file
├── LICENSE                # MIT License
└── .gitignore            # Git ignore rules
```

## 🚀 Installation

### Prerequisites
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/internapp.git
cd internapp

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start the application
cd ../backend && node server.js
# In a new terminal
cd frontend && npm start
```

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/internapp.git
cd internapp
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 4: Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
node server.js
```
Server will start on `http://localhost:5000`

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm start
```
Application will open on `http://localhost:3000`

## 🎮 Usage

### 🏠 Dashboard
- View your donation statistics and current rank
- Track progress towards next milestone
- Access your referral code with one-click copy
- Navigate to leaderboard and other sections
- User dropdown menu with profile access and sign out

### 📊 Leaderboard
- View top performers with bar graph visualization
- See your current position and ranking
- Track overall statistics and trends
- Compare your performance with others

### 🏆 Rewards
- View available achievement badges
- Track progress towards unlockable rewards
- See milestone targets and current progress

### 👤 Profile
- View detailed user information and statistics
- See comprehensive donation history with categories
- Access referral code with copy functionality
- Track monthly donation trends
- View rank and achievement badges

### 🔐 Login
- Secure authentication system
- Form validation and error handling
- Responsive design for all devices

## 🔌 API Documentation

### Endpoints

#### GET `/api/user`
Returns current user data
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "referralCode": "REF123456",
  "totalDonations": 18500,
  "rank": 5,
  "referrals": 15,
  "thisMonth": 3200,
  "lastMonth": 2800
}
```

#### GET `/api/leaderboard`
Returns leaderboard data
```json
[
  {
    "name": "Top Performer",
    "amount": 25000,
    "referrals": 25,
    "rank": 1
  }
]
```

#### POST `/api/reload-data`
Reloads data from JSON files (for development)

#### GET `/api/health`
Returns server status and data source information

## 🎯 Key Features Explained

### 📱 Responsive Design
- **Mobile-First Approach**: Designed for mobile devices first
- **Flexible Grid System**: Adapts to different screen sizes
- **Touch-Optimized**: Large touch targets for mobile users
- **Progressive Enhancement**: Works on all devices
- **Mobile Navigation**: Optimized dropdown menus and tables

### 👤 User Experience
- **Profile Management**: Complete user profile with donation history
- **Easy Navigation**: Intuitive routing between pages
- **Quick Actions**: One-click copy and share functionality
- **Visual Feedback**: Loading states and hover effects

### 🎨 Modern UI Components
- **Gradient Backgrounds**: Beautiful visual appeal
- **Card-Based Layout**: Clean, organized information display
- **Interactive Elements**: Hover effects and animations
- **Color-Coded System**: Visual hierarchy and status indicators
- **User Dropdown Menu**: Profile access and sign out functionality
- **Responsive Tables**: Mobile-friendly data display

### 📊 Data Visualization
- **Bar Graph Leaderboard**: Visual representation of rankings
- **Progress Bars**: Track milestone progress
- **Rank Badges**: Quick visual rank identification
- **Statistics Cards**: Key metrics at a glance
- **Donation History Table**: Detailed transaction records
- **Profile Avatar**: Large user representation with rank badge

### 🔄 Real-Time Updates
- **Dynamic Data Loading**: Fetch data from backend APIs
- **Error Handling**: Graceful error states and retry mechanisms
- **Loading States**: Visual feedback during data fetching
- **Hot Reload**: Data updates without page refresh

### 🔐 Security Features
- **Form Validation**: Client-side input validation
- **Error Boundaries**: Graceful error handling
- **Secure Routing**: Protected route access
- **Data Sanitization**: Input cleaning and validation

## 🛠 Development

### Available Scripts

**Frontend:**
```bash
npm start          # Start development server
npm test           # Run tests
npm run build      # Build for production
npm run eject      # Eject from Create React App
```

**Backend:**
```bash
node server.js     # Start development server
```

### Code Structure

#### Frontend Components
- **Dashboard.js**: Main dashboard with user stats and progress
- **Leaderboard.js**: Leaderboard with bar graph visualization
- **Profile.js**: User profile with donation history
- **Login.js**: Authentication form
- **Rewards.js**: Achievement and rewards system

#### Backend Structure
- **server.js**: Express server with API endpoints
- **data/**: JSON files for mock data
  - **user.json**: User information
  - **leaderboard.json**: Leaderboard data

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Custom Components**: Reusable UI components
- **Theme Consistency**: Unified design system

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Kill process on port 5000
npx kill-port 5000
```

#### Module Not Found
```bash
# Clear npm cache
npm cache clean --force
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### CORS Issues
- Ensure backend server is running on port 5000
- Check that CORS is properly configured in server.js
- Verify API endpoints are accessible

#### Data Not Loading
- Check backend server status at `http://localhost:5000/api/health`
- Verify JSON files exist in `backend/data/`
- Check browser console for API errors

### Performance Optimization
- **Code Splitting**: Lazy load components
- **Image Optimization**: Compress and optimize images
- **Bundle Analysis**: Monitor bundle size
- **Caching**: Implement proper caching strategies

## 🤝 Contributing

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- **Code Style**: Follow existing code conventions
- **Testing**: Write tests for new features
- **Documentation**: Update README for new features
- **Performance**: Optimize for speed and efficiency

### Code Review Process
1. **Automated Checks**: CI/CD pipeline validation
2. **Manual Review**: Code review by maintainers
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update relevant documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Express.js** - For the web application framework
- **Open Source Community** - For inspiration and support

## 📞 Support

### Getting Help
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Documentation**: Check this README and component files
- **Community**: Join our community channels

### Contact Information
- **Email**: support@internapp.com
- **GitHub**: [github.com/yourusername/internapp](https://github.com/yourusername/internapp)
- **Documentation**: [docs.internapp.com](https://docs.internapp.com)

---

**Made with ❤️ by the Intern Portal Team**

*Empowering interns through modern technology and community engagement* 