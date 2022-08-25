import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';

const loader = new GLTFLoader();
let myObj = Object3D;


loader.load('color-dodecahedron.glb', function (gltf) {
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
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls.update();

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
const controls = new OrbitControls(camera, renderer.domElement);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
Array(200).fill().forEach(addStar);
//adding background texture
const spaceTexture = new THREE.TextureLoader().load('space-bg.jpg');
scene.background = spaceTexture;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//original attempt at 3d object, after being dissastisfied set out to import self made blender model
// const geometry = new THREE.DodecahedronGeometry(13);
// const material = new THREE.MeshStandardMaterial({ color: 0x0080FF, wireframe: true });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

const chadTexture = new THREE.TextureLoader().load('chad.jpg');

const chadCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: chadTexture })
);
scene.add(chadCube);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normTexture = new THREE.TextureLoader().load('rocky_texture_199750.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normTexture })
);

scene.add(moon);


animate();