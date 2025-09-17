class EduLearnAI {
    constructor() {
        this.apiKey = localStorage.getItem('openai_api_key') || '';
        this.initializeElements();
        this.bindEvents();
        this.loadSavedApiKey();
    }

    initializeElements() {
        // Form elements
        this.courseTitleInput = document.getElementById('courseTitle');
        this.apiKeyInput = document.getElementById('apiKey');
        this.generateBtn = document.getElementById('generateBtn');
        this.copyAllBtn = document.getElementById('copyAllBtn');
        this.retryBtn = document.getElementById('retryBtn');

        // State containers
        this.loadingState = document.getElementById('loadingState');
        this.resultsSection = document.getElementById('resultsSection');
        this.errorState = document.getElementById('errorState');
        this.errorMessage = document.getElementById('errorMessage');

        // Content containers
        this.courseObjective = document.getElementById('courseObjective');
        this.courseSyllabus = document.getElementById('courseSyllabus');
        this.knowledgeOutcome = document.getElementById('knowledgeOutcome');
        this.comprehensionOutcome = document.getElementById('comprehensionOutcome');
        this.applicationOutcome = document.getElementById('applicationOutcome');
        this.suggestedAssessments = document.getElementById('suggestedAssessments');
        this.recommendedReadings = document.getElementById('recommendedReadings');

        // Notification
        this.copyNotification = document.getElementById('copyNotification');
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.generateCourseContent());
        this.copyAllBtn.addEventListener('click', () => this.copyAllContent());
        this.retryBtn.addEventListener('click', () => this.generateCourseContent());
        
        // Copy section buttons
        document.querySelectorAll('.copy-section-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.dataset.section || e.target.parentElement.dataset.section;
                this.copySectionContent(section);
            });
        });

        // Save API key on input
        this.apiKeyInput.addEventListener('input', () => {
            this.apiKey = this.apiKeyInput.value;
            localStorage.setItem('openai_api_key', this.apiKey);
        });

        // Enter key support
        this.courseTitleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generateCourseContent();
            }
        });
    }

    loadSavedApiKey() {
        if (this.apiKey) {
            this.apiKeyInput.value = this.apiKey;
        }
    }

    showState(state) {
        // Hide all states
        this.loadingState.classList.add('hidden');
        this.resultsSection.classList.add('hidden');
        this.errorState.classList.add('hidden');

        // Show requested state
        if (state === 'loading') {
            this.loadingState.classList.remove('hidden');
        } else if (state === 'results') {
            this.resultsSection.classList.remove('hidden');
        } else if (state === 'error') {
            this.errorState.classList.remove('hidden');
        }
    }

    validateInputs() {
        const courseTitle = this.courseTitleInput.value.trim();
        const apiKey = this.apiKeyInput.value.trim();

        if (!courseTitle) {
            throw new Error('Please enter a course title');
        }

        if (!apiKey) {
            throw new Error('Please enter your OpenAI API key');
        }

        if (courseTitle.length < 3) {
            throw new Error('Course title must be at least 3 characters long');
        }

        return { courseTitle, apiKey };
    }

    async generateCourseContent() {
        try {
            const { courseTitle, apiKey } = this.validateInputs();
            
            this.generateBtn.disabled = true;
            this.showState('loading');

            const content = await this.callOpenAI(courseTitle, apiKey);
            this.displayResults(content);
            this.showState('results');

        } catch (error) {
            console.error('Error generating content:', error);
            this.errorMessage.textContent = error.message;
            this.showState('error');
        } finally {
            this.generateBtn.disabled = false;
        }
    }

    async callOpenAI(courseTitle, apiKey) {
        const prompt = this.buildPrompt(courseTitle);
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert educational content developer specializing in curriculum design and Bloom\'s Taxonomy. Provide comprehensive, well-structured educational content.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 3000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
        }

        const data = await response.json();
        return this.parseOpenAIResponse(data.choices[0].message.content);
    }

    buildPrompt(courseTitle) {
        return `Create a comprehensive educational package for the course: "${courseTitle}"

Please provide the following components in a structured format:

1. COURSE_OBJECTIVE: A clear, concise course objective (2-3 sentences)

2. SYLLABUS: A detailed course syllabus with 6-8 main topics/modules

3. LEARNING_OUTCOMES: Three specific learning outcomes aligned with Bloom's Taxonomy:
   - KNOWLEDGE: What students will know (remember/understand)
   - COMPREHENSION: What students will comprehend (explain/interpret)
   - APPLICATION: What students will be able to apply (use/implement)

4. ASSESSMENTS: 4-5 suggested assessment methods with brief descriptions

5. READINGS: 6-8 recommended readings (books, articles, resources) with authors if applicable

Format your response with clear section headers exactly as shown above (COURSE_OBJECTIVE:, SYLLABUS:, etc.) to ensure proper parsing.`;
    }

    parseOpenAIResponse(content) {
        const sections = {
            objective: '',
            syllabus: '',
            knowledge: '',
            comprehension: '',
            application: '',
            assessments: '',
            readings: ''
        };

        // Split content by section headers
        const objectiveMatch = content.match(/COURSE_OBJECTIVE:\s*([\s\S]*?)(?=SYLLABUS:|$)/i);
        if (objectiveMatch) sections.objective = objectiveMatch[1].trim();

        const syllabusMatch = content.match(/SYLLABUS:\s*([\s\S]*?)(?=LEARNING_OUTCOMES:|$)/i);
        if (syllabusMatch) sections.syllabus = syllabusMatch[1].trim();

        const knowledgeMatch = content.match(/KNOWLEDGE:\s*([\s\S]*?)(?=COMPREHENSION:|$)/i);
        if (knowledgeMatch) sections.knowledge = knowledgeMatch[1].trim();

        const comprehensionMatch = content.match(/COMPREHENSION:\s*([\s\S]*?)(?=APPLICATION:|$)/i);
        if (comprehensionMatch) sections.comprehension = comprehensionMatch[1].trim();

        const applicationMatch = content.match(/APPLICATION:\s*([\s\S]*?)(?=ASSESSMENTS:|$)/i);
        if (applicationMatch) sections.application = applicationMatch[1].trim();

        const assessmentsMatch = content.match(/ASSESSMENTS:\s*([\s\S]*?)(?=READINGS:|$)/i);
        if (assessmentsMatch) sections.assessments = assessmentsMatch[1].trim();

        const readingsMatch = content.match(/READINGS:\s*([\s\S]*?)$/i);
        if (readingsMatch) sections.readings = readingsMatch[1].trim();

        // Fallback parsing if specific sections aren't found
        if (!sections.objective && !sections.syllabus) {
            // Simple fallback - split by common patterns
            const lines = content.split('\n').filter(line => line.trim());
            sections.objective = lines.slice(0, 3).join(' ');
            sections.syllabus = lines.slice(3).join('\n');
        }

        return sections;
    }

    displayResults(content) {
        this.courseObjective.innerHTML = this.formatContent(content.objective);
        this.courseSyllabus.innerHTML = this.formatContent(content.syllabus);
        this.knowledgeOutcome.innerHTML = this.formatContent(content.knowledge);
        this.comprehensionOutcome.innerHTML = this.formatContent(content.comprehension);
        this.applicationOutcome.innerHTML = this.formatContent(content.application);
        this.suggestedAssessments.innerHTML = this.formatContent(content.assessments);
        this.recommendedReadings.innerHTML = this.formatContent(content.readings);
    }

    formatContent(text) {
        if (!text) return '<p><em>Content not available</em></p>';
        
        // Convert numbered lists
        text = text.replace(/(\d+\.\s)/g, '<br>$1');
        
        // Convert bullet points
        text = text.replace(/([•-]\s)/g, '<br>$1');
        
        // Convert line breaks to HTML
        text = text.replace(/\n/g, '<br>');
        
        // Remove multiple consecutive breaks
        text = text.replace(/(<br>\s*){3,}/g, '<br><br>');
        
        // Wrap in paragraph if no HTML tags
        if (!text.includes('<')) {
            text = `<p>${text}</p>`;
        }
        
        return text;
    }

    async copyAllContent() {
        const allContent = this.getAllContentAsText();
        await this.copyToClipboard(allContent);
        this.showCopyNotification();
    }

    async copySectionContent(section) {
        let content = '';
        const courseTitle = this.courseTitleInput.value.trim();
        
        switch(section) {
            case 'objective':
                content = `Course Objective for "${courseTitle}":\n\n${this.courseObjective.textContent}`;
                break;
            case 'syllabus':
                content = `Syllabus for "${courseTitle}":\n\n${this.courseSyllabus.textContent}`;
                break;
            case 'outcomes':
                content = `Learning Outcomes for "${courseTitle}":\n\n`;
                content += `Knowledge: ${this.knowledgeOutcome.textContent}\n\n`;
                content += `Comprehension: ${this.comprehensionOutcome.textContent}\n\n`;
                content += `Application: ${this.applicationOutcome.textContent}`;
                break;
            case 'assessments':
                content = `Suggested Assessments for "${courseTitle}":\n\n${this.suggestedAssessments.textContent}`;
                break;
            case 'readings':
                content = `Recommended Readings for "${courseTitle}":\n\n${this.recommendedReadings.textContent}`;
                break;
        }
        
        await this.copyToClipboard(content);
        this.showCopyNotification();
    }

    getAllContentAsText() {
        const courseTitle = this.courseTitleInput.value.trim();
        let content = `Educational Content Package: "${courseTitle}"\n`;
        content += `Generated by Edu-LearnAI\n`;
        content += `${'='.repeat(50)}\n\n`;
        
        content += `COURSE OBJECTIVE:\n${this.courseObjective.textContent}\n\n`;
        content += `SYLLABUS:\n${this.courseSyllabus.textContent}\n\n`;
        content += `LEARNING OUTCOMES (Bloom's Taxonomy):\n\n`;
        content += `Knowledge:\n${this.knowledgeOutcome.textContent}\n\n`;
        content += `Comprehension:\n${this.comprehensionOutcome.textContent}\n\n`;
        content += `Application:\n${this.applicationOutcome.textContent}\n\n`;
        content += `SUGGESTED ASSESSMENTS:\n${this.suggestedAssessments.textContent}\n\n`;
        content += `RECOMMENDED READINGS:\n${this.recommendedReadings.textContent}\n\n`;
        content += `${'='.repeat(50)}\n`;
        content += `Note: This content is AI-generated and should be critically evaluated and customized for your specific educational context.`;
        
        return content;
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    showCopyNotification() {
        this.copyNotification.classList.remove('hidden');
        setTimeout(() => {
            this.copyNotification.classList.add('hidden');
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EduLearnAI();
});

// Export for potential future use
window.EduLearnAI = EduLearnAI;