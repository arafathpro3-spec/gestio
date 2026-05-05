// 1. IMPORTS (Une seule fois, tout en haut)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// Ta liste de clés valides (tu peux en créer plusieurs)
const clesValides = [ "KARIM5764", "DLAND-2026-PRO", "BOHICON-SALES-01", "COTONOU-DEMO"];

function verifierLicence() {
    const saisie = document.getElementById('cle-input').value.trim();
    
    if (clesValides.includes(saisie)) {
        localStorage.setItem('dland_licence_active', 'true');
        alert("Félicitations ! Application activée avec succès.");
        document.getElementById('verrou-licence').classList.add('hidden');
    } else {
        alert("Clé invalide. Veuillez contacter KA GESTION pour obtenir une licence.");
    }
}


// 2. CONFIGURATION (Tes clés réelles de la capture 54177.jpg)
const firebaseConfig = {
  apiKey: "AIzaSyDiWZ08WxPfls42QN93kYasCncM35T_rG8",
  authDomain: "dlandgestion.firebaseapp.com",
  projectId: "dlandgestion",
  storageBucket: "dlandgestion.firebasestorage.app",
  messagingSenderId: "380176880114",
  appId: "1:380176880114:web:7256fbc584032626e05b6b",
  measurementId: "G-YNGWQ0TJXH"
};


// INITIALISATION
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. FONCTION CRÉER COMPTE
window.creerCompte = async function() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    
    if(!email || !pass) return alert("Veuillez remplir les champs.");

    try {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Compte créé avec succès !");
    } catch (e) {
        alert("Erreur : " + e.message);
    }
};

// 4. FONCTION SE CONNECTER
window.seConnecter = async function() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    
    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (e) {
        alert("Email ou mot de passe incorrect.");
    }
};

// 5. GESTION DE L'AFFICHAGE (Masquer l'écran bleu si connecté)
onAuthStateChanged(auth, (user) => {
    const overlay = document.getElementById('auth-overlay');
    if (user) {
        overlay.classList.add('hidden');
        console.log("Connecté :", user.email);
    } else {
        overlay.classList.remove('hidden');
    }
});
// Charger UNIQUEMENT les ventes de cet utilisateur
function chargerVentes(userId) {
    const q = query(collection(db, "ventes"), where("userId", "==", userId));
    onSnapshot(q, (snapshot) => {
        const liste = document.getElementById('historique-ventes');
        liste.innerHTML = "";
        snapshot.forEach((doc) => {
            const v = doc.data();
            liste.innerHTML += `<li>${v.produit} : ${v.montant} F</li>`;
        });
    });
}


// --- Fonction Se Connecter ---
window.seConnecter = () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    
    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            alert("Connexion réussie ! Vos données sont en cours de synchronisation.");
        })
        .catch((error) => {
            alert("Erreur : " + error.message);
        });
};

// --- Fonction Créer un Compte ---
window.creerCompte = () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    
    createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            alert("Compte créé avec succès !");
        })
        .catch((error) => {
            alert("Erreur lors de l'inscription : " + error.message);
        });
};

// --- Gestion de l'affichage automatique ---
onAuthStateChanged(auth, (user) => {
    const overlay = document.getElementById('auth-overlay');
    if (user) {
        // Si l'utilisateur est connecté, on cache la fiche de connexion
        overlay.classList.add('hidden'); 
        console.log("Utilisateur prêt : " + user.email);
    } else {
        // Sinon, on affiche la fiche
        overlay.classList.remove('hidden');
    }
});

// Define the missing function
async function controleAcces() {
    console.log("Checking access...");
    // Add your logic here, e.g., checking localStorage or a session cookie
    const user = localStorage.getItem('user');
    if (!user) {
        console.log("Access denied: No user found.");
        // Optional: window.location.href = 'login.html';
    }
}

// Now this line will work because the function exists
window.addEventListener('load', controleAccess);

// Définis tes fonctions
async function seConnecter() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    // ... reste de ton code de connexion ...
}

async function creerCompte() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    // ... reste de ton code de création ...
}

// --- ÉTAPE CRUCIALE : Rendre les fonctions visibles pour le HTML ---
window.seConnecter = seConnecter;
window.creerCompte = creerCompte;
window.controleAccess = controleAccess;
