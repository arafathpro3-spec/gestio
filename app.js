// Ta liste de clés valides (tu peux en créer plusieurs)
const clesValides = ["DLAND-2026-PRO", "BOHICON-SALES-01", "COTONOU-DEMO", "KARIM5764"];

function controleAcces() {
    const licenceActivee = localStorage.getItem('dland_licence_active');
    
    if (!licenceActivee) {
        document.getElementById('verrou-licence').classList.remove('hidden');
    }
}

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

// Lancer le contrôle dès le chargement de la page
window.addEventListener('load', controleAcces);
