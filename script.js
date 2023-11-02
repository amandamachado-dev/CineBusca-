const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const resultsDiv = document.getElementById('results');
        const apiKey = '1bfdbbb18a7d944855e9515808ed0116'; // Substitua pelo seu próprio API Key do TMDb.

        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value;
            if (searchTerm.trim() !== '') {
                searchMovies(searchTerm);
            } else {
                alert('Please enter a movie title.');
            }
        });

        async function searchMovies(query) {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`);
                const data = await response.json();
        
                if (data.results.length === 0) {
                    resultsDiv.innerHTML = 'Nenhum resultado encontrado.';
                } else {
                    resultsDiv.innerHTML = '';
                    data.results.forEach(async (movie) => {
                        if (movie.overview) {
                            const movieElement = document.createElement('div');
                            movieElement.innerHTML = `
                                <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title} poster">
                                <h2>${movie.title} (${movie.release_date.substring(0, 4)})</h2>
                                <p>Nota: ${movie.vote_average}</p>
                                
                            `;
        
                            const sinopseElement = document.createElement('p');
                            sinopseElement.style.display = 'none'; // Oculta a sinopse inicialmente
                            sinopseElement.textContent = `Sinopse: ${movie.overview}`;
        
                            // Adiciona um evento de clique ao poster para mostrar/ocultar a sinopse
                            movieElement.querySelector('img').addEventListener('click', () => {
                                if (sinopseElement.style.display === 'none') {
                                    sinopseElement.style.display = 'block'; // Mostra a sinopse quando o poster é clicado
                                    
                                } else {
                                    sinopseElement.style.display = 'none'; // Oculta a sinopse se já estiver visível
                                }
                            });
        
                            // Adiciona os elementos ao container de resultados
                            movieElement.appendChild(sinopseElement);
                            resultsDiv.appendChild(movieElement);
                        }
                    });
                }
            } catch (error) {
                console.error('Ocorreu um erro:', error);
                resultsDiv.innerHTML = 'Ocorreu um erro ao buscar os dados.';
            }
        }
        