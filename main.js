import {
    AmbientLight,
    BoxGeometry, 
    DirectionalLight, 
    Mesh, 
    MeshStandardMaterial, 
    PerspectiveCamera, 
    Scene, 
    WebGLRenderer 
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';

const stats = new Stats();
document.body.appendChild( stats.dom );

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );

const sun = new DirectionalLight();
sun.position.set(1,1,1);
scene.add(sun);

const ambient = new AmbientLight();
ambient.intensity = 1;
scene.add(ambient);

const geometry = new BoxGeometry( 1, 1, 1 );
const material = new MeshStandardMaterial( { color: 0x003300 } );
const cube = new Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
controls.update();

function animate() {
    controls.update();
    stats.update();
	renderer.render( scene, camera );
}