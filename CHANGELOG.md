# 📜 Change Log

Todas as mudanças notáveis da extensão **Git Profile Switcher** serão documentadas aqui.

Este projeto segue o padrão [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
e adota [versionamento semântico](https://semver.org/lang/pt-BR/).

---

## [Unreleased]

- Adição de futuras melhorias planejadas
- Detecção de perfil por `remote.origin.url` (em estudo)
- Sincronização remota (em planejamento)

---
## [0.0.4] & [0.0.5] - 2024-04-06

### Corrigido

- Validação do profile

---

## [0.0.3] - 2024-04-06

### Adicionado

- `activationEvents` para ativar a extensão automaticamente ao abrir projetos com repositório Git (`.git`)
- Suporte a `onStartupFinished` para ativar a extensão assim que o VSCode iniciar

### Corrigido

- Corrigido erro onde o status bar não atualizava ao abrir o VSCode

---

## [0.0.2] - 2024-04-06

### Adicionado

- Campo `"license"` no `package.json` + arquivo `LICENSE` com licença MIT
- Ícone adicionado para exibição no Marketplace e dentro do VSCode
- Campos `repository`, `bugs` e `homepage` configurados no `package.json`

### Corrigido

- Correção no match de perfis utilizando `toLowerCase()` para e-mails
- Ajustes nos paths de build com esbuild
- Remoção de variável `autoApplied` não utilizada

## [0.0.1] - 2024-04-06

### Adicionado

- Comando `Trocar Perfil Git` via palette
- Comando `Gerenciar Perfis Git` (criar, editar e remover)
- Armazenamento local em `~/.gitprofiles.json`
- Aplicação de perfil Git no `.git/config` local e global
- Exibição do nome e perfil atual na status bar do VSCode
- Reaplicação automática do último perfil utilizado por projeto
- Regras automáticas de perfil por caminho (`pathRules`)
- Empacotamento com `esbuild` e estrutura modular com TypeScript
- Publicação inicial no [Marketplace](https://marketplace.visualstudio.com/items?itemName=pehcst.git-profile-switcher)

---

## Como contribuir

1. Fork o projeto
2. Crie uma branch de mudança: `git checkout -b minha-mudanca`
3. Faça o commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push e abra um Pull Request

