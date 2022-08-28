import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
let myObj = Object;

function moonInertia(r) {
  if (r > .02) {
    setTimeout(() => {
      moon.rotation.x += r / 10;
      moon.rotation.y +=  r / 10 * 1.5;
      moon.rotation.z += r / 10;
      moonInertia(r - 0.001);

    }, '0005');
  } else if (r > 0) {
    setTimeout(() => {
      moon.rotation.x += r / 10;
      moon.rotation.y +=  r / 10 * 1.5;
      moon.rotation.z += r / 10;
      moonInertia(r - 0.0002);

    }, '0005');
  } else return;
}
//0.05
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moonInertia(0.05);
  

  chadCube.rotation.y += 0.01;
  chadCube.rotation.z += 0.01;

  camera.position.z = t * -0.02 + 5;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}


document.body.onscroll = moveCamera;
loader.load('/public/color-dodecahedron.glb', function (gltf) {
  myObj = gltf.scene;
  gltf.scene.scale.set(15, 15, 15);
  scene.add(gltf.scene);
  
}, undefined, function (error) {
  console.error(error);
});

function animate() {
  requestAnimationFrame(animate);
  myObj.rotation.x += 0.002;
  myObj.rotation.y += 0.001;
  myObj.rotation.z += 0.002;
  


  renderer.render(scene, camera);
}



function addStar() {
  const geo = new THREE.SphereGeometry(0.25, 24, 24);
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geo, mat);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

//setting scene and adding first objects
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
Array(200).fill().forEach(addStar);
//adding background texture
const spaceTexture = new THREE.TextureLoader().load('/public/space-bg.jpg');
scene.background = spaceTexture;
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(5);

//original attempt at 3d object, after being dissastisfied set out to import self made blender model
// const geometry = new THREE.DodecahedronGeometry(13);
// const material = new THREE.MeshStandardMaterial({ color: 0x0080FF, wireframe: true });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

const chadTexture = new THREE.TextureLoader().load('/public/chad.jpg');

const chadCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: chadTexture })
);
scene.add(chadCube);

const moonTexture = new THREE.TextureLoader().load('/public/moon.jpg');
const normTexture = new THREE.TextureLoader().load('/public/rocky_texture_199750.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normTexture })
);

moon.position.z = 30;
moon.position.setX(-30);

scene.add(moon);


animate();