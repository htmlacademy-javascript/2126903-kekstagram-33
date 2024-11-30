const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('#upload-file');
const uploadImg = document.querySelector('.img-upload__preview img');

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadImg.src = URL.createObjectURL(file);
  }
});

