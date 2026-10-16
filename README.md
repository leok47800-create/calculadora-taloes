# Calculadora de Talões

Lançamento de talões de calçado por grade (tamanhos 33 a 42), com soma automática de pares por tamanho.

## Como usar

Abra `index.html` no navegador (Chrome ou Edge recomendados) ou acesse o link do GitHub Pages.

- Digite a referência e as quantidades por tamanho. `Enter` avança para o próximo tamanho, e `Enter` no 42 soma o talão.
- O total acumulado pode ser visto número a número ou juntando em pares (33/34, 35/36…).
- No histórico, cada talão pode ser corrigido ou excluído.
- O relatório sai em `.txt`. Em **Personalizar** dá para escolher uma pasta fixa para salvar os relatórios (Chrome/Edge).

## Dados

Os talões ficam no **Firebase (Firestore)**, sincronizados em tempo real entre todos os aparelhos liberados, e continuam funcionando sem internet (sincronizam quando a conexão volta). Nenhum talão fica neste repositório.

- O acesso é por login com conta Google. O administrador libera os e-mails dos funcionários em **Personalizar → Conta e acesso**.
- As permissões estão em [`firestore.rules`](firestore.rules). A configuração do Firebase no `index.html` não é segredo: quem protege os dados são essas regras.
- Referência digitada, modo de soma, aparência e pasta dos relatórios ficam só no aparelho de cada um.

O app é um único arquivo HTML, sem etapa de build. Ele carrega o SDK do Firebase e as fontes por CDN.
