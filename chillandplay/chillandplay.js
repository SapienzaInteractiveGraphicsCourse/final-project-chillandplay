// -------------- VARIABLES DECLARATION ----------------------------------

var frogBody, frogHead, frogEyeR, frogEyeL, frogPupilR, frogPupilL;
var sheep;
var fish;
var plane;
var oldSelectedID = 11;

var objectID;
const frogID = 10;
const sheepID = 11;
const fishID = 12;

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


// --------- RAYCASTER ----------------------------------------------
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


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

function createFrog(scale){

    //Body
    const frogBodyGeometry = new THREE.BoxGeometry( 0.66, 1, 0.75 );
    const frogBodyMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
    frogBody = new THREE.Mesh( frogBodyGeometry, frogBodyMaterial );
    frogBodyGeometry.attributes.position.array[5]=0.25;
    frogBodyGeometry.attributes.position.array[14]=0.25;
    frogBodyGeometry.attributes.position.array[26]=0.25;
    frogBodyGeometry.attributes.position.array[29]=0.25;
    frogBodyGeometry.attributes.position.array[62]=0.25;
    frogBodyGeometry.attributes.position.array[65]=0.25;
    frogBody.receiveShadow = true;
    frogBody.castShadow = true;
    frogBody.translateX(-3);
    frogBody.scale.multiplyScalar(scale);
    scene.add( frogBody );

    //Head
    const frogHeadGeometry = new THREE.BoxGeometry( 0.9, 0.66, 0.6 );
    const frogHeadMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
    frogHead = new THREE.Mesh( frogHeadGeometry, frogHeadMaterial );
    frogHead.receiveShadow = true;
    frogHead.castShadow = true;
    frogHead.translateY(0.8);
    frogHead.translateZ(0.3);
    frogHead.scale.multiplyScalar(scale);
    frogBody.add( frogHead );

    //Right Eye
    const frogEyeRGeometry = new THREE.BoxGeometry( 0.3, 0.3, 0.15 ).toNonIndexed();
    const frogEyeRMaterial = new THREE.MeshStandardMaterial( {vertexColors: true} );
    const positionAttributeEyeR = frogEyeRGeometry.getAttribute('position');
    const colorsEyeR = [];
    const colorEyeR = new THREE.Color();
    for (let i = 0; i <= positionAttributeEyeR.count; i += 6) {
        if (i>=20 && i<=24) colorEyeR.setHex(0xff8c1a);
        else colorEyeR.setHex(0x00ff00);

        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
    
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
    }
    frogEyeRGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsEyeR, 3));
  
    frogEyeR = new THREE.Mesh( frogEyeRGeometry, frogEyeRMaterial );
    frogEyeR.receiveShadow = true;
    frogEyeR.castShadow = true;
    frogEyeR.translateX(-0.37);
    frogEyeR.translateY(0.3);
    frogEyeR.translateZ(0.3);
    frogEyeR.scale.multiplyScalar(scale);
    frogHead.add( frogEyeR );

    //Left Eye
    const frogEyeLGeometry = new THREE.BoxGeometry( 0.3, 0.3, 0.15 ).toNonIndexed();
    const frogEyeLMaterial = new THREE.MeshStandardMaterial( {vertexColors: true } );
    const positionAttributeEyeL = frogEyeRGeometry.getAttribute('position');
    const colorsEyeL = [];
    const colorEyeL = new THREE.Color();
    for (let i = 0; i <= positionAttributeEyeL.count; i += 6) {
        if (i>=20 && i<=24) colorEyeL.setHex(0xff8c1a);
        else colorEyeL.setHex(0x00ff00);

        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
    
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
    }
    frogEyeLGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsEyeL, 3));

    frogEyeL = new THREE.Mesh( frogEyeLGeometry, frogEyeLMaterial );
    frogEyeL.receiveShadow = true;
    frogEyeL.castShadow = true;
    frogEyeL.translateX(0.37);
    frogEyeL.translateY(0.3);
    frogEyeL.translateZ(0.3);
    frogEyeL.scale.multiplyScalar(scale);
    frogHead.add( frogEyeL );

    //Right Pupil
    const frogPupilRGeometry = new THREE.BoxGeometry( 0.1, 0.2, 0.05 );
    const frogPupilRMaterial = new THREE.MeshStandardMaterial( { color: 0x000000} );
    frogPupilR = new THREE.Mesh( frogPupilRGeometry, frogPupilRMaterial );
    frogPupilR.receiveShadow = true;
    frogPupilR.castShadow = true;
    frogPupilR.translateZ(0.1);
    frogPupilR.scale.multiplyScalar(scale);
    frogEyeR.add( frogPupilR );

    //Left Pupil
    const frogPupilLGeometry = new THREE.BoxGeometry( 0.1, 0.2, 0.05 );
    const frogPupilLMaterial = new THREE.MeshStandardMaterial( { color: 0x000000} );
    frogPupilL = new THREE.Mesh( frogPupilLGeometry, frogPupilLMaterial );
    frogPupilL.receiveShadow = true;
    frogPupilL.castShadow = true;
    frogPupilL.translateZ(0.1);
    frogPupilL.scale.multiplyScalar(scale);
    frogEyeL.add( frogPupilL );


}

function createSheep(scale){
    const sheepGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const sheepMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
    sheep = new THREE.Mesh( sheepGeometry, sheepMaterial );
    //console.log("Sheep= "+sheepGeometry.attributes.position.array);
    sheep.receiveShadow = true;
    sheep.castShadow = true;
    sheep.scale.multiplyScalar(scale);

    scene.add( sheep );
}

function createFish(scale){
    const fishGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const fishMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00} );
    fish = new THREE.Mesh( fishGeometry, fishMaterial );
    fish.receiveShadow = true;
    fish.castShadow = true;
    fish.translateX(3);
    fish.scale.multiplyScalar(scale);

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

    frogBody.rotation.x += 0.01;
    frogBody.rotation.y += 0.01;

    sheep.rotation.x += 0.01;
    sheep.rotation.y += 0.01;

    fish.rotation.x += 0.01;
    fish.rotation.y += 0.01;

    renderer.render(scene, camera);

};

function render(){
    renderer.render(scene, camera);
}

createFrog(1);
createSheep(2);
createFish(1);
createPlane();
createLights();
animate();
render();

window.addEventListener('onclick', onclick);
var onclick = function(event){

    mouse = new THREE.Vector2(
        ( event.clientX / window.innerWidth ) * 2 - 1,
      - ( event.clientY / window.innerHeight ) * 2 + 1);

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects[0].object.id);
    objectID = intersects.length > 0 ? intersects[0].object.id : "objectID";
    
    console.log(objectID);
    switch (objectID) {
        case frogID:
            console.log(frogID);
            resetScale(oldSelectedID);
            oldSelectedID = objectID;
            frog.scale.multiplyScalar(2);
            render();
            break;
        case sheepID:
            console.log(sheepID);
            resetScale(oldSelectedID);
            oldSelectedID = objectID;
            sheep.scale.multiplyScalar(2);
            break;
        case fishID:
            console.log(fishID);
            resetScale(oldSelectedID);
            oldSelectedID = objectID;
            fish.scale.multiplyScalar(2);
            break;
        default:
            //do nothing
            break;
    }
    
    
}

function resetScale(oldSelectedID){
    switch (oldSelectedID){
        case frogID:
            frog.scale.multiplyScalar(0.5);
            break;
        case sheepID:
            sheep.scale.multiplyScalar(0.5);
            break;
        case fishID:
            fish.scale.multiplyScalar(0.5);
            break;
        default:
            break;
    }
}

window.addEventListener('resize', onWindowResize);
function onWindowResize() {

    console.log(window.innerWidth);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}