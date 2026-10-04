/* =========================================================
   OLAMIDE AI
   Frontend-only AI assistant
   ========================================================= */

const aiChat = document.getElementById("aiChat");
const aiInput = document.getElementById("aiInput");

const olamideInfo = {
    name: "Olamide Ibrahim",
    title: "Creative Developer & Designer",
    location: "Nigeria",
    description:
        "Olamide is a creative developer and designer who works across web development, graphic design, UI/UX design, writing, technology, cybersecurity, and other creative areas. He is serious about developing his skills, building projects, and growing toward professional-level work.",
    personality:
        "Olamide is creative, hardworking, curious, ambitious, and committed to continuous improvement."
};

function startAI() {
    const messages = document.getElementById("aiMessages");

    if (!messages) return;

    messages.innerHTML = `
        <div class="ai-message bot">
            <strong>🤖 Olamide's AI</strong><br><br>
            Hi! 👋 I'm Olamide's AI.<br><br>
            Ask me anything about Olamide.
        </div>
    `;
}

function normalizeText(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[?!.,'"`]/g, "")
        .replace(/\s+/g, " ");
}
const intentKeywords = {

    ABOUT_OLAMIDE: [
        "who is olamide",
        "who the fuck is olamide",
        "who the hell is olamide",
        "who tf is olamide",
        "who is this olamide",
        "who even is olamide",
        "olamide who",
        "tell me about olamide",
        "introduce olamide",
        "olamide na who",
        "who be olamide",
        "abeg who be olamide",
        "tell me more about olamide",
        "identify olamide",
        "who exactly is olamide",
        "who is he",
        "introduce yourself",
        "who exactly are you",
        "who are you",
        "explain yourself",
        "who you be",
        "olamide"
    ],

    LOCATION_BASED: [
        "where is olamide based",
        "where is olamide located",
        "where does olamide live",
        "what city is olamide in",
        "where olamide dey",
        "olamide dey based where",
        "which country is olamide from",
        "where is olamide from",
        "where is he based",
        "is olamide from nigeria",
        "where are you based",
        "where are you located",
        "location",
        "is he from nigeria",
        "where does he lives",
        "where is he now",
        "where is he right now"
    ],

    WHAT_OLAMIDE_DOES: [
        "what does olamide do",
        "what is olamide's job",
        "what kind of work does olamide do",
        "what is olamide's profession",
        "what does olamide do for a living",
        "what does olamide work on",
        "what does olamide do professionally",
        "wetin olamide dey do",
        "olamide dey work as wetin",
        "what can he do",
        "can he work",
        "what are his job",
        "what's his job",
        "what does he do",
        "what can he do",
        "what is his job"
    ],

    SKILLS: [
        "what skills does olamide have",
        "what is olamide good at",
        "what can olamide do",
        "what are olamide's skills",
        "what is olamide skilled in",
        "olamide get which skills",
        "wetin olamide sabi do",
        "wetin olamide sabi pass"
    ],

    SERVICES: [
        "what services does olamide offer",
        "what can i hire olamide to do",
        "what does olamide provide",
        "what services can i hire olamide for",
        "what can olamide do for my business",
        "which services does olamide provide",
        "wetin olamide dey offer",
        "wetin i fit hire olamide to do",
        "what does olamide offer",
        "what can he offer me",
        "what can he do"
    ],

    WEB_DEVELOPMENT: [
        "does olamide build websites",
        "can olamide build a website",
        "is olamide a web developer",
        "does olamide do web development",
        "can olamide create a website",
        "does olamide make websites",
        "olamide sabi website development",
        "olamide dey build websites",
        "olamide fit build website",
        "what does he know about web development",
        "does he even know how to create a website",
        "what does he even know about creating website",
        "can he build a website"
    ],

    GRAPHIC_DESIGN: [
        "does olamide do graphic design",
        "is olamide a graphic designer",
        "can olamide design graphics",
        "can olamide design flyers",
        "does olamide design flyers",
        "can olamide make posters",
        "can olamide create banners",
        "olamide dey do graphics",
        "olamide fit design flyer",
        "olamide fit do grahics design",
        "can he do do graphics design",
        "is he into graphics design"
    ],

    UI_UX: [
        "does olamide do ui ux",
        "is olamide a ui ux designer",
        "can olamide design ui",
        "can olamide design ux",
        "can olamide design an app interface",
        "does olamide create ui designs",
        "does olamide work on user experience",
        "olamide sabi ui ux",
        "olamide fit design app interface"
    ],

    WRITING: [
        "does olamide do writing",
        "can olamide write",
        "does olamide do ghostwriting",
        "can olamide ghostwrite",
        "what writing does olamide do",
        "can olamide write content",
        "does olamide write articles",
        "olamide sabi write",
        "olamide dey do writing"
    ],

    FOREX: [
        "does olamide trade forex",
        "is olamide involved in forex",
        "does olamide learn forex",
        "is forex one of olamide's interests",
        "what does olamide do in forex",
        "olamide dey trade forex",
        "olamide dey learn forex",
        "wetin olamide dey do for forex"
    ],

    PROJECTS: [
        "what projects has olamide worked on",
        "what projects has olamide completed",
        "what has olamide built",
        "what has olamide created",
        "what projects does olamide have",
        "can you tell me about olamide's projects",
        "olamide get any project",
        "wetin olamide don build"
    ],

    EXPERIENCE: [
        "what experience does olamide have",
        "how much experience does olamide have",
        "how experienced is olamide",
        "what is olamide's experience",
        "how did olamide get started in tech",
        "how has olamide grown",
        "olamide don dey do this work for how long",
        "how far has olamide come",
        "do you have experience ",
        "does he have any experience",
        "does olamide have any experience"
    ],

    EDUCATION: [
        "where did olamide study",
        "what school does olamide attend",
        "is olamide still in school",
        "what is olamide studying",
        "what did olamide study",
        "what qualifications does olamide have",
        "which school olamide attend",
        "olamide still dey school"
    ],

    TECHNOLOGY_TOOLS: [
        "what technologies does olamide use",
        "what tools does olamide use",
        "what software does olamide use",
        "what programming languages does olamide use",
        "what tools does olamide use for coding",
        "what tools does olamide use for design",
        "what does olamide use to build websites",
        "wetin tools olamide dey use"
    ],

    LEARNING: [
        "what is olamide learning",
        "what is olamide currently learning",
        "what skills is olamide learning",
        "what is olamide studying now",
        "what is olamide currently studying",
        "what new skills is olamide learning",
        "what is olamide improving",
        "wetin olamide dey learn now"
    ],

    GOALS: [
        "what are olamide's goals",
        "what are olamide's professional goals",
        "what does olamide want to achieve",
        "what is olamide working toward",
        "what are olamide's ambitions",
        "what are olamide's future plans",
        "what is olamide aiming for",
        "wetin olamide wan achieve"
    ],

    HIRING: [
        "how can i hire olamide",
        "can i hire olamide",
        "is olamide available for hire",
        "how do i work with olamide",
        "can i book olamide",
        "can olamide work on my project",
        "how do i start a project with olamide",
        "i want to hire olamide"
    ],

    CONTACT: [
        "how can i contact olamide",
        "how do i contact olamide",
        "how can i reach olamide",
        "where can i contact olamide",
        "how can i message olamide",
        "where can i message olamide",
        "what is olamide's contact",
        "how person fit reach olamide"
    ],

    PORTFOLIO: [
        "where can i find olamide's portfolio",
        "what is olamide's portfolio website",
        "does olamide have a portfolio",
        "where can i see olamide's portfolio",
        "can i get olamide's portfolio link",
        "where can i find olamide's website",
        "where can i see olamide's work online",
        "olamide get portfolio link"
    ],

    VIEW_WORK: [
        "show me olamide's work",
        "can i see olamide's work",
        "show me what olamide has created",
        "let me see olamide's work",
        "can i see what olamide has built",
        "show me some examples of olamide's work",
        "i want to see olamide's projects",
        "show me olamide work",
        "i want to view olamide's work",
        "show olamide work",
        "show me his works",
        "show me his work",
        "show his work",
        "show his works"
    ],

    WEBSITE_PROJECTS: [
        "what websites has olamide built",
        "which websites has olamide created",
        "can i see websites olamide has made",
        "what website projects has olamide worked on",
        "has olamide created any websites",
        "can olamide show me his website projects",
        "what website work has olamide done",
        "olamide don make which website"
    ],

    DESIGN_STYLE: [
        "what is olamide's design style",
        "how would you describe olamide's design style",
        "what does olamide's design aesthetic look like",
        "what kind of designs does olamide like",
        "what is olamide's creative approach",
        "what is olamide's creative vibe",
        "does olamide have a signature design style",
        "olamide design style na wetin"
    ],

    AVAILABILITY: [
        "is olamide available for work",
        "is olamide available",
        "is olamide open to new projects",
        "can olamide take on work",
        "is olamide taking new clients",
        "is olamide accepting projects",
        "does olamide have availability",
        "olamide dey available",
        "can you work",
        "can i hire you",
        "are you avalable"
    ]
};

function detectIntent(message) {

    const text = normalizeText(message);

    let bestIntent = null;
    let bestScore = 0;

    for (const intent in intentKeywords) {

        let score = 0;

        intentKeywords[intent].forEach(keyword => {

            if (text === keyword) {
                score += 10;
            }

            else if (text.includes(keyword)) {
                score += 5;
            }

        });

        if (score > bestScore) {
            bestScore = score;
            bestIntent = intent;
        }
    }

    return bestScore > 0 ? bestIntent : null;
}function getAIAnswer(intent) {

    switch (intent) {

        case "ABOUT_OLAMIDE":
            return `Olamide Ibrahim is a student and creative professional developing across technology and creative fields. He works with web development, graphic design, UI/UX, writing, cybersecurity, Forex, and other areas of technology. He is creative, hardworking, curious, ambitious, and serious about growing toward professional-level work.`;

        case "LOCATION_BASED":
            return `Olamide is based in Nigeria.`;

        case "WHAT_OLAMIDE_DOES":
            return `Olamide works across technology and creative fields. His areas include web development, graphic design, UI/UX design, writing, cybersecurity, Forex, and other technology-related work.`;

        case "SKILLS":
            return `Olamide's skills cover web development, graphic design, UI/UX design, writing, cybersecurity, and other technology and creative skills he has been developing.`;

        case "SERVICES":
            return `Olamide can work across areas such as web development, graphic design, UI/UX design, and writing. For a specific project, the best option is to contact him and discuss what you need.`;

        case "WEB_DEVELOPMENT":
            return `Yes. Web development is one of Olamide's areas of work. He works with frontend development and builds websites using the web technologies he has learned.`;

        case "GRAPHIC_DESIGN":
            return `Yes. Graphic design is one of Olamide's creative areas. He works on visual design projects and continues developing his design skills.`;

        case "UI_UX":
            return `Yes. UI/UX design is one of Olamide's areas of interest and work. He develops skills around designing digital interfaces and user experiences.`;

        case "WRITING":
            return `Yes. Writing is one of Olamide's creative areas. He is interested in content and ghostwriting-related work.`;

        case "FOREX":
            return `Forex is one of the areas Olamide is involved in learning and exploring. For specific trading experience or results, it's best to ask him directly rather than assume.`;

        case "PROJECTS":
            return `Olamide has been building different technology and creative projects, including websites and design-related work. You can use the Work section to view the areas of his work.`;

        case "EXPERIENCE":
            return `Olamide is building practical experience through projects, technology learning, and creative work. His experience is developing as he continues working toward professional-level expertise.`;

        case "EDUCATION":
            return `Olamide is currently a student. He is also developing practical skills in technology and creative fields alongside his education.`;

        case "TECHNOLOGY_TOOLS":
            return `Olamide works with web-development, design, and other technology tools as part of his projects. His toolkit continues to grow as he develops his skills.`;

        case "LEARNING":
            return `Olamide is continuously developing his skills across technology and creative fields, including web development, design, cybersecurity, writing, and other areas.`;

        case "GOALS":
            return `Olamide's goal is to keep developing his skills, build stronger projects, and grow toward professional-level expertise across technology and creative work.`;

        case "HIRING":
            return `You can contact Olamide to discuss a project or service you need. The exact project requirements and availability can be discussed directly with him.`;

        case "CONTACT":
            return `You can reach Olamide through the Contact section of his portfolio.`;

        case "PORTFOLIO":
            return `You can view Olamide's portfolio here: https://olamide-creative-developer.netlify.app/`;

        case "VIEW_WORK":
            return `
                <div class="work-question">
                    <p>Please, can you choose the aspect you want to view?</p>

                    <div class="ai-work-options">

                        <button onclick="showAIWork('web')">
                            🌐 Web Development
                        </button>

                        <button onclick="showAIWork('graphics')">
                            🎨 Graphic Design
                        </button>

                        <button onclick="showAIWork('uiux')">
                            🖥️ UI/UX Design
                        </button>
 
                        <button onclick="showAIWork('writing')">
                            ✍️ Writing
                        </button>

                    </div>
                </div>
            `;

        case "WEBSITE_PROJECTS":
            return `Olamide has worked on website projects as part of his web-development journey. You can view his website work through the portfolio and Work section.`;

        case "DESIGN_STYLE":
            return `Olamide's creative style is still developing as he works across different design projects. His approach focuses on creativity, clear visual presentation, and improving the overall quality of his work.`;

        case "AVAILABILITY":
            return `Olamide's availability can change. For the latest availability, please contact him directly.`;

        default:
            return `I'm having trouble processing that request right now. Please check your network connection and try again.`;
    }
}
function toggleAI() {

    const chat = document.getElementById("aiChat");
    const messages = document.getElementById("aiMessages");
    const input = document.getElementById("aiInput");

    if (!chat) return;

    // Close AI
    if (chat.classList.contains("show")) {

        chat.classList.remove("show");

        if (messages) {
            messages.innerHTML = "";
        }

        if (input) {
            input.value = "";
        }

        return;
    }

    // Open AI
    chat.classList.add("show");

    if (messages) {

        messages.innerHTML = `
            <div class="ai-message bot">

                <strong>🤖 Olamide's AI</strong>

                <br><br>

                Hi! 👋 I'm Olamide's AI.

                <br><br>

                Ask me anything about Olamide.

            </div>
        `;
    }

    if (input) {
        input.value = "";
        input.focus();
    }
}


function sendAIMessage() {

    const input = document.getElementById("aiInput");
    const messages = document.getElementById("aiMessages");

    if (!input || !messages) return;

    const message = input.value.trim();

    if (!message) return;

    // Add user's message
    const userMessage = document.createElement("div");

    userMessage.className = "ai-message user";

    userMessage.textContent = message;

    messages.appendChild(userMessage);

    // Clear input
    input.value = "";

    // Detect what the user is asking
    const intent = detectIntent(message);

    // Get the appropriate answer
    const answer = getAIAnswer(intent);

    // Small response delay
    setTimeout(() => {

        const botMessage = document.createElement("div");

        botMessage.className = "ai-message bot";

        botMessage.innerHTML = answer;

        messages.appendChild(botMessage);

        messages.scrollTop = messages.scrollHeight;

    }, 300);
}


function addAIMessage(message, type) {

    const messages = document.getElementById("aiMessages");

    if (!messages) return;

    const div = document.createElement("div");

    div.className = `ai-message ${type}`;

    div.innerHTML = message.replace(/\n/g, "<br>");

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
}
function startVoiceInput() {

    const input = document.getElementById("aiInput");
    const mic = document.getElementById("aiMic");

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice input is not supported in this browser. You can still type your question."
        );

        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function () {

        mic.classList.add("listening");

        mic.textContent = "🔴";

        input.placeholder = "Listening... Speak now";
    };

    recognition.onresult = function (event) {

        const spokenText =
            event.results[0][0].transcript;

        input.value = spokenText;

        input.placeholder = "Ask Olamide's AI...";

        sendAIMessage();
    };

    recognition.onerror = function (event) {

        console.log(
            "Speech recognition error:",
            event.error
        );

        mic.classList.remove("listening");

        mic.textContent = "🎤";

        input.placeholder = "Ask Olamide's AI...";

        if (event.error === "no-speech") {

            alert(
                "I couldn't hear that clearly. Please speak closer to the microphone and try again."
            );

        } else if (event.error === "audio-capture") {

            alert(
                "No microphone was detected. Please check your microphone."
            );

        } else if (event.error === "not-allowed") {

            alert(
                "Microphone permission was denied. Please allow microphone access."
            );
        }
    };

    recognition.onend = function () {

        mic.classList.remove("listening");

        mic.textContent = "🎤";

        input.placeholder = "Ask Olamide's AI...";
    };

    recognition.start();
}

/* =========================================================
   AI WORK GALLERY
   ========================================================= */

const aiWorkImages = {

    web: [
        "images/web/web-1.jpeg",
        "images/web/web-2.jpeg",
        "images/web/web-3.jpeg",
        "images/web/web-4.jpeg",
        "images/web/web-5.jpg",
        "images/web/web-6.jpg"
    ],

    graphics: [
        "images/graphics/graphic-1.jpeg",
        "images/graphics/graphic-2.jpeg",
        "images/graphics/graphic-3.jpeg",
        "images/graphics/graphic-4.jpeg",
        "images/graphics/graphic-5.jpg",
        "images/graphics/graphic-6.jpg"
    ],

    uiux: [
        "images/uiux/uiux-1.jpeg",
        "images/uiux/uiux-2.jpeg",
        "images/uiux/uiux-3.jpeg",
        "images/uiux/uiux-4.jpeg",
        "images/uiux/uiux-5.jpg",
        "images/uiux/uiux-6.jpg"
    ],

    writing: [
        "images/writing/writing-1.jpeg",
        "images/writing/writing-2.jpeg",
        "images/writing/writing-3.jpeg",
        "images/writing/writing-4.jpeg",
        "images/writing/writing-5.jpg",
        "images/writing/writing-6.jpg"
    ]

};


function showAIWork(type) {

    const messages =
        document.getElementById("aiMessages");

    if (!messages) return;

    const titles = {

        web: "🌐 Web Development",

        graphics: "🎨 Graphic Design",

        uiux: "🖥️ UI/UX Design",

        writing: "✍️ Writing"

    };

    const images = aiWorkImages[type];

    if (!images) return;


    const galleryMessage =
        document.createElement("div");

    galleryMessage.className =
        "ai-message bot";


    galleryMessage.innerHTML = `

        <div class="ai-work-gallery">

            <button
                class="ai-gallery-close"
                onclick="backToWorkOptions()"
                aria-label="Back to work options">
                ×
            </button>


            <div class="ai-gallery-title">
                ${titles[type]}
            </div>


            <div class="ai-gallery-grid">

                ${images.map((image, index) => `

                    <div
                        class="ai-gallery-item"
                        onclick="openAIImage('${image}')">

                        <img
                            src="${image}"
                            alt="${titles[type]} example ${index + 1}"
                            loading="lazy">

                    </div>

                `).join("")}

            </div>

        </div>

    `;


    messages.appendChild(galleryMessage);

    messages.scrollTop =
        messages.scrollHeight;
}


function backToWorkOptions() {

    const messages =
        document.getElementById("aiMessages");

    if (!messages) return;


    const workOptions =
        document.createElement("div");

    workOptions.className =
        "ai-message bot";


    workOptions.innerHTML = `

        <div class="work-question">

            <p>
                Please, can you choose the aspect you want to view?
            </p>


            <div class="ai-work-options">

                <button
                    onclick="showAIWork('web')">
                    🌐 Web Development
                </button>

                <button
                    onclick="showAIWork('graphics')">
                    🎨 Graphic Design
                </button>

                <button
                    onclick="showAIWork('uiux')">
                    🖥️ UI/UX Design
                </button>

                <button
                    onclick="showAIWork('writing')">
                    ✍️ Writing
                </button>

            </div>

        </div>

    `;


    messages.appendChild(workOptions);

    messages.scrollTop =
        messages.scrollHeight;
}

function openAIImage(image) {

    let viewer =
        document.getElementById("aiImageViewer");

    if (!viewer) {

        viewer = document.createElement("div");

        viewer.id = "aiImageViewer";

        viewer.className =
            "ai-image-viewer";

        viewer.innerHTML = `

            <div class="ai-image-viewer-box">

                <button
                    class="ai-image-close"
                    onclick="closeAIImage()"
                    aria-label="Close image">
                    ×
                </button>

                <img
                    id="aiViewerImage"
                    src=""
                    alt="Olamide's work">

            </div>

        `;


        viewer.addEventListener(
            "click",
            function (event) {

                if (event.target === viewer) {
                    closeAIImage();
                }

            }
        );


        document.body.appendChild(viewer);
    }


    const viewerImage =
        document.getElementById("aiViewerImage");

    viewerImage.src = image;

    viewer.classList.add("show");
}


function closeAIImage() {

    const viewer =
        document.getElementById("aiImageViewer");

    if (viewer) {
        viewer.classList.remove("show");
    }
}

/* =========================================================
   NEED HELP
   ========================================================= */

const needHelpAnswers = {

    about: `
        Olamide Ibrahim is a student and creative developer
        who is building his skills across technology and
        creative fields.
    `,

    skills: `
        Olamide is developing skills in web development,
        graphic design, UI/UX design, writing, cybersecurity,
        Forex, and other technology-related areas.
    `,

    webdesign: `
        Website design involves planning how a website looks,
        feels, and works. Olamide is learning to combine
        structure, styling, responsiveness, and user-friendly
        design when building websites.
    `,

    websites: `
        Olamide can build frontend websites and is continuing
        to improve his ability to create responsive,
        professional-looking web experiences.
    `,

    graphics: `
        Olamide works on graphic design projects such as
        flyers, banners, business cards, logos, and other
        visual designs while continuing to improve his skills.
    `,

    uiux: `
        Olamide is learning UI/UX design, including how to
        create clear interfaces and think about how users
        interact with digital products.
    `,

    ghostwriting: `
        Ghostwriting involves creating written content for
        another person who publishes it under their own name.
        Olamide is developing skills in content and
        ghostwriting-related work.
    `,

    learning: `
        Olamide is continuously learning and improving across
        technology and creative fields, including web
        development, cybersecurity, Arabic, design, and writing.
    `,

    journey: `
        Olamide's journey is focused on learning, practising,
        building projects, receiving feedback, and improving
        his skills step by step.
    `,

    goals: `
        Olamide's goal is to keep developing his abilities,
        build stronger projects, and grow toward professional
        level work in technology and creative fields.
    `,

    services: `
        Olamide can work across areas such as web development,
        graphic design, UI/UX design, and writing. Specific
        project requirements can be discussed directly with him.
    `,

    tools: `
        Olamide uses different web-development, design, and
        technology tools as part of his learning and projects.
        His toolkit continues to grow as he learns.
    `,

    contact: `
        You can contact Olamide through the Contact section
        of his portfolio to discuss a project, service, or
        other enquiry.
    `
};


function toggleHelp() {

    const menu =
        document.getElementById("helpMenu");

    if (!menu) return;

    menu.classList.toggle("show");

    if (!menu.classList.contains("show")) {
        resetNeedHelp();
    }
}


function resetNeedHelp() {

    const response =
        document.getElementById("helpResponse");

    const workOptions =
        document.getElementById("workOptions");

    const workDisplay =
        document.getElementById("workDisplay");


    if (response) {

        response.innerHTML = "";

        response.style.display = "none";

        response.dataset.type = "";

    }


    if (workOptions) {

        workOptions.style.display = "none";

        workOptions.classList.remove("show");

    }


    if (workDisplay) {

        workDisplay.innerHTML = "";

        workDisplay.style.display = "none";

    }


    document
        .querySelectorAll(".help-questions button")
        .forEach(button => {

            button.classList.remove("active");

        });
}


function showHelp(type) {

    const response =
        document.getElementById("helpResponse");

    if (!response) return;

    const answer =
        needHelpAnswers[type];

    if (!answer) return;


    const workOptions =
        document.getElementById("workOptions");

    const workDisplay =
        document.getElementById("workDisplay");


    // Clicking the same question closes it
    if (
        response.style.display === "block" &&
        response.dataset.type === type
    ) {

        response.innerHTML = "";

        response.style.display = "none";

        response.dataset.type = "";

        document
            .querySelectorAll(".help-questions button")
            .forEach(button => {

                button.classList.remove("active");

            });

        return;
    }


    // Close Work section
    if (workOptions) {

        workOptions.style.display = "none";

        workOptions.classList.remove("show");

    }


    if (workDisplay) {

        workDisplay.innerHTML = "";

        workDisplay.style.display = "none";

    }


    // Remove active state
    document
        .querySelectorAll(".help-questions button")
        .forEach(button => {

            button.classList.remove("active");

        });


    // Find clicked question
    const buttons =
        document.querySelectorAll(".help-questions button");


    buttons.forEach(button => {

        const onclickValue =
            button.getAttribute("onclick");

        if (
            onclickValue &&
            onclickValue.includes(`'${type}'`)
        ) {

            button.classList.add("active");

            // Put answer directly below clicked question
            button.insertAdjacentElement(
                "afterend",
                response
            );

        }

    });


    response.innerHTML = `
        <div class="help-answer">
            ${answer}
        </div>
    `;

    response.dataset.type = type;

    response.style.display = "block";
}

/* =========================================================
   NEED HELP — WORK GALLERY
   ========================================================= */

function showWorkOptions() {

    const response =
        document.getElementById("helpResponse");

    const workOptions =
        document.getElementById("workOptions");

    const workDisplay =
        document.getElementById("workDisplay");

    if (!workOptions) return;


    // Close any open answer
    if (response) {

        response.innerHTML = "";

        response.style.display = "none";

        response.dataset.type = "";

    }


    // Clear previous gallery
    if (workDisplay) {

        workDisplay.innerHTML = "";

        workDisplay.style.display = "none";

    }


    // Remove active question states
    document
        .querySelectorAll(".help-questions button")
        .forEach(button => {

            button.classList.remove("active");

        });


    // Show work categories
    workOptions.style.display = "block";

    workOptions.classList.add("show");

    workOptions.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


const needHelpWorkImages = {

    web: [
        "images/web/web-1.jpeg",
        "images/web/web-2.jpeg"
    ],

    graphics: [
        "images/graphics/graphic-1.jpeg",
        "images/graphics/graphic-2.jpeg"
    ],

    uiux: [
        "images/uiux/uiux-1.jpeg",
        "images/uiux/uiux-2.jpeg"
    ],

    writing: [
        "images/writing/writing-1.jpeg",
        "images/writing/writing-2.jpeg"
    ]

};


function showWork(type) {

    const workDisplay =
        document.getElementById("workDisplay");

    if (!workDisplay) return;


    const titles = {

        web: "💻 Web Development",

        graphics: "🎨 Graphic Design",

        uiux: "✦ UI/UX Design",

        writing: "✍️ Ghostwriting"

    };


    const images =
        needHelpWorkImages[type];

    if (!images) return;


    workDisplay.innerHTML = `

        <div class="help-work-gallery">

            <div class="help-work-title">
                ${titles[type]}
            </div>


            <div class="help-work-grid">

                ${images.map((image, index) => `

                    <div class="help-work-image">

                        <img
                            src="${image}"
                            alt="${titles[type]} example ${index + 1}"
                            loading="lazy">

                    </div>

                `).join("")}

            </div>

        </div>

    `;


    workDisplay.style.display = "block";


    workDisplay.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

/* =========================================================
   NEED HELP — FUN SECTION
   ========================================================= */

function showFunSection() {

    const response =
        document.getElementById("helpResponse");

    if (!response) return;


    // Close Work section
    const workOptions =
        document.getElementById("workOptions");

    const workDisplay =
        document.getElementById("workDisplay");


    if (workOptions) {

        workOptions.style.display = "none";

        workOptions.classList.remove("show");

    }


    if (workDisplay) {

        workDisplay.innerHTML = "";

        workDisplay.style.display = "none";

    }


    // Remove active states
    document
        .querySelectorAll(".help-questions button")
        .forEach(button => {

            button.classList.remove("active");

        });


    response.innerHTML = `

        <div class="help-answer">

            🎮 Take a break and have some fun!

            <br><br>

            Head over to Olamide's Arcade
            and choose a game you like.

            <br><br>

            <button
                class="play-games-btn"
                onclick="window.location.href='games.html'">

                🎮 Play Games

            </button>

        </div>

    `;


    response.dataset.type = "fun";

    response.style.display = "block";
}

// SUPABASE VISITOR TRACKING

const SUPABASE_URL = "https://uegrmtgysofmlqabelma.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ir-IRt2Y6im91q4P6NVsog_0juGH_Dy";

fetch(`${SUPABASE_URL}/rest/v1/visitor_events`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=minimal"
    },
    body: JSON.stringify({
        event_type: "page_view",
        page: window.location.pathname,
        referrer: document.referrer || null
    })
}).catch(error => {
    console.error("Visitor tracking error:", error);
});