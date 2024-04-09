import { setStorage, getStorage, icons, userIcon} from "./helpers.js";

/* html'den js'e aktarılanlar */
const form = document.querySelector("form");
const noteList = document.querySelector("ul");
const visible = document.querySelector("#visibility")
const aside = document.querySelector("aside")

// global variables;
var coords;
/* verileri yansıt, eğer ls boşsa boş dizi yansıt */
var notes = getStorage() || [];
/* markerlar */
var markerLayer = null;
var map;

function loadingMap(coords) {
  /* harita kurulum ve başlangıç koordinatları ve zoom değeri */
  map = L.map("map").setView(coords, 10);

  /* harita görüntüleme ve ekrana yansıtma bağlantıları */
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //   imleçleri tutucağımız ayrı bir katman oluşturma
  markerLayer = L.layerGroup().addTo(map);

  // kullanıcının konumuna imleç bas
  L.marker(coords, { icon: userIcon }).addTo(map);

  // sayfa yüklendiği anda localden gelen verileri ekrana yansıt
  renderNoteList(notes);

  /* haritanın tıklanma olaylarını izle ve onmapclick çalıştır*/
  map.on("click", onMapClick);
}

/* iptal butonuna tıklanma anında formu temizle */
form[3].addEventListener("click", () => {
  /* formu temizleme işlemi */
  form.reset();

  /* formu kapatma işlemi */
  form.style.display = "none";
});

/* form gönderildiğinde yeni not oluştur ve localStorage */
form.addEventListener("submit", (e) => {
  // formu yenilemeyi durdur
  e.preventDefault();

  // form verilerinden not objesi oluştur
  const newNote = {
    id: new Date().getTime(),
    title: form[0].value,
    date: form[1].value,
    status: form[2].value,
    coords: coords,
  };

  /* not alanının başına notu ekle */
  notes.unshift(newNote);

  /* notları listele */
  renderNoteList(notes);

  /* localStorage güncelleme */
  setStorage(notes);

  /* not eklenince formu kapatma işlemi */
  form.style.display = "none";
  form.reset();
});

// not için imleç ekleme
function renderMarker(note) {
  // imleç oluştur
  L.marker(note.coords, { icons: icons[note.status] })
    // imleç ekle
    .addTo(markerLayer)
    .bindPopup(note.title);
}

/* ekrana notları yansıtma */
function renderNoteList(items) {
  // önceden eklenen elemanları temizle
  noteList.innerHTML = "";
  markerLayer.clearLayers();

  /* her bir obje için not kartı oluştur */
  items.forEach((note) => {
    // li oluştur
    const listEl = document.createElement("li");

    // data id ekleme
    listEl.dataset.id = note.id;

    // li içerik oluştur
    listEl.innerHTML = `
        <div class="info">
                        <p>${note.title}</p>
                        <hr>
                        <p>
                            <span>Tarih : </span>
                            <span>${note.date}</span>
                        </p>
                        <p>
                            <span>Durum : </span>
                            <span>${note.status}</span>
                        </p>
                    </div>
                    <div class="icons">
                        <i id="fly" class="bi bi-airplane-fill"></i>
                        <i id="delete" class="bi bi-trash-fill"></i>
                    </div>
        `;

    // listeye eleman ekle
    noteList.appendChild(listEl);

    // marker'ı haritaya ekle
    renderMarker(note);
  });
}

/* kullanıcının konum bilgilerini js'in navigator özelliği ile alma */
navigator.geolocation.getCurrentPosition(
  /* konum bilgisi sağlandığında çalışacak fonks. */
  (e) => {
    loadingMap([e.coords.latitude, e.coords.longitude]);
  },
  /* konum bilgisi sağlanamadığında çalışacak fonks. */
  () => {
    loadingMap([40.230894, 28.842421]);
  }
);

/* haritaya tıklandığında çalışır */
function onMapClick(e) {
  coords = [e.latlng.lat, e.latlng.lng];

  /* tıklanma anında formu açma */
  /* aside'ın visibility classına sahip old. kontrol edip
  yani aside görünmez durumda ise bu sınıfı siler,
  değilse de formu görünür yap */
  if(aside.classList.contains("visibility")){
  aside.classList.remove("visibility")
  } else {
    form.style.display = "flex";
  }

  /* form açılınca not eklemeye odaklan */
  form[0].focus();
}

// silme ve uçuş işlemleri
noteList.addEventListener("click", (e) => {
  // tıklanan elemanın idsine erişme
  const foundId = e.target.closest("li").dataset.id;

  if (
    e.target.id === "delete" &&
    confirm("Silmek istediğinize emin misiniz?")
  ) {
    // console.log(foundId)
    // idsi bulunan elemanı diziden çıkar
    notes = notes.filter((note) => note.id != foundId);

    // localStorage güncelle
    setStorage(notes);

    // ekranı güncelle
    renderNoteList(notes);
  }
  if (e.target.id === "fly") {
    // idsi bulunan elemanın dizideki haline erişme
    const note = notes.find((note) => note.id == foundId);

    // not koordinatlarına git
    map.flyTo(note.coords);
  }
});

// notların ve form alanının açılıp kapanma özelliği 
// x visibility classına sahipse bar küçülür 
visible.addEventListener('click', () => {
  aside.classList.toggle('visibility') ; 
  form.style.display = "none";
});