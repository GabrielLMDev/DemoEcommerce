import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, doc, getDocs, collection , query, where, orderBy, limit } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.1.0/firebase-firestore.min.js";
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
const productsRef = collection(db, "products");

//const q = query(collection(db, "products"), where("estatus", "==", true)); / DISPONIBLES
//const q = query(productsRef, orderBy("fecha", "desc"), limit(3)); // ASCENDENTE
const q = query(productsRef, orderBy("fecha"),limit(6));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());

    const padre = document.getElementById("products-index");
    const hijo = document.createElement("div");
    hijo.classList.add("col-lg-4");
    hijo.classList.add("col-12");

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
    if (doc.data().estatus === true) {
        hijo.innerHTML = '<div class="shop-thumb">' +
            '<div class="shop-image-wrap">' +
            '<img src="" class="shop-image img-fluid" alt="' + doc.id + '" id="' + doc.id + '">' +
            '<div class="shop-icons-wrap">' +
            '<div class="shop-icons d-flex flex-column align-items-center">' +
            '<i class="fas fa-check" style="color: var(--primary-color);"></i>' +
            '</div>' +
            '<p class="shop-pricing mb-0 mt-3">' +
            '<span class="badge custom-badge">$' + doc.data().precio + '</span>' +
            '</p>' +
            '</div>' +
            '<div class="shop-body">' +
            '<h4 class="shop-body-text">' + doc.data().nombre + '</h4>' +
            '</div>' +
            '<div class="shop-btn-wrap">' +
            '<a href="shop-detail.html?' + doc.id + '"' +
            'class="shop-btn custom-btn btn d-flex align-items-center align-items-center">Ver más</a>' +
            '</div>' +
            '</div >' +
            '</div>';
        padre.appendChild(hijo);
    } else {
        hijo.innerHTML = '<div class="shop-thumb">' +
            '<div class="shop-image-wrap">' +
            '<img src="" class="shop-image img-fluid" alt="' + doc.id + '" id="' + doc.id + '">' +
            '<div class="shop-icons-wrap">' +
            '<div class="shop-icons d-flex flex-column align-items-center">' +
            '<i class="fas fa-fire" style="color: var(--primary-color);"></i>' +
            '</div>' +
            '<p class="shop-pricing mb-0 mt-3">' +
            '<span class="badge custom-badge">$' + doc.data().precio + '</span>' +
            '</p>' +
            '</div>' +
            '<div class="shop-body">' +
            '<h4 class="shop-body-text">' + doc.data().nombre + '</h4>' +
            '</div>' +
            '<div class="shop-btn-wrap">' +
            '<a href="shop-detail.html?' + doc.id + '"' +
            'class="shop-btn custom-btn btn d-flex align-items-center align-items-center" style="font-size: 12px;">Agotado</a>' +
            '</div>' +
            '</div >' +
            '</div>';
        padre.appendChild(hijo);
    }
});
