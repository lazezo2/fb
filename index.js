const fs = require('fs');
const path = require('path');

// ==========================================
// ⚙️ إعدادات السكربت (سهلة التعديل)
// ==========================================
const BLOG_URL = 'https://elmanzel-el3asry.blogspot.com'; // رابط مدونتك بدون سلاش في النهاية
const MAX_POSTS_TO_SAVE = 10; // عدد المقالات التي تريد حفظها في كل ملف
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

// دالة لتنظيف واختصار بيانات المقال + إضافة المتطلبات الجديدة
function cleanPostData(entry) {
    if (!entry) return null;
    
    // 1. استخراج رابط المقال
    const alternateLink = entry.link ? entry.link.find(l => l.rel === 'alternate') : null;
    
    // 2. استخراج عدد التعليقات (من قسم thr$total أو من روابط الـ replies)
    let commentsCount = 0;
    if (entry.thr$total && entry.thr$total.$t) {
        commentsCount = parseInt(entry.thr$total.$t, 10);
    } else {
        const repliesLink = entry.link ? entry.link.find(l => l.rel === 'replies' && l.type === 'text/html') : null;
        if (repliesLink && repliesLink.title) {
            commentsCount = parseInt(repliesLink.title.replace(/[^0-9]/g, ''), 10) || 0;
        }
    }

    // 3. استخراج بيانات المؤلف بدقة
    const authorData = entry.author && entry.author[0] ? entry.author[0] : {};
    const authorName = authorData.name ? authorData.name.$t : '';
    const authorUrl = authorData.uri ? authorData.uri.$t : '';
    const authorImg = authorData.gd$image ? authorData.gd$image.src : 'https://img1.blogblog.com/img/b16-rounded.gif';

    return {
        id: entry.id && entry.id.$t ? entry.id.$t.split('post-')[1] : '',
        title: entry.title ? entry.title.$t : '',
        summary: entry.summary ? entry.summary.$t : '',
        url: alternateLink ? alternateLink.href : '',
        thumb: entry.media$thumbnail ? entry.media$thumbnail.url : '',
        category: entry.category ? entry.category.map(c => c.term) : [],
        
        // ✨ البيانات الجديدة المضافة بناءً على طلبك:
        updated: entry.updated ? entry.updated.$t : '', // تاريخ آخر تعديل للبوست
        comments: commentsCount, // عدد التعليقات الرقمي
        author: {
            name: authorName, // اسم المؤلف
            url: authorUrl,   // رابط ملفه الشخصي
            img: authorImg    // صورة المؤلف
        }
    };
}

async function startAutomation() {
    try {
        console.log(`⏳ جاري بدء جلب البيانات باستخدام بيئة Node.js 24 للمدونة: ${BLOG_URL}`);
        
        const mainFeedUrl = `${BLOG_URL}/feeds/posts/summary/?alt=json&start-index=1&max-results=999`;
        const mainResponse = await fetch(mainFeedUrl);
        const mainData = await mainResponse.json();
        
        // استخراج قائمة الأقسام
        const categoriesRaw = mainData.feed.category || [];
        const allLabels = categoriesRaw.map(c => c.term);
        console.log(`📋 تم العثور على الأقسام التالية:`, allLabels);

        // معالجة المقالات العامة
        const mainEntries = mainData.feed.entry || [];
        const allCleanMainPosts = mainEntries.map(cleanPostData).filter(Boolean);

        // حفظ ملف أحدث المقالات العامة
        const latestMainPosts = allCleanMainPosts.slice(0, MAX_POSTS_TO_SAVE);
        fs.writeFileSync('post.json', JSON.stringify(latestMainPosts, null, 2));
        console.log(`✅ تم حفظ ملف أحدث المقالات العامة: post.json`);

        // حفظ ملف المقالات العامة العشوائية
        const randomMainPosts = getRandomPosts(allCleanMainPosts, MAX_POSTS_TO_SAVE);
        fs.writeFileSync('post-r.json', JSON.stringify(randomMainPosts, null, 2));
        console.log(`✅ تم حفظ ملف المقالات العامة العشوائية: post-r.json`);

        // جلب وحفظ ملفات الأقسام بالتفصيل
        for (const label of allLabels) {
            try {
                console.log(`⏳ جاري جلب القسم: [ ${label} ]`);
                
                const encodedLabel = encodeURIComponent(label);
                const labelFeedUrl = `${BLOG_URL}/feeds/posts/summary/-/${encodedLabel}?alt=json&start-index=1&max-results=999`;
                
                const labelResponse = await fetch(labelFeedUrl);
                if (!labelResponse.ok) throw new Error(`HTTP error! status: ${labelResponse.status}`);
                
                const labelData = await labelResponse.json();
                const labelEntries = labelData.feed.entry || [];
                const allCleanLabelPosts = labelEntries.map(cleanPostData).filter(Boolean);

                // 💡 فك التشفير هنا ليكون اسم الملف باللغة العربية الواضحة في جيتهب
                const safeLabelName = decodeURIComponent(label);

                // حفظ أحدث مقالات القسم بالعربية
                const latestLabelPosts = allCleanLabelPosts.slice(0, MAX_POSTS_TO_SAVE);
                fs.writeFileSync(path.join(labelsDir, `${safeLabelName}.json`), JSON.stringify(latestLabelPosts, null, 2));

                // حفظ مقالات عشوائية للقسم بالعربية
                const randomLabelPosts = getRandomPosts(allCleanLabelPosts, MAX_POSTS_TO_SAVE);
                fs.writeFileSync(path.join(labelsDir, `${safeLabelName}-r.json`), JSON.stringify(randomLabelPosts, null, 2));

                console.log(`   └─ Done: ${safeLabelName}.json & ${safeLabelName}-r.json`);
                
                await new Promise(resolve => setTimeout(resolve, 500));

            } catch (labelError) {
                console.error(`❌ فشل معالجة القسم [ ${label} ] بسبب:`, labelError.message);
            }
        }

        console.log('🎉 تمت العملية بنجاح والمستودع جاهز ومحدث ببيانات نود 24 الجديدة!');

    } catch (error) {
        console.error('💥 خطأ فادح في السكربت:', error);
        process.exit(1);
    }
}

startAutomation();
