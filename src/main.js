const previewElement = document.querySelector('.preview');
const previewImageElement = document.querySelector('.preview__image');
const previewElementVisibleClassName = 'preview--show';
const imageList = document.querySelector('.group-image');
const imageData = [
    {
        src: '/src/static/Image/Peony.jpg',
        id: crypto.randomUUID(),
    },
    {
        src: '/src/static/Image/Spring-flower.jpg',
        id: crypto.randomUUID(),
    },
    {
        src: '/src/static/Image/White-flower.jpg',
        id: crypto.randomUUID(),
    },
    {
        src: '/src/static/Image/Roseee.jpg',
        id: crypto.randomUUID(),
    },
    {
        src: '/src/static/Image/Rose-flower.jpg',
        id: crypto.randomUUID(),
    },
    {
        src: 'src/static/Image/Peonies.jpg',
        id: crypto.randomUUID(),
    },
];

imageData.forEach((image) => {
    const imageElement = document.createElement('img');

    imageElement.src = image.src;
    imageElement.dataset.id = image.id;
    imageElement.alt = '';
    imageElement.classList.add('thumb');

    imageList.append(imageElement);
})

function previewImage(src, id) {
    setImagePreview(src, id);
    previewElement.classList.add(previewElementVisibleClassName);
}

function hidePreview() {
    previewElement.classList.remove(previewElementVisibleClassName);
    setTimeout(() => {
        previewImageElement.src = '';
    }, 500)
}

previewElement.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('.button') && !target.closest('.button')) {
        hidePreview();
        return;
    }

    if (target.matches('.button') || target.closest('.button')) {
        const currentImageId = previewImageElement.dataset.id;
        const currentIndex = imageData.findIndex((image) => image.id === currentImageId);

        if (target.matches('.button--next') || target.closest('.button--next')) {
            const nextImage = imageData[currentIndex === imageData.length - 1 ? 0 : currentIndex + 1];
            setImagePreview(nextImage.src, nextImage.id);
        }

        if (target.matches('.button--prev') || target.closest('.button--prev')) {
            const prevImage = imageData[currentIndex === 0 ? imageData.length - 1 : currentIndex - 1];
            setImagePreview(prevImage.src, prevImage.id);
        }
    }
})

function setImagePreview(src, id) {
    previewImageElement.src = src;
    previewImageElement.dataset.id = id;
}

imageList.addEventListener('click', (event) => {
    const currentElement = event.target;

    if (currentElement.matches('img')) {
        previewImage(currentElement.src, currentElement.dataset.id);
    }
})