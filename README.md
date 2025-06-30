# AdminPanel Pro - Sistema Completo de Gerenciamento Web

Um sistema completo de painel administrativo web que unifica as funcionalidades de cPanel, WordPress, Elementor, Envato Market e inteligência artificial.

## 🚀 Características Principais

### 🔧 Instalação e Acesso
- ✅ Instalador web via navegador (como WordPress)
- ✅ Sistema de autenticação completo
- ✅ Controle de usuários com permissões (admin, editor, cliente)
- ✅ Suporte multiusuário e multi-instância
- ✅ Gerenciamento de subdomínios e domínios personalizados

### 🎨 Editor Visual
- ✅ Editor visual em tempo real com drag and drop
- ✅ Biblioteca de blocos prontos (headers, sliders, formulários, galerias)
- ✅ Sistema de templates responsivos
- ✅ Preview em tempo real para desktop, tablet e mobile

### 🤖 Inteligência Artificial
- ✅ Assistente de IA integrado com chat
- ✅ Geração automática de conteúdo
- ✅ Suporte a comandos por voz
- ✅ Autocompletar de textos e títulos

### 📦 Sistema de Plugins
- ✅ Marketplace de plugins integrado
- ✅ Suporte a plugins clássicos (Elementor, WooCommerce, Yoast SEO, etc.)
- ✅ Sistema de instalação e ativação automática
- ✅ Gerenciamento de dependências

### 💾 Backup e Restauração
- ✅ Gerador de backups completos (arquivos + banco de dados)
- ✅ Restauração automática com um clique
- ✅ Exportação de projetos em ZIP
- ✅ Agendamento de backups automáticos

### 📊 Analytics e SEO
- ✅ Dashboard com estatísticas em tempo real
- ✅ SEO Manager integrado
- ✅ Geração automática de sitemaps
- ✅ Otimização de performance

## 🛠 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones SVG

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Banco de dados relacional
- **Row Level Security (RLS)** - Segurança de dados

### IA e Automação
- **AI SDK** - Integração com modelos de IA
- **OpenAI GPT-4** - Modelo de linguagem
- **Web Speech API** - Reconhecimento de voz

### Funcionalidades Avançadas
- **Drag & Drop** - Interface visual intuitiva
- **Real-time Updates** - Atualizações em tempo real
- **Responsive Design** - Design responsivo
- **PWA Ready** - Pronto para Progressive Web App

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (gratuita)
- Chave da API OpenAI (opcional, para IA)

## 🚀 Instalação

### 1. Clone o repositório
\`\`\`bash
git clone https://github.com/seu-usuario/admin-panel-pro.git
cd admin-panel-pro
\`\`\`

### 2. Instale as dependências
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# OpenAI (opcional)
OPENAI_API_KEY=sua_chave_da_openai
\`\`\`

### 4. Configure o banco de dados
Execute os scripts SQL no seu painel do Supabase:

\`\`\`bash
# 1. Execute o script de setup do banco
# Copie e cole o conteúdo de scripts/database-setup.sql no SQL Editor do Supabase

# 2. Execute o script de dados iniciais
# Copie e cole o conteúdo de scripts/seed-data.sql no SQL Editor do Supabase
\`\`\`

### 5. Execute o projeto
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

Acesse `http://localhost:3000` no seu navegador.

## 📖 Como Usar

### 1. Primeiro Acesso
1. Acesse a aplicação
2. Crie uma conta de administrador
3. Confirme seu email (se necessário)
4. Faça login no sistema

### 2. Criando seu Primeiro Site
1. Vá para "Meus Sites"
2. Clique em "Novo Site"
3. Preencha as informações básicas
4. Escolha um template
5. Revise e confirme

### 3. Usando o Editor Visual
1. Acesse "Editor Visual"
2. Arraste blocos da barra lateral
3. Personalize propriedades
4. Visualize em diferentes dispositivos
5. Salve suas alterações

### 4. Instalando Plugins
1. Vá para "Plugins"
2. Navegue pelos plugins disponíveis
3. Clique em "Instalar" no plugin desejado
4. Ative/desative conforme necessário

### 5. Usando o Assistente IA
1. Acesse o chat da IA no dashboard
2. Digite comandos ou use prompts rápidos
3. Use o reconhecimento de voz (opcional)
4. Aplique as sugestões geradas

## 🔧 Configuração Avançada

### Supabase Setup Detalhado

1. **Crie um projeto no Supabase**
   - Acesse [supabase.com](https://supabase.com)
   - Crie uma nova organização/projeto
   - Anote a URL e a chave anônima

2. **Configure a autenticação**
   - Vá para Authentication > Settings
   - Configure os provedores desejados
   - Defina as URLs de redirecionamento

3. **Execute os scripts SQL**
   - Vá para SQL Editor
   - Execute `database-setup.sql`
   - Execute `seed-data.sql`

### Configuração de IA (OpenAI)

1. **Obtenha uma chave da API**
   - Acesse [platform.openai.com](https://platform.openai.com)
   - Crie uma conta e gere uma API key
   - Adicione créditos à sua conta

2. **Configure no projeto**
   - Adicione `OPENAI_API_KEY` no `.env.local`
   - Reinicie o servidor de desenvolvimento

## 🏗 Arquitetura do Sistema

### Estrutura de Pastas
\`\`\`
admin-panel-pro/
├── app/                    # App Router do Next.js
│   ├── auth/              # Páginas de autenticação
│   ├── dashboard/         # Páginas do dashboard
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   └── ...               # Componentes específicos
├── lib/                  # Utilitários e configurações
│   └── supabase/         # Cliente Supabase
├── scripts/              # Scripts SQL
└── public/               # Arquivos estáticos
\`\`\`

### Banco de Dados
- **profiles** - Perfis de usuários
- **sites** - Sites gerenciados
- **pages** - Páginas dos sites
- **plugins** - Plugins disponíveis
- **site_plugins** - Plugins instalados por site
- **backups** - Backups realizados
- **analytics** - Dados de analytics

## 🔒 Segurança

- **Row Level Security (RLS)** - Isolamento de dados por usuário
- **Autenticação JWT** - Tokens seguros
- **Sanitização de dados** - Prevenção de XSS/SQL Injection
- **HTTPS obrigatório** - Comunicação criptografada
- **Rate limiting** - Proteção contra ataques

## 🚀 Deploy em Produção

### Vercel (Recomendado)
\`\`\`bash
# 1. Instale a CLI da Vercel
npm i -g vercel

# 2. Faça deploy
vercel

# 3. Configure as variáveis de ambiente no dashboard da Vercel
\`\`\`

### VPS Próprio
\`\`\`bash
# 1. Clone o projeto no servidor
git clone https://github.com/seu-usuario/admin-panel-pro.git

# 2. Instale dependências
npm install

# 3. Build do projeto
npm run build

# 4. Configure PM2
npm install -g pm2
pm2 start npm --name "admin-panel" -- start

# 5. Configure Nginx
# Adicione configuração de proxy reverso para a porta 3000
\`\`\`

## 📝 Roadmap

### Versão 1.1
- [ ] Sistema de temas personalizáveis
- [ ] Integração com mais provedores de IA
- [ ] Editor de código avançado
- [ ] Sistema de notificações push

### Versão 1.2
- [ ] Marketplace de templates
- [ ] Sistema de afiliados
- [ ] Integração com CDN
- [ ] Analytics avançados

### Versão 2.0
- [ ] Mobile app (React Native)
- [ ] Sistema de white-label
- [ ] Integração com CRM
- [ ] Automações avançadas

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- **Documentação**: [docs.adminpanel.pro](https://docs.adminpanel.pro)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/admin-panel-pro/issues)
- **Discord**: [Comunidade AdminPanel](https://discord.gg/adminpanel)
- **Email**: suporte@adminpanel.pro

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Supabase](https://supabase.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [OpenAI](https://openai.com/) - Inteligência Artificial

---

**AdminPanel Pro** - Transformando a forma como você gerencia sites na web! 🚀
