function detectLanguage(text) {
    if (/[؀-ۿ]/.test(text)) return 'ar';
    return 'en';
}

function getTypingMessageFromText(inputText) {
    const lang = detectLanguage(inputText);
    return lang === 'ar' ? '🤖 جيم يكتب الآن' : ' GEM is typing 🤖';
}

let isResponding = false;
let typingInterval = null;
let cancelButton = null;

document.addEventListener("DOMContentLoaded", function () {
    const chatboxButton = document.getElementById("chatbox-button");
    const chatboxSupport = document.querySelector(".chatbox__support");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");

    chatInput.addEventListener("input", () => {
        const value = chatInput.value;
        chatInput.style.direction = /[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr";
        chatInput.scrollLeft = chatInput.scrollWidth;
    });

    const chatMessages = document.getElementById("chat-messages");
    const voiceBtn = document.getElementById("voice-btn");
    const voiceIndicator = document.getElementById("voice-indicator");

    if (chatboxButton && chatboxSupport) {
        chatboxButton.addEventListener("click", function () {
            chatboxSupport.classList.toggle("chatbox--active");
        });
    }

    if (!chatForm) {
        console.error("❌ نموذج الدردشة غير موجود!");
        return;
    }

    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (isResponding) return;

        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        isResponding = true;
        if (voiceBtn) voiceBtn.style.display = "none";

        const userMessageWrapper = document.createElement("div");
        userMessageWrapper.style.display = "flex";
        userMessageWrapper.style.justifyContent = "flex-end";

        const userMessageElement = document.createElement("div");
        userMessageElement.classList.add("user-message");
        userMessageElement.innerHTML = `${userMessage}`;

        userMessageWrapper.appendChild(userMessageElement);
        chatMessages.appendChild(userMessageWrapper);
        chatInput.value = "";

        const sendBtn = document.getElementById("send-btn");
        sendBtn.innerHTML = `<div class="loader"></div>`;
        sendBtn.disabled = true;

        cancelButton = document.createElement("button");
        cancelButton.textContent = "✖";
        Object.assign(cancelButton.style, {
            marginLeft: "10px",
            padding: "5px 10px",
            borderRadius: "10px",
            background: "#e74c3c",
            color: "#fff",
            border: "none",
            cursor: "pointer"
        });
        chatForm.appendChild(cancelButton);

        cancelButton.addEventListener("click", () => {
            clearInterval(typingInterval);
            const typingDiv = document.getElementById("gem-indicator");
            if (typingDiv) typingDiv.remove();
            sendBtn.innerHTML = `Send`;
            sendBtn.disabled = false;
            cancelButton.remove();
            isResponding = false;
            if (voiceBtn) voiceBtn.style.display = "inline-block";
        });

        fetch("http://127.0.0.1:8080/get_response", {
            method: "POST",
            body: JSON.stringify({
                message: userMessage,
                lang: detectLanguage(userMessage)
            }),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data => {
            const source = data.source || "local";
            const delay = source === "local" ? 4000 : Math.max(1500, userMessage.length * 60);

            const typingTemplate = document.getElementById("typing-template");
            const typingClone = typingTemplate.content.cloneNode(true);
            typingClone.querySelector(".typing-text").textContent = getTypingMessageFromText(userMessage);
            chatMessages.appendChild(typingClone);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            setTimeout(() => {
                const gemDiv = document.getElementById("gem-indicator");
                if (gemDiv) gemDiv.remove();

                const botMessageElement = document.createElement("div");
                botMessageElement.classList.add("chatbox__messages__item", "chatbox__messages__item--visitor", "bot-message");

                const fullResponse = data.response;
                let i = 0;

                typingInterval = setInterval(() => {
                    if (i < fullResponse.length) {
                        botMessageElement.innerHTML += fullResponse.charAt(i);
                        i++;
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    } else {
                        clearInterval(typingInterval);
                        sendBtn.innerHTML = `Send`;
                        sendBtn.disabled = false;
                        cancelButton.remove();
                        isResponding = false;
                        if (voiceBtn) voiceBtn.style.display = "inline-block";
                    }
                }, 40);

                chatMessages.appendChild(botMessageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, delay);
        })
        .catch(error => {
            console.error("❌ خطأ أثناء إرسال الطلب:", error);
            const errorMessageElement = document.createElement("div");
            errorMessageElement.classList.add("chatbox__messages__item", "chatbox__messages__item--visitor");
            errorMessageElement.innerHTML = "❌ حدث خطأ في الاتصال!";
            chatMessages.appendChild(errorMessageElement);
            sendBtn.innerHTML = `Send`;
            sendBtn.disabled = false;
            cancelButton.remove();
            isResponding = false;
            if (voiceBtn) voiceBtn.style.display = "inline-block";
        });
    });

    // 🎤 التسجيل الصوتي
    if (voiceBtn && chatInput && voiceIndicator) {
        voiceBtn.addEventListener("click", function () {
            if (!('webkitSpeechRecognition' in window)) {
                alert("❌ المتصفح لا يدعم التعرف على الصوت. استخدم Google Chrome.");
                return;
            }

            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                voiceIndicator.classList.add("active");
                voiceBtn.classList.add("recording");
            };

            recognition.onend = () => {
                voiceIndicator.classList.remove("active");
                voiceBtn.classList.remove("recording");
            };

            recognition.onerror = () => {
                voiceIndicator.classList.remove("active");
                voiceBtn.classList.remove("recording");
            };

            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                chatInput.value = text;
                chatInput.focus();
                chatInput.style.direction = /[\u0600-\u06FF]/.test(text) ? "rtl" : "ltr";
                chatInput.scrollLeft = chatInput.scrollWidth;
            };

            recognition.start();
        });
    }

    // ✅ زر Scroll To Bottom (بسلوك مشابه لك)
    const scrollToBottomBtn = document.getElementById('scrollToBottomBtn');
    const chatboxMessages = document.querySelector('.chatbox__messages');

    let lastScrollTop = 0;
    chatboxMessages.addEventListener('scroll', () => {
        const isScrollingUp = chatboxMessages.scrollTop < lastScrollTop;
        const isAtBottom = chatboxMessages.scrollTop + chatboxMessages.clientHeight >= chatboxMessages.scrollHeight - 5;

        if (isScrollingUp && !isAtBottom) {
            scrollToBottomBtn.classList.add('show');
        } else {
            scrollToBottomBtn.classList.remove('show');
        }

        lastScrollTop = chatboxMessages.scrollTop;
    });

    scrollToBottomBtn.addEventListener('click', () => {
        chatboxMessages.scrollTo({
            top: chatboxMessages.scrollHeight,
            behavior: 'smooth'
        });
        scrollToBottomBtn.classList.remove('show');
    });
});
