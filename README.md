# 📝 Subtitle Translator

A modern, web-based subtitle translator powered by Google's Gemini AI. Translate your SRT subtitle files between 20+ languages with real-time preview and streaming translation.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.2.1-61dafb.svg)

## ✨ Features

- 🌍 **20+ Languages** - Support for major languages including English, Spanish, French, German, Arabic, Persian, Chinese, Japanese, and more
- 🔄 **Real-Time Translation** - See translations appear progressively as they complete
- 📊 **Live Preview** - Dual text areas showing source and translated subtitles side by side
- ⚡ **Smart Processing** - Intelligent chunking and rate limiting for optimal performance
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 🌐 **Multi-Language Interface** - Available in English and Persian (فارسی) with RTL support
- 🔒 **Secure** - Your API key is stored locally in your browser
- 💾 **Instant Download** - Download translated SRT files with one click
- ⚙️ **Customizable** - Adjust translation prompts, chunk size, and request delays

## 🚀 Quick Start

### Prerequisites

- A Google account
- A free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alifallahrn/subtitle-translator.git
cd subtitle-translator
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:3000/subtitle-translator/ in your browser

5. Go to Settings and add your Gemini API key

6. Start translating!

## 📦 Deployment

### GitHub Pages

This project is configured for easy deployment to GitHub Pages:

1. Update `vite.config.js` and change the `base` path to match your repository name:
```javascript
base: '/your-repo-name/',
```

2. Build and deploy:
```bash
npm run deploy
```

3. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: `gh-pages` branch
   - Save

Your app will be live at: `https://yourusername.github.io/your-repo-name/`

For detailed deployment instructions, see [GITHUB_PAGES_DEPLOY.md](GITHUB_PAGES_DEPLOY.md)

## 🎯 How to Use

1. **Get Your API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key (it's free!)
   - Copy the key

2. **Configure Settings**
   - Click the ⚙️ Settings button
   - Paste your API key
   - (Optional) Customize translation prompt and parameters
   - Save settings

3. **Translate Subtitles**
   - Click "Upload SRT File" and select your subtitle file
   - Choose source language (or use Auto Detect)
   - Select target language
   - Click "Translate"
   - Watch the translation progress in real-time
   - Download the translated file

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2.1
- **Build Tool**: Vite 7.2.7
- **AI API**: Google Generative AI (Gemini)
- **Styling**: Pure CSS3 with modern gradients
- **State Management**: React Hooks
- **Storage**: Browser LocalStorage
- **Deployment**: GitHub Pages

## 📝 Supported Languages

Auto Detect, English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese (Simplified), Arabic, Hindi, Turkish, Dutch, Polish, Swedish, Persian, Thai, Vietnamese

## ⚙️ Configuration

### Translation Settings

You can customize these in the Settings page:

- **API Key**: Your Gemini API key (required)
- **Prompt Pattern**: Template for translation requests
- **Request Delay**: Delay between API calls (500-10000ms)
- **Chunk Size**: Number of subtitles per request (1-20)
- **Interface Language**: English or Persian

### Environment Variables

Create a `.env` file for local development:

```bash
VITE_DONATE_URL=https://your-donation-link.com  # Optional
```

## 🔒 Security & Privacy

- ✅ Your API key is stored **only in your browser** (LocalStorage)
- ✅ No backend server - all processing is client-side
- ✅ Direct communication with Google's Gemini API
- ✅ No data is sent to any third-party servers
- ✅ Open source - you can verify the code yourself

## 📖 Documentation

- [GitHub Pages Deployment Guide](GITHUB_PAGES_DEPLOY.md) - Complete deployment instructions
- [Sample SRT File](sample.srt) - Test subtitle file included

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for the translation API
- The React team for the amazing framework
- Vite for the blazing fast build tool

## 💬 Support

If you have any questions or issues, please open an issue on GitHub.

## ⭐ Star this repo

If you find this project useful, please consider giving it a star! It helps others discover the project.

---

**Made with ❤️ for subtitle enthusiasts worldwide**
