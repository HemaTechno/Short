// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAFIYOG72TVwBbm_-M4O2fULVbAV5M1c60",
  authDomain: "link-17d13.firebaseapp.com",
  projectId: "link-17d13",
  storageBucket: "link-17d13.firebasestorage.app",
  messagingSenderId: "82805682441",
  appId: "1:82805682441:web:5a921fdcdd2c2a236623d8",
  measurementId: "G-TMQV1S5BPG"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// تسجيل الدخول
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    const user = result.user;
    document.getElementById("user-name").textContent = user.displayName;
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("user-info").classList.remove("hidden");
    document.getElementById("main-app").classList.remove("hidden");
    loadMyLinks();
  });
}

// تسجيل الخروج
function logout() {
  auth.signOut().then(() => {
    location.reload();
  });
}

// تحميل الروابط الخاصة بالمستخدم
function loadMyLinks() {
  // هنضيفه لاحقاً
}

const baseUrl = window.location.origin;

// توليد اسم عشوائي في حال لم يدخل المستخدم اسماً مخصصاً
function generateRandomId(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// دالة الاختصار
function shortenUrl() {
  const longUrl = document.getElementById("long-url").value.trim();
  let customAlias = document.getElementById("custom-alias").value.trim();
  const user = auth.currentUser;

  if (!longUrl) return alert("يرجى إدخال رابط");

  if (!customAlias) customAlias = generateRandomId();

  const shortLinkRef = db.collection("shortLinks").doc(customAlias);

  shortLinkRef.get().then((doc) => {
    if (doc.exists) {
      alert("الاسم المختصر مستخدم مسبقاً، اختر اسمًا آخر");
    } else {
      shortLinkRef.set({
        originalUrl: longUrl,
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        clicks: 0
      }).then(() => {
        const shortUrl = `${baseUrl}/${customAlias}`;
        document.getElementById("short-url").value = shortUrl;
        document.getElementById("result").classList.remove("hidden");
        loadMyLinks();
      });
    }
  });
}

// نسخ الرابط المختصر
function copyShortUrl() {
  const shortUrl = document.getElementById("short-url");
  shortUrl.select();
  document.execCommand("copy");
  alert("تم نسخ الرابط المختصر ✅");
}

// تحميل روابط المستخدم
function loadMyLinks() {
  const user = auth.currentUser;
  const myLinksList = document.getElementById("my-links");
  myLinksList.innerHTML = "";

  db.collection("shortLinks")
    .where("userId", "==", user.uid)
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `
          <a href="${baseUrl}/${doc.id}" target="_blank">${baseUrl}/${doc.id}</a>
          <br><small>عدد الضغطات: ${data.clicks}</small>
        `;
        myLinksList.appendChild(li);
      });
    });
}
