export async function getAllItems() {
    // debugger
    const response = await fetch('http://localhost:3000/posts');
    return await response.json();
}

export async function createItem(data) {
    const response = await fetch(`http://localhost:3000/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}

export async function updateItem(data) {
    //TODO: Test this
    const response = await fetch(`http://localhost:3000/posts/` + data.id, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    })
    return await response.json();
}

export async function deleteItem(data) {
    //debugger
    const response = await fetch('http://localhost:3000/posts/' + data.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    return await response.json();
}