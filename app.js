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
