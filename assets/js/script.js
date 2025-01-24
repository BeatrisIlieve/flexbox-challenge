document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.property-container');

    sections.forEach(section => {
        const detailsElement = section.querySelectorAll('details');
        const firstDetailsElement = detailsElement[0];
        firstDetailsElement.open = true;
    });
});

const propertyContainerElements = document.querySelectorAll('.property-container');

propertyContainerElements.forEach(propertyContainerElement => {
    propertyContainerElement.addEventListener('click', e => {
        const currentTargetElement = e.currentTarget;
        const targetElement = e.target;

        if (targetElement.tagName === 'SUMMARY') {
            const detailsElements = currentTargetElement.querySelectorAll('details');

            detailsElements.forEach(detailsElement => (detailsElement.open = false));
        }

        currentTargetElement.open = true;
    });
});

propertyContainerElements.forEach(propertyContainerElement => {
    propertyContainerElement.addEventListener('click', e => {
        const targetElement = e.target;

        if (targetElement.tagName === 'SUMMARY') {
            const summaryElementId = targetElement.id;

            const carouselElements = propertyContainerElement.querySelectorAll('.carousel-wrapper');

            carouselElements.forEach(element => (element.style.display = 'none'));

            const carouselElement = [...carouselElements].find(element => {
                const classList = element.classList;
                const lastClassName = classList[classList.length - 1];

                if (lastClassName === summaryElementId) {
                    return element;
                }
            });

            carouselElement.style.display = 'flex';
        }
    });
});

propertyContainerElements.forEach(propertyContainerElement => {
    propertyContainerElement.addEventListener('click', e => {
        const currentTargetElement = e.currentTarget;
        const targetElement = e.target;

        const carouselWrapperElements = currentTargetElement.querySelectorAll('.carousel-wrapper');

        const targetElementTagName = targetElement.tagName;
        let elementId;

        if (targetElementTagName === 'BUTTON') {
            const buttonId = targetElement.id;

            elementId = buttonId;
        } else if (targetElementTagName === 'I') {
            const buttonElement = targetElement.parentElement;
            const buttonId = buttonElement.id;

            elementId = buttonId;
        }

        return functionMapper[elementId](carouselWrapperElements);
    });

    const functionMapper = {
        next: boxesContainerElements => displayNextElement(boxesContainerElements),
        previous: boxesContainerElements => displayPreviousElement(boxesContainerElements),
    };
});

function displayNextElement(elements) {
    for (let i = 0; i < elements.length; i++) {
        let currentElement = elements[i];

        if (window.getComputedStyle(currentElement).display === 'flex') {
            currentElement.style.display = 'none';

            const nextIndex = (i + 1) % elements.length;
            elements[nextIndex].style.display = 'flex';

            break;
        }
    }
}

function displayPreviousElement(elements) {
    for (let i = elements.length - 1; i >= 0; i--) {
        let currentElement = elements[i];

        if (window.getComputedStyle(currentElement).display === 'flex') {
            currentElement.style.display = 'none';

            const previousIndex = (i - 1 + elements.length) % elements.length;
            elements[previousIndex].style.display = 'flex';

            break;
        }
    }
}
