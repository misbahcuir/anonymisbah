# AnonyMisbah - Anonymous Quote Platform

A modern web application that allows users to submit anonymous quotes and receive thoughtful responses. Built with Next.js, MongoDB, and Resend for email notifications.

## 🌟 Features

### For Users

- **Anonymous Quote Submission**: Submit quotes anonymously without revealing your identity
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Real-time Feedback**: Instant success/error notifications
- **Mobile-Friendly**: Optimized for all device sizes

### For Administrators

- **Dashboard Management**: View, edit, and manage all submitted quotes
- **Publish Control**: Choose which quotes to publish publicly
- **Email Notifications**: Receive instant email alerts for new submissions
- **Reply System**: Add thoughtful responses to anonymous quotes
- **Delete Functionality**: Remove inappropriate or outdated quotes

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Email Service**: Resend
- **UI Components**: DaisyUI, Framer Motion
- **Icons**: Next Icons, React Icons
- **Notifications**: React Hot Toast, Sonner

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Resend account for email notifications

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd anonymisbah
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   DB_URI=your_mongodb_connection_string
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
anonymisbah/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── quotes/          # Quote CRUD operations
│   │   │   ├── singleQoute/     # Single quote operations
│   │   │   └── test-email/      # Email testing endpoint
│   │   ├── components/
│   │   │   ├── hero.jsx         # Main submission form
│   │   │   ├── quote.jsx        # Individual quote display
│   │   │   ├── quoteModal.jsx   # Edit quote modal
│   │   │   └── ...              # Other UI components
│   │   ├── dashboard/
│   │   │   └── page.jsx         # Admin dashboard
│   │   ├── lib/
│   │   │   ├── db.js            # MongoDB connection
│   │   │   ├── getQuotes.js     # Server-side quote fetching
│   │   │   ├── getQuotesClient.js # Client-side quote fetching
│   │   │   └── ...              # Other utility functions
│   │   └── page.jsx             # Homepage
│   └── ReactBits/               # Custom React components
├── public/
│   └── fonts/                   # Custom fonts
└── package.json
```

## 🔧 Configuration

### Environment Variables

| Variable         | Description                            | Required |
| ---------------- | -------------------------------------- | -------- |
| `DB_URI`         | MongoDB connection string              | Yes      |
| `RESEND_API_KEY` | Resend API key for email notifications | Yes      |

### Database Setup

1. Create a MongoDB database named `anonymisbah`
2. Create a collection named `quotes`
3. The collection will store documents with the following structure:
   ```json
   {
     "id": 1,
     "question": "Anonymous quote text",
     "reply": "Admin response",
     "published": true,
     "submissionTime": "2024-01-01T00:00:00.000Z"
   }
   ```

## 📧 Email Configuration

The application uses Resend for email notifications:

1. **Sign up** at [resend.com](https://resend.com)
2. **Get your API key** from the dashboard
3. **Add the API key** to your environment variables
4. **Verify your domain** in Resend (optional but recommended)

### Email Testing

Test your email configuration by visiting:

```
https://your-domain.com/api/test-email
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in Vercel dashboard:
   - `DB_URI`
   - `RESEND_API_KEY`
3. **Deploy** - Vercel will automatically build and deploy your app

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**
- **Railway**
- **Render**
- **DigitalOcean App Platform**

## 🔍 API Endpoints

### Quotes

- `GET /api/quotes` - Get all quotes
- `GET /api/quotes?published=true` - Get only published quotes
- `POST /api/quotes` - Submit a new quote

### Single Quote

- `GET /api/singleQoute/[id]` - Get a specific quote
- `PUT /api/singleQoute/[id]` - Update a quote

### Email Testing

- `GET /api/test-email` - Test email configuration

## 🎨 Customization

### Styling

- The app uses Tailwind CSS with DaisyUI
- Custom fonts are stored in `public/fonts/`
- Color scheme is amber/orange themed

### Components

- Custom React components are in `ReactBits/`
- Reusable UI components are in `src/app/components/`

## 🐛 Troubleshooting

### Common Issues

1. **Quotes not showing on homepage**
   - Check if `DB_URI` is properly configured
   - Verify database connection in deployment logs

2. **Emails not being sent**
   - Verify `RESEND_API_KEY` is set correctly
   - Test email endpoint: `/api/test-email`
   - Check deployment logs for email errors

3. **Database connection issues**
   - Ensure MongoDB connection string is correct
   - Check if database and collection exist
   - Verify network connectivity in deployment environment

### Debug Mode

Enable detailed logging by checking the browser console and deployment logs for error messages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS and DaisyUI
- Email service powered by Resend
- Database hosted on MongoDB

---

**AnonyMisbah** - Where anonymous thoughts find thoughtful responses.
