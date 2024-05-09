# App

GymPass style app

## RFs  (Rquisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível o perfil de usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obeter seu histórico de chek-ins
- [x] Deve ser possível o usuário buscar academias próximas (até 10km)
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-ins de usuário
- [x] Deve ser possível  cadastrar uma academia 

## RNs  (Regras de negócios)

- [x] O usuário não deve poder se cadatrar com um e-mail duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-ins se não estiver perto (100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadatrado por adminstrador

## RNFs (Requistos não funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistido de um banco PostgreSQL
- [x] Todas lista de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por JWT (JSON Web Token)