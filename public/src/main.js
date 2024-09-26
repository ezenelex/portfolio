import * as THREE from 'three'
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const scenePath = '/public/models/scene.gltf'

var cameraList = [];

var camera;
var camera_index = 1;
var GLTFModel;

var width = document.getElementById("canvas-div").clientWidth
var height = document.getElementById("canvas-div").clientHeight

const newCamera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000)

const LoadGLTFByPath = (scene) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(scenePath, (gltf) => {
      scene.add(gltf.scene);
      resolve(gltf);
    }, undefined, (error) => {
      reject(error);
    });
  });
};

let renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#background'),
  antialias: true,
  alpha: true,
});

renderer.setSize(width, height)
renderer.shadows = true;
renderer.shadowType = 1;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = 0;
renderer.toneMappingExposure = 1
renderer.useLegacyLights  = false;
renderer.toneMapping = THREE.NoToneMapping;
renderer.setClearColor(0xffffff, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace 

const scene = new THREE.Scene();
function updateBackground() {
  if(window.innerWidth  > 1024) {
    scene.background = new THREE.Color(0x0c1222)
  } else {
    scene.background = null
  }
}

updateBackground()


function retrieveListOfCameras(scene){
  scene.traverse(function (object) {
    if (object.isCamera) {
      cameraList.push(object);
    }
  });

  camera = cameraList[camera_index];
  camera.setFocalLength(120)
  newCamera.position.x = camera.position.x
  newCamera.position.y = camera.position.y
  newCamera.position.z = camera.position.z
  newCamera.rotation.x = camera.rotation.x
  newCamera.rotation.y = camera.rotation.y
  newCamera.rotation.z = camera.rotation.z
  newCamera.setFocalLength(120)
  updateCameraAspect(camera);
}

function updateCameraAspect(camera) {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// document.getElementById("switchCameraButton").addEventListener("click", switchCamera);

function switchCamera() {
  console.log("switching camera")
  camera_index = ( camera_index + 1 ) % cameraList.length;
  console.log("new camera: " + camera_index)
  camera = cameraList[camera_index];
  updateCameraAspect(camera);
}

// Load the GLTF model
LoadGLTFByPath(scene)
  .then((gltf) => {
    // console.log(gltf)
    GLTFModel = gltf
    retrieveListOfCameras(scene);
  })
  .catch((error) => {
    console.error('Error loading JSON scene:', error);
  });


const controls = new OrbitControls(newCamera, renderer.domElement)
controls.minPolarAngle = 0.785
controls.maxPolarAngle = 1.5
controls.minAzimuthAngle = -1.05
controls.maxAzimuthAngle = 0.02
controls.enableZoom = false;
controls.mouseButtons = {
  LEFT: THREE.MOUSE.ROTATE,
  MIDDLE: '',
  RIGHT: '',
}

scene.position.y -= 1.4

window.onresize = function(event) {
  width = document.getElementById("canvas-div").clientWidth
  height = document.getElementById("canvas-div").clientHeight
  updateCameraAspect(newCamera)
  renderer.setSize(width, height)
  updateBackground()
}

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section')
  const navLinks = document.querySelectorAll('#nav-list li')

  let current = ''

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    if(rect.top >= 0 && rect.top < window.innerHeight) {
      const id = section.getAttribute('id')
      navLinks.forEach((item) => {
        item.classList.remove('text-text_skill')
        if(item.getAttribute('id') === id) {
          item.classList.add('text-text_skill')
        }
      })
    }
  })
})



animate()
//A method to be run each time a frame is generated
function animate() {
  requestAnimationFrame(animate);
  controls.update()
  // console.log(newCamera.position.x, newCamera.position.y, newCamera.position.z, newCamera.rotation.x, newCamera.rotation.y, newCamera.rotation.z)
  renderer.render(scene, newCamera);
};




