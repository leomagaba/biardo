# 🎓 SIGEA - Sistema Integrado de Gestão Educacional Avançado

## 📋 Sobre o Sistema

O SIGEA é um sistema completo para gestão escolar que atende:
- **👨‍💼 Administradores**: Gestão geral da escola
- **👩‍🏫 Professores**: Controle de turmas e notas
- **👨‍🍳 Cozinha**: Gestão do cardápio e nutrição
- **👩‍🎓 Estudantes**: Portal do aluno
- **📚 Biblioteca**: Controle de livros e empréstimos

## 🚀 Como Rodar no VS Code Live Server

### 1. Configuração Básica
```bash
# Clone o projeto ou baixe os arquivos
cd sigea-project

# Instale as dependências
npm install
# ou
yarn install

# Execute o projeto
npm run dev
# ou
yarn dev
```

### 2. Configuração para Go Live (Porta 8080)
O sistema já está configurado para rodar na porta **8080** conforme solicitado.

Para acessar via rede local:
- **Local**: http://localhost:8080
- **Rede**: http://[SEU-IP]:8080

### 3. Para apresentação em outros dispositivos:
1. Descubra seu IP local:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` ou `ip addr`
2. Compartilhe o link: `http://[SEU-IP]:8080`

## 🔐 Sistema de Login Demo

### Contas Disponíveis (sem necessidade de cadastro):
- **👨‍💼 Administrador**: Dr. Maria Santos
- **👩‍🏫 Professor**: Prof. Carlos Lima  
- **👨‍🍳 Cozinha**: Chef Roberto Silva
- **👩‍🎓 Estudante**: Ana Oliveira

> 🎯 Para seu TCC: Basta clicar no tipo de usuário para fazer login automático!

## 🗄️ Configuração do Banco de Dados Supabase

### 1. Conectar ao Supabase
1. Clique no botão verde **"Supabase"** no canto superior direito
2. Faça login na sua conta Supabase
3. Crie um novo projeto ou conecte um existente

### 2. Configurar o Banco
1. No painel do Supabase, vá em **SQL Editor**
2. Cole o conteúdo do arquivo `supabase-setup.sql`
3. Execute o script clicando em **"Run"**

### 3. Configurar Autenticação (Opcional para TCC)
No painel Supabase:
1. **Authentication > Settings**
2. Ative **Email confirmations**
3. Para 2FA: **Authentication > Multi-Factor Authentication**
4. Configure providers de login social se desejar

### 4. Configurar RLS (Segurança)
As políticas de segurança já estão incluídas no script SQL.

## 🎨 Funcionalidades Implementadas

### 🏠 Dashboard Administrativo
- Visão geral da escola
- Estatísticas de presença
- Métricas do refeitório
- Gestão de usuários

### 👩‍🏫 Dashboard do Professor
- Controle de presença
- Gestão de notas
- Comunicados para turma
- Relatórios de desempenho

### 👨‍🍳 Gestão da Cozinha
- Cardápio diário (lanche e almoço)
- Informações nutricionais detalhadas
- ⚠️ **Controle de alérgenos** (lactose, glúten, etc.)
- Status de preparo dos pratos
- Gestão de ingredientes

### 👩‍🎓 Portal do Estudante
- Consulta de notas
- Visualização do cardápio
- Empréstimos da biblioteca
- Comunicados da escola

### 📚 Sistema de Biblioteca
- Catálogo de livros
- Controle de empréstimos
- Pesquisa avançada
- Relatórios de leitura

## 🌟 Destaques do Sistema

### 🍽️ Gestão Alimentar Inclusiva
- **Indicação clara de alérgenos** com cores específicas
- **Opções sem lactose** claramente identificadas
- **Informações nutricionais** completas
- **Ingredientes listados** para cada prato

### 🎨 Interface Moderna
- **Modo claro/escuro** otimizado
- **Design responsivo** para todos os dispositivos
- **Animações fluidas** e profissionais
- **Gradientes e sombras** elegantes

### ⚡ Performance Otimizada
- **Carregamento rápido**
- **Navegação sem recarregamento**
- **Componentes otimizados**
- **Bundle size reduzido**

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- 💻 **Desktops** (1920px+)
- 💻 **Laptops** (1366px - 1920px)
- 📱 **Tablets** (768px - 1366px)
- 📱 **Smartphones** (320px - 768px)

## 🎯 Para Apresentação do TCC

### ✅ Sistema Pronto para Demonstração
1. **Interface profissional** com design moderno
2. **Funcionalidades completas** para todos os perfis
3. **Dados de exemplo** já carregados
4. **Navegação intuitiva** sem erros
5. **Performance otimizada** para apresentação

### 📋 Roteiro de Apresentação Sugerido
1. **Apresentar o login** com diferentes perfis
2. **Demonstrar o dashboard** administrativo
3. **Mostrar a gestão da cozinha** (foco nos alérgenos)
4. **Apresentar o portal do professor**
5. **Finalizar com o portal do estudante**

### 🎓 Pontos Fortes para o TCC
- **Sistema real e funcional**
- **Preocupação com inclusão** (alérgenos, intolerâncias)
- **Interface moderna** e profissional
- **Tecnologias atuais** (React, TypeScript, Tailwind)
- **Banco de dados estruturado** com segurança (RLS)

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI
- **Roteamento**: React Router Dom
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Ícones**: Lucide React
- **Gráficos**: Recharts
- **Animações**: CSS + Tailwind

## 🆘 Resolução de Problemas

### Problema: Site não carrega
**Solução**: Verifique se rodou `npm install` antes de `npm run dev`

### Problema: Não consigo acessar de outros dispositivos
**Solução**: Verifique seu IP local e use `http://[SEU-IP]:8080`

### Problema: Erro no banco de dados
**Solução**: Execute novamente o script `supabase-setup.sql` no SQL Editor

### Problema: Login não funciona
**Solução**: Para demo, use os botões de login automático. Para sistema real, configure o Supabase Auth.

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README primeiro
2. Consulte a documentação do Supabase
3. Verifique o console do navegador para erros

---

## 🎉 Sucesso na sua apresentação do TCC!

O SIGEA está pronto para impressionar sua banca com um sistema completo, moderno e funcional! 🚀