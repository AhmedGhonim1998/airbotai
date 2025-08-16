// قاعدة المعرفة الفنية المتقدمة
        const techKnowledgeBase = [
            {
                id: 1,
                problem: "الجهاز لا يعمل",
                solution: "1. تحقق من مصدر الطاقة والتوصيلات الكهربائية<br>2. تأكد من توصيل الكابل بالجهاز بشكل صحيح<br>3. جرب توصيل الجهاز بمصدر طاقة آخر<br>4. إذا كان الجهاز يعمل بالبطارية، تأكد من شحن البطارية",
                keywords: ["لا يعمل", "لا يشغل", "طاقة", "كهرباء", "شحن", "مش شغال", "ما بيشتغل", "ما بيدور", "ما بفتح"],
                synonyms: ["لا يعمل", "لا يعمل الجهاز", "لا يشتغل", "ما شغال", "ما بيدور", "ما بفتح", "ما بيشتغل", "ما بيعمل"]
            },
            {
                id: 2,
                problem: "بطء الجهاز",
                solution: "1. أغلق التطبيقات غير الضرورية التي تعمل في الخلفية<br>2. قم بتحديث النظام والبرامج إلى آخر إصدار<br>3. قم بإجراء تنظيف للجهاز من الملفات المؤقتة<br>4. تأكد من وجود مساحة تخزين كافية (أقل من 80% استخدام)<br>5. فكر في ترقية ذاكرة RAM إذا كانت المشكلة مستمرة",
                keywords: ["بطء", "بطيء", "توقف", "تجمد", "ثقل", "بطيئ", "بتعطل", "ما بتحرك", "بيسحب" , "الجهاز"],
                synonyms: ["الجهاز بطيء", "بطيء جدا", "ثابت", "ما بتحرك", "بيسحب", "بطيئ", "بطيء أوي", "بطيء قوي" , "الجهاز"]
            },
            {
                id: 3,
                problem: "شاشة سوداء",
                solution: "1. تحقق من كابل الشاشة وتأكد من توصيله بشكل صحيح<br>2. تأكد من تشغيل الشاشة وأنها موصولة بالكهرباء<br>3. جرب توصيل الشاشة بجهاز آخر للتأكد من سلامتها<br>4. إذا كان الجهاز محمولاً، اضغط على زر تشغيل الشاشة<br>5. جرب إعادة تشغيل الجهاز",
                keywords: ["شاشة سوداء", "لا تظهر صورة", "شاشة مطفأة", "لا إشارة", "سودة", "سودا", "سودة بالكامل", "ما في صورة" , "الشاشة واقفة" , "الشاشة"],
                synonyms: ["شاشة سوداء", "شاشة سودا", "ما في صورة", "سودة", "شاشة سودة", "ما بتظهر حاجة", "ظلام", "سودة كلياً"]
            },
            {
                id: 4,
                problem: "اتصال بالإنترنت",
                solution: "1. تحقق من اتصال الراوتر بالإنترنت (الأضواء الخضراء)<br>2. أعد تشغيل الراوتر والجهاز<br>3. تأكد من تفعيل اتصال الواي فاي على الجهاز<br>4. جرب الاتصال بشبكة أخرى للتأكد من أن المشكلة ليست في الشبكة<br>5. تحقق من إعدادات الشبكة وأعد ضبطها إذا لزم الأمر",
                keywords: ["انترنت", "واي فاي", "اتصال", "شبكة", "راوتر", "نت", "نتي", "نت بطيء", "ما بيدخل النت"  , "الانترنت"],
                synonyms: ["النت مش شغال", "النت مقطوع", "ما في نت", "ما بيدخل النت", "نت بطيء", "نتي مش بتشتغل", "الواي فاي مش شغال" , "الانترنت مش شغال" , "الانترنت بطيء"]
            },
            {
                id: 5,
                problem: "صوت غير واضح",
                solution: "1. تحقق من مستوى الصوت وتأكد من عدم كتمه<br>2. تأكد من توصيل السماعات بشكل صحيح<br>3. جرب استخدام سماعات أخرى للتأكد من عدم تلف السماعات<br>4. تحقق من إعدادات الصوت واختر الجهاز الصحيح للإخراج<br>5. قم بتحديث تعريفات الصوت",
                keywords: ["صوت", "سماعات", "مشاكل صوت", "صوت ضعيف", "تشويش", "ما في صوت", "صوت منخفض", "صوت مش واضح"],
                synonyms: ["ما في صوت", "الصوت مش طالع", "الصوت منخفض", "صوت مش واضح", "في تشويش", "الصوت مقطع", "الصوت ضعيف"]
            },
            {
                id: 6,
                problem: "جهاز يسخن كثيراً",
                solution: "1. تأكد من وجود مساحة كافية حول الجهاز للتهوية<br>2. نظف فتحات التهوية من الغبار والأتربة<br>3. تجنب استخدام الجهاز على الأسطح الناعمة مثل الفراش<br>4. استخدم قاعدة تبريد للاجهزة المحمولة<br>5. أغلب التطبيقات الثقيلة التي تستهلك موارد الجهاز",
                keywords: ["سخونة", "حرارة", "تبريد", "تهوية", "يسخن", "سخن", "حار", "بيسخن", "سخونة زيادة"],
                synonyms: ["الجهاز سخن", "بيسخن أوي", "سخونة زيادة", "حار قوي", "بيسخن بسرعة", "سخن زيادة", "حرارة عالية"]
            },
            {
                id: 7,
                problem: "كلمة مرور نسيتها",
                solution: "1. استخدم خيار 'نسيت كلمة المرور' في صفحة تسجيل الدخول<br>2. تحقق من بريدك الإلكتروني لرسالة إعادة تعيين كلمة المرور<br>3. إذا لم تستطع الوصول للبريد، اتصل بالدعم الفني<br>4. قد تحتاج إلى إعادة تعيين الجهاز كحل أخير (مع فقدان البيانات)",
                keywords: ["كلمة مرور", "نسيت", "دخول", "حساب", "تعيين", "باسورد", "نسيت الباسورد", "ما بعرف الباسورد"],
                synonyms: ["نسيت الباسورد", "ما بعرف الباسورد", "ما بعرف كلمة السر", "نسيت كلمة السر", "ما بقدر أدخل", "حسابي مقفل"]
            },
            {
                id: 8,
                problem: "بطارية لا تدوم طويلاً",
                solution: "1. قلل سطوع الشاشة<br>2. أغلق التطبيقات التي تعمل في الخلفية<br>3. عطل ميزات الموقع والبلوتوث عند عدم الحاجة<br>4. تحقق من التطبيقات التي تستهلك البطارية<br>5. فكر في استبدال البطارية إذا كانت قديمة",
                keywords: ["بطارية", "شحن", "تدوم", "تفرغ", "تخلص", "ما بتدوم", "بتخلص بسرعة"],
                synonyms: ["البطارية بتخلص", "البطارية بتخلص بسرعة", "ما بتدوم", "بتفرغ بسرعة", "شحن البطارية ضعيف", "البطارية ضعيفة"]
            }
        ];

        // عناصر DOM
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const resultsContainer = document.getElementById('results-container');
        const resultsCount = document.getElementById('results-count');
        const hints = document.querySelectorAll('.hint');
        const suggestedBtns = document.querySelectorAll('.suggested-btn');

        // تهيئة البحث عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', () => {
            searchInput.focus();
        });

        // البحث عند النقر على زر البحث
        searchButton.addEventListener('click', performSearch);

        // البحث عند الضغط على Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // البحث عند النقر على تلميحات البحث
        hints.forEach(hint => {
            hint.addEventListener('click', function() {
                searchInput.value = this.textContent.split(': ')[1];
                performSearch();
            });
        });

        // البحث عند النقر على الاقتراحات
        suggestedBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                searchInput.value = this.textContent;
                performSearch();
            });
        });

        // دالة البحث الرئيسية
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            
            if (!query) {
                showNoResults("اكتب مشكلتك في حقل البحث أعلاه");
                return;
            }
            
            // عرض حالة التحميل
            showLoading();
            
            // محاكاة تأخير للبحث
            setTimeout(() => {
                const results = searchKnowledgeBase(query);
                displayResults(results);
            }, 700);
        }

        // البحث المتقدم في قاعدة المعرفة
        function searchKnowledgeBase(query) {
            // تطبيع الاستعلام: إزالة التشكيل والفواصل والمساحات الزائدة
            const normalizedQuery = query
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
                .replace(/\s{2,}/g, ' ')
                .trim();
            
            // تقسيم الاستعلام إلى كلمات
            const queryWords = normalizedQuery.split(' ');
            
            return techKnowledgeBase.filter(item => {
                // البحث في المرادفات والمشكلة
                const allSearchTerms = [
                    ...item.synonyms,
                    item.problem,
                    ...item.keywords
                ].map(term => term.toLowerCase());
                
                // البحث عن تطابق جزئي أو كلي
                let matchScore = 0;
                
                // 1. البحث عن تطابق كامل
                if (allSearchTerms.some(term => term === normalizedQuery)) {
                    matchScore += 100;
                }
                
                // 2. البحث عن تطابق جزئي لكل كلمة
                queryWords.forEach(word => {
                    if (allSearchTerms.some(term => term.includes(word))) {
                        matchScore += 30;
                    }
                });
                
                // 3. البحث في الحلول (وزن أقل)
                if (item.solution.toLowerCase().includes(normalizedQuery)) {
                    matchScore += 10;
                }
                
                return matchScore > 0;
            }).sort((a, b) => {
                // إعادة ترتيب النتائج حسب درجة التطابق
                const aScore = calculateMatchScore(a, normalizedQuery, queryWords);
                const bScore = calculateMatchScore(b, normalizedQuery, queryWords);
                return bScore - aScore;
            });
        }

        // دالة حساب درجة التطابق
        function calculateMatchScore(item, query, queryWords) {
            let score = 0;
            const allSearchTerms = [
                ...item.synonyms,
                item.problem,
                ...item.keywords
            ].map(term => term.toLowerCase());
            
            // تطابق كامل
            if (allSearchTerms.some(term => term === query)) {
                score += 100;
            }
            
            // تطابق جزئي لكل كلمة
            queryWords.forEach(word => {
                if (allSearchTerms.some(term => term.includes(word))) {
                    score += 30;
                }
            });
            
            // تطابق في المشكلة (وزن أعلى)
            if (item.problem.toLowerCase().includes(query)) {
                score += 50;
            }
            
            // تطابق في الكلمات المفتاحية
            if (item.keywords.some(keyword => keyword.toLowerCase().includes(query))) {
                score += 40;
            }
            
            // تطابق في المرادفات
            if (item.synonyms.some(synonym => synonym.toLowerCase().includes(query))) {
                score += 35;
            }
            
            // تطابق في الحلول (وزن أقل)
            if (item.solution.toLowerCase().includes(query)) {
                score += 10;
            }
            
            return score;
        }

        // عرض النتائج
        function displayResults(results) {
            resultsContainer.innerHTML = '';
            resultsCount.textContent = results.length;
            
            if (results.length === 0) {
                showNoResults("لم نعثر على حلول لمشكلتك، جرب صياغة مختلفة");
                return;
            }
            
            results.forEach((item, index) => {
                const solutionCard = document.createElement('div');
                solutionCard.className = 'solution-card';
                solutionCard.innerHTML = `
                    <div class="solution-header">
                        <div class="solution-icon">
                            <i class="fas fa-tools"></i>
                        </div>
                        <h3 class="solution-title">${item.problem}</h3>
                    </div>
                    <div class="solution-content">
                        ${item.solution}
                    </div>
                `;
                solutionCard.style.animationDelay = `${index * 0.1}s`;
                resultsContainer.appendChild(solutionCard);
            });
        }

        // عرض حالة التحميل
        function showLoading() {
            resultsContainer.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <p>جاري فهم مشكلتك والبحث عن الحلول المناسبة...</p>
                </div>
            `;
        }

        // عرض حالة عدم وجود نتائج
        function showNoResults(message) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>${message}</h3>
                    <p>جرب استخدام كلمات مفتاحية مختلفة أو تصفح الاقتراحات التالية:</p>
                    
                    <div class="suggested-searches">
                        <button class="suggested-btn"><i class="fas fa-bolt"></i> الجهاز مش بيشتغل</button>
                        <button class="suggested-btn"><i class="fas fa-tachometer-alt"></i> الكمبيوتر بطيء</button>
                        <button class="suggested-btn"><i class="fas fa-wifi"></i> مشاكل النت</button>
                        <button class="suggested-btn"><i class="fas fa-battery-quarter"></i> البطارية بتخلص</button>
                    </div>
                </div>
            `;
            resultsCount.textContent = '0';
        }