// Animation simple pour le scroll smooth si pas supporté par CSS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- GESTION DU FLUX RSS (VEILLE NVIDIA BLACKWELL) ---

// ⚠️ SOLUTION 1 : Utiliser un flux Google News sur Nvidia Blackwell
const GOOGLE_NEWS_RSS = "https://news.google.com/rss/search?q=nvidia+blackwell&hl=fr&gl=FR&ceid=FR:fr";

// ⚠️ SOLUTION 2 : API alternative plus fiable
const API_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(GOOGLE_NEWS_RSS)}`;

async function loadRSS() {
    const container = document.getElementById('rss-feed-container');
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Parser le XML depuis AllOrigins
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        
        // Extraire les articles
        const items = xml.querySelectorAll("item");
        
        // Vider le conteneur
        container.innerHTML = '';
        
        if (items.length > 0) {
            // Prendre les 3 premiers articles
            const articlesToShow = Array.from(items).slice(0, 3);
            
            articlesToShow.forEach(item => {
                const title = item.querySelector("title")?.textContent || "Titre indisponible";
                const link = item.querySelector("link")?.textContent || "#";
                const pubDate = item.querySelector("pubDate")?.textContent || "";
                const description = item.querySelector("description")?.textContent || "Pas de description disponible.";
                
                // Nettoyer la description (enlever les balises HTML si présentes)
                const cleanDesc = description.replace(/<[^>]*>/g, '').substring(0, 150);
                
                // Formater la date
                const date = pubDate ? new Date(pubDate).toLocaleDateString('fr-FR') : "Date inconnue";
                
                const articleHTML = `
                    <div class="rss-item">
                        <h4>${title}</h4>
                        <p>${cleanDesc}...</p>
                        <span style="font-size:0.8rem; color:#888;">Publié le : ${date}</span>
                        <a href="${link}" target="_blank">Lire l'article &rarr;</a>
                    </div>
                `;
                container.innerHTML += articleHTML;
            });
        } else {
            // Si pas d'articles trouvés
            showFallbackArticles(container);
        }
        
    } catch (error) {
        console.error('Erreur lors du chargement du flux RSS:', error);
        // Afficher des articles de secours
        showFallbackArticles(container);
    }
}

// Fonction de fallback avec articles pré-définis
function showFallbackArticles(container) {
    container.innerHTML = `
        <div class="rss-item">
            <h4>NVIDIA Blackwell Platform : Nouvelle Ère de l'IA Générative</h4>
            <p>NVIDIA a dévoilé la plateforme Blackwell, conçue pour permettre aux organisations de construire et d'exécuter l'IA générative en temps réel sur des modèles de trillion de paramètres...</p>
            <span style="font-size:0.8rem; color:#888;">Publié le : Mars 2024</span>
            <a href="https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Architecture Blackwell B200 : 208 Milliards de Transistors</h4>
            <p>Analyse technique de la nouvelle puce NVIDIA B200 avec son architecture révolutionnaire à 208 milliards de transistors, offrant des performances IA inégalées pour l'entraînement et l'inférence...</p>
            <span style="font-size:0.8rem; color:#888;">Publié le : Mars 2024</span>
            <a href="https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Blackwell Ultra : La Prochaine Génération Annoncée</h4>
            <p>NVIDIA prépare déjà la suite avec Blackwell Ultra, promettant des avancées encore plus importantes dans le domaine de l'IA et du calcul haute performance pour 2025...</p>
            <span style="font-size:0.8rem; color:#888;">Publié le : Novembre 2024</span>
            <a href="https://www.nvidia.com/en-us/data-center/technologies/blackwell-platform/" target="_blank">Lire l'article &rarr;</a>
        </div>
    `;
}

// ⚠️ SOLUTION ALTERNATIVE : Utiliser directement l'API NewsAPI (nécessite clé gratuite)
// Décommente et ajoute ta clé API de https://newsapi.org/
/*
async function loadRSSFromNewsAPI() {
    const API_KEY = 'TA_CLE_API_ICI'; // Obtenir gratuitement sur newsapi.org
    const url = `https://newsapi.org/v2/everything?q=nvidia+blackwell&language=fr&sortBy=publishedAt&apiKey=${API_KEY}`;
    
    const container = document.getElementById('rss-feed-container');
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        container.innerHTML = '';
        
        if (data.articles && data.articles.length > 0) {
            const articles = data.articles.slice(0, 3);
            
            articles.forEach(article => {
                const date = new Date(article.publishedAt).toLocaleDateString('fr-FR');
                const articleHTML = `
                    <div class="rss-item">
                        <h4>${article.title}</h4>
                        <p>${article.description || 'Pas de description disponible.'}</p>
                        <span style="font-size:0.8rem; color:#888;">Publié le : ${date}</span>
                        <a href="${article.url}" target="_blank">Lire l'article &rarr;</a>
                    </div>
                `;
                container.innerHTML += articleHTML;
            });
        } else {
            showFallbackArticles(container);
        }
    } catch (error) {
        console.error('Erreur NewsAPI:', error);
        showFallbackArticles(container);
    }
}
*/

// Lancer le chargement au démarrage
document.addEventListener('DOMContentLoaded', loadRSS);

// ⚠️ BONUS : Rafraîchir les articles toutes les 5 minutes (optionnel)
// setInterval(loadRSS, 300000); // 300000ms = 5 minutes
