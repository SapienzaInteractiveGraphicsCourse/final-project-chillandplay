// -------------- VARIABLES DECLARATION ----------------------------------

var frog;
var sheep;
var fish;
var plane;

// ---------------------------------------------------------------------
const scene = new THREE.Scene();

//setting the background color
scene.background = new THREE.Color(0xbfe3dd);
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 20; //settare a 10 per la visione full screen

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );


// ------------- LIGHTS -------------------------------------------

function createLights(){
    //----------- ambient light ---------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    //------------ point light ----------------------------------------
    const light = new THREE.DirectionalLight( 0xffffff, 0.8);
    light.position.set( 200, 200, 200);
    light.castShadow = true;
    light.shadowDarkness = 0.2;
    light.shadow.radius = 8;
    light.shadow.mapSize.width = 2048; // default
    light.shadow.mapSize.height = 2048; // default
    scene.add( light );
}

// ------------- GEOMETRIES ----------------------------------------

function createFrog(){
    const frogGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const frogMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
    frog = new THREE.Mesh( frogGeometry, frogMaterial );
    frog.receiveShadow = true;
    frog.castShadow = true;
    scene.add( frog );
}

function createSheep(){
    const sheepGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const sheepMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
    sheep = new THREE.Mesh( sheepGeometry, sheepMaterial );
    sheep.receiveShadow = true;
    sheep.castShadow = true;
    sheep.translateX(-3);

    scene.add( sheep );
}

function createFish(){
    const fishGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const fishMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
    fish = new THREE.Mesh( fishGeometry, fishMaterial );
    fish.receiveShadow = true;
    fish.castShadow = true;
    fish.translateX(3);

    scene.add( fish );
}

function createPlane(){
    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new THREE.PlaneGeometry( 30, 30);
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.2;
    plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.rotateX(-1); //to rotate the plane
    plane.translateZ(-1);
    plane.receiveShadow = true;
    scene.add( plane );
}

function animate() {
    requestAnimationFrame( animate );

    frog.rotation.x += 0.01;
    frog.rotation.y += 0.01;

    sheep.rotation.x += 0.01;
    sheep.rotation.y += 0.01;

    fish.rotation.x += 0.01;
    fish.rotation.y += 0.01;

    renderer.render( scene, camera );
};

createFrog();
createSheep();
createPlane();
createFish();
createLights();
animate();


window.addEventListener('resize', onWindowResize);
function onWindowResize() {

    console.log(window.innerWidth);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}