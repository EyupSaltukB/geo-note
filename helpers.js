// localden parametre olarak gelen elemanı alır
export const getStorage = () => {
    // localden key ile eşleşen veriyi alma
    const strData = localStorage.getItem("notes");

    // string olarak gelen objeleri json'a çevirme
    return JSON.parse(strData);
}

// locale parametre olarak gelen elemanı kaydeder
export const setStorage = (data) => {
    // stringe çevirme
    const strData = JSON.stringify(data);
    // locale kaydet
    localStorage.setItem("notes", strData);
}


export var userIcon = L.icon({
    iconUrl: '/images/user-location.png',
    iconSize: [50, 55],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [60, 85],
    shadowAnchor: [22, 94]
});

var jobIcon = L.icon({
    iconUrl: '/images/job-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [60, 85],
    shadowAnchor: [22, 94]
});

var cafeIcon = L.icon({
    iconUrl: '/images/cafe-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [60, 85],
    shadowAnchor: [22, 94]
});

var homeIcon = L.icon({
    iconUrl: '/images/home-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [60, 85],
    shadowAnchor: [22, 94]
});

var parkIcon = L.icon({
    iconUrl: '/images/park-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [60, 85],
    shadowAnchor: [22, 94]
});

var schoolIcon = L.icon({
    iconUrl: '/images/school-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: '/images/my-icon-shadow.png',
    shadowSize: [60, 85],
    shadowAnchor: [22, 94]
});

var visitIcon = L.icon({
    iconUrl: '/images/visit-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'images/my-icon-shadow.png',
    shadowSize: [60, 85],
    shadowAnchor: [22, 94]
});

export const icons = {
    visit : visitIcon,
    home : homeIcon,
    job: jobIcon,
    park : parkIcon,
    school : schoolIcon,
    cafe : cafeIcon,
    user : userIcon,
};