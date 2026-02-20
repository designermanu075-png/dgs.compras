const WEBHOOK_URL = "https://discord.com/api/webhooks/1474412092881637378/goEnWt4XbXA3Pe7RGkIzeZhiEawR1y1Ps-hyCpaqFJBd7wGrFen_uE5gKm89TWTMSNVF";
const DRAGONS_BLUE_DECIMAL = 22185; // Equivalente a #0056a9

document.getElementById('btnRegistrar').addEventListener('click', async () => {
    const btn = document.getElementById('btnRegistrar');
    
    // Coleta de Dados
    const dados = {
        data: document.getElementById('data').value || "Não informada",
        fornecedor: document.getElementById('fornecedor').value,
        produto: document.getElementById('produto').value,
        quantidade: document.getElementById('quantidade').value,
        valor: document.getElementById('valor').value,
        pagamento: document.getElementById('pagamento').value,
        responsavel: document.getElementById('responsavel').value,
        obs: document.getElementById('obs').value || "Nenhuma observação."
    };

    // Validação Simples
    if (!dados.fornecedor || !dados.produto || !dados.valor) {
        return alert("Por favor, preencha os campos principais (Fornecedor, Produto e Valor).");
    }

    btn.disabled = true;
    btn.innerText = "⏳ Enviando para o Discord...";

    // Estrutura da Embed
    const embed = {
        title: "📥 NOVO REGISTRO DE COMPRA - DRAGONS",
        color: DRAGONS_BLUE_DECIMAL,
        fields: [
            { name: "📅 Data", value: dados.data, inline: true },
            { name: "🤝 Compramos de quem?", value: dados.fornecedor, inline: true },
            { name: "📦 Produto", value: dados.produto, inline: true },
            { name: "🔢 Quantidade", value: dados.quantidade, inline: true },
            { name: "💰 Valor Total", value: `R$ ${dados.valor}`, inline: true },
            { name: "💳 Forma de Pagamento", value: dados.pagamento, inline: true },
            { name: "👤 Quem comprou?", value: dados.responsavel, inline: true },
            { name: "📝 Observações", value: dados.obs, inline: false }
        ],
        footer: { text: "Dragons | Sistema de Gestão Interna" },
        timestamp: new Date()
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });

        if (response.ok) {
            alert("✅ Compra registrada com sucesso!");
            limparCampos();
        } else {
            throw new Error();
        }
    } catch (e) {
        alert("❌ Erro ao enviar para o Discord. Verifique a conexão.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Finalizar Registro de Compra";
    }
});

// Botão de Limpar
document.getElementById('btnLimpar').addEventListener('click', () => {
    if (confirm("Deseja realmente limpar todos os campos?")) {
        limparCampos();
    }
});

function limparCampos() {
    document.querySelectorAll('input, textarea, select').forEach(el => el.value = "");
}