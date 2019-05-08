const fileInput = document.getElementById('file-input');

fileInput.onchange = function() {
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);

  const xhr = new XMLHttpRequest();
  // Add any event handlers here...
  xhr.open('POST', 'http://localhost:3000/upload', true);
  xhr.send(formData);
}

