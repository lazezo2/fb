 
		  
		  if(isPost || isPage){
		  // 1. share build function

share_build_status = false;  
function share_build() {
  if(share_build_status) return;
  var container = document.querySelector(".share-container");
  if (!container) return;

//this css removed from template with the below div		
var style_share = document.createElement("style");
style_share.textContent = `.share-container{display:flex;align-items:center;gap:8px;flex-wrap:wrap;position:relative}.share-container .shbtn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;color:#fff;transition:all .3s ease;opacity:0;transform:scale(.5);pointer-events:none;margin-left:-48px;font-size:0}.share-container .shbtn svg{width:20px;height:20px}.share-container .btn-more,.share-container .shbtn.facebook,.share-container .shbtn.twitter,.share-container .shbtn.whatsapp{margin-left:0;opacity:1;transform:scale(1);pointer-events:auto}.share-container .shbtn.visible{margin-left:0;opacity:1;transform:scale(1);pointer-events:auto}.share-container .btn-more{background:#555;color:#fff;cursor:pointer;width:40px;height:40px;border-radius:50%;border:none;font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;transition:transform .3s ease}.share-container .btn-more.active{transform:rotate(180deg)}.shbtn.facebook{background:#1877f2}.shbtn.whatsapp{background:#25d366}.shbtn.twitter{background:#1da1f2}.shbtn.telegram{background:#08c}.shbtn.youtube{background:red}.shbtn.pinterest{background:#e60023}.shbtn.linkedin{background:#0077b5}.shbtn.line{background:#00b900}.shbtn.email{background:#888}.shbtn.reddit{background:#ff4500}.shbtn.print{background:#555}@media (max-width:640px){.share-container{gap:6px}.share-container .shbtn{width:36px;height:36px;margin-left:-42px}.share-container .shbtn svg{width:18px;height:18px}.share-container .btn-more{width:36px;height:36px;font-size:20px}}@media (max-width:320px){.share-container{gap:4px}.share-container .shbtn{width:32px;height:32px;margin-left:-38px}.share-container .shbtn svg{width:16px;height:16px}.share-container .btn-more{width:32px;height:32px;font-size:18px}}`;
document.head.appendChild(style_share);

  // رابط الصفحة والعنوان
  var pageUrl = encodeURIComponent(window.location.href);
  var pageTitle = encodeURIComponent(document.title);

  // الأزرار
  var buttonsHTML = `
    <a aria-label="Facebook" class="shbtn facebook" target="_blank"
       href="https://www.facebook.com/sharer/sharer.php?u=${pageUrl}">
       <svg><use href="#svg-facebook"></use></svg>
    </a>
    <a aria-label="Whatsapp" class="shbtn whatsapp" target="_blank"
       href="https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}">
       <svg><use href="#svg-whatsapp"></use></svg>
    </a>
    <a aria-label="Twitter" class="shbtn twitter" target="_blank"
       href="https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}">
       <svg><use href="#svg-twitter"></use></svg>
    </a>
    <a aria-label="Telegram" class="shbtn telegram" target="_blank"
       href="https://t.me/share/url?url=${pageUrl}&text=${pageTitle}">
       <svg><use href="#svg-telegram"></use></svg>
    </a>
    <a aria-label="YouTube" class="shbtn youtube" target="_blank"
       href="https://www.youtube.com/">
       <svg><use href="#svg-youtube"></use></svg>
    </a>
    <a aria-label="Pinterest" class="shbtn pinterest" target="_blank"
       href="https://pinterest.com/pin/create/button/?url=${pageUrl}&description=${pageTitle}">
       <svg><use href="#svg-pinterest"></use></svg>
    </a>
    <a aria-label="LinkedIn" class="shbtn linkedin" target="_blank"
       href="https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}">
       <svg><use href="#svg-linkedin"></use></svg>
    </a>
    <a aria-label="Line" class="shbtn line" target="_blank"
       href="https://social-plugins.line.me/lineit/share?url=${pageUrl}">
       <svg><use href="#svg-line"></use></svg>
    </a>
    <a aria-label="Email" class="shbtn email" target="_blank"
       href="mailto:?subject=${pageTitle}&body=${pageUrl}">
       <svg><use href="#svg-email"></use></svg>
    </a>
    <a aria-label="Reddit" class="shbtn reddit" target="_blank"
       href="https://www.reddit.com/submit?url=${pageUrl}&title=${pageTitle}">
       <svg><use href="#svg-reddit"></use></svg>
    </a>
    <a aria-label="Print" class="shbtn print" href="javascript:window.print()">
       <svg><use href="#svg-print"></use></svg>
    </a>
    <button aria-label = 'المزيد من مواقع المشاركة' class="btn-more">+</button>
  `;
  
  container.innerHTML = buttonsHTML;
  share_build_status = true;

  var btnMore = container.querySelector(".btn-more");
  var hiddenBtns = Array.from(container.querySelectorAll(".shbtn")).slice(3); // فيسبوك + 2 أزرار ظاهرين

  let expanded = false;

  btnMore.addEventListener("click", () => {
    expanded = !expanded;
    btnMore.classList.toggle("active");
    btnMore.textContent = expanded ? "−" : "+";

    if (expanded) {
      hiddenBtns.forEach((btn, i) => {
        setTimeout(() => btn.classList.add("visible"), i * 100);
      });
    } else {
      hiddenBtns.reverse().forEach((btn, i) => {
        setTimeout(() => btn.classList.remove("visible"), i * 100);
      });
      hiddenBtns.reverse();
    }
  });
  
  
 } 
 
 
 
        // 2. post setting build
		setting_build_status = false;
		function setting_build(){
		if (setting_build_status) return;
		var postBody = document.querySelector(".article-body");

  // Reset styles
  function resetStyles() {
    document.querySelectorAll(".article-body *").forEach(el => el.removeAttribute("style"));
  }

  // ---- Font Size ----
  let fntBox = document.querySelector(".cs-font"),
      fntNum = fntBox.querySelector(".cs-current span"),
      fntSize = parseInt(fntNum.innerText),
      fntAdd = fntBox.querySelector(".cs-add"),
      fntMin = fntBox.querySelector(".cs-min");

  fntAdd.addEventListener("click", () => {
    resetStyles();
    if (fntSize < 29) {
      fntSize++;
      postBody.style.fontSize = fntSize + "px";
      fntNum.innerText = fntSize;
      localStorage.setItem("postFontSize", fntSize);
      fntMin.classList.remove("enf");
    } else fntAdd.classList.add("enf");
  });

  fntMin.addEventListener("click", () => {
    resetStyles();
    if (fntSize > 14) {
      fntSize--;
      postBody.style.fontSize = fntSize + "px";
      fntNum.innerText = fntSize;
      localStorage.setItem("postFontSize", fntSize);
      fntAdd.classList.remove("enf");
    } else fntMin.classList.add("enf");
  });

  // ---- Line Height ----
  let lnBox = document.querySelector(".cs-line"),
      lnNum = lnBox.querySelector(".cs-current span"),
      lnSize = parseFloat(lnNum.innerText),
      lnAdd = lnBox.querySelector(".cs-add"),
      lnMin = lnBox.querySelector(".cs-min");

  lnAdd.addEventListener("click", () => {
    if (lnSize < 4) {
      lnSize++;
      postBody.style.lineHeight = lnSize + "em";
      lnNum.innerText = lnSize;
      localStorage.setItem("postLineHeight", lnSize);
      lnMin.classList.remove("enf");
    } else lnAdd.classList.add("enf");
  });

  lnMin.addEventListener("click", () => {
    if (lnSize > 2) {
      lnSize--;
      postBody.style.lineHeight = lnSize + "em";
      lnNum.innerText = lnSize;
      localStorage.setItem("postLineHeight", lnSize);
      lnAdd.classList.remove("enf");
    } else lnMin.classList.add("enf");
  });
	setting_build_status = true;	
		}
 
 
       // 3. areacode
       codebox_build_status = false;
       function codebox_build(){
          if (codebox_build_status) return;
          if (document.querySelector(".article-body .areacode, .article-body pre, .article-body code")) {
          if (codebox =="3px")
          //loadPrism
          {
          function loadPrism(){const e=document.createElement("link");e.rel="stylesheet",e.href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css",document.head.appendChild(e);const o=document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",o.onload=function(){const e=document.createElement("script");e.src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js",document.head.appendChild(e)},document.head.appendChild(o);var t=document.createElement("style");t.textContent='.areacode{direction:ltr;text-align:left}.areacode{background:#272822;color:#f8f8f2;padding:10px;border-radius:8px;font-family:monospace;font-size:14px;overflow-x:auto;cursor:pointer}pre{background:#2d2d2d;color:#ccc;padding:15px;border-radius:8px;overflow-x:auto;font-size:14px;line-height:1.5;margin:15px 0;width:100%;box-sizing:border-box}pre code{display:block;width:100%;white-space:pre;font-family:"Fira Code",monospace}pre,pre code{direction:ltr;text-align:left}',document.head.appendChild(t)}
          loadPrism();
          //fix background
          var style_share = document.createElement("style");
          style_share.textContent = `code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:#000;text-shadow:none;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:.9em}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#6272a4}.token.punctuation{color:#f8f8f2}.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag{color:#ff79c6}.token.boolean,.token.number{color:#bd93f9}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#50fa7b}.token.entity,.token.operator,.token.url{color:#f8f8f2}.token.keyword{color:#ff79c6}.token.function{color:#50fa7b}.token.variable{color:#f8f8f2}`;
          document.head.appendChild(style_share);
          }

          if (codebox !="1px")
          {
          //codebox =2 or 3
          //copy code box
          //
          !function () {
              function copyText(e) {
                  return e
                      ? navigator.clipboard && navigator.clipboard.writeText
                          ? navigator.clipboard.writeText(e)
                          : (function (e) {
                              return new Promise(((t, n) => {
                                  try {
                                      const o = document.createElement("textarea");
                                      o.value = e;
                                      o.setAttribute("readonly", "");
                                      o.style.position = "absolute";
                                      o.style.left = "-9999px";
                                      document.body.appendChild(o);
                                      o.select();
                                      const c = document.execCommand("copy");
                                      document.body.removeChild(o);
                                      c ? t() : n(new Error("execCommand returned false"));
                                  } catch (e) {
                                      n(e);
                                  }
                              }))
                          })(e)
                      : Promise.reject(new Error("لا يوجد نص لنسخه"));
              }

              let timer = null;

              function showNotice(msg = "✅ تم النسخ", delay = 2000) {
                  const o = (function () {
                      let e = document.getElementById("copyNotice");
                      if (e) return e;
                      e = document.createElement("div");
                      e.id = "copyNotice";
                      e.setAttribute("aria-live", "polite");
                      e.textContent = "✅ تم النسخ";
                      document.body.appendChild(e);

                      if (!document.getElementById("copyNoticeStyle")) {
                          const style = document.createElement("style");
                          style.id = "copyNoticeStyle";
                          style.textContent = `
                  #copyNotice {
                    position: fixed;
                    top: 20px;
                    right: -220px;
                    background: rgba(0,0,0,0.85);
                    color: #fff;
                    padding: 10px 14px;
                    border-radius: 8px;
                    font-size: 14px;
                    box-shadow: 0 6px 18px rgba(0,0,0,0.35);
                    transition: right 0.33s ease, opacity 0.33s ease;
                    opacity: 0;
                    z-index: 99999;
                    pointer-events: none;
                  }
                  #copyNotice.show {
                    right: 20px;
                    opacity: 1;
                  }
                  .areacode, pre, code { cursor: pointer; }
                `;
                          document.head.appendChild(style);
                      }
                      return e;
                  })();
                  o.textContent = msg;
                  o.classList.add("show");
                  timer && clearTimeout(timer);
                  timer = setTimeout(() => {
                      o.classList.remove("show");
                      timer = null;
                  }, delay);
              }

              document.addEventListener("click", function (t) {
                  const target =
                      t.target.closest(".areacode, pre, code");

                  if (!target) return;
                  codebox_build_status = true;
                  // استبعاد اللي جوّه areacode أو pre أو code تاني
                  if (
                      target.closest(".areacode") && !target.classList.contains("areacode") ||
                      target.closest("pre") && target.tagName.toLowerCase() !== "pre" ||
                      target.closest("code") && target.tagName.toLowerCase() !== "code"
                  ) {
                      return;
                  }

                  t.preventDefault();
                  const content = target.innerText.trim();
                  console.log("[debug] copy target:", target.tagName, "len:", content.length);

                  copyText(content)
                      .then(() => {
                          console.log("[debug] copy ok");
                          showNotice("✅ تم النسخ");
                      })
                      .catch(err => {
                          console.error("[debug] copy failed:", err);
                          showNotice("⚠️ فشل النسخ — افتح الكونسول للمزيد");
                      });
              });

              navigator.clipboard && navigator.clipboard.writeText ||
                  console.info("معلومة: متصفحك لا يدعم navigator.clipboard.writeText؛ fallback (execCommand) هيشتغل.");
          }();
          //
          }
          }
          }

          
		   // 4. table of content
		   buildTOC_status = false;
		   function buildTOC() {
  		   if(buildTOC_status) return;
  		   const post = document.querySelector(".float-holder");
  		   var temptoc = document.querySelector(".toc-box");
		   if (post && !temptoc) {
		   // create table div!
 		    const tocwrapper = document.createElement("div");
 		    tocwrapper.innerHTML = `
   		    <div class="toc-box">
     		    <div class="toc-header tno closed">الفهرس <span class="toc-icon">▼</span></div>
    		     <ul style="display: none;"></ul>
    		   </div>`;
  
  		   post.insertBefore(tocwrapper.firstElementChild, post.firstChild);
		   }

  		   if (!post) return;

 		    //const headings = post.querySelectorAll("h2:not(.post-title), h3:not(.post-title), h4:not(.post-title)");
 		    //const headings = post.querySelectorAll("h2:not(.post-title):not(.areacode):not(pre *), h3:not(.post-title):not(.areacode):not(pre *), h4:not(.post-title):not(.areacode):not(pre *)");
 		    //const headings = post.querySelectorAll("h2:not(.HTML *):not(.areacode *):not(code *):not(pre code *):not(.randomposts *), h3:not(.HTML *):not(.areacode *):not(code *):not(pre code *):not(.randomposts *), h4:not(.HTML *):not(.areacode *):not(code *):not(pre code *):not(.randomposts *)");
 		    const headings = Array.from(post.querySelectorAll("h2:not(.HTML *):not(.areacode *):not(code *):not(pre code *):not(.randomposts *), h3:not(.HTML *):not(.areacode *):not(code *):not(pre code *):not(.randomposts *), h4:not(.HTML *):not(.areacode *):not(code *):not(pre code *):not(.randomposts *)")).filter(el => !el.closest("#download-box"));
 		    
			if (headings.length === 0) return;

 		    const listRoot = document.querySelector(".toc-box ul");
 		    listRoot.innerHTML = "";

  
 		    // Counters
 		    let h2Count = 0, h3Count = 0, h4Count = 0;

 		    let currentUl2 = null; // for H3
 		    let currentUl3 = null; // for H4

 		    headings.forEach((h, i) => {
  		     const tag = h.tagName.toLowerCase();
  		     const id = "toc-point-" + i;
			 //remove digits and dot in begain of title
			 const htext = h.textContent
             .replace(/\n/g, '')             // يشيل السطر الجديد
             .replace(/^[\d.\-/*_ ]+/, '');  // يشيل الأرقام والنقط والرموز لو فى أول الجملة
  		     
			 h.setAttribute("id", id);

   		    if (tag === "h2") {
   		      h2Count++;
    		     h3Count = 0;
    		     h4Count = 0;

    		     const li = document.createElement("li");
    		     li.textContent = h2Count + " ";
    		     li.innerHTML += `<a class='tno' href="#${id}">${htext}</a>`;
    		     listRoot.appendChild(li);

    		     currentUl2 = document.createElement("ul");
    		     li.appendChild(currentUl2);

   		    } else if (tag === "h3" && currentUl2) {
   		      h3Count++;
    		     h4Count = 0;

   		      const li = document.createElement("li");
   		      li.textContent = h2Count + "." + h3Count + " ";
   		      li.innerHTML += `<a class='tno' href="#${id}">${htext}</a>`;
   		      currentUl2.appendChild(li);

   		      currentUl3 = document.createElement("ul");
   		      li.appendChild(currentUl3);

 		      } else if (tag === "h4" && currentUl3) {
  		       h4Count++;

   		      const li = document.createElement("li");
   		      li.textContent = h2Count + "." + h3Count + "." + h4Count + " ";
   		      li.innerHTML += `<a class='tno' href="#${id}">${htext}</a>`;
    		     currentUl3.appendChild(li);
  		     }
		   	buildTOC_status = true;
 		    });
		   }
		   
		   
		   // 5. comment function
		   
		   function moveframe(newIds=[]){
		   /*
		   var selector = (newIds && newIds.length > 0) 
        ? newIds.map(id => `#c${id} .comment-reply`).join(',') 
        : '.comment-reply';
		*/
		var selector = newIds.map(id =>
    String(id).startsWith('comment-')
        ? `#${id}`
        : `#c${id} .comment-reply`
).join(',');

    if (selector) 
	{
	var replyButtons = document.querySelectorAll(selector);
	}
	else{
	var replyButtons = document.querySelectorAll('.comment-reply');
	}
	
		   
		   
		   replyButtons.forEach(function(el) {el.addEventListener('click', function() {
		 
         var iframe = document.getElementById('comment-editor');
         if(iframe) { 
			 // نحذف iframe من مكانه الحالي
             iframe.parentNode.removeChild(iframe);
             // نضيفه بعد العنصر اللي ضغط عليه المستخدم
             this.insertAdjacentElement('afterend', iframe);
             console.log("Iframe moved after comment-post-message");
			 
			 //scroll and focus
			 var iframe = document.getElementById('comment-editor');
			 if(iframe){
			 console.log("iframe focus");
 			 iframe.scrollIntoView({
			    behavior: "smooth", // يخليها ناعمة
 			   block: "center"     // يخلي الـ iframe في منتصف الشاشة (ممكن تخليها start أو end)
 			 });
  			iframe.focus(); // يحط الفوكس عليه كعنصر
			}
			 //end of scroll and focus
         }
       });
	 });
		   }
		   
	var bcom_status = false,
    ldmore = false,
    startIndex = 1,
    max_com = 999;

// ضبط الحد الأقصى لجلب التعليقات في المرة الواحدة بناءً على طلبك
if (comLimit) {
    max_com = numofcom;
}

function renderComments(data) {
        const feed = data.feed;
        const entries = feed.entry || [];
        // جلب العدد الإجمالي الفعلي للتعليقات في السيرفر
        const totalResults = feed.openSearch$totalResults ? parseInt(feed.openSearch$totalResults.$t, 10) : entries.length;
        
        // 1. حل مشكلة نطاق المتغير (Scope) وتجهيز الهيكل
        var html = "";
        // المصفوفة التي ستحتفظ بمعرفات العناصر الجديدة فقط لتفعيل أزرار الرد عليها لاحقاً
        var newCommentIds = [];
		
        if (!ldmore) {
            // الهيكل الأساسي لأول مرة فقط
            html += `
            <div class="comment-replies">
                <div id="comment-holder">
                    <span class="thread-toggle thread-expanded">
                        <span class="thread-arrow"></span>
                        <span class="thread-count">
                            <a target="_self" role="button" tabindex="0" aria-label="الردود">الردود (${totalResults})</a>
                        </span>
                    </span>
                    <ol id="top-ra">
            `;
        newCommentIds = ['comment-post-message'];
		}

        

        entries.forEach(entry => {
            let content = "";
            if (entry.content && entry.content.$t) {
                content = entry.content.$t;
            } else if (entry.summary && entry.summary.$t) {
                content = entry.summary.$t;
            } else {
                return; // تخطي التعليقات المحذوفة أو الفارغة
            }

            const fullId = entry.id.$t;
            const commentId = fullId.substring(fullId.lastIndexOf('-') + 1);
            newCommentIds.push(commentId); // تسجيل الآي دي للعناصر الجديدة

            const authorName = entry.author[0].name.$t;
            const authorProfile = entry.author[0].uri ? entry.author[0].uri.$t : "#";
            const authorAvatar = entry.author[0].gd$image ? entry.author[0].gd$image.src : "";
            
            let displayTime = "";
            if (entry.gd$extendedProperty) {
                const timeProp = entry.gd$extendedProperty.find(p => p.name === "blogger.displayTime");
                if (timeProp) displayTime = timeProp.value;
            }
            if (!displayTime) displayTime = new Date(entry.published.$t).toLocaleString('ar-EG');

            const deleteLinkObj = entry.link.find(l => l.rel === "edit");
            const deleteUrl = deleteLinkObj ? deleteLinkObj.href.replace("/feeds/", "/comment/delete/") : "#";

            html += `
                <li class="comment" id="c${commentId}">
                    <div class="avatar-image-container ph-loaded">
                        <img src="${authorAvatar}" alt="${authorName}" class="jsimg" width="50" height="45" loading="lazy">
                        <noscript><img src="${authorAvatar}" alt=""></noscript>
                    </div>
                    <div class="comment-block">
                        <div class="comment-header">
                            <cite class="user"><a href="${authorProfile}" rel="nofollow">${authorName}</a></cite>
                            <span class="icon user blog-author"></span>
                            <span class="datetime secondary-text">
                                <a rel="nofollow" href="#c${commentId}">${displayTime}</a>
                            </span>
                        </div>
                        <p class="comment-content">${content}</p>
                        <span class="comment-actions secondary-text">
                            <a class="comment-reply" target="_self" data-comment-id="${commentId}" role="button" tabindex="0" aria-label="رد على التعليق">رد</a>
                            <span class="item-control blog-admin">
                                <a target="_self" href="${deleteUrl}">حذف</a>
                            </span>
                        </span>
                    </div>
                    <div class="comment-replybox-single" id="c${commentId}-ce"></div>
                </li>
            `;
        });

        // إزالة زر المورد القديم من الصفحة إن وجد قبل حساب الجديد لعدم التكرار
        var oldLoadMore = document.getElementById('loadmore-section');
        if (oldLoadMore) oldLoadMore.remove();

        // حساب هل هناك مزيد من التعليقات في السيرفر بناءً على المعطيات الحالية؟
        var currentLoadedCount = startIndex + entries.length - 1;
        
        if (totalResults > currentLoadedCount && comLimit) {
            html += `
                <div class="loadmore" id="loadmore-section">
                    <button id="ajax-loadmore">تحميل المزيد من التعليقات</button>
                </div>
            `;
        }

        if (!ldmore) {
            // قفل وسوم الـ HTML المفتوحة لأول مرة
            html += `
                    </ol>
                </div>
            </div>
            `;
            // حقن الهيكل كاملاً داخل حاوية التعليقات الرئيسية بالصفحة
            var commentsRoot = document.getElementById('comments');
            if (commentsRoot) commentsRoot.insertAdjacentHTML('beforeend', html);

            // تفعيل زر إخفاء وإظهار القائمة كاملة (مرة واحدة فقط في أول تحميل)
            var threadToggle = document.querySelector('.thread-count a');
            var topRaList = document.getElementById('top-ra');
            if (threadToggle && topRaList) {
                threadToggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    topRaList.style.display = (topRaList.style.display === "none") ? "block" : "none";
                });
            }
        } else {
            // في حالة جلب المزيد (حقن الـ <li> مباشرة داخل الـ <ol id="top-ra">)
            var topRaList = document.getElementById('top-ra');
            if (topRaList) {
                topRaList.insertAdjacentHTML('beforeend', html);
            }
        }

        // 2. حل مشكلة تكرار الأيفنت لستنر (التمرير فقط للعناصر الجديدة)
        // نقوم بتمرير مصفوفة الـ IDs الجديدة فقط للدالة المخصصة للردود
        if (typeof moveframe === "function") {
            moveframe(newCommentIds); 
        }
        
		// فتح القفل أولاً لتنظيف العمليات السابقة
        bcom_status = false;

        // 🌟 ربط وتشغيل زر تحميل المزيد فوراً بعد رسمه في الـ DOM
        MoreButton();
		
        // فتح القفل لاستقبال طلبات أخرى لاحقاً
        bcom_status = false;
    }
	
function bcom() {
    console.log("bcom");
    if (bcom_status) return;
    bcom_status = true; // قفل الدالة فوراً لمنع التكرار أثناء التحميل

    function getfeed() {
        // تأكد من تعريف homeurl و POSTID في صفحتك
        var feedUrl = homeurl + "/feeds/" + POSTID + "/comments/default?alt=json&start-index=" + startIndex + "&max-results=" + max_com;
        
        fetch(feedUrl)
            .then(response => response.json())
            .then(data => {
                renderComments(data);
                var commentShowBtn = document.getElementById('comment-show');
                if (commentShowBtn) commentShowBtn.style.display = "none";
            })
            .catch(error => {
                console.error("خطأ في جلب التعليقات:", error,feedUrl);
                bcom_status = false; // إعادة فتح القفل في حال حدوث خطأ ليتسنى المحاولة مجدداً
            });
    }


    getfeed();
}


// 🟢 دالة مراقبة وتفعيل زر لود مور عند الضغط عليه
function MoreButton() {
    var loadMoreBtn = document.getElementById('ajax-loadmore');
    if (loadMoreBtn) {
        // حماية: بنشيل أي أيفنت قديم عشان ميتكررش
        loadMoreBtn.replaceWith(loadMoreBtn.cloneNode(true));
        loadMoreBtn = document.getElementById('ajax-loadmore'); // إعادة الإمساك بالزر المنسوخ

        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!bcom_status) {
                loadMoreBtn.innerText = "جاري التحميل...";
                loadMoreBtn.disabled = true;

                ldmore = true;
                startIndex = startIndex + numofcom; // يزود الاندكس (مثلاً من 1 إلى 11)
                
                bcom(); // استدعاء دالة الجلب من جديد بالبيانات الجديدة
            }
        });
    }
}
function MoreButton1() {
    //تعليقات الصفحة الكاملة بتعرض التعليقات الاقدم
	//لود مور بتعرض الاحدث عشان كده الاندكس بخليه = 1
    var loadMoreBtn = document.getElementById('ajax-loadmore');
    if (loadMoreBtn) {
        // حماية: بنشيل أي أيفنت قديم عشان ميتكررش
        loadMoreBtn.replaceWith(loadMoreBtn.cloneNode(true));
        loadMoreBtn = document.getElementById('ajax-loadmore'); // إعادة الإمساك بالزر المنسوخ

        loadMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!bcom_status) {
                loadMoreBtn.innerText = "جاري التحميل...";
                loadMoreBtn.disabled = true;

                ldmore = true;
                //startIndex = startIndex + numofcom; // يزود الاندكس (مثلاً من 1 إلى 11)
                startIndex = 1;
                bcom(); // استدعاء دالة الجلب من جديد بالبيانات الجديدة
            }
        });
    }
}
		   
		   function com(){
	 if (isPost || isPage){
	 
	 //load native js
	 
      (function() {
         console.log("adding 1167892209-comment_from_post_iframe.js");
		 var s = document.createElement("script");
         s.src = "https://www.blogger.com/static/v1/jsbin/1167892209-comment_from_post_iframe.js";
         s.async = true;
         document.head.appendChild(s);
       })();
	   
	 var iframe = document.getElementById('comment-editor1');
     if (iframe){
     
         // غيّر الـ id بعد تحميل الـ iframe
         iframe.id = 'comment-editor';
         //console.log("ID changed to comment-editor");
	     //to return iframe to top again, because if press replay on certain comment ifframe move there!
		} 
		 
		 if(!hide_coments)
		 {
		 //code to move replay box wrn press replato comment, moved to func
		 moveframe();
	     console.log("iframe loadded, adding 1167892209-comment_from_post_iframe.js");
	   
	   //fix native js not work probably after remove of blogger js
	   //add sub comment numper
      //click toggle expanded / collapsed class for sub comments

  //var commentHolder = document.getElementById('comment-holder');
  const replyLinks = document.querySelectorAll(
    'div.comment-thread.inline-thread:not(.hidden) span.thread-count a'
  );

  replyLinks.forEach(link => {
    const parentDiv = link.closest('div.comment-thread.inline-thread');
    const replies = parentDiv.querySelectorAll('.comment');
    link.textContent = `الردود (${replies.length})`; // ← حساب العدد

    link.addEventListener('click', e => {
      e.preventDefault();

      const toggle = parentDiv.querySelector('span.thread-toggle');
      if (toggle) {
        toggle.classList.toggle('thread-collapsed');
        toggle.classList.toggle('thread-expanded');
      }

      const replySection = parentDiv.querySelector('.thread-chrome');
      if (replySection) replySection.classList.toggle('hidden');
    });
  });


 }

//show remove button only if comment id in url
  var url = window.location.href;

  // نتحقق إن الرابط فيه ?sc= و #
  if ((url.includes('?sc=') || url.includes('?showComment=')) && url.includes('#')) {
    // ناخد القيمة بعد الشباك
    var commentId = url.split('#')[1];
    var commentHolder = document.getElementById('comment-holder');

    if (commentHolder && commentId) {
      // نبحث داخل comment-holder فقط
      var commentEl = commentHolder.querySelector(`#${commentId}`);

      if (commentEl) {  
          commentEl.classList.add('highlight-comment');
        
      }
    }
  }
  
  //in sub comment li it have div that cause err in pagespeed
 
  
	   //end fix
       
	   
	   }
	   }
	   
		   

}		
		else{
		 //<!-- Home / search / label js -->

		 
		 // 1. load more func

function LMore() {
  //لو olderLink ما اتحدّثش (أو ما اتشالش href) بعد أول fetch، الضغط التاني هيجيب نفس الصفحة أو جزء منها — فتظهر لك بوستات متأخرة أو مكررة.
  const olderLink = document.querySelector(".older-link");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loadMoreLoading = document.getElementById("loadMoreLoading"); // اختياري: لو عايز أيقونة لودينج داخل/فوق الزر
  const postsContainer = document.querySelector(".blog-posts");

  if (!loadMoreBtn) return;

  let isLoading = false;

  // مساعدة لعمل disable سواء كان button أو a
  function disableBtn() {
    if (loadMoreBtn.tagName.toLowerCase() === 'button') {
      loadMoreBtn.disabled = true;
    } else {
      loadMoreBtn.classList.add('disabled');
      loadMoreBtn.setAttribute('aria-disabled','true');
      // لو هو رابط، نمنع الفعل بحذف href مؤقتاً (نخزنها لو احتجنا)
      if (loadMoreBtn.dataset.origHref === undefined && loadMoreBtn.getAttribute('href')) {
        loadMoreBtn.dataset.origHref = loadMoreBtn.getAttribute('href');
      }
      loadMoreBtn.removeAttribute('href');
    }
  }
  function enableBtn() {
    if (loadMoreBtn.tagName.toLowerCase() === 'button') {
      loadMoreBtn.disabled = false;
    } else {
      loadMoreBtn.classList.remove('disabled');
      loadMoreBtn.removeAttribute('aria-disabled');
      if (loadMoreBtn.dataset.origHref) {
        loadMoreBtn.setAttribute('href', loadMoreBtn.dataset.origHref);
        delete loadMoreBtn.dataset.origHref;
      }
    }
  }

  function showLoading() {
    isLoading = true;
    if (loadMoreLoading) {
      loadMoreLoading.style.display = 'block';
    } else {
      loadMoreBtn.dataset.origText = loadMoreBtn.textContent;
      loadMoreBtn.textContent = 'جاري التحميل...';
    }
    disableBtn();
  }

  function hideLoading() {
    isLoading = false;
    if (loadMoreLoading) loadMoreLoading.style.display = 'none';
    if (loadMoreBtn.dataset.origText) {
      loadMoreBtn.textContent = loadMoreBtn.dataset.origText;
      delete loadMoreBtn.dataset.origText;
    }
    enableBtn();
  }

  function setNoMore() {
    // إظهار رسالة نهائية داخل الزر وتعطيله نهائياً
    if (loadMoreLoading) loadMoreLoading.style.display = 'none';
    document.getElementById("loadMoreEnd").style.display = 'block';
	loadMoreBtn.textContent = 'لا يوجد بوستات جديدة';
    if (loadMoreBtn.tagName.toLowerCase() === 'button') {
      loadMoreBtn.disabled = true;
    } else {
      loadMoreBtn.classList.add('disabled');
      loadMoreBtn.setAttribute('aria-disabled','true');
      loadMoreBtn.removeAttribute('href'); // نضمن أنه مش قابل للنقر
    }
    // نلغي الlistener بتاع الكليك (اختياري)
    loadMoreBtn.replaceWith(loadMoreBtn.cloneNode(true));
  }

  function handleError() {
    if (loadMoreLoading) loadMoreLoading.style.display = 'none';
    loadMoreBtn.textContent = 'حدث خطأ، حاول مرة أخرى';
    enableBtn();
  }

  function fetchMore() {
    if (isLoading) return;
    const href = olderLink ? olderLink.getAttribute('href') : null;
    if (!href) {
      setNoMore();
      return;
    }

    showLoading();

    fetch(href)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newPosts = doc.querySelectorAll('.blog-posts .article-post');
        const newOlder = doc.querySelector('.older-link');

        // append new posts (لو في)
        if (newPosts.length > 0) {
          newPosts.forEach(post => postsContainer.appendChild(post));
		  enable_DS=1;
		  // الحركة الذكية: احذفه الأول للتأكد إنه مش متكرر، وبعدين ضيفه
		  window.removeEventListener("scroll", debounceHandler2);
		  window.addEventListener("scroll", debounceHandler2);
        }

        // تحديث رابط olderLink أو انتهاء البوستات
        if (newOlder && newOlder.getAttribute('href')) {
          olderLink.setAttribute('href', newOlder.getAttribute('href'));
          hideLoading(); // نرجع الزر لو في المزيد
        } else {
          // انتهت البوستات
          setNoMore();
        }
      })
      .catch(err => {
        console.error(err);
        handleError();
      });
  }

  // لو الزر عنصر a، نمنع السلوك الافتراضي
  loadMoreBtn.addEventListener('click', function (e) {
    if (loadMoreBtn.tagName.toLowerCase() === 'a') e.preventDefault();
    fetchMore();
  });

  // حالة ابتدائية: لو مفيش older link
  if (!olderLink || !olderLink.getAttribute('href')) {
    setNoMore();
  }
}


  
  }
		//<!-- Template js -->



	  
 

//console.log("rndpos: "+rndpos); 

function newsInit() {}
 
//GetAgo
function GetAgo(od){
//start of my
if(!timebefore){
// Create a new Date object from the ISO 8601 string
  var date = new Date(od);

  // Define options for date formatting
  var options = {
    year: 'numeric',
    month: 'long', // 'long' or Use 'short' for abbreviated month names
    day: '2-digit'
  };

  // Use toLocaleDateString to format the date according to the options
  return date.toLocaleDateString(lang, options);

}
//end of my
    od = new Date(od);
    let nw = new Date()
    if(od.getUTCFullYear() < nw.getUTCFullYear()){
    let num = Math.abs(od.getUTCFullYear() - nw.getUTCFullYear());
    return (num <= 1) ? agYear : agYears;
}else if(od.getUTCMonth() < nw.getUTCMonth()){
    let num = Math.abs(od.getUTCMonth() - nw.getUTCMonth());
    return (num <= 1) ? agmonth : agmonths;
}else if(od.getUTCDate() < nw.getUTCDate()){
    let num = Math.abs(od.getUTCDate() - nw.getUTCDate());
    return (num <= 1) ? agday : agdays; 
}else if(od.getUTCHours() < nw.getUTCHours()){
    let num = Math.abs(od.getUTCHours() - nw.getUTCHours());
    return (num <= 1) ? aghour : aghours;
}else if(od.getUTCMinutes() < nw.getUTCMinutes()){
    let num = Math.abs(od.getUTCMinutes() - nw.getUTCMinutes());
    return (num <= 1) ? agminutes : agminutes;
}else{
    return agnow
}
}

 
  




  
// add style 
if (isPost || isPage) {
var style_edit = document.createElement("style");
// style post edit icon
style_edit.textContent = `.post-edit{display:inline-block;margin:10px 0}.post-edit .edit-link{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:1px 20px;font-size:14px;font-weight:600;color:var(--BtnTitleColor,#fff);background:var(--AccentColor,#c71585);border-radius:20px;text-decoration:none;box-shadow:var(--box-shadow,0 2px 4px rgba(0,0,0,.1));transition:all .3s ease; margin: 20px 30px 20px 0px;}.post-edit .edit-link:hover{background:var(--HoverEffect,#ff1493);color:var(--GradientColor,#fff);box-shadow:0 3px 8px rgba(0,0,0,.15);transform:translateY(-2px)}.post-edit .edit-link::before{content:"✏️";font-size:14px;line-height:1}`;
// style areacode
style_edit.textContent+= `code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:#000;text-shadow:none;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:.9em}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#6272a4}.token.punctuation{color:#f8f8f2}.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag{color:#ff79c6}.token.boolean,.token.number{color:#bd93f9}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#50fa7b}.token.entity,.token.operator,.token.url{color:#f8f8f2}.token.keyword{color:#ff79c6}.token.function{color:#50fa7b}.token.variable{color:#f8f8f2}`;

document.head.appendChild(style_edit);
}


  
  
  


  
  
  





//main temp java

//replace news() with newsInit(); in machine()
bitsy = true;
machine_brake = true;
//triplev = true;
alternates = 1;
ViewMore  = "عرض المزيد" ; 
Url = "https://elmanzel-el3asry.blogspot.com/";
TiltleLimit =10;
DescLimit = 200; 
hidetime = true; 
hidemeta = false;
useAltImage = false; 
altImagelist = ["https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9dzzko49K9pTPHRfeW2ejXmVvfHIKKBz83PpTJUkkfP0K9vVYc0vg8gwSEskzxIXVpDKonDpVLbwYo2dHkxven9Ccp_V0BO77WvITdpzJW4o4wsBKbHS3AkEeCabt7pAPE1j-pFdweipP4ajw-NJYKw4mBaD-rjuWPm4YF_6_TVEwwHcXJ1PNtMVMydY/s1600/control-a2z-4.png",
"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjeryAqfAbVjQC3qkPGcG_UaB-ViAfHxXiWHbt3RSTY5Iivo5AhYKrMKUeYtw8Z5RuBtmAdWGL9CVzFw_hm5XQTug8PivVAvegZ2ANNsnwxoc5ZBf8e1LhGIVwF8UGQn9ML9TvuOncb9fKuF7oiZZHmmfmBG2Mz4JpTtLDY41na2s7KaZVRcJzAhngMi9I/s1600/control-a2z-12.png",
"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRdvEY5nKonSHrA_lKGvCSvu1aHhZ72heRnk0cGqBnLSm6bgCXeK035l7oormihAqC7m_8qWyMl851Yc8QowBlX-1PnvR8fsqULxnZQoFJCmzwR5KTBn39MBfM16EZYk0b_scYreA5Ci_0bO2JxKbT8ptXFsInCMCn9xBo5Uf9NjiZm2Ms6kidcjHrJCQ/s350/12-1.png",
];

ReadMore ="اقرأ المزيد" ; 
alternates = 1;
bitsy = true;
//machine_brake = false;
MaxTitle = true; 
PostCount =24;
nolapel = "بدون قسم";
imgfilter  = "/w266-h160-e90-rw/";
speedup = true;
var _0x224f59=_0x32cc;function _0x32cc(_0x349d6d,_0x1d746d){var _0x544b68=_0x544b();return _0x32cc=function(_0x32cc95,_0x146204){_0x32cc95=_0x32cc95-0x1c4;var _0xf927d2=_0x544b68[_0x32cc95];return _0xf927d2;},_0x32cc(_0x349d6d,_0x1d746d);}(function(_0x43af57,_0x421bd3){var _0x14e758=_0x32cc,_0x31c89c=_0x43af57();while(!![]){try{var _0x557a44=-parseInt(_0x14e758(0x1d7))/0x1*(-parseInt(_0x14e758(0x1ce))/0x2)+-parseInt(_0x14e758(0x1d4))/0x3+-parseInt(_0x14e758(0x1d8))/0x4*(-parseInt(_0x14e758(0x1c6))/0x5)+-parseInt(_0x14e758(0x1c5))/0x6+parseInt(_0x14e758(0x1d9))/0x7+-parseInt(_0x14e758(0x1cb))/0x8+parseInt(_0x14e758(0x1cd))/0x9*(parseInt(_0x14e758(0x1d3))/0xa);if(_0x557a44===_0x421bd3)break;else _0x31c89c['push'](_0x31c89c['shift']());}catch(_0x1df487){_0x31c89c['push'](_0x31c89c['shift']());}}}(_0x544b,0x20d4d));var _x2710='/search/',_x2711='dark',_x2712=_0x224f59(0x1da),_x2713=_0x224f59(0x1d5),_x2714=_0x224f59(0x1d2),_x2715=_0x224f59(0x1ca),_x2716=_0x224f59(0x1dc),_x2717=_0x224f59(0x1c7),_x2718=_0x224f59(0x1d1),_x2719=_0x224f59(0x1d6),_x2720='.posts',_x2721=_0x224f59(0x1cf),_x2722='post',_x2723=_0x224f59(0x1cc),_x2724=_0x224f59(0x1c9),_x2725=_0x224f59(0x1db),_x2726='targetitem',_x2727=_0x224f59(0x1d0),_x2728=_0x224f59(0x1c4),_x2729='#ContactForm200',_x2730=_0x224f59(0x1c8);function _0x544b(){var _0x3be102=['297045eVIoAH','/feeds/posts/summary/?alt=json&start-index=','be/','/comments/default/','search/label/','197004MlSsTG','737090VNAbkN','#blogger-components','<div\x20class=\x22HTML\x22>','data-name','/comments/default?alt=json&start-index=1&max-results=9999','624240yUeHzD','data-number','77373ZTkWGh','5270LofEoO','data-type','feeds/comments/default?alt=json&start-index=1&max-results=','/js/cookienotice.js','/search/label/','70KeoUof','267033rNCmtY','https://www.blogger.com/rpc_relay.html','.ddheader','32mLKapT','4GEpoqf'];_0x544b=function(){return _0x3be102;};return _0x544b();}
window['_$'] = function (j) {
    var f = document['querySelectorAll'](j);
    if (f['length'] > 0x1) return f;
    else return f['length'] == 0x0 ? document['createDocumentFragment']()['childNodes'] : f[0x0];
}


function runLater() {
setTimeout(function() {
repblog();

}, 1000);
window.removeEventListener("scroll", runLater);
}

repblog_status=!1,window.repblog=function repblog(){if("undefined"==typeof alternates){return l}if(bjsif){let _0x33c7ad=_$(_x2717).innerHTML.replace(/(\\<\\!\\-\\-|\\-\\-\\>)/g,""),_0x54a391=_0x33c7ad.match(/https:\/\/www\.blogger\.com\/static\/v1\/widgets\/\d+-widgets\.js/)[0],_0x42a27f=_x2717,_0x3f2704=_0x33c7ad.match(/<script type='text\/javascript'>([\s\S]*?)<\/script>/)[0].replace(/(<script type='text\/javascript'>|<\/script>)/g,""),_0x5f2f9e=_0x33c7ad.match(/(\<|&lt;)script(\>|&gt;)(.|\n)*?(\<|&lt;)\/script(\>|&gt;)/g)||null,_0x157af6="";window._0x3f2704=_0x3f2704;null!=_0x5f2f9e&&$getScript(_x2717,(function(){_0x5f2f9e[0].replace(/(\<script\>|\<\/script\>)/g,"").match(/(\(window|window).*/g).forEach((function(t){_0x157af6+=t})),eval(_0x157af6);})),$getScript(_0x54a391,(function(){eval(window._0x3f2704);window.addEventListener("scroll", runLater),BlogID=_WidgetManager._GetAllData().blog.blogId}))}};
console.time("triple");
let Q = {};
let cacheData = null;
//window.emojies=function(e,t){var a=t.getAttribute(_x2721).includes("ay-news"),r=t.getAttribute(_x2721).includes("noImg");let l="";if("undefined"==typeof alternates)return l;for(let t=0;t<24;t++){let m=e.feed.entry[t],g="";if(t==e.feed.entry.length)break;for(let e=0;e<m.link.length;e++)if("alternate"==m.link[e].rel){g=m.link[e].href;break}s=m.content&&((h=document.createElement("div")).innerHTML=m.content.$t,h.querySelector("img"))?h.querySelector("img").getAttribute("src"):m.media$thumbnail&&m.media$thumbnail.url?m.media$thumbnail.url:"#Noimger",n=m.category&&m.category[0].term||nolapel,""!=g&&(i=m.title.$t,o=300<(c=(m.content||m.summary).$t.replace(/<\S[^>]*>/g,"")).length?c.substring(0,100)+"...":c,d=m.category?m.category[0].term:"",date=m.updated.$t,100<c.length&&c.substring(0,100),MaxTitle&&i.split(" ").length>TiltleLimit&&(i=i.split(" ").slice(0,TiltleLimit).join(" ")+"..."),l+="<div class='post-card-wrapper pcard"+t+"'><a title='"+i+"' class='post-image' href='"+g+"'><span class='postcat catnum"+Math.floor(10*Math.random()+1)+"'>"+n+"</span>"+(s.includes("#Noimger")||a||r?"<span class='Noimger'/>":"<img alt='"+i+"' data-src='"+s+"' width='192' height='108' />")+"</a><div class='post-details'>"+(hidetime?"":"<span class='Date'><svg><use href='#ic-clock'/></svg><a href='"+g+"'>"+GetAgo(date)+"</a></span>")+"<h3 class='post-title'><a title='"+i+"' href='"+g+"'>"+i+"</a></h3><div class='post-snippet'>"+o+"</div><a class='readmore' title='"+i+"' href='"+g+"'>"+ReadMore+"</a></div></div>")}return l+"</div>"};

window.magic=function(){if(!bitsy){if("undefined"==typeof alternates){return l}var t=document.querySelectorAll("img[data-src]");if(0==t.length){setTimeout((()=>{if(document.querySelectorAll("img[data-src]").length === 0){enable_DS=0}}),3e3);}t.forEach((function(t,e,i){if (!post_img_resize) {img_h = t.getAttribute("height");img_w = t.getAttribute("width"); imgfilter1 = '/w' + img_w + '-h' + img_h + '-rw/'}var n=t.getBoundingClientRect().top-document.body.getBoundingClientRect().top;imgfilterz=imgfilter,img_post=!1;t.closest(".content-wrapper")&&(img_post=!0,z=img_h,i=img_w,imgfilterz=imgfilter1),window.pageYOffset+window.innerHeight>n&&(img_post||(i=Math.ceil(t.parentNode.offsetWidth),z=Math.ceil(t.parentNode.offsetHeight)),e=function(t){try{t=-1!==t.indexOf("img.youtube.com")||-1!==t.indexOf("ytimg.com")?t.replace("/default","/mqdefault"):t.replace(/(\b\/(s|w)\d+(-)?(\w*)?(-)?(\w*)?(-)?(\w*)?(-)?(\w*)?(-)?(\w*)?(-)?(\w*)?(-)?(\w*)?\/)/g,imgfilterz).replace("s72","s800")}finally{return t}}(t.getAttribute("data-src")),t.setAttribute("src",e),t.removeAttribute("data-src"),t.setAttribute("width",parseInt(i)),t.setAttribute("height",parseInt(z)),t.parentElement.classList.toggle("ph-holder",!1),t.parentElement.classList.toggle("ph-loaded",!0))}))}};
//window.magic1=function(){if(!bitsy){if("undefined"==typeof alternates){return l}const t=document.querySelectorAll("iframe[data-src]");0==t.length&&(enable_DS1=0),t.forEach((function(t,e,n){var i=t.getBoundingClientRect().top-document.body.getBoundingClientRect().top;window.pageYOffset+window.innerHeight>i&&(t.setAttribute("src",t.getAttribute("data-src")),t.removeAttribute("data-src"))}))}}
window.magic1=function(){if(!bitsy){if("undefined"==typeof alternates){return l}const t=document.querySelectorAll("iframe[data-src]");0==t.length&&(enable_DS1=0),t.forEach((function(t,e,n){var i=t.getBoundingClientRect().top-document.body.getBoundingClientRect().top;window.pageYOffset+window.innerHeight>i&&(t.setAttribute("src",t.getAttribute("data-src")),console.log(t.id),t.id == "comment-editor1" && com() ,t.removeAttribute("data-src"))}))}}
//window.machine = function (e) {if ("undefined" == typeof alternates) {return l}document.querySelectorAll(".placa").forEach((function (t) {if (isPost && triplev && "RetPosts" == t.getAttribute("data-type")) {return}var a, n, s, r, l = t.getAttribute(_x2724),o = t.getAttribute(_x2723),i = t.getAttribute("data-index"),d = t.getBoundingClientRect().top - document.body.getBoundingClientRect().top;Math.round(1e12 * Math.random()), "lastPost" === l ? (a = Url + "feeds/posts/summary/?alt=json&start-index=" + i + "&max-results=" + o, r = '<a class="show-more" href="/search/">' + ViewMore + "</a>") : "random" === l ? (s = Math.floor(PostCount / 2), a = Url + _x2712 + (i = Math.abs(Math.floor(Math.random() * s + 1))) + "&max-results=" + o, r = '<a class="show-more" href="/search/">' + ViewMore + "</a>") : "randomLabel" === l ? (n = t.getAttribute("data-name"), s = Math.floor(Q[n] - o), a = Url + "feeds/posts/summary/-/" + encodeURIComponent(n) + "?alt=json&start-index=" + (i = Math.abs(Math.floor(Math.random() * s + 1))) + "&max-results=" + o) : (a = Url + "feeds/posts/summary/-/" + encodeURIComponent(l) + "?alt=json&start-index=" + i + "&max-results=" + o, r = '<a class="show-more" href="/search/label/' + encodeURIComponent(l) + '">' + ViewMore + "</a>"), (window.pageYOffset + window.innerHeight > d || bitsy) && !t.classList.contains("loadclass") && (t.classList.add("loadclass"), fetch(a).then((e => e.json())).then((function (e) { t.parentElement && t.parentElement.parentElement && (t.parentElement.parentElement.classList.contains("posts-from")? ((x = t.parentElement.parentElement.querySelectorAll(".title"))[1] &&x[1].insertAdjacentHTML("afterEnd", r)): ((y = t.parentElement.parentElement.querySelector(".title")) &&(y.insertAdjacentHTML("afterEnd", r), t.parentElement.parentElement.classList.add("posts-from"))) ),(t.parentElement.innerHTML = (t.getAttribute("data-type")!="RetePostsRand" && t.getAttribute("data-type")!="RetPosts")? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>": emojies(e, t) ), magic(),"ay-news" == t.getAttribute("data-type") && newsInit()}))), "scroll" != e.type || t.classList.contains("loadclass") || (t.classList.add("loadclass"), fetch(a).then((e => e.json())).then((function (e) {t.parentElement && t.parentElement.parentElement && t.parentElement.parentElement.querySelector(".title") && (t.parentElement.parentElement.querySelector(".title").insertAdjacentHTML("afterEnd", r), t.parentElement.parentElement.classList.add("posts-from")),(t.parentElement.innerHTML = (t.getAttribute("data-type")!="RetePostsRand" && t.getAttribute("data-type")!="RetPosts")? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>": emojies(e, t) ), magic()})))})) };

//ghuburl = "https://lazezo2.github.io/fb/labels/";
//ghub = false;

if(ghub){
window.emojies = function (e, t) {
    var a = t.getAttribute(_x2721).includes("ay-news"),
        r = t.getAttribute(_x2721).includes("noImg"),
		index = t.getAttribute("data-index")-1,
		nump = t.getAttribute("data-number");
    let l = "";
	let loopLimit = Math.min(nump, e.posts.length);
    if ("undefined" == typeof alternates) return l;
    for (let t = index; t < loopLimit; t++) {
        let m = e.posts[t],
            g = "";
		//new
		authorPhoto = m.author?.img || e.blogAuthor.img, 
        authorName = m.author?.name || e.blogAuthor.name,
        authorUrl   = m.author?.url || e.blogAuthor.url,		
        commentsNum = m.comments,
		g = m.url,
		s = m.thumb || "#noThumb";
	    n = (m.category && m.category[0]) || nolapel, 
			
			//new
			labelsDom = '<div class="post-labels">' + 
                        (m.category && m.category.length > 0 
                        ? m.category.slice(0, 2).map(cat => '<a class="label-badge" href="/search/label/' + encodeURIComponent(cat) + '">' + cat + '</a>').join("") 
                        : "") 
                        + '</div>',
			//labelsDom = '',
			
			"" != g && (
            i = m.title || "", 
            o = m.summary || "",
            d = (m.category && m.category[0]) || "",
            date = m.updated || "",

            (typeof MaxTitle !== "undefined" && MaxTitle && i.split(" ").length > TiltleLimit) && (i = i.split(" ").slice(0, TiltleLimit).join(" ") + "..."),

            l += "<div class='post-card-wrapper pcard" + t + "'><a title='" + i + "' class='post-image' href='" + g + "'><span class='postcat catnum" + Math.floor(10 * Math.random() + 1) + "'>" + n + "</span>"

			+ 
			(s.includes("#noThumb") || a || r ? "<span class='noThumb'/>" : "<img class='jsimg' src='data:image/gif;base64,R0lGODlhAQABAAAAACw=' alt='" + i + "' data-src='" + s + "' width='192' height='108' />" + '<noscript>' + "<img alt='" + i + "' src='" + s + "' width='192' height='108' />" + '</noscript>') +
			"</a><div class='post-details'>" + 
						
			
			//new
			(hidemeta ? "" : 
					'<div class="post-meta">'
+ '<img alt="صورة" class="authorPhoto" height="238" width="400" src="' + authorPhoto + '">'
+ '<div class="metapost">'
+ '<span class="fn authorname">' + authorName + '</span>'
+ '<div class="Times">'
+ '<div class="article-timeago">'
+ '<span class="fn meta_sperator">|</span>'
+ '<span class="post-date"><svg><use href="#svg-clock"/></svg><a href="' + g + '">' + GetAgo(date) + '</a></span>'
+ '</div>'
+ '</div>'
+ '<span class="fn meta_sperator">|</span>'
+ '<a class="fn authorname" href="' + g + '#comments-container">' + commentsNum + ' تعليق</a>'
+ '</div>'
+ '</div>'
+ labelsDom
) +

			
			"<h3 class='post-title'><a title='" + i + "' href='" + g + "'>" + i + "</a></h3><div class='post-snippet'>" + o + "</div><a class='readmore' title='" + i + "' href='" + g + "'>" + ReadMore + "</a></div></div>")
    }
    return l + "</div>"
};





window.machine = function (e) {
    if ("undefined" == typeof alternates) {
        return l;
    }
    //
    document.querySelectorAll(".placa").forEach(function (t) {
        console.log();
        console.log();
        console.log(t.getAttribute(_x2724));
        console.log("welcome");
        if (isPost && triplev && ["RetePostsRand", "RetPosts", "ay-news"].includes(t.getAttribute("data-type"))) {
            return;
        }
        console.log("initial");
        var a,
            n,
            s,
            r,
            l = t.getAttribute(_x2724),
            aa = t.hasAttribute("data-habort"),
            o = t.getAttribute(_x2723),
            i = t.getAttribute("data-index"),
            d = t.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        Math.round(1e12 * Math.random()),
            "lastPost" === l
                ? ((a = ghuburl + "post.json"),
                  (r = '<a class="show-more" href="/search/">' + ViewMore + "</a>"))
                : "random" === l
                  ? ((s = Math.floor(PostCount / 2)),
                    (a = ghuburl + "post-r.json"),
                    (r = '<a class="show-more" href="/search/">' + ViewMore + "</a>"))
                  : "randomLabel" === l
                    ? ((n = t.getAttribute("data-name1")),
                      (a = ghuburl + n + "-r.json"
                          ))
                    : ((a =
                          ghuburl + l + ".json"),
                      (r =
                          '<a class="show-more" href="/search/label/' +
                          l +
                          '">' +
                          ViewMore +
                          "</a>")),
            (window.pageYOffset + window.innerHeight > d || bitsy) &&
                !t.classList.contains("loadclass") &&
                (t.classList.add("loadclass"),
                fetch(a)
                    .then((e) => e.json())
                    .then(function (e) {
                        console.log(t.getAttribute(_x2724) + " 1"),
                            !aa &&
                                t.parentElement &&
                                t.parentElement.parentElement &&
                                (t.parentElement.parentElement.classList.contains("posts-from")
                                    ? (x = t.parentElement.parentElement.querySelectorAll(".title"))[1] &&
                                      x[1].insertAdjacentHTML("afterEnd", r)
                                    : (y = t.parentElement.parentElement.querySelector(".title")) &&
                                      (y.insertAdjacentHTML("afterEnd", r),
                                      t.parentElement.parentElement.classList.add("posts-from"))),
                            console.log(t.getAttribute(_x2724) + " 2"),
                            //!aa && (t.parentElement.innerHTML = t.getAttribute("data-type") != "RetePostsRand" && t.getAttribute("data-type") != "RetPosts" ? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>": emojies(e, t)),
                            !aa && ((t.parentElement.querySelector("style") && t.parentElement.after(t.parentElement.querySelector("style"))), t.parentElement.innerHTML = (t.getAttribute("data-type") != "RetePostsRand" && t.getAttribute("data-type") != "RetPosts") ? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>" : emojies(e, t)),
							
                            console.log(t.getAttribute(_x2724) + " 3"),
                            aa &&
                                (t.insertAdjacentHTML(
                                    "afterend",
                                    `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>"
                                ),
                                t.remove()),
                            magic(),
                            "ay-news" == t.getAttribute("data-type") && newsInit();
                    })),
            "scroll" != e.type ||
                t.classList.contains("loadclass") ||
                (t.classList.add("loadclass"),
                fetch(a)
                    .then((e) => e.json())
                    .then(function (e) {
                        console.log(t.getAttribute(_x2724) + " 4"),
                            t.parentElement &&
                                t.parentElement.parentElement &&
                                t.parentElement.parentElement.querySelector(".title") &&
                                (t.parentElement.parentElement
                                    .querySelector(".title")
                                    .insertAdjacentHTML("afterEnd", r),
                                t.parentElement.parentElement.classList.add("posts-from")),
                            console.log(t.getAttribute(_x2724) + " 5"),
                            //(t.parentElement.innerHTML = t.getAttribute("data-type") != "RetePostsRand" && t.getAttribute("data-type") != "RetPosts" ? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>" : emojies(e, t)),
							(t.parentElement.querySelector("style") && t.parentElement.after(t.parentElement.querySelector("style"))), (t.parentElement.innerHTML = (t.getAttribute("data-type") != "RetePostsRand" && t.getAttribute("data-type") != "RetPosts") ? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>" : emojies(e, t)),
                            
                            console.log(t.getAttribute(_x2724) + " 6"),
                            magic();
                    }));
    });
    //
};

//if bracket
}
else{
window.emojies = function (e, t) {
    var a = t.getAttribute(_x2721).includes("ay-news"),
        r = t.getAttribute(_x2721).includes("noImg");
    let l = "";
    if ("undefined" == typeof alternates) return l;
    for (let t = 0; t < 24; t++) {
        let m = e.feed.entry[t],
            g = "";
        if (t == e.feed.entry.length) break;
		//new
		authorPhoto = (m.author && m.author[0].gd$image ? m.author[0].gd$image.src : "https://placehold.co/40x40"), 
        authorName  = (m.author ? m.author[0].name.$t : e.feed.title.$t), 
        commentsNum = (m.thr$total ? m.thr$total.$t : "0");
			
        for (let e = 0; e < m.link.length; e++)
            if ("alternate" == m.link[e].rel) {
                g = m.link[e].href;
                break
            } 
			
			//s = m.content && ((h = document.createElement("div")).innerHTML = m.content.$t, 
			//h.querySelector("img")) ? h.querySelector("img").getAttribute("src") : m.media$thumbnail && m.media$thumbnail.url ? m.media$thumbnail.url : "#Noimger", 
			
			//new
			
			s =
  m.content && (
    ((h = document.createElement("div")).innerHTML = m.content.$t),
    h.querySelector("img")
  )
    ? h.querySelector("img").getAttribute("src")
    : m.media$thumbnail && m.media$thumbnail.url
    ? m.media$thumbnail.url
    : useAltImage
    ? altImagelist[Math.floor(Math.random() * altImagelist.length)]
    : "#noThumb",
			n = m.category && m.category[0].term || nolapel, 
			
			//new
			labelsDom = '<div class="post-labels">' + (m.category ? m.category.slice(0,2).map(cat => '<a class="label-badge" href="/search/label/' + encodeURIComponent(cat.term) + '">' + cat.term + '</a>').join("") : "") + '</div>',
			//labelsDom = '',
			
			"" != g && (i = m.title.$t, o = 300 < (c = (m.content || m.summary).$t.replace(/<\S[^>]*>/g, "")).length ? c.substring(0, 100) + "..." : c, d = m.category ? m.category[0].term : "", date = m.updated.$t, 100 < c.length && c.substring(0, 100), MaxTitle && i.split(" ").length > TiltleLimit && (i = i.split(" ").slice(0, TiltleLimit).join(" ") + "..."), l += "<div class='post-card-wrapper pcard" + t + "'><a title='" + i + "' class='post-image' href='" + g + "'><span class='postcat catnum" + Math.floor(10 * Math.random() + 1) + "'>" + n + "</span>" + 
			(s.includes("#noThumb") || a || r ? "<span class='noThumb'/>" : "<img class='jsimg' src='data:image/gif;base64,R0lGODlhAQABAAAAACw=' alt='" + i + "' data-src='" + s + "' width='192' height='108' />" + '<noscript>' + "<img alt='" + i + "' src='" + s + "' width='192' height='108' />" + '</noscript>') +
			"</a><div class='post-details'>" + 
			
			//(hidetime ? "" : "<span class='Date'><svg><use href='#ic-clock'/></svg><a href='" + g + "'>" + GetAgo(date) + "</a></span>") + 
			
			
			//new
			(hidemeta ? "" : 
					'<div class="post-meta">'
+ '<img alt="صورة" class="authorPhoto" height="238" width="400" src="' + authorPhoto + '">'
+ '<div class="metapost">'
+ '<span class="fn authorname">' + authorName + '</span>'
+ '<div class="Times">'
+ '<div class="article-timeago">'
+ '<span class="fn meta_sperator">|</span>'
+ '<span class="post-date"><svg><use href="#svg-clock"/></svg><a href="' + g + '">' + GetAgo(date) + '</a></span>'
+ '</div>'
+ '</div>'
+ '<span class="fn meta_sperator">|</span>'
+ '<a class="fn authorname" href="' + g + '#comments-container">' + commentsNum + ' تعليق</a>'
+ '</div>'
+ '</div>'
+ labelsDom
) +

			
			"<h3 class='post-title'><a title='" + i + "' href='" + g + "'>" + i + "</a></h3><div class='post-snippet'>" + o + "</div><a class='readmore' title='" + i + "' href='" + g + "'>" + ReadMore + "</a></div></div>")
    }
    return l + "</div>"
};


window.machine = function (e) {
    if ("undefined" == typeof alternates) {
        return l
    }
   //
    document.querySelectorAll(".placa").forEach((function (t) {
         console.log()
		 console.log()
		 console.log(t.getAttribute(_x2724))
		 console.log("welcome")
		if (isPost && triplev && ["RetePostsRand", "RetPosts", "ay-news"].includes(t.getAttribute("data-type"))) {
            return
        }
		 console.log("initial");
        var a, n, s, r, l = t.getAttribute(_x2724),
		aa = t.hasAttribute('data-habort'),
            o = t.getAttribute(_x2723),
            i = t.getAttribute("data-index"),
            d = t.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        Math.round(1e12 * Math.random()), "lastPost" === l ? (a = Url + "feeds/posts/summary/?alt=json&start-index=" + i + "&max-results=" + o, r = '<a class="show-more" href="/search/">' + ViewMore + "</a>") : "random" === l ? (s = Math.floor(PostCount / 2), a = Url + _x2712 + (i = Math.abs(Math.floor(Math.random() * s + 1))) + "&max-results=" + o, r = '<a class="show-more" href="/search/">' + ViewMore + "</a>") : "randomLabel" === l ? (n = t.getAttribute("data-name1"), s = Math.floor(Q[n] - o), a = Url + "feeds/posts/summary/-/" + encodeURIComponent(n) + "?alt=json&start-index=" + (i = Math.abs(Math.floor(Math.random() * s + 1))) + "&max-results=" + o) : (a = Url + "feeds/posts/summary/-/" + encodeURIComponent(l) + "?alt=json&start-index=" + i + "&max-results=" + o, r = '<a class="show-more" href="/search/label/' + encodeURIComponent(l) + '">' + ViewMore + "</a>"), (window.pageYOffset + window.innerHeight > d || bitsy) && !t.classList.contains("loadclass") && (t.classList.add("loadclass"), fetch(a).then((e => e.json())).then((function (e) {
            console.log(t.getAttribute(_x2724)+" 1"),
			!aa && t.parentElement && t.parentElement.parentElement && (t.parentElement.parentElement.classList.contains("posts-from") ? ((x = t.parentElement.parentElement.querySelectorAll(".title"))[1] && x[1].insertAdjacentHTML("afterEnd", r)) : ((y = t.parentElement.parentElement.querySelector(".title")) && (y.insertAdjacentHTML("afterEnd", r), t.parentElement.parentElement.classList.add("posts-from")))), 
			console.log(t.getAttribute(_x2724)+" 2"),
			//!aa && (t.parentElement.innerHTML = (t.getAttribute("data-type") != "RetePostsRand" && t.getAttribute("data-type") != "RetPosts") ? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>" : emojies(e, t)),
			!aa && ((t.parentElement.querySelector("style") && t.parentElement.after(t.parentElement.querySelector("style"))), t.parentElement.innerHTML = (t.getAttribute("data-type") != "RetePostsRand" && t.getAttribute("data-type") != "RetPosts") ? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>" : emojies(e, t)),
			console.log(t.getAttribute(_x2724)+" 3"),
			aa && (t.insertAdjacentHTML("afterend", `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>"),t.remove()),
			magic(), "ay-news" == t.getAttribute("data-type") && newsInit()
        }))), "scroll" != e.type || t.classList.contains("loadclass") || (t.classList.add("loadclass"), fetch(a).then((e => e.json())).then((function (e) {
            console.log(t.getAttribute(_x2724)+" 4"),
			t.parentElement && t.parentElement.parentElement && t.parentElement.parentElement.querySelector(".title") && (t.parentElement.parentElement.querySelector(".title").insertAdjacentHTML("afterEnd", r),			
			t.parentElement.parentElement.classList.add("posts-from")), 
			console.log(t.getAttribute(_x2724)+" 5"),
			//( t.parentElement.innerHTML = (t.getAttribute("data-type") != "RetePostsRand" && t.getAttribute("data-type") != "RetPosts") ? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>" : emojies(e, t)), 
			(t.parentElement.querySelector("style") && t.parentElement.after(t.parentElement.querySelector("style"))), (t.parentElement.innerHTML = (t.getAttribute("data-type") != "RetePostsRand" && t.getAttribute("data-type") != "RetPosts") ? `<div class="${t.getAttribute("data-type")}">` + emojies(e, t) + "</div>" : emojies(e, t)),
				console.log(t.getAttribute(_x2724)+" 6"),			
			magic()
        })))
    }))
   //
};

//else bracket
}


//window.emojies3=function(e,t,a,l){var r=t.getAttribute(_x2721).includes("ay-news"),g=t.getAttribute(_x2721).includes("noImg");let m="";if("undefined"==typeof alternates)return m;a>=e.feed.entry.length&&(a=0);for(let t=a;t<l&&!(t>=e.feed.entry.length);t++){let a=e.feed.entry[t],l="";for(let e=0;e<a.link.length;e++)if("alternate"==a.link[e].rel){l=a.link[e].href;break}s=a.content&&((h=document.createElement("div")).innerHTML=a.content.$t,h.querySelector("img"))?h.querySelector("img").getAttribute("src"):a.media$thumbnail&&a.media$thumbnail.url?a.media$thumbnail.url:"#Noimger",n=a.category&&a.category[0].term||nolapel,""!=l&&(i=a.title.$t,o=300<(c=(a.content||a.summary).$t.replace(/<\S[^>]*>/g,"")).length?c.substring(0,100)+"...":c,d=a.category?a.category[0].term:"",date=a.updated.$t,100<c.length&&c.substring(0,100),MaxTitle&&i.split(" ").length>TiltleLimit&&(i=i.split(" ").slice(0,TiltleLimit).join(" ")+"..."),m+="<div class='post-card-wrapper pcard"+t+"'><a title='"+i+"' class='post-image' href='"+l+"'><span class='postcat catnum"+Math.floor(10*Math.random()+1)+"'>"+n+"</span>"+(s.includes("#Noimger")||r||g?"<span class='Noimger'/>":"<img alt='"+i+"' data-src='"+s+"' width='192' height='108' />")+"</a><div class='post-details'>"+(hidetime?"":"<span class='Date'><svg><use href='#ic-clock'/></svg><a href='"+l+"'>"+GetAgo(date)+"</a></span>")+"<h3 class='post-title'><a title='"+i+"' href='"+l+"'>"+i+"</a></h3><div class='post-snippet'>"+o+"</div><a class='readmore' title='"+i+"' href='"+l+"'>"+ReadMore+"</a></div></div>")}return m+"</div>"};

window.emojies3 = function (e, t, a, l) {
    var r = t.getAttribute("data-type").includes("ay-news"),
        g = t.getAttribute("data-type").includes("noph");
    let m = "";
    if ("undefined" == typeof alternates) return m;
    a >= e.feed.entry.length && (a = 0);
    for (let t = a; t < l && !(t >= e.feed.entry.length); t++) {
        let a = e.feed.entry[t],
            l = "",
			authorPhoto = (a.author && a.author[0].gd$image ? a.author[0].gd$image.src : "https://placehold.co/40x40"), 
            authorName  = (a.author ? a.author[0].name.$t : e.feed.title.$t), 
            commentsNum = (a.thr$total ? a.thr$total.$t : "0");

        for (let e = 0; e < a.link.length; e++)
            if ("alternate" == a.link[e].rel) {
                l = a.link[e].href;
                break;
            }
        /*
		(s =
            a.content && (((h = document.createElement("div")).innerHTML = a.content.$t), h.querySelector("img"))
                ? h.querySelector("img").getAttribute("src")
                : a.media$thumbnail && a.media$thumbnail.url
                ? a.media$thumbnail.url
                : "#noThumb"),
			*/
        (s =
  a.content && (
    ((h = document.createElement("div")).innerHTML = a.content.$t),
    h.querySelector("img")
  )
    ? h.querySelector("img").getAttribute("src")
    : a.media$thumbnail && a.media$thumbnail.url
    ? a.media$thumbnail.url
    : useAltImage
    ? altImagelist[Math.floor(Math.random() * altImagelist.length)]
    : "#noThumb"),			    
			(n = (a.category && a.category[0].term) || nolapel),
			(labelsDom = '<div class="post-labels">' + (a.category ? a.category.slice(0,2).map(cat => '<a class="label-badge" href="/search/label/' + encodeURIComponent(cat.term) + '">' + cat.term + '</a>').join("") : "") + '</div>'),
            "" != l &&
                ((i = a.title.$t),
                (o = 300 < (c = (a.content || a.summary).$t.replace(/<\S[^>]*>/g, "")).length ? c.substring(0, DescLimit) + "..." : c),
                (d = a.category ? a.category[0].term : ""),
                (date = a.updated.$t),
                DescLimit < c.length && c.substring(0, DescLimit),
                MaxTitle && i.split(" ").length > TiltleLimit && (i = i.split(" ").slice(0, TiltleLimit).join(" ") + "..."),
                (m +=
                    "<div class='post-card-wrapper pcard" +
                    t +
                    "'><a title='" +
                    i +
                    "' class='post-image' href='" +
                    l +
                    "'><span class='postcat catnum" +
                    Math.floor(10 * Math.random() + 1) +
                    "'>" +
                    n +
                    "</span>" +
                    (s.includes("#noThumb") || r || g ? "<span class='noThumb'/>" : "<img class='jsimg' src='data:image/gif;base64,R0lGODlhAQABAAAAACw=' alt='" + i + "' data-src='" + s + "' width='192' height='108' />" + "<noscript>" + "<img alt='" + i + "' src='" + s + "' width='192' height='108' />" +"</noscript>") +
                    "</a><div class='post-details'>" +
                    //(hidetime ? "" : "<span class='Date'><svg><use href='#svg-clock'/></svg><a href='" + l + "'>" + GetAgo(date) + "</a></span>") +
					//new
					(hidemeta ? "" : 
					'<div class="post-meta">'
+ '<img alt="صورة" class="authorPhoto" height="238" width="400" src="' + authorPhoto + '">'
+ '<div class="metapost">'
+ '<span class="fn authorname">' + authorName + '</span>'
+ '<div class="Times">'
+ '<div class="article-timeago">'
+ '<span class="fn meta_sperator">|</span>'
+ '<span class="post-date"><svg><use href="#svg-clock"/></svg><a href="' + l + '">' + GetAgo(date) + '</a></span>'
+ '</div>'
+ '</div>'
+ '<span class="fn meta_sperator">|</span>'
+ '<a class="fn authorname" href="' + l + '#comments-container">' + commentsNum + ' تعليق</a>'
+ '</div>'
+ '</div>'
+ labelsDom
) +
					
					
					//new end
                    "<h3 class='post-title'><a title='" +
                    i +
                    "' href='" +
                    l +
                    "'>" +
                    i +
                    "</a></h3><div class='post-snippet'>" +
                    o +
                    "</div><a class='readmore' title='" +
                    i +
                    "' href='" +
                    l +
                    "'>" +
                    ReadMore +
                    "</a></div></div>"));
    }
    return m + "</div>";
};


//function m_brake(){setTimeout(() => {machine_brake=false;}, 0);}
//function triple(e,t,a,s){if("undefined"==typeof alternates){return l}var r,n,l,o,c=e.getAttribute(_x2724),i=e.getAttribute(_x2723),d=(i="10",e.getAttribute("data-index"));if("lastPost"===c?(r=Url+"feeds/posts/summary/?alt=json&start-index="+d+"&max-results="+i,o='<a class="show-more" href="/search/">'+ViewMore+"</a>"):"random"===c?(l=Math.floor(PostCount/2),r=Url+_x2712+(d=Math.abs(Math.floor(Math.random()*l+1)))+"&max-results="+i,o='<a class="show-more" href="/search/">'+ViewMore+"</a>"):"randomLabel"===c?(n=e.getAttribute("data-name"),l=Math.floor(Q[n]-i),r=Url+"feeds/posts/summary/-/"+encodeURIComponent(n)+"?alt=json&start-index="+(d=Math.abs(Math.floor(Math.random()*l+1)))+"&max-results="+i):(r=Url+"feeds/posts/summary/-/"+encodeURIComponent(c)+"?alt=json&start-index="+d+"&max-results="+i,o='<a class="show-more" href="/search/label/'+encodeURIComponent(c)+'">'+ViewMore+"</a>"),!e.classList.contains("loadclass")){function m(e,s,r){s.parentElement.parentElement.querySelector(".headline .title")&&(s.parentElement.parentElement.querySelector(".headline .title").insertAdjacentHTML("afterEnd",r),s.parentElement.parentElement.classList.add("posts-from")),s.parentElement.innerHTML="<div class='"+s.getAttribute("data-type")+"'>"+emojies3(e,s,t,a)+"</div>",magic(),"ay-news"==s.getAttribute("data-type")&&newsInit();}e.classList.add("loadclass"),cacheData?m(cacheData,e,o):(0!=s&&(r=Url+"feeds/posts/summary/?q="+encodeURIComponent(s)+"&alt=json&start-index="+d+"&max-results=12"),fetch(r).then((e=>e.json())).then((t=>{cacheData=t,m(cacheData,e,o);var a=document.querySelectorAll('.placa[data-type="RetPosts"]');if(s=0,2==a.length){var s="label:"+a[0].getAttribute(_x2724)+"|label:"+a[1].getAttribute(_x2724);a[0].parentNode.remove(),a[0].remove(),triple(a[1],6,12,s)}else a[0]&&triple(a[0],3,9,s);var n=document.querySelector('.placa[data-type="ay-news"]');n&&triple(n,0,cacheData.feed.entry.length)})))}}
//function triple(e,t,a,s){if("undefined"==typeof alternates)return l;var r,n,l,o,i=e.getAttribute(_x2724),d=e.getAttribute(_x2723),c=(d="10",e.getAttribute("data-index"));if("lastPost"===i?(r=Url+"feeds/posts/summary/?alt=json&start-index="+c+"&max-results="+d,o='<a class="show-more" href="/search/">'+ViewMore+"</a>"):"random"===i?(l=Math.floor(PostCount/2),r=Url+_x2712+(c=Math.abs(Math.floor(Math.random()*l+1)))+"&max-results="+d,o='<a class="show-more" href="/search/">'+ViewMore+"</a>"):"randomLabel"===i?(n=e.getAttribute("data-name"),l=Math.floor(Q[n]-d),r=Url+"feeds/posts/summary/-/"+encodeURIComponent(n)+"?alt=json&start-index="+(c=Math.abs(Math.floor(Math.random()*l+1)))+"&max-results="+d):(r=Url+"feeds/posts/summary/-/"+encodeURIComponent(i)+"?alt=json&start-index="+c+"&max-results="+d,o='<a class="show-more" href="/search/label/'+encodeURIComponent(i)+'">'+ViewMore+"</a>"),!e.classList.contains("loadclass")){function m(e,s,r){s.parentElement.parentElement.querySelector(".headline .title")&&(s.parentElement.parentElement.querySelector(".headline .title").insertAdjacentHTML("afterEnd",r),s.parentElement.parentElement.classList.add("posts-from")),s.parentElement.innerHTML="RetePostsRand"!=s.getAttribute("data-type")&&"RetPosts"!=s.getAttribute("data-type")?`<div class="${s.getAttribute("data-type")}">`+emojies3(e,s,t,a)+"</div>":emojies3(e,s,t,a),magic(),"ay-news"==s.getAttribute("data-type")&&newsInit()}e.classList.add("loadclass"),cacheData?m(cacheData,e,o):(0!=s&&(r=Url+"feeds/posts/summary/?q="+encodeURIComponent(s)+"&alt=json&start-index="+c+"&max-results=12"),fetch(r).then((e=>e.json())).then((t=>{cacheData=t,m(cacheData,e,o);var a=document.querySelectorAll('.placa[data-type="RetPosts"]');if(s=0,2==a.length){var s="label:"+a[0].getAttribute(_x2724)+"|label:"+a[1].getAttribute(_x2724);a[0].parentNode.remove(),a[0].remove(),triple(a[1],6,12,s)}else a[0]&&triple(a[0],3,9,s);var r=document.querySelector('.placa[data-type="ay-news"]');r&&triple(r,0,cacheData.feed.entry.length)})))}}
function triple(e, t, a, s) {
    if ("undefined" == typeof alternates) return l;
    var r,
        n,
        l,
        o,
        i = e.getAttribute(_x2724),
        d = e.getAttribute(_x2723),
        c = ((d = "10"), e.getAttribute("data-index"));
    if (
        ("lastPost" === i
            ? ((r = Url + "feeds/posts/summary/?alt=json&start-index=" + c + "&max-results=" + d), (o = '<a class="show-more" href="/search/">' + ViewMore + "</a>"))
            : "random" === i
            ? ((l = Math.floor(PostCount / 2)), (r = Url + _x2712 + (c = Math.abs(Math.floor(Math.random() * l + 1))) + "&max-results=" + d), (o = '<a class="show-more" href="/search/">' + ViewMore + "</a>"))
            : "randomLabel" === i
            ? ((n = e.getAttribute("data-name")), (l = Math.floor(Q[n] - d)), (r = Url + "feeds/posts/summary/-/" + encodeURIComponent(n) + "?alt=json&start-index=" + (c = Math.abs(Math.floor(Math.random() * l + 1))) + "&max-results=" + d))
            : ((r = Url + "feeds/posts/summary/-/" + encodeURIComponent(i) + "?alt=json&start-index=" + c + "&max-results=" + d), (
			//o = '<a class="show-more" href="/search/label/' + encodeURIComponent(i) + '">' + ViewMore + "</a>"
			// in related posts use label namw natead of viewmore txt
			o = '<a class="show-more" href="/search/label/' + encodeURIComponent(i) + '">' +     (e.getAttribute("data-type") === "RetPosts" ? i : ViewMore) + "</a>"
			
			)),
        !e.classList.contains("loadclass"))
    ) {
        function m(e, s, r) {
            s.parentElement.parentElement.querySelector(".headline .title") && (s.parentElement.parentElement.querySelector(".headline .title").insertAdjacentHTML("afterEnd", r), s.parentElement.parentElement.classList.add("posts-from")),
                (s.parentElement.innerHTML =
                    "RetePostsRand" != s.getAttribute("data-type") && "RetPosts" != s.getAttribute("data-type") ? `<div class="${s.getAttribute("data-type")}">` + emojies3(e, s, t, a) + "</div>" : emojies3(e, s, t, a)),
                magic(),
                "ay-news" == s.getAttribute("data-type") && newsInit();
        }
        e.classList.add("loadclass"),
            cacheData
                ? m(cacheData, e, o)
                : (0 != s && (r = Url + "feeds/posts/summary/?q=" + encodeURIComponent(s) + "&alt=json&start-index=" + c + "&max-results=12"),
                  fetch(r)
                      .then((e) => e.json())
                      .then((t) => {
                          (cacheData = t), m(cacheData, e, o);
                          var a = document.querySelectorAll('.placa[data-type="RetPosts"]');
                          if (((s = 0), 2 == a.length)) {
                              var s = "label:" + a[0].getAttribute(_x2724) + "|label:" + a[1].getAttribute(_x2724);
                              a[0].parentNode.remove(), a[0].remove(), triple(a[1], 6, 12, s);
                          } else a[0] && triple(a[0], 3, 9, s);
                          var r = document.querySelector('.placa[data-type="ay-news"]');
                          r && triple(r, 0, cacheData.feed.entry.length);
                      }));
    }
}



//UltraLazy = false;
//triplev = false;
if (!UltraLazy){
	
function dom2(){
	
if(triplev && isPost){machine_brake = true;var temprelat=document.querySelectorAll('.placa[data-type="RetePostsRand"]');if(q_douple=0,2==temprelat.length){var q_douple="label:"+temprelat[0].getAttribute(_x2724)+"|label:"+temprelat[1].getAttribute(_x2724);temprelat[0].remove(),triple(temprelat[1],0,6,q_douple)}else temprelat[0]&&triple(temprelat[0],0,3,q_douple);}
else{machine_brake = false;machine({type:"scroll"});}
document.addEventListener('scroll', function bitsys() {
//to make sure no image will show before scroll
bitsy = false;
    document.removeEventListener('scroll', bitsys);
});
}
if (document.readyState != "loading") {
    // 1. هنا بتكتب الكود اللي عاوزه يشتغل فوراً لأن الـ DOM جاهز والحدث عدى
    dom2(); 
} else {	
document.addEventListener("DOMContentLoaded", dom2);
}
}





//Sp-posts6  icon

(function(){
  // قائمة الرموز (Emoji / Unicode). ضف أو شيل اللي تحبه من هنا:
  const icons = [
    "🔌","🔋","⚡","💡","🧲","📡","📶","🛰️","💻",
    "⚙️","🔧","🔨","🪛","🪚","🔩","🧱","🏗️","🚧","📐",
    "📏","🧮","⏱️","💧",
    "👷","👓"
  ];

  // اختيار عشوائي
  const icon = icons[Math.floor(Math.random() * icons.length)];

  // إعداد قاعدة CSS مع الرمز المختار
  const cssRule = `
.Sp-posts6 .post-card-wrapper .post-title a::before,
.Sp-posts6 .post-card-wrapper h3 a::before {
  content: "${icon}";
  font-size: 16px;
  color: var(--AccentColor, #C71585);
  margin-inline-start: 6px;
  /* لو عايز محاذاة أفضل: */
  display: inline-block;
  line-height: 1;
  transform: translateY(0.06em);
}
`;

  // لو فيه style بنفس id نحدّفه وبعدين نضيف الجديد (يسمح بالتحديث المتكرر)
  const STYLE_ID = 'sp-posts6-random-icon';
  const old = document.getElementById(STYLE_ID);
  if (old) old.remove();

  const styleEl = document.createElement('style');
  styleEl.id = STYLE_ID;
  styleEl.type = 'text/css';
  styleEl.appendChild(document.createTextNode(cssRule));

  // أضفه في head
  (document.head || document.getElementsByTagName('head')[0]).appendChild(styleEl);

  // للطلاع في الكونسل (اختياري)
  console.log('Sp-posts6 icon set to:', icon);
})();


 



//speedup = true;
enable_DS=1;
enable_DS1=1;
debounce1 = 90;
stog_delay = 60;
debounce2 = 50;
debounce5 = 100;
debounce6 = 100;
debounce7 = 300;
contact = false;
LazyAdsense  = false;
function Lazy(){}
function debounce(e, t) {
    let n;
    return function (...a) {
        const r = this;
        clearTimeout(n), n = setTimeout((() => e.apply(r, a)), t)
    }
}

var debounceHandler1 = debounce((function (e) {
    speedup && (machine(e), setTimeout((() => {
        speedup && stog(), window.removeEventListener("scroll", debounceHandler1)
    }), stog_delay))
}), debounce1);
window.addEventListener("scroll", debounceHandler1);
var debounceHandler2 = debounce((function (e) {
    1 == enable_DS && magic(), 1 == enable_DS1 && magic1(), 0 == enable_DS && 0 == enable_DS1 && window.removeEventListener("scroll", debounceHandler2)
}), debounce2);
//var repjs, morerep, GetData, repblog, sco;
window.addEventListener("scroll", debounceHandler2);

stog_status = !1;
function stog() {}

 if (isPost) {
	 
function dom1(t){
	UltraLazy || ((!lazy_img && !lazy_img1 || lazy_img1 && is_pc) && magic(),machine(t)), contact && document.querySelector("#callme") && stog()
	
}
if (document.readyState != "loading") {
    // 1. هنا بتكتب الكود اللي عاوزه يشتغل فوراً لأن الـ DOM جاهز والحدث عدى
    dom1({ type: "instant", timeStamp: performance.now() }); 
} else {	 
window.addEventListener("DOMContentLoaded", dom1);
}
}


function debounceHandler3() {
    LazyAdsense && Lazy(), window.removeEventListener("mousemove", debounceHandler3)
}

function debounceHandler4() {
    LazyAdsense && Lazy(), window.removeEventListener("touchmove", debounceHandler4)
}
LazyAdsense && (window.addEventListener("mousemove", debounceHandler3), window.addEventListener("touchmove", debounceHandler4));
var debounceHandler5 = debounce((function (e) {
        UltraLazy && machine(e)
    }), debounce5),
    debounceHandler6 = debounce((function (e) {
        UltraLazy && machine(e)
    }), debounce6);
UltraLazy && (window.addEventListener("mousemove", debounceHandler5), window.addEventListener("touchmove", debounceHandler6));
 




//facebook comments
  if(fbComments && (isPage || isPost)){
  
  let fbLoaded = false;
  let fbnum = false;
  let fbparse = false;
  let scrollTimer = null;

  function loadFbSdk(callback) {
    // set fbCommentsnum once
    if (!fbnum && fbCommentsnum != "5") {
      let fbDiv = document.getElementById("facebook-comments");
      fbDiv.setAttribute("data-numposts", fbCommentsnum);
      fbnum = true;
    }

    if (fbLoaded) {
      if (typeof FB !== "undefined" && FB.XFBML) FB.XFBML.parse();
      console.log("fbLoaded before, FB.XFBML.parse");
      return;
    }
    fbLoaded = true;

    // language
    var fbLang = (lang.toLowerCase().startsWith('ar')) ? 'ar_AR' : 'en_US';
    
	var sdkSrc = "https://connect.facebook.net/" + fbLang + "/sdk.js#xfbml=1&version=v19.0";
    
	// appId
	if(appId){
    //var appMeta = document.querySelector('meta[property="fb:app_id"]');
    //var appId = appMeta ? appMeta.getAttribute("content") : "";
    console.log("appId: " + appId);    
    if (appId) sdkSrc += "&appId=" + appId;
    console.log("sdkSrc: " + sdkSrc);
	}
    if (!document.getElementById("fb-root")) {
      var root = document.createElement("div");
      root.id = "fb-root";
      document.body.insertBefore(root, document.body.firstChild);
    }

    var js = document.createElement("script");
    js.async = true;
    js.defer = true;
    js.crossOrigin = "anonymous";
    js.src = sdkSrc;

    js.onload = function() {
      if (typeof FB !== "undefined" && FB.XFBML) {
        console.log("first fbLoad → auto FB.XFBML.parse (hidden)");
        // parse على الفيسبوك كومنت ديف حتى لو لسه مخفي
        FB.XFBML.parse(document.getElementById("facebook-comments"));
        if (typeof callback === "function") callback();
		fbparse = true;
      }
    };

    document.body.appendChild(js);
  }


function dom4(){
	
  // scroll delay
  window.addEventListener("scroll", function() {
    if (scrollTimer === null) {
      scrollTimer = setTimeout(function() {
        console.log("auto loadFbSdk");
        loadFbSdk();
      }, fbtimer);
    }
  }, { once: true });

  // tabs
  document.querySelectorAll(".comments-tabs .tabs li").forEach(tab => {
    tab.addEventListener("click", function() {
      document.querySelectorAll(".comments-tabs .tabs li").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.style.display = "none");

      this.classList.add("active");
      var target = document.getElementById(this.getAttribute("data-tab"));
      target.style.display = "block";
	  if(!fbLoaded){loadFbSdk();}

    });
  });
  
}
if (document.readyState != "loading") {
    // 1. هنا بتكتب الكود اللي عاوزه يشتغل فوراً لأن الـ DOM جاهز والحدث عدى
    dom4(); 
} else {
document.addEventListener("DOMContentLoaded", dom4);
}
  }

//header and side menu
const site_header = document.querySelector(".site-header");
const drawer=document.getElementById('sideDrawer');
let mainMenu = site_header.querySelector(".main-menu");
drawerlogo_starus = false;
//search
const openBtn = document.getElementById('openSearch');
const overlay = document.getElementById('searchOverlay');
const closeBtn = document.getElementById('closeSearch');
const input = document.getElementById('siteSearch');
function closeSearch(){
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden','true');
}
//Dark mode toggle with persistence
const body = document.body;
//const toggle = document.getElementById('darkModeToggle');
const toggle = document.getElementById('drk');
const stored = localStorage.getItem('site-dark');
//if(stored === '1') body.classList.add('dark'), toggle.setAttribute('aria-pressed','true');
if (stored === '1') {
    body.classList.add('dark');
    toggle.checked = true;
}

function Dark0(){
      // Dark mode toggle with persistence
      toggle.addEventListener('click', ()=>{
        const isDark = body.classList.toggle('dark');
        toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
        localStorage.setItem('site-dark', isDark ? '1' : '0');
      });
}
function Dark(){
      // IMPORTANT: listen on checkbox, not label
    toggle.addEventListener('change', function () {
    const isDark = this.checked;

    body.classList.toggle('dark', isDark);
    localStorage.setItem('site-dark', isDark ? '1' : '0');
	});
}

function dom3(){
	 // 1. remove +/- from header menu
  
   let allLinks = mainMenu.querySelectorAll("li a");

   allLinks.forEach(link => {
     // link remove +/-
     link.textContent = link.textContent.trim().replace(/^[\+\-]\s*/, '');
  
     // title remove +/-
     link.title = link.title.trim().replace(/^[\+\-]\s*/, '');
   });
   
   
   //new
   mainMenu.querySelectorAll('.arrow label').forEach(lab => {
      lab.textContent = lab.textContent.trim().replace(/^[\+\-]\s*/, '');
   });

    // 2. side drawer toggle
    document.getElementById('closeDrawer').onclick=()=>drawer.classList.remove('active');
	document.getElementById('menuToggle').onclick = () => {
       // 1. add active class
       drawer.classList.add('active'); 
       // 2. build side menu
       //build_sidem(); 
       // 3. show logo if not shown
    if(!drawerlogo_starus){
	var drawerlogo = drawer.querySelector("img[data-src]")
    if (drawerlogo){
       var e=drawerlogo.getAttribute("data-src");drawerlogo.setAttribute("src",e);drawerlogo.removeAttribute("data-src");drawerlogo_starus = true;
    }} 
   }; 

   
   // 3. search
      openBtn.addEventListener('click', ()=>{
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden','false');
        setTimeout(()=> input.focus(), 120);
		copy_labels();
      });
      closeBtn.addEventListener('click', closeSearch);
      overlay.addEventListener('click', (e)=>{
        if(e.target === overlay) closeSearch();
      });   
     
	 
	 // 4. Dark mode toggle with persistence
	 Dark();

     
	 
	 // 5. PostSittings
	 if (PostSittings && (isPost || isPage)) {
       // PostSittings open/close
	   var postBody = document.querySelector(".article-body");
	   window.toggleSettings = function () {
 	   const box = document.querySelector(".CustomSettings");
 	   box.style.display = (box.style.display === "flex") ? "none" : "flex";
	   };
	  
	  
 	  //PostSittings loadingvalues from localStorage
 	  const savedFont = localStorage.getItem("postFontSize");
 	  const savedLine = localStorage.getItem("postLineHeight");
	 	  
 	  if (savedFont) {
	  // ---- Font Size ----
      let fntBox = document.querySelector(".cs-font"),
      fntNum = fntBox.querySelector(".cs-current span"),
      fntSize = parseInt(fntNum.innerText),
      fntAdd = fntBox.querySelector(".cs-add"),
      fntMin = fntBox.querySelector(".cs-min");
	  
  	   fntSize = parseInt(savedFont);
  	   postBody.style.fontSize = fntSize + "px";
  	   fntNum.innerText = fntSize;
 	  }

  	 if (savedLine) {
	  // ---- Line Height ----
      let lnBox = document.querySelector(".cs-line"),
      lnNum = lnBox.querySelector(".cs-current span"),
      lnSize = parseFloat(lnNum.innerText),
      lnAdd = lnBox.querySelector(".cs-add"),
      lnMin = lnBox.querySelector(".cs-min");
	  
   	  lnSize = parseFloat(savedLine);
  	   postBody.style.lineHeight = lnSize + "em";
   	  lnNum.innerText = lnSize;
 	  }
	 }	  
     
	 
	 // 6. load More 
  	 if (isHome || isMultipleItem){
 	  setTimeout(function() {
     	 LMore(); //load More
  
  	 }, 1000);
  	 }
	 
	 
	 // 7. table of content
	 if(isPost){
	 // تشغيل عند التحميل
  	 buildTOC();
  	 var header = document.querySelector('.toc-box .toc-header');
  	 var ul = header.nextElementSibling;

  	 ul.style.display = 'none';
  	 header.classList.add('closed');

  	 header.addEventListener('click', function() {
    	 if (ul.style.display === 'none') {
     	  ul.style.display = 'block';
     	  header.classList.remove('closed');
    	 } else {
    	   ul.style.display = 'none';
    	   header.classList.add('closed');
   	  }
 	  });
	 }  
     
	 
	 
	 // 8. blogger comment
	 //changed to function com() will run in magic1 after frame in view...
	 
	 //
	 
	 // 9. comment add role button to reply link to fix " Links are not crawlable "
	   if(!hide_coments && fixComt){
	   const comments = document.querySelector('.comments-content');
  if (comments){
  // العناصر اللي عايزين نحسنها
  const selector = `
    a.comment-reply:not([href]),
    .thread-count a:not([href]),
    .loadmore a:not([href])
  `;
  comments.querySelectorAll(selector).forEach(function(el) {
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', 'رد على التعليق');
  });
  }
  
  
  
  // 10.comment remove div after ol tag cause err in pagespeed 
	 // remove div after ol tag cause err in pagespeed 
 // 1. جلب عنصر الحاوية الرئيسي من الصفحة
var doc = document.getElementById('comment-holder');

if (doc) {
  var topRa = document.getElementById('top-ra');

  if (topRa) {
    // جلب جميع القوائم الفرعية <ol> التي تنتهي بـ "-ra"
    var subLists = topRa.querySelectorAll('ol[id$="-ra"]');

    subLists.forEach(ol => {
      // جلب أول عنصر ديف مباشرة داخل الـ ol
      var firstDiv = ol.querySelector(':scope > div');
      
      if (firstDiv) {
        // الشرط الأول: الديف فارغ تماماً -> نحذف القائمة الفرعية كلها
        if (firstDiv.innerHTML.trim() === '') {
          ol.remove();
        } 
        // الشرط الثاني: الديف يحتوي على تعليقات
        else {
          // أولاً: جلب ديف الرد (الذي يحتوي على كلاس continue) من داخل الـ ol
          var continueDiv = ol.querySelector(':scope > .continue');
          
          // إذا وجدنا ديف الرد، نقله ليكون بعد الـ <ol> مباشرة
          if (continueDiv) {
            ol.after(continueDiv);
          }

          // ثانياً: نقل كل عناصر التعليقات (li) الموجودة داخل firstDiv لتصبح مباشرة داخل الـ ol
          while (firstDiv.firstChild) {
            ol.insertBefore(firstDiv.firstChild, firstDiv);
          }
          
          // ثالثاً: حذف الـ div الأب الذي أصبح فارغاً الآن
          firstDiv.remove();
        }
      }
    });
  }

}

}




     
	 
	
	 
	 
	 
	 // 11. build  js comments
	 if(js_coments){
	 bcom();
	 }
}	
if (document.readyState != "loading") {
    // 1. هنا بتكتب الكود اللي عاوزه يشتغل فوراً لأن الـ DOM جاهز والحدث عدى
    dom3(); 
} else {
document.addEventListener("DOMContentLoaded", dom3)
}

	 
build_sidem_status = false;

function build_sidem(){
//copy main menu to side-drawer
//Mmenu
//const drawer = document.getElementById("sideDrawer");
//const site_header = document.querySelector(".site-header");

   if (build_sidem_status) return; 
  // 1. نسخ القايمة من .main-menu 
  //let mainMenu = site_header.querySelector(".main-menu");
  let mainSide = drawer.querySelector(".drawer-main .main-side");
  if (mainMenu && mainSide) {
    mainSide.innerHTML = mainMenu.innerHTML;
  }

  // 2. نسخ القايمة من #Mpages -> .drawer-pages
  let pagesMenu = site_header.querySelector("#Mpages .widget-content ul");
  let drawerPages = drawer.querySelector(".drawer-pages");
  if (pagesMenu && drawerPages) {
    drawerPages.innerHTML = "<ul>" + pagesMenu.innerHTML + "</ul>";
	build_sidem_status = true;
  }
  
  // 3. copy social
  let header_social = site_header.querySelector(".social-static.social");
  let Side_social = drawer.querySelector(".social-static.social");
  if (header_social && Side_social) {
    Side_social.innerHTML = header_social.innerHTML;
  }
  
  
  // 4. side logo
  drawer.querySelectorAll(".logoplaca").forEach(function (el) {
    // استخراج البيانات
    let src = el.getAttribute("data-src");
    let alt = el.getAttribute("data-alt") || "";
    let w   = el.getAttribute("data-width") || "";
    let h   = el.getAttribute("data-height") || "";

    // إنشاء صورة بديلة
    let img = document.createElement("img");
    img.setAttribute("data-src", src);
    img.setAttribute("alt", alt);
    img.setAttribute("title", alt);
    if (w) img.setAttribute("width", w);
    if (h) img.setAttribute("height", h);
    img.setAttribute("loading", "lazy");
    
	
	let a = document.createElement("a");
    a.setAttribute("href", Url);
	 // وضع الصورة داخل الرابط
  a.appendChild(img);

  // استبدال <i> بالرابط
  el.replaceWith(a);
  
    // استبدال <i> بالصورة
   // el.replaceWith(img);
  });
  
  
  // 5.side drawer items
drawer.querySelectorAll('.drawer-main .iparent .arrow').forEach(arrow=>{
  arrow.addEventListener('click', function(e){
    e.preventDefault(); // يمنع أي لينك وراه من التفعيل
    e.stopPropagation(); // يمنع Bubbling للـ <a>
    const parentLi = this.closest('li');
    parentLi.classList.toggle('open');
  });
});


    // 6. Accessibility: close search with Esc
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        const overlay = document.getElementById('searchOverlay');
        if(overlay.classList.contains('active')){
          overlay.classList.remove('active');
          overlay.setAttribute('aria-hidden','true');
        }
      }
    });
	
}	


copy_labels_status = false;
function copy_labels(){
    if (copy_labels_status) return;
	// copy labels to search box
	var labels = document.querySelector("#Label1 .widget-content.cloud-label-widget-content");
    var searchBox = document.querySelector("#searchOverlay .search-box");
    if (labels && searchBox) {
      var clone = labels.cloneNode(true);
      searchBox.after(clone);
	  copy_labels_status = true;
    }
}
 
//goup button and numcommet buttont
goup_status = false;
function goup(){
if(goup_status) return; 
var btn = document.getElementById("returnup");
// ظهور الزر بعد التمرير
window.addEventListener("scroll", () => {
goup_status = true;
  if (window.scrollY > 100) {
    btn.classList.add("vsbl");
  } else {
    btn.classList.remove("vsbl");
  }
}); 
// سموث سكرول للأعلى
btn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
   
//smooth scroll for #comments-container link
document.querySelectorAll('a.fn.authorname[href="#comments-container"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector('#comments-container');
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
}


// news
let intervalId, newsobj, resumeTimeout, r = 0, newsRun = false, itemHeight = 40, news_t = 2500;
let navn,navp;

function updatePosition(posts) {
  newsobj.style.transform = "translateY(" + (-r * itemHeight) + "px)";
  posts.forEach(p => p.classList.remove("show"));
  posts[r].classList.add("show");
}

function news_plus() {
  let posts = newsobj.querySelectorAll(".post-card-wrapper");
  r = (r + 1) % posts.length;
  updatePosition(posts);
}

function news_minus() {
  let posts = newsobj.querySelectorAll(".post-card-wrapper");
  r = (r - 1 + posts.length) % posts.length;
  updatePosition(posts);
}

function startNews(delay = 0) {
  if (!newsRun) {
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      newsRun = true;
      intervalId = setInterval(news_plus, news_t);
    }, delay);
  }
}

function stopNews() {
  clearInterval(intervalId);
  newsRun = false;
  clearTimeout(resumeTimeout);
}
newsInit_status = false;
function newsInit0() {
 if(newsInit_status) return;
  newsobj = document.querySelector(".ay-news");
  if (!newsobj) return;
  itemHeight = newsobj.querySelector(".post-card-wrapper").offsetHeight || 40;
  newsobj.style.transform = "translateY(0px)";
  
  //
  // hover stop/start
  newsobj.addEventListener("mouseenter", stopNews);
  newsobj.addEventListener("mouseleave", () => startNews(100));

 navn = document.querySelector(".news-next");
 navp = document.querySelector(".news-prev");
navn.addEventListener("click", () => {
  stopNews();
  news_plus();
  startNews(1000);
});
navp.addEventListener("click", () => {
  stopNews();
  news_minus();
  startNews(1000);
});

navn.addEventListener("mouseenter", stopNews);
navp.addEventListener("mouseleave", () => startNews(500));

// mobile touch
navn.addEventListener("touchstart", stopNews);

  //
  startNews();
  newsInit_status = true;
}

//newsInit();

if(!newsInit_delay){
//to start immediatly from triple or machine func,newsInit is empty and newsInit0 is the real one
newsInit = newsInit0;
}
// news end

 
 document.addEventListener('scroll', function initializeer() {
    
	// 1. initialize side menu after timer  
	setTimeout(function() {
	//build_sidem();
	}, SidemTimer);
	
	// 2. copy labels to search box
	setTimeout(function() {
	copy_labels();
	}, SearchLabelTimer);
	
    // 3. share build
	if (isPost || isPage) {
	setTimeout(function() {share_build();}, share_buildTimer);
    }
	
	
	// 4. PostSittings
	if (PostSittings && (isPost || isPage)) {
	setTimeout(function() {	setting_build();}, setting_buildTimer);
	}
    
	
	// 5. goup buttonand numcomment button
	setTimeout(function() {	goup();}, goupTimer);
	 
	// 6. areacode
    if (isPost || isPage) {
       setTimeout(function() {	codebox_build();}, areacodetimer);
    }

    // 7. newsInit0 delay 
	setTimeout(function() {	newsInit0();}, newsInit0timer);
	
	// 8. build  js_coments_lazy
	 if(js_coments_lazy){
	 setTimeout(function() {
    bcom();
}, 3000); // 3000 ملي ثانية تعادل 3 ثوانٍ
	 }
	 
	// 9.
	// 10.
	// 11.
	 
	 
	 // نشيل حدث الـscroll بعد أول مرة
    document.removeEventListener('scroll', initializeer);
});
	


//clear deprecated warning in browser console
/*
(function() {
  // خزّن نسخة من console الأصلية
  const originalConsoleWarn = console.warn;

  // عدّل console.warn
  console.warn = function(...args) {
    // تجاهل الرسائل اللي فيها 'Deprecated' أو أي تحذيرات مشابهة
    if (args.some(arg => typeof arg === 'string' && arg.includes('Deprecated'))) {
      return;
    }
    // لو الرسالة مش تحذير deprecated، اعرضها طبيعي
    originalConsoleWarn.apply(console, args);
  };
})();
*/


