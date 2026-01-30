# 🎵 MusicaViva - Portal de Música

Portal completo de música desenvolvido em HTML5, CSS3 e JavaScript ES6+. Um site responsivo e acessível para entusiastas da música aprenderem cifras, assistirem videoaulas, lerem artigos e explorarem curiosidades do mundo musical.

![MusicaViva](https://via.placeholder.com/1200x630/8b5cf6/ffffff?text=MusicaViva+-+Portal+de+Música)

## ✨ Funcionalidades Implementadas

### 🏠 Página Inicial (index.html)
- Hero section animada com estatísticas
- Seção de features destacando os recursos do portal
- Carrossel de cifras populares
- Grid de videoaulas recentes
- Preview de artigos em destaque
- Slider de curiosidades musicais
- Newsletter com validação de email
- Footer completo com navegação

### 🎸 Cifras Musicais (cifras.html)
- Sistema de busca em tempo real
- Filtros por gênero musical (Rock, Pop, MPB, Sertanejo, Gospel, Internacional)
- Filtros por nível de dificuldade (Fácil, Médio, Difícil)
- Ordenação (Populares, Recentes, A-Z, Z-A)
- Tags de filtro rápido
- Modal de visualização de cifra com:
  - Transposição automática de tom (+/-)
  - Controle de tamanho da fonte
  - Auto-scroll para tocar junto
  - Popup de diagrama de acordes
  - Lista de acordes usados
- Sistema de favoritos (localStorage)
- Paginação

### 📺 Videoaulas (videoaulas.html)
- Categorias: Violão, Teclado, Teoria Musical, Canto, Bateria, Produção
- Vídeo em destaque com descrição detalhada
- Grid de videoaulas por categoria
- Indicador de nível (Iniciante, Intermediário, Avançado)
- Trilha de aprendizado recomendada
- Contagem de visualizações e avaliações

### 📚 Artigos (artigos.html)
- Filtro por categorias (História, Técnica, Equipamentos, Produção, Ciência, Biografias)
- Artigo em destaque com imagem grande
- Grid responsivo de artigos
- Tempo de leitura estimado
- Tags de tópicos
- Botão de carregar mais

### 📖 Dicionário de Acordes (dicionario.html)
- Seletor de instrumento (Violão/Teclado)
- Seletor de nota fundamental (C, D, E, F, G, A, B + sustenidos)
- Tipos de acordes: Maior, Menor, 7ª, maj7, m7, sus4, dim, aumentado
- Diagramas SVG interativos para violão
- Visualização de teclado para piano
- Reprodução de áudio dos acordes (Web Audio API)
- Seção educativa sobre teoria de acordes

### 💡 Curiosidades (curiosidades.html)
- Filtro por categorias (Artistas, Instrumentos, Recordes, Ciência, História)
- Curiosidade em destaque
- Grid de curiosidades com ícones temáticos
- Sistema de curtidas (localStorage)
- Ticker de fatos rápidos com animação
- Quiz interativo com 10 perguntas
- Botão de compartilhar (Web Share API)

## 🎨 Recursos de Design

### Design System
- **Cores**: Paleta harmoniosa com roxo primário (#8b5cf6) e ciano secundário (#06b6d4)
- **Tipografia**: Poppins (interface) + Fira Code (cifras/código)
- **Espaçamento**: Sistema de 4px base consistente
- **Sombras**: 5 níveis de elevação (sm, md, lg, xl, glow)
- **Bordas**: Raios de 4px a full (circular)

### Responsividade
- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: 
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+
- **Container máximo**: 1280px

### Acessibilidade (WCAG 2.1 AA)
- Skip links para navegação por teclado
- Atributos ARIA em elementos interativos
- Roles semânticos (banner, navigation, main, contentinfo)
- Labels em todos os formulários
- Foco visível em elementos interativos
- Contraste de cores adequado (≥ 4.5:1)
- Suporte a `prefers-reduced-motion`

### Dark Mode
- Detecção automática da preferência do sistema
- Toggle manual com persistência em localStorage
- Transição suave entre temas
- Paleta de cores otimizada para cada tema

## 📁 Estrutura do Projeto

```
musicaviva/
├── index.html              # Página inicial
├── cifras.html             # Página de cifras
├── videoaulas.html         # Página de videoaulas
├── artigos.html            # Página de artigos
├── dicionario.html         # Dicionário de acordes
├── curiosidades.html       # Curiosidades musicais
├── css/
│   └── style.css           # Estilos principais (84KB)
├── js/
│   ├── main.js             # JavaScript principal
│   ├── cifras.js           # Funcionalidades de cifras
│   ├── dicionario.js       # Dicionário de acordes
│   └── curiosidades.js     # Quiz e interações
└── README.md               # Documentação
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica com tags modernas
- **CSS3**: 
  - Custom Properties (variáveis)
  - Flexbox e CSS Grid
  - Animações e transições
  - Media queries responsivas
  - Metodologia BEM para nomenclatura
- **JavaScript ES6+**:
  - Modules e arrow functions
  - Async/await
  - Template literals
  - Destructuring
  - Local Storage API
  - Web Audio API
  - Intersection Observer
  - Web Share API

### CDN e Recursos Externos
- **Google Fonts**: Poppins, Fira Code
- **Font Awesome**: Ícones vetoriais
- **Favicon**: SVG emoji dinâmico

## 🚀 Performance

### Otimizações Implementadas
- CSS crítico inline (acima da dobra)
- Scripts com `defer` para não bloquear renderização
- Lazy loading de conteúdo via Intersection Observer
- Debounce e throttle em eventos de scroll/input
- Animações usando `transform` e `opacity` (GPU)
- Imagens com aspect-ratio definido (evita CLS)

### Métricas Alvo
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 📱 URIs Funcionais

| Página | URI | Descrição |
|--------|-----|-----------|
| Início | `/index.html` | Página principal |
| Cifras | `/cifras.html` | Biblioteca de cifras |
| Videoaulas | `/videoaulas.html` | Aulas em vídeo |
| Artigos | `/artigos.html` | Blog de artigos |
| Dicionário | `/dicionario.html` | Dicionário de acordes |
| Curiosidades | `/curiosidades.html` | Fatos musicais |

### Âncoras de Navegação
- `/videoaulas.html#violao` - Aulas de violão
- `/videoaulas.html#teclado` - Aulas de teclado
- `/videoaulas.html#teoria` - Teoria musical
- `/videoaulas.html#canto` - Aulas de canto

## 🔮 Próximos Passos (Roadmap)

### Curto Prazo
- [ ] Integração com API de cifras real
- [ ] Embed de vídeos do YouTube nas videoaulas
- [ ] Sistema de busca global
- [ ] Implementar Service Worker para PWA

### Médio Prazo
- [ ] Sistema de usuários e autenticação
- [ ] Salvamento de cifras favoritas na nuvem
- [ ] Editor de cifras colaborativo
- [ ] Metrônomo integrado

### Longo Prazo
- [ ] App mobile nativo
- [ ] Afinador de instrumentos
- [ ] Reconhecimento de acordes por áudio
- [ ] Gamificação do aprendizado

## 🎯 Funcionalidades Não Implementadas

Por ser um projeto de website estático, as seguintes funcionalidades não estão disponíveis:

- **Backend/API**: Sem servidor para processar dados
- **Banco de dados**: Dados são mockados em JavaScript
- **Autenticação**: Sem sistema de login real
- **Upload de arquivos**: Não suportado
- **Processamento de áudio**: Limitado ao Web Audio API básico
- **Envio de e-mails**: Newsletter apenas para demonstração

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para músicos e entusiastas da música.

---

**MusicaViva** - *Sua jornada musical começa aqui* 🎵
