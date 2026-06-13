const fs = require('fs');
const path = require('path');

// ==========================================
// ⚙️ إعدادات السكربت (سهلة التعديل)
// ==========================================
const BLOG_URL = 'https://rtl-demo.seoplus-template.com'; // رابط مدونتك بدون سلاش في النهاية
const MAX_POSTS_TO_SAVE = 10; // عدد المقالات التي تريد حفظها في كل ملف
const SUMMARY_LENGTH = 100;    // طول مقتطف المقال (عدد الحروف)

const MULTI_USER = false;      // true: بيانات الكاتب داخل كل بوست | false: بيانات الكاتب في رأس الملف مرة واحدة
const USE_ALT_IMAGE = true;   // تفعيل الصورة الاحتياطية في حال عدم وجود صور بالبوست
const ALT_IMAGE_LIST = [      // قائمة الصور الاحتياطية العشوائية
    "https://placehold.co/600x400/png?text=No+Image"
];
// ==========================================

// إنشاء مجلد التسميات إذا لم يكن موجوداً
const labelsDir = path.join(__dirname, 'labels');
if (!fs.existsSync(labelsDir)){
    fs.mkdirSync(labelsDir);
}

// دالة لمسح مصفوفة المقالات بشكل عشوائي
function getRandomPosts(postsArray, count) {
    const shuffled = [...postsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// دالة لاستخراج الصورة من داخل المحتوى النصي (HTML) للمقال
function getFirstImgSrc(htmlContent) {
    if (!htmlContent) return null;
    // عبارة نمطية للبحث عن أول وسام src لـ img
    const match = htmlContent.match(/<img[^>]+src="([^">]+)"/i);
    return match ? match[1] : null;
}

// دالة لتنظيف واختصار بيانات المقال مع إضافة البدائل الذكية لمنع التعطل
function cleanPostData(entry, defaultBlogTitle) {
    if (!entry) return null;
    
    // 1. استخراج رابط المقال البديل (البحث الذكي في قائمة الروابط)
    let postUrl = '';
    if (entry.link && Array.isArray(entry.link)) {
        const alternateLink = entry.link.find(l => l.rel === 'alternate');
        if (alternateLink) postUrl = alternateLink.href;
    }
    
    // 2. استخراج عدد التعليقات (البحث في الخيار الافتراضي والبديل)
    let commentsCount = 0;
    if (entry.thr$total && entry.thr$total.$t) {
        commentsCount = parseInt(entry.thr$total.$t, 10);
    } else if (entry.link) {
        const repliesLink = entry.link.find(l => l.rel === 'replies' && l.type === 'text/html');
        if (repliesLink && repliesLink.title) {
            commentsCount = parseInt(repliesLink.title.replace(/[^0-9]/g, ''), 10) || 0;
        }
    }

    // 3. استخراج المقتطف النصي وتنظيفه من وسوم HTML (Regex مطور ومضمون)
    const rawContent = (entry.content && entry.content.$t) || (entry.summary && entry.summary.$t) || '';
    let cleanSummary = rawContent.replace(/<\/?[^>]+(>|$)/g, "").trim();
    if (cleanSummary.length > SUMMARY_LENGTH) {
        cleanSummary = cleanSummary.substring(0, SUMMARY_LENGTH) + '...';
    }

    // 4. استخراج الصورة بالترتيب المذكور في كود الجافا الخاص بك
    const contentHtml = entry.content ? entry.content.$t : '';
    const imgFromContent = getFirstImgSrc(contentHtml);
    
    let finalThumb = '#noThumb';
    if (imgFromContent) {
        finalThumb = imgFromContent;
    } else if (entry.media$thumbnail && entry.media$thumbnail.url) {
        finalThumb = entry.media$thumbnail.url;
    } else if (USE_ALT_IMAGE && ALT_IMAGE_LIST.length > 0) {
        finalThumb = ALT_IMAGE_LIST[Math.floor(Math.random() * ALT_IMAGE_LIST.length)];
    }

    // بناء كائن البوست الأساسي
    const postObj = {
        id: entry.id && entry.id.$t ? entry.id.$t.split('post-')[1] : '',
        title: entry.title ? entry.title.$t : '',
        summary: cleanSummary,
        url: postUrl,
        thumb: finalThumb,
        category: entry.category ? entry.category.map(c => c.term) : [],
        updated: entry.updated ? entry.updated.$t : '',
        comments: commentsCount
    };

    // 5. إضافة بيانات الكاتب للبوست فقط إذا كان خيار MULTI_USER مفعلاً
    if (MULTI_USER) {
        const authorData = entry.author && entry.author[0] ? entry.author[0] : {};
        postObj.author = {
            name: authorData.name ? authorData.name.$t : defaultBlogTitle,
            url: authorData.uri ? authorData.uri.$t : '',
            img: authorData.gd$image ? authorData.gd$image.src : 'https://placehold.co/40x40'
        };
    }

    return postObj;
}

// دالة لهيكلة الملف النهائي بناءً على خيار الملت يوزر لتقليل الحجم
function structureFinalJson(postsArray, blogAuthorObj) {
    if (MULTI_USER) {
        // إذا كان ترو، يرجع المصفوفة مباشرة كما هي (كل بوست بداخله كاتبه)
        return postsArray;
    } else {
        // إذا كان فولس، يدمج بيانات كاتب المدونة مرة واحدة في الرأس مع المقالات
        return {
            blogAuthor: blogAuthorObj,
            posts: postsArray
        };
    }
}

async function startAutomation() {
    try {
        console.log(`⏳ جاري جلب البيانات ومعالجتها ذكياً للمدونة: ${BLOG_URL}`);
        
        const mainFeedUrl = `${BLOG_URL}/feeds/posts/summary/?alt=json&start-index=1&max-results=999`;
        const mainResponse = await fetch(mainFeedUrl);
        const mainData = await mainResponse.json();
        
        const blogTitle = mainData.feed.title ? mainData.feed.title.$t : 'Blogger';
        
        // استخراج بيانات كاتب المدونة العام (الناشر الرئيسي) لاستخدامه عند تعطيل MULTI_USER
        const mainAuthorRaw = mainData.feed.author && mainData.feed.author[0] ? mainData.feed.author[0] : {};
        const blogMainAuthor = {
            name: mainAuthorRaw.name ? mainAuthorRaw.name.$t : blogTitle,
            url: mainAuthorRaw.uri ? mainAuthorRaw.uri.$t : '',
            img: mainAuthorRaw.gd$image ? mainAuthorRaw.gd$image.src : 'https://placehold.co/40x40'
        };

        // استخراج قائمة الأقسام
        const categoriesRaw = mainData.feed.category || [];
        const allLabels = categoriesRaw.map(c => c.term);

        // معالجة المقالات العامة
        const mainEntries = mainData.feed.entry || [];
        const allCleanMainPosts = mainEntries.map(entry => cleanPostData(entry, blogTitle)).filter(Boolean);

        // حفظ ملف أحدث المقالات العامة
        const latestMainPosts = allCleanMainPosts.slice(0, MAX_POSTS_TO_SAVE);
        fs.writeFileSync('post.json', JSON.stringify(structureFinalJson(latestMainPosts, blogMainAuthor), null, 2));

        // حفظ ملف المقالات العامة العشوائية
        const randomMainPosts = getRandomPosts(allCleanMainPosts, MAX_POSTS_TO_SAVE);
        fs.writeFileSync('post-r.json', JSON.stringify(structureFinalJson(randomMainPosts, blogMainAuthor), null, 2));

        console.log(`✅ تم حفظ الملفات الرئيسية العامة بنجاح.`);

        // جلب وحفظ ملفات الأقسام بالتفصيل
        for (const label of allLabels) {
            try {
                const encodedLabel = encodeURIComponent(label);
                const labelFeedUrl = `${BLOG_URL}/feeds/posts/summary/-/${encodedLabel}?alt=json&start-index=1&max-results=999`;
                
                const labelResponse = await fetch(labelFeedUrl);
                if (!labelResponse.ok) continue;
                
                const labelData = await labelResponse.json();
                const labelEntries = labelData.feed.entry || [];
                const allCleanLabelPosts = labelEntries.map(entry => cleanPostData(entry, blogTitle)).filter(Boolean);

                const safeLabelName = decodeURIComponent(label);

                // حفظ أحدث مقالات القسم
                const latestLabelPosts = allCleanLabelPosts.slice(0, MAX_POSTS_TO_SAVE);
                fs.writeFileSync(path.join(labelsDir, `${safeLabelName}.json`), JSON.stringify(structureFinalJson(latestLabelPosts, blogMainAuthor), null, 2));

                // حفظ مقالات عشوائية للقسم
                const randomLabelPosts = getRandomPosts(allCleanLabelPosts, MAX_POSTS_TO_SAVE);
                fs.writeFileSync(path.join(labelsDir, `${safeLabelName}-r.json`), JSON.stringify(structureFinalJson(randomLabelPosts, blogMainAuthor), null, 2));

                console.log(`   └─ Done: ${safeLabelName}.json`);
                
                await new Promise(resolve => setTimeout(resolve, 300));

            } catch (labelError) {
                console.error(`❌ خطأ في القسم [ ${label} ]:`, labelError.message);
            }
        }

        console.log('🎉 اكتمل تحديث وهيكلة الملفات بنجاح!');

    } catch (error) {
        console.error('💥 خطأ فادح في السكربت:', error);
        process.exit(1);
    }
}

startAutomation();
