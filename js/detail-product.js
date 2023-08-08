import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
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
// Obtener la URL actual
var url = new URL(window.location.href);
var params = new URLSearchParams(url.search);
var parametro = params.get('product');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const docRef = doc(db, "products", "" + parametro);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
    var formatoPesos = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    });
    var idProduct = document.getElementById("clave");
    idProduct.innerHTML = parametro;
    var price = document.getElementById("price");
    var numeroFormateado = formatoPesos.format(docSnap.data().precio);
    price.innerHTML = numeroFormateado;
    var status = document.getElementById("status");
    if (docSnap.data().estatus === true) {
        status.innerHTML = "DISPONIBLE";
    } else {
        status.innerHTML = "AGOTADO";
    }
    const dateT = docSnap.data().fecha;
    const date = new Date(dateT.seconds * 1000 + Math.floor(dateT.nanoseconds / 1000000));
    const formattedDate = formatDate(date);
    var fecha = document.getElementById("date");
    fecha.innerHTML = formattedDate;
    
    var name = document.getElementById("name");
    name.innerHTML = docSnap.data().nombre;
    var des = document.getElementById("description");
    des.innerHTML = docSnap.data().descripcion;
    const storage = getStorage(app);
    getDownloadURL(ref(storage, 'productos/' + parametro + '.jpg'))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            // Or inserted into an <img> element
            const img = document.getElementById('img-product');
            img.setAttribute('src', url);
        })
        .catch((error) => {
            // Handle any errors
        });
} else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
}
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }