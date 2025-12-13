// Chat functionality for contact page
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    let currentState = 'initial';
    
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS is not loaded. Form submissions will not work.');
    }
    
    // Typewriter effect for messages
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        
        type();
    }
    
    // Show typing indicator
    function showTypingIndicator(callback) {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="bot-avatar">N</div>
            <div class="message-content">
                <div class="flex items-center gap-2">
                    <span>NOVA is typing</span>
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Remove typing indicator and execute callback after delay
        setTimeout(() => {
            typingIndicator.remove();
            if (callback) callback();
        }, 1500);
    }
    
    // Add bot message
    function addBotMessage(text, withOptions = false, options = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        let optionsHTML = '';
        if (withOptions && options) {
            optionsHTML = `
                <div class="options-grid mt-4">
                    ${options.map(option => `
                        <button class="option-button" data-action="${option.action}" aria-label="${option.text}">
                            ${option.icon}
                            ${option.text}
                        </button>
                    `).join('')}
                </div>
            `;
        }
        
        messageDiv.innerHTML = `
            <div class="bot-avatar">N</div>
            <div class="message-content">
                <p>${text}</p>
                ${optionsHTML}
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animate the message in
        setTimeout(() => {
            messageDiv.style.opacity = 1;
        }, 10);
    }
    
    // Add user message
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animate the message in
        setTimeout(() => {
            messageDiv.style.opacity = 1;
        }, 10);
    }
    
    // Show main options
    function showMainOptions() {
        const options = [
            {
                action: 'hire',
                icon: '<span class="material-icons-outlined">work</span>',
                text: 'Hire Me'
            },
            {
                action: 'collaborate',
                icon: '<span class="material-icons-outlined">group</span>',
                text: 'Collaborate'
            },
            {
                action: 'project',
                icon: '<span class="material-icons-outlined">rocket_launch</span>',
                text: 'Start a Project'
            },
            {
                action: 'other',
                icon: '<span class="material-icons-outlined">help</span>',
                text: 'Other'
            }
        ];
        
        addBotMessage("How can I help you today?", true, options);
    }
    
    // Show hire me follow-up
    function showHireFollowUp() {
        const options = [
            {
                action: 'whatsapp',
                icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.189-3.553-8.436"/></svg>',
                text: 'WhatsApp'
            },
            {
                action: 'telegram',
                icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>',
                text: 'Telegram'
            },
            {
                action: 'twitter',
                icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
                text: 'X (Twitter)'
            }
        ];
        
        addBotMessage("That's great, we should talk more about it. How would you like to contact me?", true, options);
    }
    
    // Show collaborate option
    function showCollaborate() {
        const options = [
            {
                action: 'github',
                icon: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.337-3.369-1.337-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.335-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>',
                text: 'GitHub'
            }
        ];
        
        addBotMessage("Great! Let's collaborate on GitHub. Check out my projects and let's build something amazing together.", true, options);
    }
    
    // Show project form
    function showProjectForm() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        messageDiv.innerHTML = `
            <div class="bot-avatar">N</div>
            <div class="message-content">
                <p>Perfect! Let's get your project started. Please provide some details:</p>
                <div class="contact-form">
                    <form id="project-form">
                        <div class="form-group">
                            <label class="form-label" for="name">Name</label>
                            <input type="text" id="name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="email">Email</label>
                            <input type="email" id="email" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="message">Project Details</label>
                            <textarea id="message" class="form-textarea" placeholder="Tell me about your project..." required rows="4"></textarea>
                        </div>
                        <button type="submit" class="submit-button">
                            <span class="material-icons-outlined">send</span>
                            Send Project Details
                        </button>
                    </form>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animate the message in
        setTimeout(() => {
            messageDiv.style.opacity = 1;
        }, 10);
        
        // Add form submission handler with EmailJS integration
        const form = document.getElementById('project-form');
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Validation
                if (!name || !email || !message) {
                    addBotMessage("Please fill in all fields before submitting.");
                    return;
                }
                
                // Add user message
                addUserMessage("I've submitted my project details");
                
                // Show typing indicator
                showTypingIndicator(async () => {
                    try {
                        // Check if EmailJS is available
                        if (typeof emailjs === 'undefined') {
                            throw new Error('EmailJS is not loaded. Please try again later or contact me directly.');
                        }
                        
                        console.log('Sending email with EmailJS...');
                        
                        // Send the email using EmailJS
                        const response = await emailjs.send(
                            "service_41mpv7c", 
                            "template_bg0dm8q", 
                            {
                                from_name: name,
                                from_email: email,
                                message: message,
                                to_name: "Christian",
                                reply_to: email
                            }
                        );
                        
                        console.log('Email sent successfully:', response);
                        addBotMessage("Thank you! I've received your project details. Christian will get back to you within 24 hours.");
                        
                    } catch (error) {
                        console.error('Failed to send email:', error);
                        
                        // User-friendly error messages
                        let errorMessage = "There was an issue sending your message. ";
                        
                        if (error.text && error.text.includes('Invalid template ID')) {
                            errorMessage += "The email template is not configured correctly.";
                        } else if (error.text && error.text.includes('Invalid service ID')) {
                            errorMessage += "The email service is not configured correctly.";
                        } else if (error.text && error.text.includes('User ID is not valid')) {
                            errorMessage += "The email service authentication failed.";
                        } else {
                            errorMessage += "Please try again later or contact me directly at akabuezechris432@gmail.com";
                        }
                        
                        addBotMessage(errorMessage);
                    }
                });
                
                // Reset form
                this.reset();
            });
        }
    }
    
    // Show other option
    function showOther() {
        const options = [
            {
                action: 'email',
                icon: '<span class="material-icons-outlined">email</span>',
                text: 'Send a Mail'
            }
        ];
        
        addBotMessage("For any other inquiries, feel free to send me an email directly.", true, options);
    }
    
    // Start the chat sequence
    setTimeout(() => {
        const initialMessage = document.getElementById('initial-message');
        if (initialMessage) {
            typeWriter(initialMessage, "Hello, What are we working on?", 50, () => {
                showTypingIndicator(() => {
                    showMainOptions();
                });
            });
        }
    }, 1000);
    
    // Handle option button clicks
    document.addEventListener('click', function(e) {
        if (e.target.closest('.option-button')) {
            const button = e.target.closest('.option-button');
            const action = button.getAttribute('data-action');
            
            // Add user message based on action
            let userMessage = '';
            switch(action) {
                case 'hire':
                    userMessage = "I want to hire you";
                    break;
                case 'collaborate':
                    userMessage = "I want to collaborate";
                    break;
                case 'project':
                    userMessage = "I want to start a project";
                    break;
                case 'other':
                    userMessage = "Other";
                    break;
            }
            
            if (userMessage) {
                addUserMessage(userMessage);
            }
            
            // Add glowing effect to clicked button
            button.classList.add('glow');
            
            // Handle different actions
            switch(action) {
                case 'hire':
                    showTypingIndicator(() => {
                        showHireFollowUp();
                    });
                    break;
                    
                case 'collaborate':
                    showTypingIndicator(() => {
                        showCollaborate();
                    });
                    break;
                    
                case 'project':
                    showTypingIndicator(() => {
                        showProjectForm();
                    });
                    break;
                    
                case 'other':
                    showTypingIndicator(() => {
                        showOther();
                    });
                    break;
                    
                case 'whatsapp':
                    window.open('https://wa.me/2347060789848?text=Hi%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20talk%20to%20you', '_blank');
                    break;
                    
                case 'email':
                    window.location.href = 'mailto:akabuezechris432@gmail.com';
                    break;
                    
                case 'telegram':
                    window.open('https://t.me/Too_chi', '_blank');
                    break;
                    
                case 'twitter':
                    window.open('https://x.com/too_chi_?s=21', '_blank');
                    break;
                    
                case 'github':
                    window.open('https://github.com/christian-fx?tab=projects', '_blank');
                    break;
            }
            
            // Remove glow effect after a delay
            setTimeout(() => {
                button.classList.remove('glow');
            }, 1000);
        }
    });
});