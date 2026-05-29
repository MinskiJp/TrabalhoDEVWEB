# Eventua — Plataforma de Gestao de Eventos

Aplicacao web para gestao de eventos corporativos e festas, desenvolvida com
**Node.js + Express**, arquitetura em camadas (Controller -> Service -> Repository),
sessoes, middlewares e rotas publicas/privadas.

## Tecnologias
- Node.js + Express
- EJS (renderizacao de views)
- express-session (autenticacao por sessao)
- bcryptjs (hash de senhas)
- Persistencia em arquivos JSON

## Como rodar

```bash
npm install      # instala as dependencias
node seed.js     # (opcional) popula com dados de exemplo
npm start        # inicia em http://localhost:3000
```

## Usuarios de exemplo (apos rodar o seed)
| Perfil       | E-mail              | Senha    |
|--------------|---------------------|----------|
| Admin        | admin@eventua.com   | admin123 |
| Participante | joao@email.com      | 123456   |

## Arquitetura

```
src/
  controllers/   # recebem a requisicao e chamam o service
  services/      # regras de negocio e validacoes
  repositories/  # acesso e persistencia de dados (JSON)
  middlewares/   # authMiddleware e adminMiddleware
  routes/        # definicao das rotas
  views/         # templates EJS
public/          # CSS e JS estaticos
data/            # arquivos JSON (usuarios, eventos, inscricoes)
```

## Camadas
- **Controller** — extrai dados da requisicao, chama o service, devolve a resposta.
- **Service** — concentra regras de negocio (validacao, capacidade, hash, duplicidade).
- **Repository** — le e grava nos arquivos JSON, sem regra de negocio.
- **Middlewares** — `authMiddleware` (exige login) e `adminMiddleware` (exige perfil admin).

## Rotas principais

### Publicas
- `GET /` — home
- `GET /login`, `POST /login`
- `GET /cadastro`, `POST /cadastro`
- `GET /eventos`, `GET /eventos/:id`

### Privadas (participante)
- `GET /dashboard`
- `POST /inscricoes/:eventoId`
- `POST /inscricoes/:id/cancelar`
- `POST /logout`

### Privadas (admin)
- `GET /admin`
- `GET /admin/eventos/novo`, `POST /admin/eventos`
- `GET /admin/eventos/:id/editar`, `POST /admin/eventos/:id`
- `POST /admin/eventos/:id/excluir`
- `GET /admin/eventos/:id/inscritos`
