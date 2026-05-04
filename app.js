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

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiWZ08WxPfls42QN93kYasCncM35T_rG8",
  authDomain: "dlandgestion.firebaseapp.com",
  projectId: "dlandgestion",
  storageBucket: "dlandgestion.firebasestorage.app",
  messagingSenderId: "380176880114",
  appId: "1:380176880114:web:7256fbc584032626e05b6b",
  measurementId: "G-YNGWQ0TJXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);

// --- GESTION DE L'UTILISATEUR ---

window.connexion = () => {
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-password').value;
    signInWithEmailAndPassword(auth, email, pass).catch(err => alert(err.message));
};

window.inscription = () => {
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-password').value;
    createUserWithEmailAndPassword(auth, email, pass).catch(err => alert(err.message));
};

window.deconnexion = () => signOut(auth);

// Surveiller l'état de connexion
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        chargerVentes(user.uid);
    } else {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('app-content').style.display = 'none';
    }
});

// --- SAUVEGARDE ET RÉCUPÉRATION ---

// Enregistrer une vente (Liée à l'UID)
window.ajouterVente = async (nom, prix) => {
    const user = auth.currentUser;
    if (user) {
        await addDoc(collection(db, "ventes"), {
            produit: nom,
            montant: prix,
            userId: user.uid, // <--- C'est l'identifiant vital
            date: serverTimestamp()
        });
    }
};

// Charger UNIQUEMENT les ventes de cet utilisateur
function chargerVentes(userId) {
    const q = query(collection(db, "ventes"), where("userId", "==", userId));
    onSnapshot(q, (snapshot) => {
        const liste = document.getElementById('historique-ventes');
        liste.innerHTML = "";
        snapshot.forEach((doc) => {
            const v = doc.data();
            liste.innerHTML += <li>${v.produit} : ${v.montant} F</li>;
        });
    });
}

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

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
// Lancer le contrôle dès le chargement de la page
window.addEventListener('load', controleAcces);


const auth = getAuth(app);

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
