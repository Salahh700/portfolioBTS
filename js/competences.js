// ===================================================================
// SYSTÈME DE TABLEAU DE COMPÉTENCES - VERSION AUTOMATIQUE
// ===================================================================
// Tu modifies SEULEMENT ce fichier et tout se génère automatiquement !

// 🎯 DÉFINITION DE TES PROJETS
// Ajoute tes projets ici avec leurs compétences et preuves
const projets = [
    
    // === EXEMPLE : FM MOVE (Ton projet phare) ===
    {
        id: 'fm-move',                    // ID unique (sans espaces, minuscules)
        nom: 'FM Move (Gestion Flotte)',  // Nom affiché
        icon: '🚗',                        // Emoji ou icône
        categorie: 'Alternance',           // Formation / Alternance / Cours / Auto-didacte
        featured: true,                    // Badge "Projet Phare" (true/false)
        nouveau: false,                    // Badge "Nouveau" (true/false)
        competences: {
            // Compétence 4 : Travailler en mode projet
            4: {
                images: [
                    { src: 'img/preuves/CodeFMmove.png', caption: 'Architecture du code' },
                ]
            },
            // Compétence 5 : Mettre à disposition un service
            5: {
                images: [
                    { src: 'img/preuves/IndexFMmove.png', caption: 'Déploiement en production' }
                ]
            },
            3: {
                images: [
                    { src: 'img/preuves/IndexFMmove.png', caption: 'MAJ du site en ligne hebdomadaire 💾' }
                ]
            }
        }
    },

        {
        id: 'servicenow',
        nom: 'Service Now',
        icon: '🛠️',
        categorie: 'Alternance',
        featured: false,
        nouveau: false,
        competences: {
            2: {
                images: [
                    { src: 'img/preuves/ServiceNow.png', caption: 'Gestion des tickets avec SN' }
                ]
            }
        }
    },

     {
        id: 'Snipe IT',
        nom: 'Sipe IT',
        icon: '🧰',
        categorie: 'Alternance',
        featured: false,
        nouveau: false,
        competences: {
            1: {
                images: [
                    { src: 'img/preuves/SnipeIT.png', caption: 'Inventaire du parc informatique avec Snipe IT' }
                ]
            }
        }
    },

            {
        id: 'Morpion',
        nom: 'Morpion en JAVA',
        icon: '🧮',
        categorie: 'Formation',
        featured: false,
        nouveau: false,
        competences: {
            4: {
                images: [
                    { src: 'img/preuves/Morpion.png', caption: 'Interface Graphique' }
                ]
            }
        }
    },

            {
        id: 'Linkedin',
        nom: 'Mise en place d\'un Linkedin Professionnel',
        icon: '🔵',
        categorie: 'Formation',
        featured: false,
        nouveau: false,
        competences: {
            6: {
                images: [
                    { src: 'img/preuves/linkedin.png', caption: 'Mon profil linkedin' }
                ]
            }
        }
    },

    // === EXEMPLE : HOMSY ===
    {
        id: 'homsy',
        nom: 'HOMSY (Gestion Locative IA)',
        icon: '🏠',
        categorie: 'Cours',
        featured: false,
        nouveau: true,  // Badge "Nouveau"
        competences: {
            4: {
                images: [
                    { src: 'img/preuves/homsy-architecture.png', caption: 'Architecture' },
                    { src: 'img/preuves/homsy-flutter.png', caption: 'Interface Flutter' }
                ]
            }
        }
    },

    // === EXEMPLE : NEIGE & SOLEIL ===
    {
        id: 'neige-soleil',
        nom: 'Neige & Soleil',
        icon: '⛰️',
        categorie: 'Cours',
        featured: false,
        nouveau: false,
        competences: {
            4: {
                images: [
                    { src: 'img/preuves/IndexN&S.png', caption: 'Page d\'accueil' },
                    { src: 'img/preuves/CodeN&S.png', caption: 'Architecture MVC' },
                    { src: 'img/preuves/GithubN&S.png', caption: 'GitFlow' },

                ]
            }
        }
    },

    // === AJOUTE TES AUTRES PROJETS ICI ===
    // Copie-colle la structure au-dessus et modifie les infos !

];

// ===================================================================
// NOMS DES COMPÉTENCES (Ne touche pas à ça)
// ===================================================================
const competencesNames = {
    1: "Gérer le patrimoine informatique",
    2: "Répondre aux incidents et aux demandes d'assistance",
    3: "Développer la présence en ligne de l'organisation",
    4: "Travailler en mode projet",
    5: "Mettre à disposition des utilisateurs un service informatique",
    6: "Organiser son développement professionnel"
};

// ===================================================================
// GÉNÉRATION AUTOMATIQUE DU TABLEAU (Ne touche pas à ça)
// ===================================================================
function genererTableau() {
    const tbody = document.getElementById('tableau-body');
    if (!tbody) {
        console.error('❌ Element #tableau-body introuvable !');
        return;
    }

    // Grouper les projets par catégorie
    const categories = {
        'Formation': [],
        'Alternance': [],
        'Cours': [],
        'Auto-didacte': []
    };

    projets.forEach(projet => {
        if (categories[projet.categorie]) {
            categories[projet.categorie].push(projet);
        }
    });

    // Générer le HTML pour chaque catégorie
    Object.keys(categories).forEach(categorie => {
        const projetsCat = categories[categorie];
        
        if (projetsCat.length === 0) return; // Sauter si vide

        // Header de catégorie
        const headerHTML = `
            <tr class="section-header">
                <td colspan="7"><strong>Réalisations en ${categorie.toLowerCase()} (2024-2026)</strong></td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', headerHTML);

        // Lignes de projets
        projetsCat.forEach(projet => {
            const ligneHTML = genererLigneProjet(projet);
            tbody.insertAdjacentHTML('beforeend', ligneHTML);
        });
    });

    console.log('✅ Tableau généré avec succès !');
}

// Générer une ligne de projet
function genererLigneProjet(projet) {
    const badges = [];
    if (projet.featured) badges.push('<span class="badge-featured">Projet Phare</span>');
    if (projet.nouveau) badges.push('<span class="badge-new">Nouveau</span>');

    const badgesHTML = badges.join('');
    const featuredClass = projet.featured ? 'featured-project' : '';

    // Créer les 6 cellules de compétences
    let competencesCells = '';
    for (let i = 1; i <= 6; i++) {
        if (projet.competences[i]) {
            competencesCells += `<td class="has-proof" onclick="openProofModal('${projet.id}', ${i})">✓</td>`;
        } else {
            competencesCells += `<td></td>`;
        }
    }

    return `
        <tr class="project-row ${featuredClass}" data-project="${projet.id}">
            <td class="project-name">
                <span class="project-icon">${projet.icon}</span>
                <strong>${projet.nom}</strong>
                ${badgesHTML}
            </td>
            ${competencesCells}
        </tr>
    `;
}

// ===================================================================
// GESTION DE LA MODAL (Ne touche pas à ça)
// ===================================================================
function openProofModal(projectId, competenceNumber) {
    const modal = document.getElementById('proofModal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const gallery = document.getElementById('proof-images');
    
    // Trouver le projet
    const projet = projets.find(p => p.id === projectId);
    
    if (!projet || !projet.competences[competenceNumber]) {
        alert('Aucune preuve disponible pour ce projet/compétence.');
        return;
    }
    
    const competence = projet.competences[competenceNumber];
    
    // Mettre à jour le titre
    title.textContent = projet.nom;
    description.textContent = `Compétence : ${competencesNames[competenceNumber]}`;
    
    // Vider et remplir la galerie
    gallery.innerHTML = '';
    
    competence.images.forEach(img => {
        const proofDiv = document.createElement('div');
        proofDiv.className = 'proof-item';
        proofDiv.innerHTML = `
            <img src="${img.src}" alt="${img.caption}" onerror="this.src='img/placeholder.png'">
            <div class="proof-caption">${img.caption}</div>
        `;
        
        proofDiv.onclick = () => window.open(img.src, '_blank');
        gallery.appendChild(proofDiv);
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProofModal() {
    const modal = document.getElementById('proofModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer avec Échap ou clic extérieur
window.onclick = (e) => {
    if (e.target === document.getElementById('proofModal')) closeProofModal();
};
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProofModal();
});

// ===================================================================
// LANCEMENT AU CHARGEMENT DE LA PAGE
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
    genererTableau();
    console.log('🚀 Système de compétences chargé !');
});
