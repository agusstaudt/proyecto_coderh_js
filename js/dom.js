// Elementos del DOM
console.dir(document);
console.dir(document.head);
console.dir(document.body);

let mainPart = document.getElementById('mainPart');
mainPart.innerHTML = `
                    <h1 class="animated bounceInDown">AS</h1>
                    <p class="animated fadeInUpDelay">Impulsa tu productividad y crea las oportunidades</p>
                   `

let mainButtn = document.getElementById('mainButtn');
mainButtn.innerHTML = `
                    <a href="#" class="get-started-btn">
                    Get Started</a>
                    `

console.log(mainPart.innerHTML);
