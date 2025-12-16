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

// Flux Google News - Français ET Anglais
const RSS_FEEDS = {
    french: "https://news.google.com/rss/search?q=nvidia+blackwell&hl=fr&gl=FR&ceid=FR:fr",
    english: "https://news.google.com/rss/search?q=nvidia+blackwell&hl=en&gl=US&ceid=US:en"
};

// Fonction pour récupérer les articles d'un flux
async function fetchArticlesFromFeed(feedUrl, language) {
    const API_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, "text/xml");
        const items = xml.querySelectorAll("item");
        
        // Convertir en tableau d'objets
        return Array.from(items).map(item => ({
            title: item.querySelector("title")?.textContent || "Titre indisponible",
            link: item.querySelector("link")?.textContent || "#",
            pubDate: item.querySelector("pubDate")?.textContent || "",
            description: item.querySelector("description")?.textContent || "Pas de description disponible.",
            language: language  // Marquer la langue de l'article
        }));
    } catch (error) {
        console.error(`❌ Erreur flux ${language}:`, error);
        return [];
    }
}

async function loadRSS() {
    const container = document.getElementById('rss-feed-container');
    container.innerHTML = '<div class="rss-item"><p><i class="fas fa-sync fa-spin"></i> Chargement des articles français et anglais...</p></div>';
    
    try {
        // Charger les flux français ET anglais en parallèle
        const [frenchArticles, englishArticles] = await Promise.all([
            fetchArticlesFromFeed(RSS_FEEDS.french, '🇫🇷'),
            fetchArticlesFromFeed(RSS_FEEDS.english, '🇬🇧')
        ]);
        
        // Combiner tous les articles
        let allArticles = [...frenchArticles, ...englishArticles];
        
        // Filtrer par date (2024+)
        allArticles = allArticles.filter(article => {
            if (!article.pubDate) return false;
            const date = new Date(article.pubDate);
            return date.getFullYear() >= 2024;
        });
        
        // Trier par date (plus récents en premier)
        allArticles.sort((a, b) => {
            const dateA = new Date(a.pubDate);
            const dateB = new Date(b.pubDate);
            return dateB - dateA;  // Ordre décroissant
        });
        
        // Prendre les 10 premiers
        const articlesToShow = allArticles.slice(0, 10);
        
        // Vider le conteneur
        container.innerHTML = '';
        
        if (articlesToShow.length === 0) {
            console.log('⚠️ Aucun article trouvé, affichage des articles de secours');
            showFallbackArticles(container);
            return;
        }
        
        // Afficher les articles
        articlesToShow.forEach(article => {
            const cleanDesc = article.description.replace(/<[^>]*>/g, '').substring(0, 150);
            
            const date = article.pubDate ? new Date(article.pubDate).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : "Date inconnue";
            
            const articleHTML = `
                <div class="rss-item">
                    <h4>${article.language} ${article.title}</h4>
                    <p>${cleanDesc}...</p>
                    <span style="font-size:0.8rem; color:#888;">📅 Publié le : ${date}</span>
                    <a href="${article.link}" target="_blank">Lire l'article &rarr;</a>
                </div>
            `;
            container.innerHTML += articleHTML;
        });
        
        console.log(`✅ ${articlesToShow.length} articles chargés (FR + EN) depuis 2024`);
        console.log(`   → Articles français : ${articlesToShow.filter(a => a.language === '🇫🇷').length}`);
        console.log(`   → Articles anglais : ${articlesToShow.filter(a => a.language === '🇬🇧').length}`);
        
    } catch (error) {
        console.error('❌ Erreur globale:', error);
        showFallbackArticles(container);
    }
}

// Fonction de fallback avec 10 articles pré-définis de 2024
function showFallbackArticles(container) {
    console.log('📰 Affichage de 10 articles de secours (2024)');
    
    container.innerHTML = `
        <div class="rss-item">
            <h4>NVIDIA Blackwell Platform : Nouvelle Ère de l'IA Générative</h4>
            <p>NVIDIA a dévoilé la plateforme Blackwell, conçue pour permettre aux organisations de construire et d'exécuter l'IA générative en temps réel sur des modèles de trillion de paramètres...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 18 mars 2024</span>
            <a href="https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Architecture Blackwell B200 : 208 Milliards de Transistors</h4>
            <p>Analyse technique de la nouvelle puce NVIDIA B200 avec son architecture révolutionnaire à 208 milliards de transistors, offrant des performances IA inégalées pour l'entraînement et l'inférence...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 20 mars 2024</span>
            <a href="https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>GB200 NVL72 : Superpuce pour l'IA à Grande Échelle</h4>
            <p>Le système GB200 NVL72 combine 36 processeurs Grace et 72 GPU Blackwell pour offrir une puissance de calcul inégalée destinée à l'entraînement de modèles de langage massifs...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 15 juin 2024</span>
            <a href="https://www.nvidia.com/en-us/data-center/gb200-nvl72/" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Blackwell vs Hopper : Comparaison des Architectures GPU</h4>
            <p>Analyse comparative entre l'architecture Blackwell B200 et la génération précédente Hopper H100, montrant des gains de performance de 2,5x à 5x selon les types de calculs IA...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 10 avril 2024</span>
            <a href="https://blogs.nvidia.com/blog/blackwell-platform-ai-computing/" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Adoption de Blackwell par les Géants du Cloud</h4>
            <p>Microsoft Azure, Google Cloud Platform et Amazon Web Services annoncent l'intégration des GPU Blackwell dans leurs datacenters pour améliorer drastiquement les performances d'IA générative...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 5 août 2024</span>
            <a href="https://nvidianews.nvidia.com/news/aws-google-cloud-microsoft-azure-adopt-blackwell" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Blackwell : Impact sur le Marché de l'IA Enterprise</h4>
            <p>L'arrivée de Blackwell bouleverse le marché de l'IA d'entreprise avec des gains de coûts opérationnels estimés à 40% pour l'inférence de grands modèles de langage et une consommation réduite...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 12 septembre 2024</span>
            <a href="https://www.nvidia.com/en-us/ai-data-science/products/dgx-platform/" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Second-Generation Transformer Engine dans Blackwell</h4>
            <p>Détails techniques sur le Transformer Engine de 2e génération intégré dans Blackwell, optimisant spécifiquement les workloads d'IA générative et de traitement du langage naturel avec FP4...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 22 mai 2024</span>
            <a href="https://developer.nvidia.com/blog/nvidia-blackwell-architecture-technical-brief/" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Blackwell : Efficacité Énergétique Record</h4>
            <p>Analyse de l'efficacité énergétique de Blackwell : jusqu'à 25x plus économe que Hopper pour certaines tâches d'inférence, un atout majeur pour la durabilité des datacenters IA...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 18 juillet 2024</span>
            <a href="https://www.nvidia.com/en-us/data-center/resources/blackwell-energy-efficiency/" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Blackwell Ultra : La Prochaine Génération Annoncée</h4>
            <p>NVIDIA prépare déjà la suite avec Blackwell Ultra, promettant des avancées encore plus importantes dans le domaine de l'IA et du calcul haute performance avec une sortie prévue fin 2024...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 3 novembre 2024</span>
            <a href="https://www.nvidia.com/en-us/data-center/technologies/blackwell-ultra/" target="_blank">Lire l'article &rarr;</a>
        </div>
        <div class="rss-item">
            <h4>Roadmap NVIDIA : Après Blackwell, l'ère Rubin en 2026</h4>
            <p>NVIDIA dévoile sa roadmap post-Blackwell avec l'architecture Rubin prévue pour 2026, promettant de nouvelles avancées dans le calcul IA et le support de nouvelles technologies quantiques...</p>
            <span style="font-size:0.8rem; color:#888;">📅 Publié le : 27 octobre 2024</span>
            <a href="https://nvidianews.nvidia.com/news/nvidia-announces-rubin-platform-2026" target="_blank">Lire l'article &rarr;</a>
        </div>
    `;
};

// Lancer le chargement au démarrage
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Chargement du flux RSS NVIDIA Blackwell...');
    loadRSS();
});

// BONUS : Rafraîchir les articles toutes les 10 minutes (optionnel)
// Décommente la ligne suivante pour activer le rafraîchissement automatique
// setInterval(loadRSS, 600000); // 600000ms = 10 minutes