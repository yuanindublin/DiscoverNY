const Images = [
  { image: require("../assets/categories/art.jpg") },
  { image: require("../assets/categories/empire.jpg") },
  { image: require("../assets/categories/gallery.jpg") },
  { image: require("../assets/categories/museum.jpg") },
];

export const markers = [
  {
    coordinate: {
      latitude: 40.7392696,
      longitude: -73.986775,
    },
    title: "Amazing Food Place",
    description: "This is the best food place",
    image: Images[0].image,
    rating: 4,
    reviews: 99,
  },
  {
    coordinate: {
      latitude: 40.7194172,
      longitude: -73.986775,
    },
    title: "Second Amazing Food Place",
    description: "This is the second best food place",
    image: Images[1].image,
    rating: 5,
    reviews: 102,
  },
  {
    coordinate: {
      latitude: 40.7238654,
      longitude: -73.9979055,
    },
    title: "Third Amazing Food Place",
    description: "This is the third best food place",
    image: Images[2].image,
    rating: 3,
    reviews: 220,
  },
  {
    coordinate: {
      latitude: 40.7230882,
      longitude: -73.9933858,
    },
    title: "Fourth Amazing Food Place",
    description: "This is the fourth best food place",
    image: Images[3].image,
    rating: 4,
    reviews: 48,
  },
  {
    coordinate: {
      latitude: 40.7257313,
      longitude: -73.9778791,
    },
    title: "Fifth Amazing Food Place",
    description: "This is the fifth best food place",
    image: Images[3].image,
    rating: 4,
    reviews: 178,
  },
];

export const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

export const mapStandardStyle = [
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
