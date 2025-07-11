const sliderDefaultOptions = {
    nav: false,
    controlsPosition: 'bottom',
    speed: 400,
    slideBy: 1,
    mouseDrag: true,
};

export const roomsSliderOptions = {
    ...sliderDefaultOptions,
    items: 1,
    responsive: {
        310: {
            items: 1,
            edgePadding: 10,
        },
        370: {
            items: 1,
            edgePadding: 30,
        },
        500: {
            items: 1,
            edgePadding: 50,
        },
        620: {
            items: 2,
            edgePadding: 40,
        },
        700: {
            items: 2,
            edgePadding: 40,
        },
        820: {
            items: 2,
            edgePadding: 90,
        },
        1100: {
            items: 3,
            edgePadding: 100,
        },
        1340: {
            items: 3,
            edgePadding: 210,
        },
    },
};


export const gallerySliderOptions = {
    ...sliderDefaultOptions,
    items: 2,
    lazyload: true,
    responsive: {
        1100: {
            items: 3,
            edgePadding: 100,
        },
        1340: {
            items: 3,
            edgePadding: 210,
        },
    },
};
