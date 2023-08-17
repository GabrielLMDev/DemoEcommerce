import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, doc, getDocs, collection, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyCrwTZzWvz_mAvDsczAYaa_6b8yh7j3vww",
    authDomain: "e-commerce-8be05.firebaseapp.com",
    projectId: "e-commerce-8be05",
    storageBucket: "e-commerce-8be05.appspot.com",
    messagingSenderId: "452813788294",
    appId: "1:452813788294:web:56ac11225af7cec96aed07",
    measurementId: "G-VTMWBC4RPT"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const productsRef = collection(db, "products");
var dots = 0;
const padre = document.getElementById("products");
//const q = query(collection(db, "products"), where("estatus", "==", true)); / DISPONIBLES
//const q = query(productsRef, orderBy("fecha", "desc"), limit(3)); // ASCENDENTE
const q = query(productsRef, orderBy("fecha", "desc"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    const total = document.getElementById("total");
    total.innerHTML = querySnapshot.docs.length + " productos";
    var aux = querySnapshot.docs.length / 4;
    dots = Math.floor(aux);
    const hijo = document.createElement("div");
    hijo.classList.add("product");
    hijo.style.width = 'calc(50% - 10px)';
    hijo.style.padding = '10px';
    hijo.style.boxSizing = 'border-box';
    hijo.style.display = 'none';
    const storage = getStorage(app);
    getDownloadURL(ref(storage, 'productos/' + doc.id + '.jpg'))
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            // Or inserted into an <img> element
            const img = document.getElementById('' + doc.id);
            img.setAttribute('src', url);
        })
        .catch((error) => {
            console.log(error);
        });
    var formatoPesos = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    });
    var numeroFormateado = formatoPesos.format(doc.data().precio);
    if (doc.data().estatus === true) {
        hijo.innerHTML = '<div class="shop-thumb">' +
            '<div class="shop-image-wrap">' +
            '<a href="shop-detail.html?product=' + doc.id + '">' +
            '<img src="" class="shop-image img-fluid" alt="' + doc.id + '" id="' + doc.id + '">' +
            '</a>' +
            '<div class="shop-icons-wrap">' +
            '<div class="shop-icons d-flex flex-column align-items-center">' +
            '<i class="fas fa-check" style="color: var(--primary-color);"></i>' +
            '</div>' +
            '<p class="shop-pricing mb-0 mt-3">' +
            '<span class="badge custom-badge">' + numeroFormateado + '</span>' +
            '</p>' +
            '</div>' +
            '<div class="shop-body">' +
            '<h4 class="shop-body-text">' + doc.data().nombre + '</h4>' +
            '</div>' +
            '<div class="shop-btn-wrap">' +
            '<a href="shop-detail.html?product=' + doc.id + '"' +
            'class="shop-btn custom-btn btn d-flex align-items-center align-items-center">Ver más</a>' +
            '</div>' +
            '</div >' +
            '</div>';
        padre.appendChild(hijo);
    } else {
        hijo.innerHTML = '<div class="shop-thumb">' +
            '<div class="shop-image-wrap">' +
            '<a href="shop-detail.html?product=' + doc.id + '">' +
            '<img src="" class="shop-image img-fluid" alt="' + doc.id + '" id="' + doc.id + '">' +
            '</a>' +
            '<div class="shop-icons-wrap">' +
            '<div class="shop-icons d-flex flex-column align-items-center">' +
            '<i class="fa-regular fa-circle-xmark" style="color: var(--primary-color);"></i>' +
            '</div>' +
            '<p class="shop-pricing mb-0 mt-3">' +
            '<span class="badge custom-badge">' + numeroFormateado + '</span>' +
            '</p>' +
            '</div>' +
            '<div class="shop-body">' +
            '<h4 class="shop-body-text">' + doc.data().nombre + '</h4>' +
            '</div>' +
            '<div class="shop-btn-wrap">' +
            '<a href="shop-detail.html?product=' + doc.id + '"' +
            'class="shop-btn custom-btn btn d-flex align-items-center align-items-center" style="font-size: 12px;">Agotado</a>' +
            '</div>' +
            '</div >' +
            '</div>';
        padre.appendChild(hijo);
    }
});
for (var j = 0; j <= dots; j++) {
    const pagination = document.getElementById("pagination");
    const dott = document.createElement("span");
    dott.classList.add("dot");
    pagination.appendChild(dott);
}

const products = document.querySelector('.products');
const dotys = document.querySelectorAll('.dot');

let currentPage = 0;
const productsPerPage = 4;

function showPage(pageIndex) {
    const startIdx = pageIndex * productsPerPage;
    const endIdx = startIdx + productsPerPage;

    const allProducts = Array.from(products.children);
    allProducts.forEach((product, index) => {
        if (index >= startIdx && index < endIdx) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

dotys.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentPage = index;
        showPage(currentPage);
        updateActiveDot();
    });
});

function updateActiveDot() {
    dotys.forEach((dot, index) => {
        if (index === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

showPage(currentPage);
updateActiveDot();

const qr = query(collection(db, "products"), where("estatus", "==", true));
const qSnapshot = await getDocs(qr)
    .then(qSnapshot => {
        const trueCount = qSnapshot.size;
        var noT = document.getElementById("noTotal");
        noT.innerHTML = trueCount;
    });

let ultimoCheckboxSeleccionado = null;

// Función para obtener y mostrar los resultados filtrados
async function mostrarResultadosFiltrados(event) {
    const checkbox = event.target;

    // Desmarca el último checkbox seleccionado, si hay uno
    if (ultimoCheckboxSeleccionado && ultimoCheckboxSeleccionado !== checkbox) {
        ultimoCheckboxSeleccionado.checked = false;
    }

    ultimoCheckboxSeleccionado = checkbox;
    const menorPrecio = document.getElementById("less").checked;
    const mayorPrecio = document.getElementById("more").checked;
    const recientes = document.getElementById("new").checked;
    const antiguos = document.getElementById("old").checked;

    let qF = "";

    if (menorPrecio) {
        qF = query(productsRef, orderBy("precio", "asc"));
    } else if (mayorPrecio) {
        qF = query(productsRef, orderBy("precio", "desc"));
    }

    if (recientes) {
        qF = query(productsRef, orderBy("fecha", "desc"));
    } else if (antiguos) {
        qF = query(productsRef, orderBy("fecha", "asc"));
    }
    padre.innerHTML = "";
    const querySnapshot = await getDocs(qF);
    querySnapshot.forEach((doc) => {
        const total = document.getElementById("total");
        total.innerHTML = querySnapshot.docs.length + " productos";
        var aux = querySnapshot.docs.length / 4;
        dots = Math.floor(aux);
        const hijo = document.createElement("div");
        hijo.classList.add("product");
        hijo.style.width = 'calc(50% - 10px)';
        hijo.style.padding = '10px';
        hijo.style.boxSizing = 'border-box';
        hijo.style.display = 'none';
        const storage = getStorage(app);
        getDownloadURL(ref(storage, 'productos/' + doc.id + '.jpg'))
            .then((url) => {
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                // Or inserted into an <img> element
                const img = document.getElementById('' + doc.id);
                img.setAttribute('src', url);
            })
            .catch((error) => {
                console.log(error);
            });
        var formatoPesos = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
        var numeroFormateado = formatoPesos.format(doc.data().precio);
        if (doc.data().estatus === true) {
            hijo.innerHTML = '<div class="shop-thumb">' +
                '<div class="shop-image-wrap">' +
                '<a href="shop-detail.html?product=' + doc.id + '">' +
                '<img src="" class="shop-image img-fluid" alt="' + doc.id + '" id="' + doc.id + '">' +
                '</a>' +
                '<div class="shop-icons-wrap">' +
                '<div class="shop-icons d-flex flex-column align-items-center">' +
                '<i class="fas fa-check" style="color: var(--primary-color);"></i>' +
                '</div>' +
                '<p class="shop-pricing mb-0 mt-3">' +
                '<span class="badge custom-badge">' + numeroFormateado + '</span>' +
                '</p>' +
                '</div>' +
                '<div class="shop-body">' +
                '<h4 class="shop-body-text">' + doc.data().nombre + '</h4>' +
                '</div>' +
                '<div class="shop-btn-wrap">' +
                '<a href="shop-detail.html?product=' + doc.id + '"' +
                'class="shop-btn custom-btn btn d-flex align-items-center align-items-center">Ver más</a>' +
                '</div>' +
                '</div >' +
                '</div>';
            padre.appendChild(hijo);
        } else {
            hijo.innerHTML = '<div class="shop-thumb">' +
                '<div class="shop-image-wrap">' +
                '<a href="shop-detail.html?product=' + doc.id + '">' +
                '<img src="" class="shop-image img-fluid" alt="' + doc.id + '" id="' + doc.id + '">' +
                '</a>' +
                '<div class="shop-icons-wrap">' +
                '<div class="shop-icons d-flex flex-column align-items-center">' +
                '<i class="fa-regular fa-circle-xmark" style="color: var(--primary-color);"></i>' +
                '</div>' +
                '<p class="shop-pricing mb-0 mt-3">' +
                '<span class="badge custom-badge">' + numeroFormateado + '</span>' +
                '</p>' +
                '</div>' +
                '<div class="shop-body">' +
                '<h4 class="shop-body-text">' + doc.data().nombre + '</h4>' +
                '</div>' +
                '<div class="shop-btn-wrap">' +
                '<a href="shop-detail.html?product=' + doc.id + '"' +
                'class="shop-btn custom-btn btn d-flex align-items-center align-items-center" style="font-size: 12px;">Agotado</a>' +
                '</div>' +
                '</div >' +
                '</div>';
            padre.appendChild(hijo);
        }
    });
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    for (var j = 0; j <= dots; j++) {
        const dott = document.createElement("span");
        dott.classList.add("dot");
        pagination.appendChild(dott);
    }
    const dotys = document.querySelectorAll('.dot');
    let currentPage = 0;
    showPage(currentPage);
    updateActiveDot();
    dotys.forEach((dt, indx) => {
        dt.addEventListener('click', () => {
            currentPage = indx;
            console.log(currentPage);
            showPage(currentPage);
            updateActiveDot();
        });
    });
}

// Agrega event listeners a los checkboxes
document.getElementById("less").addEventListener("change", mostrarResultadosFiltrados);
document.getElementById("more").addEventListener("change", mostrarResultadosFiltrados);
document.getElementById("new").addEventListener("change", mostrarResultadosFiltrados);
document.getElementById("old").addEventListener("change", mostrarResultadosFiltrados);

// Agrega event listeners a los checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", mostrarResultadosFiltrados);
});