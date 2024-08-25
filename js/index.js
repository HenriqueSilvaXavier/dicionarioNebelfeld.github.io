let translationDone = false;

function translateText(text, idioma) {
    const translations = {
        'pt-br': {
            'Destaques': 'Destaques',
            'Digite sua palavra': 'Digite sua palavra',
            'Página Inicial': 'Página Inicial',
            'Sobre': 'Sobre',
            'Ajuda': 'Ajuda',
            'Contato': 'Contato',
            'Português': 'Português',
            'Inglês': 'Inglês',
            'Espanhol': 'Espanhol',
            'Francês': 'Francês',
            'Alemão': 'Alemão'
        },
        'en': {
            'Destaques': 'Highlights',
            'Digite sua palavra': 'Enter your word',
            'Página Inicial': 'Home',
            'Sobre': 'About',
            'Ajuda': 'Help',
            'Contato': 'Contact',
            'Português': 'Portuguese',
            'Inglês': 'English',
            'Espanhol': 'Spanish',
            'Francês': 'French',
            'Alemão': 'German'
        },
        'es': {
            'Destaques': 'Destacados',
            'Digite sua palavra': 'Escribe tu palabra',
            'Página Inicial': 'Inicio',
            'Sobre': 'Sobre',
            'Ajuda': 'Ayuda',
            'Contato': 'Contacto',
            'Português': 'Portugués',
            'Inglês': 'Inglés',
            'Espanhol': 'Español',
            'Francês': 'Francés',
            'Alemão': 'Alemán'
        },
        'fr': {
            'Destaques': 'Points forts',
            'Digite sua palavra': 'Entrez votre mot',
            'Página Inicial': 'Accueil',
            'Sobre': 'À propos',
            'Ajuda': 'Aide',
            'Contato': 'Contact',
            'Português': 'Portugais',
            'Inglês': 'Anglais',
            'Espanhol': 'Espagnol',
            'Francês': 'Français',
            'Alemão': 'Allemand'
        },
        'de': {
            'Destaques': 'Höhepunkte',
            'Digite sua palavra': 'Geben Sie Ihr Wort ein',
            'Página Inicial': 'Startseite',
            'Sobre': 'Über',
            'Ajuda': 'Hilfe',
            'Contato': 'Kontakt',
            'Português': 'Portugiesisch',
            'Inglês': 'Englisch',
            'Espanhol': 'Spanisch',
            'Francês': 'Französisch',
            'Alemão': 'Deutsch'
        }
    };
    return translations[idioma] && translations[idioma][text] || text;
}

function updatePageContent() {
    const idioma = document.getElementById('idioma').value;
    document.documentElement.lang = idioma;

    // Traduzir o título da página
    document.title = translateText('Página Inicial', idioma);

    // Traduzir o título dos destaques
    document.getElementById('highlights-title').textContent = translateText('Destaques', idioma);

    document.querySelectorAll('.highlight-item').forEach(function(item) {
        item.innerHTML = item.getAttribute('data-' + idioma) || item.textContent;
    });

    // Traduzir o placeholder do input
    document.getElementById('pesquisa').placeholder = translateText('Digite sua palavra', idioma);

    // Traduzir o texto dos itens de destaque
    document.querySelectorAll('.opcao').forEach(function(option) {
        option.innerHTML = option.getAttribute('data-' + idioma) || option.textContent;
    });

    // Traduzir os links de navegação
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.textContent = link.getAttribute('data-' + idioma) || link.textContent;
    });

    // Traduzir as opções do select na primeira vez
    if (!translationDone) {
        document.querySelectorAll('#idioma option').forEach(function(option) {
            const translatedText = translateText(option.textContent, idioma);
            if (translatedText !== option.textContent) {
                option.textContent = translatedText;
            }
        });
        translationDone = true;
    }
}

document.getElementById('idioma').addEventListener('change', updatePageContent);

// Atualizar o conteúdo da página ao carregar
window.addEventListener('load', updatePageContent);

// Traduções para os idiomas
const correcoes = {
    'pt-br': {
        'sensato': 'sensato',
        'austeridade': 'austeridade',
        'capacidade': 'capacidade'
    },
    'en': {
        'sensato': 'sensible',
        'austeridade': 'austerity',
        'capacidade': 'capacity'
    },
    'es': {
        'sensato': 'sensato',
        'austeridade': 'austeridad',
        'capacidade': 'capacidad'
    },
    'fr': {
        'sensato': 'sensé',
        'austeridade': 'austérité',
        'capacidade': 'capacité'
    },
    'de': {
        'sensato': 'vernünftig',
        'austeridade': 'austerität',
        'capacidade': 'kapazität'
    }
};

function getTranslation(word, language) {
    return correcoes[language][word] || word;
}

async function checkSpelling(text, language) {
    const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `text=${encodeURIComponent(text)}&language=${language}`
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.matches.map(match => match.replacements.map(r => r.value)).flat();
}

const lista = ['sensato', 'austeridade', 'capacidade', 'sensible', 'austerity', 'capacity', 'austeridad', 'capacidad', 'sensé', 'austérité', 
'capacité', 'vernünftig', 'austerität', 'kapazität'];


document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const pesquisa = document.getElementById('pesquisa').value.trim().toLowerCase();
    const idioma = document.getElementById('idioma').value;
    let sugestao = '';
    let suggestions = [];
    const idiomaCorreto = (idioma === 'en') ? 'en-US' : (idioma === 'de') ? 'de-DE': idioma;
    if (pesquisa === "sensato" && idioma === "pt-br" || 
        pesquisa === "sensible" && idioma === "en" || 
        pesquisa === "sensato" && idioma === "es" || 
        pesquisa === "sensé" && idioma === "fr" || 
        pesquisa === "vernünftig" && idioma === "de") {
        palavraEmPortugues = 'sensato';
    } else if (pesquisa === "austeridade" && idioma === "pt-br" || 
               pesquisa === "austerity" && idioma === "en" || 
               pesquisa === "austeridad" && idioma === "es" || 
               pesquisa === "austerité" && idioma === "fr" || 
               pesquisa === "austerität" && idioma === "de") {
        palavraEmPortugues = 'austeridade';
    } else if (pesquisa === "capacidade" && idioma === "pt-br" || 
               pesquisa === "capacity" && idioma === "en" || 
               pesquisa === "capacidad" && idioma === "es" || 
               pesquisa === "capacité" && idioma === "fr" || 
               pesquisa === "kapazität" && idioma === "de") {
        palavraEmPortugues = 'capacidade';
    }
    
    if (typeof palavraEmPortugues!=='undefined' && correcoes[idioma][palavraEmPortugues]) {
        // Se a palavra digitada estiver na lista de correções, redireciona diretamente
        window.location.href = 'definicao.html?palavra=' + encodeURIComponent(pesquisa) + '&lang=' + idioma;
    } else {
        // Verifica se existe uma sugestão de correção
        suggestions = await checkSpelling(pesquisa, idiomaCorreto);
        let suggestionsLowerCase = suggestions.map(function(item) {
            return item.toLowerCase();
        });
        sugestao = suggestionsLowerCase.find(suggestion => lista.includes(suggestion)) || '';
        if (sugestao) {
            // Se houver sugestão, exibe-a junto com as opções de "Sim" e "Não"
            const suggestionElement = document.getElementById('suggestion');
            const suggestionText = document.getElementById('suggestion-text');
            const acceptButton = document.getElementById('accept-correction');
            const rejectButton = document.getElementById('reject-correction');
            
            if (idioma === "pt-br") {
                suggestionText.textContent = 'Você quis dizer "' + sugestao + '"?';
            } else if (idioma === "en") {
                suggestionText.textContent = 'Did you mean "' + sugestao + '"?';
            } else if (idioma === "es") {
                suggestionText.textContent = '¿Quisiste decir "' + sugestao + '"?';
            } else if (idioma === "fr") {
                suggestionText.textContent = 'Vouliez-vous dire "' + sugestao + '"?';
            } else if (idioma === "de") {
                suggestionText.textContent = 'Meinten Sie "' + sugestao + '"?';
            }

            suggestionElement.style.display = 'block'; // Torna o parágrafo visível
            acceptButton.style.display = 'inline-block'; // Torna o botão "Sim" visível
            rejectButton.style.display = 'inline-block'; // Torna o botão "Não" visível

            // Adiciona funcionalidade ao botão "Sim"
            acceptButton.onclick = function() {
                window.location.href = 'definicao.html?palavra=' + encodeURIComponent(sugestao) + '&lang=' + idioma;
            };

            // Adiciona funcionalidade ao botão "Não"
            rejectButton.onclick = function() {
                window.location.href = 'definicao.html?palavra=' + encodeURIComponent(pesquisa) + '&lang=' + idioma;
            };
        } else {
            window.location.href = 'definicao.html?palavra=' + encodeURIComponent(pesquisa) + '&lang=' + idioma;
        }
    }
});
