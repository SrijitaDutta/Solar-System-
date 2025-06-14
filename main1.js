import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader()
cubeTextureLoader.setPath('/src/cube/')

const sunTexture = textureLoader.load("/src/Images/sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace  
const mercuryTexture = textureLoader.load("/src/Images/2k_mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace
const venusTexture = textureLoader.load("/src/Images/2k_venus_surface.jpg");
venusTexture.colorSpace = THREE.SRGBColorSpace
const earthTexture = textureLoader.load("/src/Images/2k_earth_daymap.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace
const marsTexture = textureLoader.load("/src/Images/2k_mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace
const jupiterTexture = textureLoader.load("/src/Images/Jupiter.jpg");
jupiterTexture.colorSpace = THREE.SRGBColorSpace
const saturnTexture = textureLoader.load("/src/Images/Saturn.jpg");
saturnTexture.colorSpace = THREE.SRGBColorSpace
const uranusTexture = textureLoader.load("/src/Images/Uranus.jpg");
uranusTexture.colorSpace = THREE.SRGBColorSpace
const neptuneTexture = textureLoader.load("/src/Images/Neptune.jpg");
neptuneTexture.colorSpace = THREE.SRGBColorSpace
const moonTexture = textureLoader.load("/src/Images/2k_moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace

const backgroundCubemap = cubeTextureLoader
.load( [
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
] );

scene.background = backgroundCubemap

const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.009,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
    {
    name: "Jupiter",
    radius: 3,
    distance: 35,
    speed: 0.005,
    material: jupiterMaterial,
    moons: [
        {
        name: "lo",
        radius: 0.3,
        distance: 1.5,
        speed: 0.02,
      },
      {
        name: "Europa",
        radius: 0.2,
        distance: 2.4,
        speed: 0.015,
        color: 0xffffff,
      },
      {
        name: "Ganymede",
        radius: 0.4,
        distance: 2.6,
        speed: 0.005,
      },
      {
        name: "Callisto",
        radius: 0.1,
        distance: 2.8,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Saturn",
    radius: 2.5,
    distance: 50,
    speed: 0.003,
    material: saturnMaterial,
    moons: [
      {
        name: "Titan",
        radius: 0.4,
        distance: 2.6,
        speed: 0.01,
      },
      {
        name: "Rhea",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Uranus",
    radius: 2,
    distance: 58,
    speed: 0.002,
    material: uranusMaterial,
    moons: [
      {
        name: "Titania",
        radius: 0.6,
        distance: 2.6,
        speed: 0.01,
      },
      {
        name: "Miranda",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Neptune",
    radius: 1.5,
    distance: 65,
    speed: 0.001,
    material: neptuneMaterial,
    moons: [
      {
        name: "Triton",
        radius: 0.4,
        distance: 2.6,
        speed: 0.01,
      },
      {
        name: "Nereid",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
];

const createPlanet = (planet) =>{
  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  )
  planetMesh.scale.setScalar(planet.radius)
  planetMesh.position.x = planet.distance
  return planetMesh
}

const createMoon = (moon) =>{
  const moonMesh = new THREE.Mesh(
    sphereGeometry,
    moonMaterial
  )
  moonMesh.scale.setScalar(moon.radius)
  moonMesh.position.x = moon.distance
  return moonMesh
}


const planetMeshes = planets.map((planet) =>{
  const planetMesh = createPlanet(planet)
  scene.add(planetMesh)

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon)
    planetMesh.add(moonMesh)
  })
  return planetMesh
})

console.log(planetMeshes)

const ambientLight = new THREE.AmbientLight(
  0xffffff,
  0.3
)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(
  0xffffff,
  1000
)
scene.add(pointLight)
 
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderloop = () => {
  planetMeshes.forEach((planet, planetIndex)=>{
    planet.rotation.y +=  planets[planetIndex].speed
    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance
    planet.children.forEach((moon, moonIndex) =>{
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
      moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
      moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
    })
  })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();