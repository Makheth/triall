function generateCard() {
  const program = document.getElementById("program").value;
  const year = document.getElementById("year").value;
  const name = document.getElementById("name").value;
  const studentNumber = document.getElementById("studentNumber").value;

  const photoInput = document.getElementById("photo");
  const photoFile = photoInput.files.length > 0 ? photoInput.files[0] : null;

  resizePhoto(photoFile, (resizedPhoto) => {
    const cardHTML = `
            <div class="card">
                <img src="${resizedPhoto}" alt="Student Avatar">
                <div class="info">
                <h2  class="program">${program}</h2>
                    <h4  class="name">${name}</h4>
                    <h4  class="entry-year"> <span>${year} </span></h4>
                    <h4 class="student-number"> <span>${studentNumber} </span></h4>
                    <p class="return-message">If found, please return to:<br>Limkokwing University, Lesotho Campus</p>
          
                    </div>
              
            </div>
        `;

    document.getElementById("studentCard").innerHTML = cardHTML;
  });
}

function resizePhoto(photoFile, callback) {
  if (!photoFile) {
    callback("placeholder.jpg");
    return;
  }

  const MAX_WIDTH = 70;
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const aspectRatio = img.width / img.height;
      const newWidth = Math.min(img.width, MAX_WIDTH);
      const newHeight = newWidth / aspectRatio;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const resizedPhoto = canvas.toDataURL("image/jpeg");

      callback(resizedPhoto);
    };
  };

  reader.readAsDataURL(photoFile);
}
