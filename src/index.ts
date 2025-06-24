import * as Blayms from "./imports.js";

window.addEventListener('DOMContentLoaded', () =>
{
    const alertButton = document.getElementById('btn1') as HTMLButtonElement | null;
    const threeJsButton = document.getElementById('btn2') as HTMLButtonElement | null;

    if (alertButton)
    {
        alertButton.addEventListener('click', () =>
        {
            const rndNum = new Blayms.RandomNumber(10, 100);
            Blayms.Alerter.Alert(`Hello, World!\n\nRandom Number from allocated instance: ${rndNum.value}`);
        });
    }

    if (threeJsButton)
    {
        threeJsButton.addEventListener('click', () =>
        {
            window.location.href = 'threejs.html';
        });
    }
});
