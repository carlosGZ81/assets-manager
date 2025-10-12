const API = '/api/assets';

const form = document.getElementById('asset-form');
const idInput = document.getElementById('asset-id');
const nameInput = document.getElementById('name');
const typeInput = document.getElementById('type');
const ownerInput = document.getElementById('owner');
const formTitle = document.getElementById('form-title');
const cancelBtn = document.getElementById('cancel-edit');
const tableBody = document.querySelector('#assets-table tbody');
const refreshBtn = document.getElementById('refresh');

async function fetchJSON(url, options = {}) {
    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.message || (data.errors ? data.errors.join(', ') : 'Error');
        throw new Error(msg);
    }
    return res.status !== 204 ? res.json() : null;
}


function renderRow(asset) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${asset.id}</td>
    <td>${asset.name}</td>
    <td>${asset.type ?? ''}</td>
    <td>${asset.owner ?? ''}</td>
    <td>${new Date(asset.created_at).toLocaleString()}</td>
    <td class="text-end">
    <button class="btn btn-sm btn-outline-primary me-2" data-action="edit" data-id="${asset.id}">Editar</button>
    <button class="btn btn-sm btn-outline-danger" data-action="delete" data-id="${asset.id}">Eliminar</button>
    </td>`;
    return tr;
}


async function loadAssets() {
    try {
        tableBody.innerHTML = '<tr><td colspan="6">Cargando...</td></tr>';
        const assets = await fetchJSON(API);
        tableBody.innerHTML = '';
        assets.forEach((a) => tableBody.appendChild(renderRow(a)));
    } catch (e) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-danger">${e.message}</td></tr>`;
    }
}


function resetForm() {
    idInput.value = '';
    nameInput.value = '';
    typeInput.value = '';
    ownerInput.value = '';
    formTitle.textContent = 'Crear asset';
    cancelBtn.hidden = true;
}


function startEdit(asset) {
    idInput.value = asset.id;
    nameInput.value = asset.name;
    typeInput.value = asset.type ?? '';
    ownerInput.value = asset.owner ?? '';
    formTitle.textContent = `Editar asset #${asset.id}`;
    cancelBtn.hidden = false;
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        name: nameInput.value.trim(),
        type: typeInput.value.trim() || undefined,
        owner: ownerInput.value.trim() || undefined,
    };
    try {
        if (!payload.name) throw new Error('El nombre es obligatorio');


        if (idInput.value) {
            await fetchJSON(`${API}/${idInput.value}`, {
                method: 'PUT',
                body: JSON.stringify(payload),
            });
        } else {
            await fetchJSON(API, { method: 'POST', body: JSON.stringify(payload) });
        }
        resetForm();
        await loadAssets();
    } catch (e) {
        alert(e.message);
    }
});


cancelBtn.addEventListener('click', () => {
    resetForm();
});


refreshBtn.addEventListener('click', loadAssets);


tableBody.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    if (action === 'edit') {
        try {
            const asset = await fetchJSON(`${API}/${id}`);
            startEdit(asset);
        } catch (e) {
            alert(e.message);
        }
    } else if (action === 'delete') {
        if (!confirm(`¿Eliminar asset #${id}?`)) return;
        try {
            await fetchJSON(`${API}/${id}`, { method: 'DELETE' });
            await loadAssets();
        } catch (e) {
            alert(e.message);
        }
    }
});


// Init
loadAssets();