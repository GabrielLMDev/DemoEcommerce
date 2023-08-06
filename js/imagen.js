import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
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
const storage = getStorage(app);
getDownloadURL(ref(storage, 'productos/ECM001.jpg'))
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
        const img = document.getElementById('img-bd');
        img.setAttribute('src', url);
    })
    .catch((error) => {
        // Handle any errors
    });