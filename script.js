document.addEventListener("DOMContentLoaded", () => {

    const carousel =
        document.getElementById("alicante-carousel");


    const radios = [
        document.getElementById("ali-slide-1"),
        document.getElementById("ali-slide-2"),
        document.getElementById("ali-slide-3"),
        document.getElementById("ali-slide-4"),
        document.getElementById("ali-slide-5")
    ];


    if (
        !carousel ||
        radios.some(radio => !radio)
    ) {
        return;
    }


    let startX = null;



    function getCurrentIndex() {

        return radios.findIndex(
            radio => radio.checked
        );

    }



    function goTo(index) {

        let finalIndex =
            index;


        if (
            finalIndex >= radios.length
        ) {

            finalIndex = 0;

        }


        if (
            finalIndex < 0
        ) {

            finalIndex =
                radios.length - 1;

        }


        radios[finalIndex].checked =
            true;

    }



    carousel.addEventListener(
        "pointerdown",
        event => {

            if (
                event.target.closest("video") ||
                event.target.closest("a") ||
                event.target.closest("button") ||
                event.target.closest("label")
            ) {
                return;
            }


            startX =
                event.clientX;

        }
    );



    carousel.addEventListener(
        "pointerup",
        event => {

            if (
                startX === null
            ) {
                return;
            }


            const difference =
                event.clientX -
                startX;


            const currentIndex =
                getCurrentIndex();


            if (
                difference < -70
            ) {

                goTo(
                    currentIndex + 1
                );

            }


            if (
                difference > 70
            ) {

                goTo(
                    currentIndex - 1
                );

            }


            startX =
                null;

        }
    );



    carousel.addEventListener(
        "pointercancel",
        () => {

            startX =
                null;

        }
    );



    document.addEventListener(
        "keydown",
        event => {

            const bounds =
                carousel.getBoundingClientRect();


            const visible =
                bounds.top < window.innerHeight &&
                bounds.bottom > 0;


            if (
                !visible
            ) {
                return;
            }


            const currentIndex =
                getCurrentIndex();


            if (
                event.key === "ArrowRight"
            ) {

                event.preventDefault();

                goTo(
                    currentIndex + 1
                );

            }


            if (
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();

                goTo(
                    currentIndex - 1
                );

            }

        }
    );


});