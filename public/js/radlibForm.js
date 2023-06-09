const radlibFormHandler = async (event) => {
    event.preventDefault();

    const inputElements = document.querySelectorAll('.radlib-input');

    let content = []
    for (const input of inputElements){
        const value = input.value.trim();
        const blankId = input.getAttribute('id').split("-")[1];
        
        content.push({content: value, blank_id: blankId});
    }

    if (inputElements) {
        const response = await fetch('/api/radlibs/', {
            method: 'POST',
            body: JSON.stringify({ inputs: content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const data = await response.json();
            const id = data.radlibId;
            document.location.replace(`/radlibs/${id}`);
        } else {
            console.error (response.statusText);
            alert('Please fill all blanks!');
        }
    }
};

const form = document.querySelector('#radlib').addEventListener('submit', radlibFormHandler);