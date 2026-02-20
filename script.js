const URL_CONTADOR_GLOBAL = "SUA_URL_DA_PLANILHA_AQUI";
const WEBHOOK_COMPRA = "https://discord.com/api/webhooks/1474412092881637378/goEnWt4XbXA3Pe7RGkIzeZhiEawR1y1Ps-hyCpaqFJBd7wGrFen_uE5gKm89TWTMSNVF";
const DRAGONS_BLUE = 22185; 

// CONFIGURAÇÃO DE COMPRA
document.getElementById('confirmarCompra').addEventListener('click', async () => {
    const btn = document.getElementById('confirmarCompra');
    const dados = {
        data: document.getElementById('dataCompra').value || "Não informada",
        fornecedor: document.getElementById('fornecedor').value,
        produto: document.getElementById('produtoComprado').value,
        quantidade: document.getElementById('qtdCompra').value,
        valor: document.getElementById('valorTotalCompra').value,
        pagamento: document.getElementById('formaPagamento').value,
        comprador: document.getElementById('quemComprou').value,
        obs: document.getElementById('obsCompra').value || "Nenhuma"
    };

    if (!dados.fornecedor || !dados.valor) return alert("Preencha o fornecedor e o valor!");

    btn.disabled = true; btn.innerText = "⏳ Enviando...";

    const embedCompra = {
        title: "📥 NOVO REGISTRO DE COMPRA",
        color: DRAGONS_BLUE,
        fields: [
            { name: "📅 Data", value: dados.data, inline: true },
            { name: "👤 Fornecedor", value: dados.fornecedor, inline: true },
            { name: "🔫 Produto", value: `${dados.quantidade}x ${dados.produto}`, inline: true },
            { name: "💰 Valor Total", value: `R$ ${dados.valor}`, inline: true },
            { name: "💳 Pagamento", value: dados.pagamento, inline: true },
            { name: "🛠️ Comprador", value: dados.comprador, inline: true },
            { name: "📝 Observações", value: dados.obs, inline: false }
        ],
        footer: { text: "Dragons | Gestão de Insumos" },
        timestamp: new Date()
    };

    try {
        await fetch(WEBHOOK_COMPRA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embedCompra] })
        });
        alert("✅ Compra registrada no Discord!");
        location.reload();
    } catch (e) {
        alert("Erro ao enviar registro.");
        btn.disabled = false;
    }
});

// LOGICA DE ALTERNAR FORMULÁRIOS
document.getElementById('btnAbrirVenda').addEventListener('click', () => {
    document.querySelectorAll('.form-card').forEach(f => f.classList.add('hidden'));
    document.getElementById('formEncomenda').classList.remove('hidden');
});

document.getElementById('btnAbrirCompra').addEventListener('click', () => {
    document.querySelectorAll('.form-card').forEach(f => f.classList.add('hidden'));
    document.getElementById('formCompra').classList.remove('hidden');
});

document.getElementById('btnToggleUpdate').addEventListener('click', () => {
    document.querySelectorAll('.form-card').forEach(f => f.classList.add('hidden'));
    document.getElementById('formUpdate').classList.remove('hidden');
});

// (Mantenha aqui suas funções renderTabela() e calcular() do sistema anterior)