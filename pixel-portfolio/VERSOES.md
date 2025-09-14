# 🎮 Portfólio - Múltiplas Versões

Este projeto agora possui **duas versões diferentes** do portfólio, cada uma com seu próprio design e funcionalidades.

## 🚀 Como Acessar

### Versão Principal (Gamificada)
**URL:** `http://localhost:5000/`

**Características:**
- Layout com sidebar à esquerda
- Cards expansíveis (accordion)
- Design gamificado com cores azuis
- Fundo animado com ilhas flutuantes
- Sistema de abas numeradas (1-5)
- Apenas um card aberto por vez

### Versão Backup (Tradicional)
**URL:** `http://localhost:5000/backup`

**Características:**
- Layout tradicional vertical
- Todas as seções sempre visíveis
- Design pixel art com cores douradas
- Fundo parallax com estrelas
- Animações contínuas
- Efeito de digitação no título

## 📁 Arquivos de Cada Versão

### Versão Gamificada (Principal)
- `templates/index.html`
- `static/style.css`
- `static/script.js`

### Versão Tradicional (Backup)
- `templates/index_backup.html`
- `static/style_backup.css`
- `static/script_backup.js`

## 🔄 Como Trocar Entre Versões

### Opção 1: URLs Diferentes
- Acesse `http://localhost:5000/` para versão gamificada
- Acesse `http://localhost:5000/backup` para versão tradicional

### Opção 2: Trocar Arquivos Principais (se quiser apenas uma versão)

**Para usar apenas a versão tradicional:**
```bash
# Renomear arquivos atuais
mv templates/index.html templates/index_gamificada.html
mv static/style.css static/style_gamificada.css
mv static/script.js static/script_gamificada.js

# Usar arquivos backup como principais
cp templates/index_backup.html templates/index.html
cp static/style_backup.css static/style.css
cp static/script_backup.js static/script.js
```

**Para voltar à versão gamificada:**
```bash
# Restaurar arquivos originais
mv templates/index_gamificada.html templates/index.html
mv static/style_gamificada.css static/style.css
mv static/script_gamificada.js static/script.js
```

## 🎨 Diferenças Visuais

| Característica | Versão Gamificada | Versão Tradicional |
|---|---|---|
| **Layout** | Sidebar + Conteúdo | Vertical Contínuo |
| **Cores** | Azul (#4a90e2) | Dourado (#FFD700) |
| **Navegação** | Cards Expansíveis | Scroll Vertical |
| **Animações** | Moderadas | Intensas |
| **Fundo** | Ilhas Flutuantes | Parallax Espacial |
| **Perfil** | Sidebar Fixa | Card Central |
| **Interação** | Click para Expandir | Hover Effects |

## 📋 Funcionalidades Comuns

Ambas as versões possuem:
- ✅ Formulário de contato funcional
- ✅ Links para redes sociais
- ✅ Projetos clicáveis
- ✅ Barras de progresso animadas
- ✅ Design responsivo
- ✅ Mesmos dados e informações

## 🛠️ Manutenção

Para atualizar informações em ambas as versões:
1. Edite os dados no arquivo `app.py`
2. As informações serão aplicadas automaticamente em ambas as versões
3. Para mudanças visuais, edite os arquivos CSS específicos de cada versão

## 💡 Recomendação de Uso

- **Versão Gamificada**: Ideal para apresentações profissionais focadas
- **Versão Tradicional**: Ideal para navegação livre e exploração completa

---

**Desenvolvido por Victor Martins da Silva** 🚀
