# Edu-LearnAI

🎓 **AI-Powered Educational Content Generator**

Edu-LearnAI is a comprehensive web-based tool that leverages OpenAI's GPT models to generate complete educational packages for any course. Simply enter a course title and get professionally structured course content including objectives, syllabus, learning outcomes aligned with Bloom's Taxonomy, assessments, and recommended readings.

## ✨ Features

- **🎯 Course Objectives**: Generate clear, focused course objectives
- **📚 Detailed Syllabus**: Get comprehensive course outlines with 6-8 main topics
- **🧠 Bloom's Taxonomy Learning Outcomes**: 
  - Knowledge (Remember/Understand)
  - Comprehension (Explain/Interpret) 
  - Application (Use/Implement)
- **📝 Assessment Suggestions**: Receive 4-5 varied assessment methods
- **📖 Reading Recommendations**: Get curated list of relevant resources
- **📋 Copy Functionality**: Copy individual sections or entire content
- **🔒 Secure**: API keys stored locally, never sent to external servers
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/RoushniSinha/Edu-LearnAI.git
   cd Edu-LearnAI
   ```

2. **Open in browser**:
   - Simply open `index.html` in your web browser
   - Or serve using a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have serve installed)
     npx serve .
     ```

3. **Access the application**:
   - Direct file: `file:///path/to/Edu-LearnAI/index.html`
   - Local server: `http://localhost:8000`

## 🛠️ Usage

1. **Enter your OpenAI API Key**:
   - Your API key is stored securely in your browser's local storage
   - It's never transmitted to any server except OpenAI's API

2. **Input Course Title**:
   - Enter any course title (e.g., "Introduction to Machine Learning")
   - Be specific for better results

3. **Generate Content**:
   - Click "Generate Course Content"
   - Wait 30-60 seconds for AI to generate comprehensive content

4. **Review and Copy**:
   - Review all generated sections
   - Copy individual sections or entire content
   - Critically evaluate and customize content for your context

## 🏗️ Project Structure

```
Edu-LearnAI/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality and OpenAI integration
├── README.md           # Project documentation
└── .gitignore         # Git ignore patterns
```

## 🔧 Technical Details

### Architecture
- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript
- **API Integration**: OpenAI GPT-3.5-turbo model
- **Storage**: Local storage for API key persistence
- **Styling**: Responsive CSS Grid and Flexbox layout

### Key Components

1. **HTML Structure** (`index.html`):
   - Semantic HTML5 elements
   - Accessible form inputs
   - Progressive disclosure UI patterns

2. **Styling** (`styles.css`):
   - Mobile-first responsive design
   - CSS Grid for content layout
   - Custom animations and transitions
   - Dark/light compatible color scheme

3. **JavaScript Logic** (`script.js`):
   - ES6+ class-based architecture
   - Async/await for API calls
   - Error handling and user feedback
   - Content parsing and formatting

### API Integration

The application uses OpenAI's Chat Completions API with:
- **Model**: GPT-3.5-turbo
- **Max Tokens**: 3000
- **Temperature**: 0.7 (balanced creativity/consistency)
- **System Prompt**: Specialized for educational content generation

## ⚠️ Important Notes

### Content Evaluation
🔍 **Always critically evaluate AI-generated content**:
- Fact-check all information
- Ensure content aligns with your educational standards
- Customize for your specific audience and context
- Verify reading recommendations and resources

### API Key Security
🔐 **Your API key is secure**:
- Stored only in your browser's local storage
- Never transmitted to our servers
- Used only for direct communication with OpenAI
- You can clear it anytime from browser settings

### Rate Limits
⏱️ **Be mindful of OpenAI rate limits**:
- Free tier has usage restrictions
- Consider upgrading for heavy usage
- Generation typically takes 30-60 seconds

## 🎨 Customization

### Styling
Modify `styles.css` to customize:
- Color scheme (CSS custom properties)
- Typography and fonts
- Layout and spacing
- Responsive breakpoints

### Content Generation
Modify `script.js` to adjust:
- OpenAI model parameters
- Prompt engineering
- Content parsing logic
- UI behavior

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**:
   - Verify your OpenAI API key is correct
   - Check if you have sufficient credits
   - Ensure API key has proper permissions

2. **Content Not Generating**:
   - Check internet connection
   - Verify API key is entered correctly
   - Try a more specific course title

3. **Formatting Issues**:
   - Content parsing depends on consistent AI output
   - Some variation in formatting is normal
   - Copy and manually format if needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Review OpenAI API documentation

## 🔮 Future Enhancements

- [ ] Support for different AI models (GPT-4, Claude, etc.)
- [ ] Export to various formats (PDF, Word, etc.)
- [ ] Template customization
- [ ] Batch processing for multiple courses
- [ ] Integration with Learning Management Systems
- [ ] Collaborative editing features

---

**Made with ❤️ for educators worldwide**
