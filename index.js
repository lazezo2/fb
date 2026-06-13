const fs = require('fs');
const path = require('path');

// ==========================================
// ⚙️ إعدادات السكربت (سهلة التعديل)
// ==========================================
const BLOG_URL = 'https://rtl-demo.seoplus-template.com'; // رابط مدونتك بدون ستاش في النهاية
const MAX_POSTS_TO_SAVE = 10; // عدد المقالات التي تريد حفظها في كل ملف
// ==========================================

// إنشاء مجلد التسميات إذا لم يكن موجوداً
const labelsDir = path.join(__dirname, 'labels');
if (!fs.existsSync(labelsDir)){
    fs.mkdirSync(labelsDir);
}

// دالة لمسح المصفوفة بشكل عشوائي (Fisher-Yates Shuffle) لضمان عشوائية حقيقية
function getRandomPosts(postsArray, count) {
    const shuffled = [...postsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// دالة لتنظيف واختصار بيانات المقال القادم من بلوجر
function cleanPostData(entry) {
    if (!entry) return null;
    const alternateLink = entry.link ? entry.link.find(l => l.rel === 'alternate') : null;
    return {
        id: entry.id && entry.id.$t ? entry.id.$t.split('post-')[1] : '',
        title: entry.title ? entry.title.$t : '',
        summary: entry.summary ? entry.summary.$t : '',
        url: alternateLink ? alternateLink.href : '',
        thumb: entry.media$thumbnail ? entry.media$thumbnail.url : '',
        category: entry.category ? entry.category.map(c => c.term) : []
    };
}

async function startAutomation() {
    try {
        console.log(`⏳ جاري بدء جلب البيانات من المدونة: ${BLOG_URL}`);
        
        // ----------------------------------------------------
        // الخطوة 1: جلب الفيد العام للموقع للحصول على الأقسام وأحدث المقالات
        // ----------------------------------------------------
        const mainFeedUrl = `${BLOG_URL}/feeds/posts/summary/?alt=json&start-index=1&max-results=999`;
        const mainResponse = await fetch(mainFeedUrl);
        const mainData = await mainResponse.json();
        
        // استخراج قائمة الأقسام (Labels) من رأس الفيد
        const categoriesRaw = mainData.feed.category || [];
        const allLabels = categoriesRaw.map(c => c.term);
        console.log(`📋 تم العثور على الأقسام التالية:`, allLabels);

        // استخراج المقالات العامة واختصارها
        const mainEntries = mainData.feed.entry || [];
        const allCleanMainPosts = mainEntries.map(cleanPostData).filter(Boolean);

        // حفظ ملف أحدث 10 مقالات عامة (post.json)
        const latestMainPosts = allCleanMainPosts.slice(0, MAX_POSTS_TO_SAVE);
        fs.writeFileSync('post.json', JSON.stringify(latestMainPosts, null, 2));
        console.log(`✅ تم حفظ ملف أحدث المقالات العامة: post.json`);

        // حفظ ملف 10 مقالات عامة عشوائية (post-r.json)
        const randomMainPosts = getRandomPosts(allCleanMainPosts, MAX_POSTS_TO_SAVE);
        fs.writeFileSync('post-r.json', JSON.stringify(randomMainPosts, null, 2));
        console.log(`✅ تم حفظ ملف المقالات العامة العشوائية: post-r.json`);

        // ----------------------------------------------------
        // الخطوة 2: المرور على كل قسم وجلب مقالاته بالكامل بشكل منفصل
        // ----------------------------------------------------
        for (const label of allLabels) {
            try {
                console.log(`⏳ جاري جلب المقالات للقسم: [ ${label} ]`);
                
                // تشفير اسم القسم ليكون صالحاً للرابط (مثال: تحويل المسافات واللغة العربية)
                const encodedLabel = encodeURIComponent(label);
                const labelFeedUrl = `${BLOG_URL}/feeds/posts/summary/-/${encodedLabel}?alt=json&start-index=1&max-results=999`;
                
                const labelResponse = await fetch(labelFeedUrl);
                if (!labelResponse.ok)  throw new Error(`Blogger HTTP error! status: ${labelResponse.status}`);
                
                const labelData = await labelResponse.json();
                const labelEntries = labelData.feed.entry || [];
                const allCleanLabelPosts = labelEntries.map(cleanPostData).filter(Boolean);

                // اسم ملف نظيف وآمن للحفظ
                const safeFileName = encodeURIComponent(label);

                // حفظ أحدث 10 مقالات للقسم
                const latestLabelPosts = allCleanLabelPosts.slice(0, MAX_POSTS_TO_SAVE);
                fs.writeFileSync(path.join(labelsDir, `${safeFileName}.json`), JSON.stringify(latestLabelPosts, null, 2));

                // حفظ 10 مقالات عشوائية للقسم
                const randomLabelPosts = getRandomPosts(allCleanLabelPosts, MAX_POSTS_TO_SAVE);
                fs.writeFileSync(path.join(labelsDir, `${safeFileName}-r.json`), JSON.stringify(randomLabelPosts, null, 2));

                console.log(`   └─ Done: ${label}.json & ${label}-r.json`);
                
                // فترة توقف قصيرة جداً (نصف ثانية) بين الطلبات لتجنب حظر سيرفرات جوجل للـ Action
                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (labelError) {
                console.error(`❌ فشل معالجة القسم [ ${label} ] وبسبب الخطأ:`, labelError.message);
            }
        }

        console.log('🎉 تمت العملية بالكامل بنجاح والموقع جاهز للنشر!');

    } catch (error) {
        console.error('💥 حدث خطأ فادح في السكربت الرئيسي:', error);
        process.exit(1);
    }
}

startAutomation();
