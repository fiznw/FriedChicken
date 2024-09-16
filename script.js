let prices = {
    dada: 13000,
    pahaAtas: 13000,
    pahaBawah: 11000,
    sayap: 11000
};

let stock = {
    dada: 0,
    pahaAtas: 0,
    pahaBawah: 0,
    sayap: 0
};

let sales = {
    dada: 0,
    pahaAtas: 0,
    pahaBawah: 0,
    sayap: 0
};

let totalSalesPrice = 0;

// Add order 
document.getElementById('add-order').addEventListener('click', () => {
    let newOrder = document.createElement('div');
    newOrder.innerHTML = `
        <select class="order-item">
            <option value="dada">Dada - Rp.13,000</option>
            <option value="pahaAtas">Paha Atas - Rp.13,000</option>
            <option value="pahaBawah">Paha Bawah - Rp.11,000</option>
            <option value="sayap">Sayap - Rp.11,000</option>
        </select>
        <input type="number" class="order-quantity" placeholder="Jumlah" min="1">
    `;
    document.getElementById('order-list').appendChild(newOrder);
});

// Place order functionality
document.getElementById('place-order').addEventListener('click', () => {
    let orderItems = document.querySelectorAll('.order-item');
    let orderQuantities = document.querySelectorAll('.order-quantity');
    let totalPrice = 0;
    let errorMessage = '';

    orderItems.forEach((item, index) => {
        let quantity = parseInt(orderQuantities[index].value);
        if (!isNaN(quantity) && quantity > 0) {
            // Check stock
            if (stock[item.value] < quantity) {
                errorMessage += `Stok ${item.value} habis atau tidak mencukupi. Stok tersedia: ${stock[item.value]}.\n`;
            } else {
                let price = prices[item.value] * quantity;
                totalPrice += price;
                // Update sales
                sales[item.value] += quantity;
                // Update stock
                stock[item.value] -= quantity;
            }
        }
    });

    // Display error message if any
    if (errorMessage) {
        alert(errorMessage);
    } else {
        document.getElementById('total-price').textContent = 'Rp.' + totalPrice;

        // Update sales table
        for (let item in sales) {
            document.getElementById(`sales-${item}`).textContent = sales[item];
            document.getElementById(`sales-${item}-price`).textContent = 'Rp.' + (sales[item] * prices[item]);
        }

        // Update total sales
        totalSalesPrice += totalPrice;
        document.getElementById('total-sales').textContent = totalSalesPrice;
        document.getElementById('total-sales-price').textContent = 'Rp.' + totalSalesPrice;

        // Update stock table
        for (let item in stock) {
            document.getElementById(`stock-${item}`).textContent = stock[item];
        }

        // Clear form
        document.getElementById('order-list').innerHTML = `
            <label>Pilih Pesanan:</label>
            <select class="order-item">
                <option value="dada">Dada - Rp.13,000</option>
                <option value="pahaAtas">Paha Atas - Rp.13,000</option>
                <option value="pahaBawah">Paha Bawah - Rp.11,000</option>
                <option value="sayap">Sayap - Rp.11,000</option>
            </select>
            <input type="number" class="order-quantity" placeholder="Jumlah" min="1">
        `;
    }
});

// Stock input functionality
document.getElementById('save-stock').addEventListener('click', () => {
    let item = document.getElementById('stock-item').value;
    let quantity = parseInt(document.getElementById('stock-quantity').value);
    let date = document.getElementById('stock-date').value;

    if (!isNaN(quantity) && quantity > 0) {
        stock[item] += quantity;

        // Update stock table
        document.getElementById(`stock-${item}`).textContent = stock[item];

        // Add to history
        let historyTable = document.getElementById('history-table').querySelector('tbody');
        let newRow = historyTable.insertRow();
        newRow.innerHTML = `<td>${date}</td><td>${item}</td><td>${quantity}</td>`;
    }
});

// Out functionality
document.getElementById('save-out').addEventListener('click', () => {
    let item = document.getElementById('out-item').value;
    let quantity = parseInt(document.getElementById('out-quantity').value);
    let date = document.getElementById('out-date').value;

    if (!isNaN(quantity) && quantity > 0 && stock[item] >= quantity) {
        stock[item] -= quantity;

        // Update stock table
        document.getElementById(`stock-${item}`).textContent = stock[item];

        // Add to history
        let historyTable = document.getElementById('history-table').querySelector('tbody');
        let newRow = historyTable.insertRow();
        newRow.innerHTML = `<td>${date}</td><td>${item}</td><td>-${quantity}</td>`;
    }
});
