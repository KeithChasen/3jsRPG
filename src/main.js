import {
    AmbientLight,
    DirectionalLight,  
    PerspectiveCamera, 
    Scene, 
    WebGLRenderer 
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { World } from './world';

const gui = new GUI();

const stats = new Stats();
document.body.appendChild( stats.dom );

const renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const scene = new Scene();
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const controls = new OrbitControls( camera, renderer.domElement );

const world = new World(10, 10);
scene.add(world);

const sun = new DirectionalLight();
sun.intensity = 3;
sun.position.set(1,1,1);
scene.add(sun);

const ambient = new AmbientLight();
ambient.intensity = 1;
scene.add(ambient);

camera.position.set(10, 2, 10);
controls.update();

function animate() {
    controls.update();
    stats.update();
	renderer.render( scene, camera );
}

addEventListener('resize', () => {
    camera.aspect = window.innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, innerHeight); 
});

const worldFolder = gui.addFolder('World');
worldFolder.addColor(world.terrain.material, 'color');
worldFolder.add(world, 'width', 1, 20, 1).name('Width');
worldFolder.add(world, 'height', 1, 20, 1).name('Height');
worldFolder.add(world, 'generate').name('Generate')
worldFolder.add(world, 'treeCount', 1, 100, 1).name('Trees');
worldFolder.add(world, 'rockCount', 1, 100, 1).name('Rocks');
worldFolder.add(world, 'bushCount', 1, 100, 1).name('Bushes');
worldFolder.onChange(() => {
    world.createTerrain();
})
