// === GESTION DES PREUVES (SCREENSHOTS) POUR LE TABLEAU DE COMPÉTENCES ===

// Base de données des preuves (à personnaliser avec tes vraies images)
const preuves = {
    // Format: 'nom-projet': { competence: X, images: [...], description: '...' }
    
    'fm-move': {
        4: {
            description: "Compétence : Travailler en mode projet",
            images: [
                { src: 'img/preuves/fm-move-dashboard.png', caption: 'Dashboard administrateur' },
                { src: 'img/preuves/fm-move-reservations.png', caption: 'Système de réservation' },
                { src: 'img/preuves/fm-move-conflits.png', caption: 'Gestion des conflits' }
            ]
        },
        5: {
            description: "Compétence : Mettre à disposition un service informatique",
            images: [
                { src: 'img/preuves/fm-move-deploiement.png', caption: 'Déploiement en production' },
                { src: 'img/preuves/fm-move-authentification.png', caption: 'Système d\'authentification' }
            ]
        }
    },
    
    'homsy': {
        4: {
            description: "Compétence : Travailler en mode projet",
            images: [
                { src: 'img/preuves/homsy-architecture.png', caption: 'Architecture de l\'application' },
                { src: 'img/preuves/homsy-flutter.png', caption: 'Interface mobile Flutter' }
            ]
        },
        5: {
            description: "Compétence : Mettre à disposition un service informatique",
            images: [
                { src: 'img/preuves/homsy-firebase.png', caption: 'Backend Firebase' },
                { src: 'img/preuves/homsy-ia.png', caption: 'Intégration Google Gemini AI' }
            ]
        }
    },
    
    'neige-soleil': {
        4: {
            description: "Compétence : Travailler en mode projet",
            images: [
                { src: 'img/preuves/neige-soleil-home.png', caption: 'Page d\'accueil' },
                { src: 'img/preuves/neige-soleil-admin.png', caption: 'Back-office admin' }
            ]
        }
    },
    
    'linkedin': {
        6: {
            description: "Compétence : Organiser son développement professionnel",
            images: [
                { src: 'img/preuves/linkedin-profil.png', caption: 'Profil LinkedIn optimisé' }
            ]
        }
    },
    
    'site-orange': {
        2: {
            description: "Compétence : Répondre aux incidents et aux demandes d'assistance",
            images: [
                { src: 'img/preuves/site-orange-tickets.png', caption: 'Gestion des tickets' }
            ]
        },
        4: {
            description: "Compétence : Travailler en mode projet",
            images: [
                { src: 'img/preuves/site-orange-projet.png', caption: 'Développement du site' }
            ]
        },
        5: {
            description: "Compétence : Mettre à disposition un service informatique",
            images: [
                { src: 'img/preuves/site-orange-deploiement.png', caption: 'Mise en production' }
            ]
        }
    },
    
    'ServiceNow': {
        1: {
            description: "Compétence : Gérer le patrimoine informatique",
            images: [
                { src: 'img/preuves/ServiceNow.png', caption: 'Inventaire du parc informatique' }
            ]
        }
    },
    

    
    'projet-c': {
        2: {
            description: "Compétence : Répondre aux incidents et aux demandes d'assistance",
            images: [
                { src: 'img/preuves/projet-c-code.png', caption: 'Code source en C' }
            ]
        }
    },
    
    'calculatrice-java': {
        1: {
            description: "Compétence : Gérer le patrimoine informatique",
            images: [
                { src: 'img/preuves/calculatrice-java-ui.png', caption: 'Interface de la calculatrice' }
            ]
        }
    },
       

};

// Noms des compétences pour affichage
const competencesNames = {
    1: "Gérer le patrimoine informatique",
    2: "Répondre aux incidents et aux demandes d'assistance",
    3: "Développer la présence en ligne de l'organisation",
    4: "Travailler en mode projet",
    5: "Mettre à disposition des utilisateurs un service informatique",
    6: "Organiser son développement professionnel"
};

// Ouvrir la modal avec les preuves
function openProofModal(projectId, competenceNumber) {
    const modal = document.getElementById('proofModal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const gallery = document.getElementById('proof-images');
    
    // Récupérer les données du projet
    const projectData = preuves[projectId];
    
    if (!projectData || !projectData[competenceNumber]) {
        alert('Aucune preuve disponible pour ce projet/compétence.');
        return;
    }
    
    const proof = projectData[competenceNumber];
    
    // Mettre à jour le titre
    const projectName = document.querySelector(`[data-project="${projectId}"] .project-name strong`).textContent;
    title.textContent = `${projectName}`;
    description.textContent = `${competencesNames[competenceNumber]}`;
    
    // Vider et remplir la galerie
    gallery.innerHTML = '';
    
    proof.images.forEach(img => {
        const proofDiv = document.createElement('div');
        proofDiv.className = 'proof-item';
        proofDiv.innerHTML = `
            <img src="${img.src}" alt="${img.caption}" onerror="this.src='img/placeholder.png'">
            <div class="proof-caption">${img.caption}</div>
        `;
        
        // Clic pour agrandir l'image
        proofDiv.onclick = () => {
            window.open(img.src, '_blank');
        };
        
        gallery.appendChild(proofDiv);
    });
    
    // Afficher la modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Bloquer le scroll
}

// Fermer la modal
function closeProofModal() {
    const modal = document.getElementById('proofModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Réactiver le scroll
}

// Fermer la modal en cliquant à l'extérieur
window.onclick = function(event) {
    const modal = document.getElementById('proofModal');
    if (event.target === modal) {
        closeProofModal();
    }
}

// Fermer la modal avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProofModal();
    }
});

// === FONCTION HELPER POUR AJOUTER DES PREUVES FACILEMENT ===
// Tu peux appeler cette fonction dans la console pour ajouter des preuves rapidement
function ajouterPreuve(projectId, competenceNumber, imagePath, caption) {
    if (!preuves[projectId]) {
        preuves[projectId] = {};
    }
    
    if (!preuves[projectId][competenceNumber]) {
        preuves[projectId][competenceNumber] = {
            description: `Compétence : ${competencesNames[competenceNumber]}`,
            images: []
        };
    }
    
    preuves[projectId][competenceNumber].images.push({
        src: imagePath,
        caption: caption
    });
    
    console.log(`✅ Preuve ajoutée pour ${projectId} - Compétence ${competenceNumber}`);
    console.log('Preuves actuelles:', preuves);
}

// Exemple d'utilisation dans la console :
// ajouterPreuve('fm-move', 4, 'img/preuves/nouvelle-image.png', 'Description de l\'image');