# InfraLab

Documentação do projeto N2 de Redes de Computadores I (FESA/CEFSA): oito ilhas interligadas por roteadores Cisco 2800 com RIP v2.

O site é um guia de implantação em Fumadocs sobre TanStack Start (SPA). A ordem de leitura é a da barra lateral.

| Etapa | Semana | O que cobre |
|---|---|---|
| 01 · Anamnese | 1 | Inventário dos roteadores, das ilhas e do firewall |
| 02 · Topologia | 2 | Enlaces, endereçamento e rotas previstas |
| 03 · Simulação | 3 | Validação no Packet Tracer |
| 04 · Deploy | 4 | Equipamento, firewall, VMs e ensaio |
| 05 · Avaliação N2 | 5 | Roteiro, critérios e riscos |

Os endereços que aparecem nos comandos são exemplo de formato. Interface, IP e enlace definitivos são os que o professor aprovar no G2. O site não calcula caminho: a métrica é contada à mão, na etapa de topologia.

## Desenvolvimento

Requer [Bun](https://bun.sh).

```bash
bun install
bun run dev
```

O servidor sobe em `http://localhost:3000`.

```bash
bun run types:check
bun run lint
bun run build
bun run preview
```

## Onde editar

- Páginas em `content/docs/<etapa>/*.mdx`.
- A ordem da sidebar vem do `meta.json` de cada pasta.
- `<Checklist id="..." items={[...]} />` cria um checklist salvo neste navegador.
