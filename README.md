# Bangladesh Civic Issues Tracker

Software Project Design and Development Lab Procject 
 - Course code : CSE 416

## Project run command Frontend
 - npm install 
 - npm run dev

## Project run command Backend
 - npm install 
 - npm run dev

[Civic Issues](https://civic-issues-fontend.vercel.app/)

## Bangladesh Civic Issues Tracker - User Manual

## Table of Contents
1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [User Guide](#user-guide)
4. [Admin Guide](#admin-guide)
5. [API Documentation](#api-documentation)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## Project Overview

The **Bangladesh Civic Issues Reporting Platform** is a community-driven web application that empowers citizens to report and track civic issues across Bangladesh. Users can report problems related to infrastructure, utilities, and public services, while administrators can manage, prioritize, and resolve these issues.

### Key Features

- **Issue Reporting**: Citizens can report civic issues with photos, descriptions, and location details
- **Issue Browsing**: View all reported issues with filtering and search capabilities
- **Real-time Updates**: Track issue status from submission to resolution
- **Image Gallery**: View multiple photos for each issue
- **Admin Dashboard**: Comprehensive management system for administrators
- **User Authentication**: Secure login and registration system
- **Role-based Access**: Different permission levels for users and admins
- **Mobile Responsive**: Fully responsive design for all devices

### Supported Issue Categories

- Road Issues (potholes, damaged roads, etc.)
- Electricity (power outages, damaged lines, etc.)
- Water Supply (leaks, low pressure, etc.)
- Waste Management (garbage collection, etc.)
- Drainage (blocked drains, flooding, etc.)
- Public Facilities (parks, streetlights, etc.)

---

## Getting Started

### System Requirements

- Node.js v16 or higher
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image storage)
- Modern web browser

### Installation

#### Backend Setup

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file with the following variables:
   \`\`\`env
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/civic-issues
   JWT_SECRET=your-secret-key
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ADMIN_EMAIL=admin@civicissues.gov.bd
   ADMIN_PASSWORD=admin123456
   \`\`\`

4. Start MongoDB:
   \`\`\`bash
   mongod
   \`\`\`

5. Start the backend server:
   \`\`\`bash
   npm start
   # or for development
   npm run dev
   \`\`\`

#### Frontend Setup

1. Navigate to the project root:
   \`\`\`bash
   cd ..
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:3000`

---

## User Guide

### Creating an Account

1. Click the **"Register"** button in the navigation menu
2. Fill in your details:
   - Full Name
   - Email Address
   - Password (minimum 8 characters)
   - Confirm Password
3. Click **"Create Account"**
4. Verify your email (if email verification is enabled)

### Logging In

1. Click the **"Login"** button in the navigation menu
2. Enter your email and password
3. Click **"Sign In"**
4. You'll be redirected to the home page

### Reporting an Issue

1. Click the **"Post an Issue"** button on the home page or navigate to `/report`
2. Fill in the issue details:
   - **Title**: Brief description of the issue
   - **Category**: Select from available categories
   - **Location**: Enter the specific location
   - **Description**: Detailed explanation of the problem
   - **Images**: Upload up to 5 photos (click to add multiple images)
3. Review your submission
4. Click **"Submit Report"**
5. Your issue will be assigned a unique ID and appear on the platform

### Browsing Issues

1. Navigate to the **"Browse Issues"** page
2. Use filters to narrow down results:
   - **Category**: Filter by issue type
   - **Status**: View pending, in-progress, or resolved issues
   - **Location**: Search by area
3. Click on any issue to view full details including:
   - Issue description
   - All uploaded images in a gallery
   - Current status
   - Comments and updates
   - Number of people affected

### Viewing Issue Details

1. Click on any issue from the browse page
2. View the complete information:
   - **Image Gallery**: Scroll through all photos
   - **Issue Description**: Full details of the problem
   - **Status**: Current progress
   - **Comments**: Community feedback and updates
   - **Voting**: Show support by voting on the issue

### Commenting on Issues

1. Navigate to an issue detail page
2. Scroll to the comments section
3. Enter your comment in the text field
4. Click **"Post Comment"**
5. Your comment will appear immediately

### Voting on Issues

1. On the issue detail page, click the **"Vote"** button
2. Your vote will be counted and displayed
3. This helps prioritize issues for resolution

### Managing Your Profile

1. Click your profile icon in the navigation menu
2. Select **"My Profile"**
3. Update your information:
   - Name
   - Email
   - Password
4. Click **"Save Changes"**

---

## Admin Guide

### Admin Login

1. Navigate to `/admin`
2. If not logged in, enter admin credentials:
   - Email: `admin@civicissues.gov.bd`
   - Password: `admin123456`
3. Click **"Login"**

### Admin Dashboard Overview

The admin dashboard provides access to:
- **Issues Management**: View and manage all reported issues
- **User Management**: Manage user accounts and permissions
- **Admin Management**: Add and manage admin accounts
- **Statistics**: View platform analytics and metrics

### Managing Issues

#### Viewing Issues

1. Go to the **"Issues"** section in the admin dashboard
2. View all reported issues in a table format
3. Use filters to find specific issues:
   - By status (Pending, In Progress, Resolved)
   - By category
   - By location
   - By date range

#### Updating Issue Status

1. Click on an issue to view details
2. In the issue details modal, click the **"Status"** dropdown
3. Select a new status:
   - **Pending**: Issue just reported
   - **In Progress**: Work has started
   - **Resolved**: Issue has been fixed
   - **Rejected**: Issue cannot be addressed
4. The status will update immediately

#### Viewing Issue Images

1. Open an issue detail modal
2. Scroll through the image gallery
3. Click on any image to view it in full size
4. Use navigation arrows to browse through images

### Managing Users

#### Viewing Users

1. Go to the **"Users"** section
2. View all registered users in a table
3. See user details:
   - Name
   - Email
   - Registration date
   - Number of issues reported
   - Account status

#### Deactivating Users

1. Find the user in the users list
2. Click the **"Deactivate"** button
3. Confirm the action
4. The user account will be disabled

#### Reactivating Users

1. Find the deactivated user
2. Click the **"Activate"** button
3. The user account will be re-enabled

### Managing Admins

#### Adding New Admins

1. Go to the **"Admins"** section
2. Click **"Add New Admin"** button
3. Fill in the admin details:
   - Name
   - Email
   - Role (Super Admin, Regional Admin, Department Admin, Moderator)
   - Department
   - Permissions (select which actions they can perform)
4. Click **"Create Admin"**
5. The new admin will receive login credentials

#### Editing Admin Permissions

1. Find the admin in the admins list
2. Click the **"Edit Permissions"** button
3. Update:
   - **Role**: Change admin role
   - **Department**: Assign to a department
   - **Permissions**: Select/deselect specific permissions
4. Click **"Save Changes"**

#### Removing Admins

1. Find the admin in the list
2. Click the **"Remove"** button
3. Confirm the action
4. The admin account will be deleted

### Admin Roles and Permissions

#### Super Admin
- Full access to all features
- Can manage all users and admins
- Can view all issues across all regions

#### Regional Admin
- Manage issues in assigned region
- Manage users in assigned region
- Cannot manage other admins

#### Department Admin
- Manage issues in assigned department
- View department-specific statistics
- Cannot manage users or other admins

#### Moderator
- Can update issue status
- Can moderate comments
- Cannot manage users or admins

### Dashboard Statistics

The admin dashboard displays:
- **Total Issues**: All reported issues
- **Pending Issues**: Issues awaiting action
- **Resolved Issues**: Successfully fixed issues
- **Active Users**: Currently registered users
- **Issues by Category**: Breakdown by type
- **Issues by Status**: Distribution of statuses
- **Recent Activity**: Latest updates and changes

---

## API Documentation

### Base URL
\`\`\`
http://localhost:5000/api
\`\`\`

### Authentication

All protected endpoints require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

### Endpoints

#### Authentication

**POST /auth/register**
- Register a new user
- Body: `{ email, password, name }`
- Returns: User object and JWT token

**POST /auth/login**
- Login user
- Body: `{ email, password }`
- Returns: User object and JWT token

**POST /auth/logout**
- Logout user
- Returns: Success message

#### Issues

**GET /issues**
- Get all issues
- Query params: `category`, `status`, `location`, `page`, `limit`
- Returns: Array of issues

**GET /issues/:id**
- Get specific issue
- Returns: Issue object with full details

**POST /issues**
- Create new issue (requires authentication)
- Body: `{ title, category, location, description, images }`
- Returns: Created issue object

**PUT /issues/:id**
- Update issue (admin only)
- Body: `{ status, notes }`
- Returns: Updated issue object

**DELETE /issues/:id**
- Delete issue (admin only)
- Returns: Success message

#### Comments

**GET /issues/:id/comments**
- Get comments for an issue
- Returns: Array of comments

**POST /issues/:id/comments**
- Add comment to issue (requires authentication)
- Body: `{ text }`
- Returns: Created comment object

#### Users

**GET /users/:id**
- Get user profile
- Returns: User object

**PUT /users/:id**
- Update user profile (requires authentication)
- Body: `{ name, email, password }`
- Returns: Updated user object

#### Admin

**GET /admin/statistics**
- Get dashboard statistics (admin only)
- Returns: Statistics object

**GET /admin/users**
- Get all users (admin only)
- Returns: Array of users

**GET /admin/admins**
- Get all admins (super admin only)
- Returns: Array of admins

---

## Troubleshooting

### Common Issues

#### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env` file
- Verify MongoDB is installed correctly

#### "Cloudinary upload failed"
- Verify Cloudinary credentials in `.env`
- Check internet connection
- Ensure image file size is under 5MB

#### "Login not working"
- Clear browser cookies and cache
- Verify email and password are correct
- Check if account is activated

#### "Images not showing in gallery"
- Verify Cloudinary is properly configured
- Check browser console for errors
- Ensure images were uploaded successfully

#### "Admin dashboard not accessible"
- Verify you're logged in as admin
- Check admin role and permissions
- Clear browser cache and try again

### Performance Issues

- **Slow page loading**: Clear browser cache, check internet speed
- **Images loading slowly**: Verify Cloudinary configuration
- **Database queries slow**: Check MongoDB indexes, consider pagination

### Mobile Issues

- **Menu not appearing**: Refresh page, check browser compatibility
- **Images not responsive**: Update browser, clear cache
- **Touch interactions not working**: Ensure JavaScript is enabled

---

## FAQ

### General Questions

**Q: Is this platform free to use?**
A: Yes, the platform is completely free for all citizens to report and view civic issues.

**Q: How long does it take to resolve an issue?**
A: Resolution time varies depending on the issue type and complexity. You can track progress on the issue detail page.

**Q: Can I report multiple issues?**
A: Yes, you can report as many issues as you encounter. Each report helps improve our community.

**Q: Is my personal information safe?**
A: Yes, we use industry-standard security measures to protect your data. Your information is never shared with third parties.

### Reporting Issues

**Q: What information should I include in my report?**
A: Include a clear title, detailed description, specific location, and photos if possible. More details help authorities respond faster.

**Q: Can I upload videos instead of photos?**
A: Currently, only photos are supported. You can upload up to 5 images per report.

**Q: Can I edit my report after submission?**
A: You can contact support to modify your report. Direct edits are not available to prevent misinformation.

**Q: What if I report an issue by mistake?**
A: Contact the support team with your issue ID, and we can help remove it.

### Account & Login

**Q: I forgot my password. How do I reset it?**
A: Click "Forgot Password" on the login page and follow the email instructions.

**Q: Can I have multiple accounts?**
A: One account per email address is recommended. Multiple accounts may be flagged as suspicious.

**Q: How do I delete my account?**
A: Contact support with your account details, and we can process the deletion.

### Admin Questions

**Q: How do I become an admin?**
A: Admins are appointed by the platform administrators. Contact support if you're interested.

**Q: What are the admin responsibilities?**
A: Admins review reports, update status, manage users, and ensure data quality on the platform.

**Q: Can I manage issues outside my assigned region?**
A: Permissions depend on your admin role. Regional admins can only manage their assigned region.

### Technical Support

**Q: Which browsers are supported?**
A: Chrome, Firefox, Safari, and Edge (latest versions). Mobile browsers are also fully supported.

**Q: Is there a mobile app?**
A: Currently, the platform is web-based and works on all mobile browsers. A dedicated app may be available in the future.

**Q: How do I report a bug?**
A: Contact support with details about the issue, including screenshots and steps to reproduce.

**Q: Is there an API for developers?**
A: Yes, see the API Documentation section above for details.

---

## Support

For additional help or questions:
- **Email**: support@civicissues.bd
- **Website**: [civicissues](https://civic-issues-fontend.vercel.app/)

---

**Last Updated**: October 2025
**Version**: 1.0
