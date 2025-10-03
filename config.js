// Configuration file for Edu-LearnAI
// This file contains default settings and environment variables

const config = {
    // OpenAI API settings
    openai: {
        model: 'gpt-3.5-turbo',
        maxTokens: 3000,
        temperature: 0.7,
        apiBaseUrl: 'https://api.openai.com/v1/chat/completions'
    },

    // Application settings
    app: {
        title: 'Edu-LearnAI - AI-Powered Course Generator',
        version: '1.0.0',
        author: 'Edu-LearnAI Team'
    },

    // UI settings
    ui: {
        loadingMessage: 'Generating your educational content...',
        disclaimer: 'This content is AI-generated and should be critically evaluated, fact-checked, and customized for your specific educational context before use.'
    },

    // Local storage keys
    storage: {
        apiKey: 'openai_api_key'
    }
};

// Export for use in other files
window.config = config;
