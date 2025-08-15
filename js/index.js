window.botpress.init({
      botId: "958c8eb6-7cd3-445c-b4ce-b6a909581660",
      configuration: {
        version: "v1",
        botName: "AirBot",
        botAvatar: "https://files.bpcontent.cloud/2025/07/30/15/20250730152217-X99MV5TZ.png",
        botDescription: "اهلا انا اير بوت مساعد ذكي يفهمك ويوجهك خطوة بخطوة لحل أي مشكلة في جهازك او اي مشاكل فنية",
        fabImage: "https://files.bpcontent.cloud/2025/07/30/15/20250730152642-M97N6MYG.png",
        website: { title: "www.egyair.com", link: "www.egyair.com" },
        email: { title: "it@egyptair.com", link: "it@egyptair.com" },
        phone: { title: "467500", link: "467500" },
        color: "#051b40",
        variant: "solid",
        headerVariant: "glass",
        themeMode: "light",
        fontFamily: "inter",
        radius: 4,
        feedbackEnabled: true,
        footer: "[⚡ by egyptair](https://www.egyptair.com)",
        additionalStylesheetUrl: "https://files.bpcontent.cloud/2025/07/30/15/20250730152943-4J3F4EWT.css",
        allowFileUpload: false
      },
      clientId: "acf2c78a-3371-4ece-9d1b-e264aadca7e5",
      selector: "#webchat"
    });

    // Open chatbot
    document.getElementById('chatNowBtn').addEventListener('click', function () {
      const chatContainer = document.getElementById('webchat-container');
      chatContainer.classList.add('active');
      document.body.style.overflow = 'hidden';
      window.botpress.open();
    });

    // Close chatbot
    document.getElementById('closeChatBtn').addEventListener('click', function() {
      closeChat();
    });

    // Close chat when clicking outside
    document.getElementById('webchat-container').addEventListener('click', function(e) {
      if (e.target === this) {
        closeChat();
      }
    });

    // Close chat function
    function closeChat() {
      const chatContainer = document.getElementById('webchat-container');
      chatContainer.classList.remove('active');
      document.body.style.overflow = 'auto';
      window.botpress.close();
    }
    
    // Add fade-in animations to elements as they enter the viewport
    document.addEventListener('DOMContentLoaded', function() {
      const fadeElements = document.querySelectorAll('.fade-in');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });
      
      fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
    });