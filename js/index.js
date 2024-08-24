let translationDone = false;

        function translateText(text, idioma) {
            var translations = {
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
            return (translations[idioma] && translations[idioma][text]) || text;
        }

        function updatePageContent() {
            var idioma = document.getElementById('idioma').value;
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
                    const translatedText = translateText(option.getAttribute('data-' + idioma), idioma);
                    if (translatedText !== option.textContent) {
                        option.textContent = translatedText;
                    }
                });
                translationDone = true;
            }
        }

        document.getElementById('idioma').addEventListener('change', updatePageContent);

        document.getElementById('search-form').addEventListener('submit', function(event) {
            event.preventDefault();
            var pesquisa = document.getElementById('pesquisa').value;
            if (pesquisa) {
                var idioma = document.getElementById('idioma').value;
                window.location.href = 'definicao.html?palavra=' + encodeURIComponent(pesquisa) + '&lang=' + idioma;
            }
        });

        // Atualizar o conteúdo da página ao carregar
        window.addEventListener('load', updatePageContent);