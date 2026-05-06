Sistema de Monitoramento do Planejamento Estratégico da Educação (PES)

Crie uma aplicação web completa para monitoramento do Planejamento Estratégico da Educação, permitindo registrar objetivos estratégicos, metas e acompanhar o progresso das ações através de dashboards e indicadores interativos.

O sistema deve substituir relatórios estáticos (como PowerPoint ou Excel) por uma plataforma digital de acompanhamento estratégico, permitindo atualização contínua das metas e visualização dos resultados em tempo real.

O sistema deve possuir interface moderna, intuitiva e orientada à tomada de decisão, semelhante a dashboards de Business Intelligence.

Contexto do Projeto

Projeto: PES — Planejamento Estratégico da Educação

O sistema será utilizado por secretarias de educação para monitorar a execução de objetivos estratégicos e metas institucionais.

O foco é gestão estratégica, transparência e acompanhamento de resultados.

Objetivo do Sistema

O sistema deve permitir:

acompanhar metas vinculadas aos objetivos estratégicos

registrar atualizações periódicas de execução

consolidar indicadores automaticamente

visualizar dashboards gerenciais

gerar relatórios de acompanhamento

Tipos de Usuários
Administrador

Responsável pela configuração e gestão do sistema.

Permissões:

cadastrar objetivos estratégicos

cadastrar metas

cadastrar setores

cadastrar usuários

visualizar todos os dashboards

gerar relatórios

Responsável por Setor

Usuário responsável por atualizar o progresso das metas.

Permissões:

visualizar metas vinculadas ao seu setor

atualizar percentual de execução

registrar observações

acompanhar progresso das metas

Gestor

Usuário com perfil apenas de consulta.

Permissões:

visualizar dashboards

acompanhar indicadores

consultar progresso das metas

Funcionalidades do Sistema
1. Cadastro de Objetivos Estratégicos

O sistema deve permitir cadastrar objetivos estratégicos contendo:

título

descrição

período de execução

2. Cadastro de Metas

Cada meta deve conter:

objetivo estratégico vinculado

descrição da meta

setor responsável

prazo

status

percentual de execução

3. Atualização de Progresso

Os responsáveis devem registrar atualizações contendo:

percentual de execução

status da meta

observações

data da atualização

4. Visualização de Metas

O sistema deve permitir visualizar metas contendo:

objetivo estratégico

setor responsável

prazo

percentual de execução

status atual

Dashboard Estratégico

Criar um painel visual com indicadores e gráficos estratégicos.

O dashboard deve apresentar:

progresso geral do planejamento

metas concluídas

metas em andamento

metas atrasadas

progresso por objetivo estratégico

Os indicadores devem ser atualizados automaticamente.

O design deve seguir padrão de dashboard executivo de gestão pública.

Interações do Dashboard
Cards Interativos

Os cards do dashboard devem ser clicáveis.

Comportamento esperado:

Total de Metas → abrir página de metas com todas as metas

Metas Concluídas → abrir metas filtradas por status concluído

Metas em Andamento → abrir metas filtradas por status em andamento

Metas Atrasadas → abrir metas filtradas por status atrasado

Os cards devem possuir:

hover visual

cursor pointer

animação suave

Drill-down no Gráfico

O gráfico de progresso por objetivo estratégico deve permitir navegação.

Ao clicar em uma barra do gráfico:

→ abrir a página de metas filtrada pelo objetivo selecionado.

Exemplo:

Clique em Objetivo 2 → mostrar metas do Objetivo 2.

Página de Objetivos Estratégicos

Exibir tabela contendo:

número do objetivo

descrição do objetivo

quantidade de metas

progresso

status

ação (ver metas)

Status visual do objetivo

Regras:

Progresso ≥ 90% → Sucesso (verde)

Progresso entre 70% e 89% → Atenção (amarelo)

Progresso < 70% → Risco (vermelho)

Página de Metas

Tabela contendo:

meta

objetivo estratégico

responsável

prazo

progresso

status

última atualização

ação (editar / atualizar)

Filtros Avançados

Adicionar filtros na página de metas:

filtrar por objetivo estratégico

filtrar por setor responsável

filtrar por status

filtrar por prazo

Adicionar campo de busca.

Atualizações de Progresso

Criar página com histórico das atualizações das metas.

Exibir em formato de linha do tempo (timeline).

Cada registro deve mostrar:

nome da meta

responsável

percentual anterior

novo percentual

data da atualização

observação registrada

Relatórios

Permitir gerar relatórios contendo:

progresso por objetivo estratégico

lista de metas

indicadores gerais

Formatos:

PDF (resumo executivo)

Excel (dados detalhados)

Insights de Gestão

Adicionar seção no dashboard chamada:

Objetivos que precisam de atenção

Listar automaticamente os objetivos com menor progresso.

Essa seção ajuda gestores a identificar prioridades estratégicas.

Regras de Negócio

O progresso de um objetivo estratégico deve ser calculado pela média do percentual de execução das metas vinculadas.

O progresso geral do planejamento deve ser calculado pela média de todos os objetivos estratégicos.

O status das metas pode ser:

Em andamento

Concluído

Atrasado

Requisitos Técnicos

O sistema deve possuir:

aplicação web responsiva

autenticação de usuários

controle de acesso por perfil

suporte para múltiplos usuários simultaneamente

banco de dados relacional

interface simples e intuitiva para atualização rápida das metas

Estrutura de Dados

O sistema deve possuir as seguintes entidades principais:

Usuários

Setores

Objetivos Estratégicos

Metas

Atualizações de Progresso

MVP (Primeira Versão)

A primeira versão do sistema deve incluir:

login e autenticação de usuários

cadastro de objetivos estratégicos

cadastro de metas

atualização de progresso das metas

dashboard de acompanhamento

Funcionalidades Futuras

exportação automática de relatórios em PDF

notificações automáticas de metas atrasadas

anexos e evidências de execução

histórico completo de alterações

indicadores comparativos entre períodos

integração com ferramentas de BI

Estilo Visual

O design deve seguir padrão de dashboard institucional moderno, com:

layout administrativo com sidebar

cards de indicadores

gráficos interativos

tabelas organizadas

cores neutras e institucionais

foco em leitura rápida de indicadores

Interface inspirada em:

dashboards de gestão pública

sistemas de monitoramento estratégico

painéis de business intelligence.