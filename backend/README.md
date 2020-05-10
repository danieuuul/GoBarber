# Recuperacao de senha

**RF requisitos funcionais**

- o usuario deve poder recuperar sua senha informando o seu email;
- o usuario deve receber um email com instrucoes de recuperacao de senha;
- o usario deve poder resetar sua senha;

** RNF requisitos nao funcionais **

- utilizar Mailtrap para testar em ambiente de desenvolvimento
- Utilizar Amazon SES para envio em producao
- O envio de email deve acontecer em segundo plano (background job)

**RN regras de negocio**

- o link enviado por email para resetar senha, deve expirar em 2h;
- o usuario precisa confirmar a nova senha ao resetar

# Atualizacao de Perfil

# Painel do Prestador de Servicos

# Agendamento de servicos
