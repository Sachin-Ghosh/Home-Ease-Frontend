export function showAlert(msg, type = "success") {
    // console.log(msg);
    // Create elements
    var toastDiv = document.createElement('div');
    var alertDiv = document.createElement('div');
    var contentDiv = document.createElement('div');
    var span = document.createElement('span');
    var closeButton = document.createElement('button');



    toastDiv.style.cssText = 'position: absolute; z-index: 50; bottom: 1rem; right: 1rem;';

    alertDiv.className = 'text-md rounded-xl shadow-lg';
    
    if (type == "success") { 
        alertDiv.style.backgroundColor = "green";
    } else if (type ==="error") {
        alertDiv.style.backgroundColor = "red";
    } else {
        alertDiv.style.backgroundColor = "yellow";
    }
    
    contentDiv.className = 'flex p-4';
    contentDiv.style.alignItems = 'center';

    closeButton.className = 'inline-flex flex-shrink-0 justify-center items-center h-5 w-5 rounded-lg text-white hover:text-white opacity-60 hover:opacity-100 focus:outline-none focus:opacity-100';
    closeButton.style.marginLeft = "6px";
    
    span.textContent = msg;

    closeButton.innerHTML = 
        '<svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>' +
        '</svg>';

    // Build the structure
    contentDiv.appendChild(span);
    contentDiv.appendChild(closeButton);

    alertDiv.appendChild(contentDiv);
    
    toastDiv.appendChild(alertDiv);
    document.body.appendChild(toastDiv);

    // Close the toast after 5 seconds
    setTimeout(function () {
        try {
            document.body.removeChild(toastDiv);
        } catch (e) {}
    }, 3000);

    closeButton.addEventListener('click', function() {
        document.body.removeChild(toastDiv);
    });
}