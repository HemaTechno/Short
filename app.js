// إعداد Firebase
const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "XXXX.firebaseapp.com",
  projectId: "XXXX",
  storageBucket: "XXXX.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
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
