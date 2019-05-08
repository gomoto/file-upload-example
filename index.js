main()

function main() {
  if (!doSupportUploadWithProgress()) {
    return;
  }

  const fileInput = document.getElementById('file-input');
  const progressBarElement = document.getElementById('progress-bar');
  const progressPercentageElement = document.getElementById('progress-percentage');

  fileInput.onchange = function() {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('myfile', file);

    const xhr = new XMLHttpRequest();
    // Start
    xhr.upload.onloadstart = function(event) {
      console.log('onloadstart', event);
    };
    // Progress
    xhr.upload.onprogress = function(event) {
      console.log('onprogress', event);
      if (event.lengthComputable) {
        const percentComplete = Math.round(event.loaded / event.total * 100);
        progressBarElement.style.width = `${percentComplete}%`;
        progressPercentageElement.innerText = percentComplete;
      } else {
        console.log('Unable to compute progress information since the total size is unknown');
      }
    };
    // Failure
    xhr.upload.onerror = function(event) {
      console.log('onerror', event);
    };
    // Cancellation
    xhr.upload.onabort = function(event) {
      console.log('onabort', event);
    };
    // Success
    xhr.upload.onload = function(event) {
      console.log('onload', event);
    };
    // End
    xhr.upload.onloadend = function(event) {
      console.log('onloadend', event);
    };
    xhr.open('POST', 'http://localhost:3000/upload', true);
    xhr.send(formData);
  }
}

function doSupportUploadWithProgress() {
  return doSupportFileAPI() && doSupportUploadProgressEvents() && doSupportFormData();

  function doSupportFileAPI() {
    const fi = document.createElement('INPUT');
    fi.type = 'file';
    return 'files' in fi;
  };

  function doSupportUploadProgressEvents() {
    const xhr = new XMLHttpRequest();
    return Boolean(xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
  };

  function doSupportFormData() {
    return Boolean(window.FormData);
  }
}
