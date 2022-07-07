import * as THREE from '../node_modules/three/build/three.module.js';
//import {TextGeometry} from "three";
//import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
//import {TextGeometry} from '../node_modules/three/examples/jsm/geometries/TextGeometry.js';
////import { TextGeometry } from 'https://unpkg.com/three@0.138.3/examples/jsm/geometries/TextGeometry.js';
//  import 'TextGeometry';
//import {TextGeometry} from "three";
// -------------- VARIABLES DECLARATION ----------------------------------
var frogArea, frogBody, frogBelly,  frogHead, frogMouth,  frogEyeR, frogEyeL, frogPupilR, frogPupilL, frogCheekR, frogCheekL, frogUpperRightLeg, frogUpperLeftLeg, frogLowerRightLeg, frogLowerLeftLeg;
var sheepArea, sheepBody, sheepForehead, sheepFace, sheepWool, sheepRightEye, sheepLeftEye, sheepRightEar, sheepLeftEar, sheepFrontRightLeg, sheepFrontLeftLeg, sheepBackRightLeg, sheepBackLeftLeg;
var button;
var fishArea, fishBody, fishHead, fishEyeR, fishEyeL, fishPupilR, fishPupilL, fishTail, fishRightSideFin, fishLeftSideFin, fishUpperFin;
var plane;
var oldSelectedID = 11;

//materials
var grey_color = new THREE.MeshLambertMaterial({ color: 0xf3f2f7 });
var dark_color = new THREE.MeshLambertMaterial({ color: 0x5a6e6c });

var eyeballs;

const pi = Math.PI;
var objectID;
const frogID = 10;
const sheepID = 26;
const fishID = 43;
const buttonID = 59;
var buttonFlag = true;


// ---------------------------------------------------------------------
const scene = new THREE.Scene();

//setting the background color

//giallino: 0xfafad2
//azzurrino: 0xbfe3dd
scene.background = new THREE.Color(0xbfe3dd);
var camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 80; //settare a 10 per la visione full screen



const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
//document.body.appendChild(createButton( renderer ) );
document.body.appendChild( renderer.domElement );

//console.log(renderer.domElement);

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

    //Clickable area
    const frogAreaGeometry = new THREE.BoxGeometry(3, 3, 3);
    const frogAreaMaterial = new THREE.MeshStandardMaterial( { color: 0x4bcb4b} );
    frogAreaMaterial.transparent = true;
    frogAreaMaterial.opacity = 0;
    frogArea = new THREE.Mesh( frogAreaGeometry, frogAreaMaterial );
    frogArea.translateX(-4);
    scene.add(frogArea);

    //Body
    const frogBodyGeometry = new THREE.BoxGeometry( 0.66, 1, 0.75 );
    const frogBodyMaterial = new THREE.MeshStandardMaterial( { color: 0x96f2af} );
    frogBody = new THREE.Mesh( frogBodyGeometry, frogBodyMaterial );
    frogBodyGeometry.attributes.position.array[5]=0.25;
    frogBodyGeometry.attributes.position.array[14]=0.25;
    frogBodyGeometry.attributes.position.array[26]=0.25;
    frogBodyGeometry.attributes.position.array[29]=0.25;
    frogBodyGeometry.attributes.position.array[62]=0.25;
    frogBodyGeometry.attributes.position.array[65]=0.25;
    frogBody.receiveShadow = true;
    frogBody.castShadow = true;
    frogBody.translateX(-4);
    frogBody.scale.multiplyScalar(scale);
    scene.add( frogBody );

    //Belly
    const frogBellyGeometry = new THREE.SphereGeometry( 0.25, 32, 100 );
    const frogBellyMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness:1, metalness:0} );
    frogBelly = new THREE.Mesh( frogBellyGeometry, frogBellyMaterial );
    frogBelly.receiveShadow = true;
    frogBelly.castShadow = false;
    frogBelly.translateZ(0.3);
    frogBelly.translateY(-0.1);
    frogBelly.scale.y = 1.4;
    frogBody.add( frogBelly );

    //Head
    const frogHeadGeometry = new THREE.BoxGeometry( 0.9, 0.66, 0.6 );
    const frogHeadMaterial = new THREE.MeshStandardMaterial( { color: 0x96f2af} );
    frogHead = new THREE.Mesh( frogHeadGeometry, frogHeadMaterial );
    frogHead.receiveShadow = true;
    frogHead.castShadow = true;
    frogHead.translateY(0.8);
    frogHead.translateZ(0.3);
    frogHead.rotateX(-0.2);
    frogHead.scale.multiplyScalar(scale);
    frogBody.add( frogHead );

    //Pivot (mandibola)
    var frogMouthPivot = new THREE.Object3D();
    frogMouthPivot.translateY(-0.3);
    frogMouthPivot.translateZ(-0.3);
    frogMouthPivot.rotateX(0.4);
    frogHead.add( frogMouthPivot );

    //Mouth
    const frogMouthGeometry = new THREE.BoxGeometry( 0.9, 0.2, 0.6 );
    const loader = new THREE.TextureLoader();

    const materials = [
        new THREE.MeshStandardMaterial( { color: 0x96f2af}),
        new THREE.MeshStandardMaterial( { color: 0x96f2af}),
        new THREE.MeshBasicMaterial({map: loader.load('textures/mouth.jpg')}),
        new THREE.MeshStandardMaterial( { color: 0x96f2af}),
        new THREE.MeshStandardMaterial( { color: 0x96f2af}),
        new THREE.MeshStandardMaterial( { color: 0x96f2af})
    ];

    frogMouth = new THREE.Mesh( frogMouthGeometry, materials );
    frogMouth.receiveShadow = true;
    frogMouth.castShadow = true;
    frogMouth.translateZ(0.3);
    //frogMouth.rotateX(1);
    frogMouth.scale.multiplyScalar(scale);
    frogMouthPivot.add( frogMouth );


    //Right Eye
    const frogEyeRGeometry = new THREE.BoxGeometry( 0.3, 0.3, 0.15 ).toNonIndexed();
    const frogEyeRMaterial = new THREE.MeshStandardMaterial( {vertexColors: true} );
    const positionAttributeEyeR = frogEyeRGeometry.getAttribute('position');
    const colorsEyeR = [];
    const colorEyeR = new THREE.Color();
    for (let i = 0; i <= positionAttributeEyeR.count; i += 6) {
        if (i>=20 && i<=24) colorEyeR.setHex(0xffd129);
        else colorEyeR.setHex(0x96f2af);

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
        if (i>=20 && i<=24) colorEyeL.setHex(0xffd129);
        else colorEyeL.setHex(0x96f2af);

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

    //Right Cheek
    const frogCheekRGeometry = new THREE.BoxGeometry( 0.16, 0.12, 0.08 );
    const frogCheekRMaterial = new THREE.MeshStandardMaterial( { color: 0xff791f} );
    frogCheekR = new THREE.Mesh( frogCheekRGeometry, frogCheekRMaterial );
    frogCheekR.receiveShadow = true;
    frogCheekR.castShadow = true;
    frogCheekR.translateZ(0.3);
    frogCheekR.translateX(-0.4);
    frogCheekR.translateY(-0.1);
    frogCheekR.rotateZ(-0.2);
    frogCheekR.scale.multiplyScalar(scale);
    frogHead.add( frogCheekR );

    //Left Cheek
    const frogCheekLGeometry = new THREE.BoxGeometry( 0.16, 0.12, 0.08 );
    const frogCheekLMaterial = new THREE.MeshStandardMaterial( { color: 0xff791f} );
    frogCheekL = new THREE.Mesh( frogCheekLGeometry, frogCheekLMaterial );
    frogCheekL.receiveShadow = true;
    frogCheekL.castShadow = true;
    frogCheekL.translateZ(0.3);
    frogCheekL.translateX(0.4);
    frogCheekL.translateY(-0.1);
    frogCheekL.rotateZ(0.2);
    frogCheekL.scale.multiplyScalar(scale);
    frogHead.add( frogCheekL );

    //Upper Right Leg
    const frogUpperRightLegGeometry = new THREE.BoxGeometry( 0.4, 0.6, 0.2 );
    const frogUpperRightLegMaterial = new THREE.MeshStandardMaterial( { color: 0x96f2af} );
    frogUpperRightLeg = new THREE.Mesh( frogUpperRightLegGeometry, frogUpperRightLegMaterial );
    frogUpperRightLeg.receiveShadow = true;
    frogUpperRightLeg.castShadow = true;
    frogUpperRightLeg.rotateY(1.55)
    frogUpperRightLeg.rotateX(0.6)
    frogUpperRightLeg.translateOnAxis(frogUpperRightLeg.worldToLocal(new THREE.Vector3(0,1,0)), 0.3);
    frogUpperRightLeg.translateOnAxis(frogUpperRightLeg.worldToLocal(new THREE.Vector3(0,0,1)), 0.5);
    frogUpperRightLeg.scale.multiplyScalar(scale);
    frogBody.add( frogUpperRightLeg );

    //Upper Left Leg
    const frogUpperLeftLegGeometry = new THREE.BoxGeometry( 0.4, 0.6, 0.2 );
    const frogUpperLeftLegMaterial = new THREE.MeshStandardMaterial( { color: 0x96f2af} );
    frogUpperLeftLeg = new THREE.Mesh( frogUpperLeftLegGeometry, frogUpperLeftLegMaterial );
    frogUpperLeftLeg.receiveShadow = true;
    frogUpperLeftLeg.castShadow = true;
    frogUpperLeftLeg.rotateY(1.55)
    frogUpperLeftLeg.rotateX(-0.6)
    frogUpperLeftLeg.translateOnAxis(frogUpperLeftLeg.worldToLocal(new THREE.Vector3(0,1,0)), 0.3);
    frogUpperLeftLeg.translateOnAxis(frogUpperLeftLeg.worldToLocal(new THREE.Vector3(0,0,1)), -0.5);
    frogUpperLeftLeg.scale.multiplyScalar(scale);
    frogBody.add( frogUpperLeftLeg );

    //Lower Right Leg
    const frogLowerRightLegGeometry = new THREE.BoxGeometry( 0.4, 0.18, 0.2 );
    const frogLowerRightLegMaterial = new THREE.MeshStandardMaterial( { color: 0x96f2af} );
    frogLowerRightLeg = new THREE.Mesh( frogLowerRightLegGeometry, frogLowerRightLegMaterial );
    frogLowerRightLeg.receiveShadow = true;
    frogLowerRightLeg.castShadow = true;
    frogLowerRightLegGeometry.attributes.position.array[14] = -0.25;
    frogLowerRightLegGeometry.attributes.position.array[17] = 0.25;
    frogLowerRightLegGeometry.attributes.position.array[20] = -0.25;
    frogLowerRightLegGeometry.attributes.position.array[23] = 0.25;
    frogLowerRightLegGeometry.attributes.position.array[26] = -0.25;
    frogLowerRightLegGeometry.attributes.position.array[32] = 0.25;
    frogLowerRightLegGeometry.attributes.position.array[38] = 0.25;
    frogLowerRightLegGeometry.attributes.position.array[44] = -0.25;
    frogLowerRightLegGeometry.attributes.position.array[50] = 0.25;
    frogLowerRightLegGeometry.attributes.position.array[56] = 0.25;
    frogLowerRightLegGeometry.attributes.position.array[65] = -0.25;
    frogLowerRightLegGeometry.attributes.position.array[71] = -0.25;
    frogLowerRightLeg.rotateY(1.57)
    frogLowerRightLeg.rotateZ(-0.65)
    frogLowerRightLeg.translateOnAxis(frogLowerRightLeg.worldToLocal(new THREE.Vector3(0,1,0)),-0.36);
    frogLowerRightLeg.scale.multiplyScalar(scale);
    frogUpperRightLeg.add( frogLowerRightLeg );

    //Lower Left Leg
    const frogLowerLeftLegGeometry = new THREE.BoxGeometry( 0.4, 0.18, 0.2 );
    const frogLowerLeftLegMaterial = new THREE.MeshStandardMaterial( { color: 0x96f2af} );
    frogLowerLeftLeg = new THREE.Mesh( frogLowerLeftLegGeometry, frogLowerLeftLegMaterial );
    frogLowerLeftLeg.receiveShadow = true;
    frogLowerLeftLeg.castShadow = true;
    frogLowerLeftLegGeometry.attributes.position.array[14] = -0.25;
    frogLowerLeftLegGeometry.attributes.position.array[17] = 0.25;
    frogLowerLeftLegGeometry.attributes.position.array[20] = -0.25;
    frogLowerLeftLegGeometry.attributes.position.array[23] = 0.25;
    frogLowerLeftLegGeometry.attributes.position.array[26] = -0.25;
    frogLowerLeftLegGeometry.attributes.position.array[32] = 0.25;
    frogLowerLeftLegGeometry.attributes.position.array[38] = 0.25;
    frogLowerLeftLegGeometry.attributes.position.array[44] = -0.25;
    frogLowerLeftLegGeometry.attributes.position.array[50] = 0.25;
    frogLowerLeftLegGeometry.attributes.position.array[56] = 0.25;
    frogLowerLeftLegGeometry.attributes.position.array[65] = -0.25;
    frogLowerLeftLegGeometry.attributes.position.array[71] = -0.25;
    frogLowerLeftLeg.rotateY(-1.57)
    frogLowerLeftLeg.rotateZ(-0.65)
    frogLowerLeftLeg.translateOnAxis(frogLowerRightLeg.worldToLocal(new THREE.Vector3(0,1,0)),-0.36);
    frogLowerLeftLeg.scale.multiplyScalar(scale);
    frogUpperLeftLeg.add( frogLowerLeftLeg );

}


function createSheep(scale){

    //Clickable area
    const sheepAreaGeometry = new THREE.BoxGeometry(3, 3, 3);
    const sheepAreaMaterial = new THREE.MeshStandardMaterial( { color: 0x4bcb4b} );
    sheepAreaMaterial.transparent = true;
    sheepAreaMaterial.opacity = 0;
    sheepArea = new THREE.Mesh( sheepAreaGeometry, sheepAreaMaterial );

    //Sheep body
    const sheepBodyGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const sheepBodyMaterial = new THREE.MeshStandardMaterial( { color: 0xffc9c8} );
    sheepBody = new THREE.Mesh( sheepBodyGeometry, sheepBodyMaterial );
    sheepBody.receiveShadow = true;
    sheepBody.castShadow = true;
    sheepBody.scale.multiplyScalar(scale);
    sheepBody.scale.multiplyScalar(1.1);
    sheepBody.translateY(0.5);
    
    scene.add( sheepBody );
    scene.add(sheepArea);

    //Sheep head
    var sheepHeadGeometry = new THREE.IcosahedronGeometry(1, 0);
    var sheepHead = new THREE.Mesh(sheepHeadGeometry, dark_color);
    sheepHead.castShadow = true;
    sheepHead.scale.z = 0.6;
    sheepHead.scale.y = 1.1;
    sheepHead.scale.multiplyScalar(0.30);
    sheepHead.position.y = 0.1;
    sheepHead.rotation.x = -0.2;
    sheepHead.position.z = 0.55;
    sheepBody.add(sheepHead);

    //eyes
    var geo_eye = new THREE.CylinderGeometry(0.3, 0.2, 0.3, 8);
    var eyes = [];
    for (var i = 0; i < 2; i++) {
        eyes[i] = new THREE.Mesh(geo_eye, grey_color);
        sheepHead.add(eyes[i]);
        eyes[i].castShadow = true;
        eyes[i].position.set(0, sheepHead.position.y + 0.1, 0.7);
        eyes[i].rotation.x = pi / 2 - pi / 15;
    }
    eyes[0].position.x = 0.3;
    eyes[1].position.x = -eyes[0].position.x;

    eyes[0].rotation.z = -pi / 15;
    eyes[1].rotation.z = -eyes[0].rotation.z;

    //eyeballs
    var geo_eyeball = new THREE.SphereGeometry(0.11, 8, 8);
    eyeballs = [];
    for (var i = 0; i < 2; i++) {
        eyeballs[i] = new THREE.Mesh(geo_eyeball, dark_color);
        eyes[i].add(eyeballs[i]);
        eyeballs[i].castShadow = true;
        eyeballs[i].position.set(0, 0.2, 0); //ATTENZIONE!!! Il terzo parametro le muove in verticale, il secondo in profondità
    }

    //Sheep tail
    var geo_tail = new THREE.IcosahedronGeometry(0.5, 0);
    var tail = new THREE.Mesh(geo_tail, grey_color);
    tail.position.set(0, 0.23, -0.5);
    tail.castShadow = true;
    tail.scale.multiplyScalar(0.35);
    sheepBody.add(tail);

    //Sheep hair
    var hair = [];
    var geo_hair = new THREE.IcosahedronGeometry(0.4, 0);
    for (var i = 0; i < 5; i++) {
    hair[i] = new THREE.Mesh(geo_hair, grey_color);
    hair[i].castShadow = true;
    sheepHead.add(hair[i]);
    }
    hair[0].position.set(-0.4, sheepHead.position.y + 0.9, -0.1);
    hair[1].position.set(0, sheepHead.position.y + 1, -0.1);
    hair[2].position.set(0.4, sheepHead.position.y + 0.9, -0.1);
    hair[3].position.set(-0.1, sheepHead.position.y + 0.9, -0.4);
    hair[4].position.set(0.12, sheepHead.position.y + 0.9, -0.4);

    hair[0].scale.set(0.6, 0.6, 0.6);
    hair[2].scale.set(0.8, 0.8, 0.8);
    hair[3].scale.set(0.7, 0.7, 0.7);
    hair[4].scale.set(0.6, 0.6, 0.6);

    
    //Sheep legs
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.15, 1, 4);
    legGeometry.translate(0, -0.5, 0);
    const legMaterial = dark_color;
    sheepFrontRightLeg = new THREE.Mesh(legGeometry, legMaterial);
    sheepFrontRightLeg.castShadow = true;
    sheepFrontRightLeg.receiveShadow = true;
    sheepFrontRightLeg.position.set(0.20, -0.2, 0.18);
    sheepFrontRightLeg.rotation.x = -0.20944; //rad -12
    sheepFrontRightLeg.scale.multiplyScalar(0.2*scale);

    sheepBody.add(sheepFrontRightLeg);
    
    sheepFrontLeftLeg = sheepFrontRightLeg.clone();
    sheepFrontLeftLeg.position.x = -sheepFrontRightLeg.position.x;
    sheepFrontLeftLeg.rotation.z = -sheepFrontRightLeg.rotation.z;
    sheepBody.add(sheepFrontLeftLeg);
    
    sheepBackRightLeg = sheepFrontRightLeg.clone();
    sheepBackRightLeg.position.z = -sheepFrontRightLeg.position.z;
    sheepBackRightLeg.rotation.x = -sheepFrontRightLeg.rotation.x;
    sheepBody.add(sheepBackRightLeg);
    
    sheepBackLeftLeg = sheepFrontLeftLeg.clone();
    sheepBackLeftLeg.position.z = -sheepFrontLeftLeg.position.z;
    sheepBackLeftLeg.rotation.x = -sheepFrontLeftLeg.rotation.x;
    sheepBody.add(sheepBackLeftLeg);

    sheepBody.scale.multiplyScalar(0.8);

    
}

function createFish(scale){

    //Clickable area
    const fishAreaGeometry = new THREE.BoxGeometry(3, 3, 3);
    const fishAreaMaterial = new THREE.MeshStandardMaterial( { color: 0x4bcb4b} );
    fishAreaMaterial.transparent = true;
    fishAreaMaterial.opacity = 0;
    fishArea = new THREE.Mesh( fishAreaGeometry, fishAreaMaterial );
    fishArea.translateX(4);
    scene.add(fishArea);
    
    //Body
    const fishGeometry = new THREE.CylinderGeometry(0.7, 0.4, 1.3, 4, 1)
    const fishMaterial = new THREE.MeshStandardMaterial( { color: 0x4682b4} );
    fishBody = new THREE.Mesh( fishGeometry, fishMaterial );
   
    fishBody.receiveShadow = true;
    fishBody.castShadow = true;
    fishBody.rotation.x = 1.5708;
    
    //console.log(fishGeometry.attributes.position.array);
    
    fishBody.translateX(4);
    fishBody.rotateY(2.355);
    fishBody.scale.multiplyScalar(scale);
    scene.add( fishBody );

    //Head
    const fishHeadGeometry = new THREE.CylinderGeometry(0.7, 0.3, 0.9, 4, 1);
    fishHead = new THREE.Mesh(fishHeadGeometry, fishMaterial);
    fishHead.receiveShadow = true;
    fishHead.castShadow = true;
    fishHead.rotation.x = 3.14159; //180 gradi in radianti 
    
    fishHead.position.y = 0.95;
    
    fishHead.scale.multiplyScalar(0.8*scale);

    fishBody.add(fishHead);

    //Eyes
    //Right Eye
    const fishEyeRGeometry = new THREE.BoxGeometry( 0.3, 0.3, 0.15 ).toNonIndexed();
    const fishEyeRMaterial = new THREE.MeshStandardMaterial( {vertexColors: true} );
    const positionAttributeEyeR = fishEyeRGeometry.getAttribute('position');
    const colorsEyeR = [];
    const colorEyeR = new THREE.Color();
    for (let i = 0; i <= positionAttributeEyeR.count; i += 6) {
        if (i>=20 && i<=24) colorEyeR.setHex(0xffffff);
        else colorEyeR.setHex( 0x4682b4);

        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
    
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
        colorsEyeR.push(colorEyeR.r, colorEyeR.g, colorEyeR.b);
    }
    fishEyeRGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsEyeR, 3));
  
    fishEyeR = new THREE.Mesh( fishEyeRGeometry, fishEyeRMaterial );
    fishEyeR.receiveShadow = true;
    fishEyeR.castShadow = true;
    fishEyeR.translateX(-0.5);
    fishEyeR.translateY(0.2);
    fishEyeR.translateZ(0.5);
    fishEyeR.rotation.y = -0.785398;
    fishEyeR.scale.multiplyScalar(scale);
    fishHead.add( fishEyeR );

    //Left Eye
    const fishEyeLGeometry = new THREE.BoxGeometry( 0.3, 0.3, 0.15 ).toNonIndexed();
    const fishEyeLMaterial = new THREE.MeshStandardMaterial( {vertexColors: true } );
    const positionAttributeEyeL = fishEyeRGeometry.getAttribute('position');
    const colorsEyeL = [];
    const colorEyeL = new THREE.Color();
    for (let i = 0; i <= positionAttributeEyeL.count; i += 6) {
        if (i>=20 && i<=24) colorEyeL.setHex(0xffffff);
        else colorEyeL.setHex( 0x4682b4);

        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
    
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
        colorsEyeL.push(colorEyeL.r, colorEyeL.g, colorEyeL.b);
    }
    fishEyeLGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsEyeL, 3));

    fishEyeL = new THREE.Mesh( fishEyeLGeometry, fishEyeLMaterial );
    fishEyeL.receiveShadow = true;
    fishEyeL.castShadow = true;
    fishEyeL.translateX(0.5);
    fishEyeL.translateY(0.2);
    fishEyeL.translateZ(-0.5);
    fishEyeL.rotation.y = 2.356192; //radians
    fishEyeL.scale.multiplyScalar(scale);
    fishHead.add( fishEyeL );

    //Right Pupil
    const fishPupilRGeometry = new THREE.BoxGeometry( 0.15, 0.15, 0.05 );
    const fishPupilRMaterial = new THREE.MeshStandardMaterial( { color: 0x7ec8e3} );
    fishPupilR = new THREE.Mesh( fishPupilRGeometry, fishPupilRMaterial );
    fishPupilR.receiveShadow = true;
    fishPupilR.castShadow = true;
    fishPupilR.translateZ(0.1);
    fishPupilR.scale.multiplyScalar(scale);
    fishEyeR.add( fishPupilR );

    //Left Pupil
    const fishPupilLGeometry = new THREE.BoxGeometry( 0.15, 0.15, 0.05 );
    const fishPupilLMaterial = new THREE.MeshStandardMaterial( { color: 0x7ec8e3} );
    fishPupilL = new THREE.Mesh( fishPupilLGeometry, fishPupilLMaterial );
    fishPupilL.receiveShadow = true;
    fishPupilL.castShadow = true;
    fishPupilL.translateZ(0.1);
    fishPupilL.scale.multiplyScalar(scale);
    fishEyeL.add( fishPupilL );

    //Tail 
    const fishTailGeometry = new THREE.ConeGeometry( 0.4, 1.0, 5.0 );
    const fishFishMaterial = new THREE.MeshBasicMaterial( {color: 0x003060} );
    fishTail = new THREE.Mesh( fishTailGeometry, fishFishMaterial );
    fishTail.receiveShadow = true; // non funziona l'omombra sul cono...
    fishTail.castShadow = true;
    fishTail.translateY(-0.8);
    fishTail.scale.multiplyScalar(scale);
    fishBody.add( fishTail );

    //Upper fin 
    const fishUpperFinGeometry = new THREE.BoxGeometry( 0.1, 0.7, 0.5 );
    const fishUpperFinMaterial = new THREE.MeshBasicMaterial( {color: 0x003060} );
    fishUpperFin = new THREE.Mesh( fishUpperFinGeometry, fishUpperFinMaterial );
    fishUpperFin.receiveShadow = true; // non funziona l'omombra sul cono...
    fishUpperFin.castShadow = true;
    fishUpperFin.translateX(0.2);
    fishUpperFin.translateZ(-0.2); //nb x e z devono essere uguali per centrarli nel lato 
    fishUpperFin.rotateY(2.355);
    fishUpperFin.scale.multiplyScalar(scale);
    fishBody.add( fishUpperFin );

    //Side fin 
    const fishSideFinGeometry = new THREE.BoxGeometry( 0.1, 0.7, 0.3 );
    const fishSideFinMaterial = new THREE.MeshBasicMaterial( {color: 0x003060} );
    fishRightSideFin = new THREE.Mesh( fishSideFinGeometry, fishSideFinMaterial );
    fishRightSideFin.receiveShadow = true; // non funziona l'ombra sul cono...
    fishRightSideFin.castShadow = true;
    fishRightSideFin.translateX(0.3);
    fishRightSideFin.translateZ(0.3); //nb x e z devono essere uguali per centrarli nel lato 
    fishRightSideFin.rotateY(-2.355);
    fishRightSideFin.scale.multiplyScalar(scale);
    fishBody.add( fishRightSideFin );

    fishLeftSideFin = new THREE.Mesh( fishSideFinGeometry, fishSideFinMaterial );
    fishLeftSideFin.receiveShadow = true; // non funziona l'omombra sul cono...
    fishLeftSideFin.castShadow = true;
    fishLeftSideFin.translateX(-0.3);
    fishLeftSideFin.translateZ(-0.3);
    fishLeftSideFin.rotateY(-2.355);
    fishLeftSideFin.scale.multiplyScalar(scale);
    fishBody.add( fishLeftSideFin );
    
}

function createPlane(){
    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new THREE.PlaneGeometry( 30, 30);
    const planeMaterial = new THREE.ShadowMaterial();
    planeMaterial.opacity = 0.1;
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

    sheepBody.rotation.x += 0.01;
    sheepBody.rotation.y += 0.01;

    fishBody.rotation.x += 0.01;
    fishBody.rotation.y += 0.01;

    renderer.render(scene, camera);

}

function render(){
    renderer.render(scene, camera);
}

createFrog(1);
createSheep(2);
createFish(1);
createPlane();
createLights();
createButton();
animate();
render();

let onclick = function (event) {
    mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects[0].object.id);
    objectID = intersects.length > 0 ? intersects[0].object.id : "objectID";

    console.log(objectID);
    switch (objectID) {
        case frogID:
            scene.background = new THREE.Color(0xfafad2);
            resetButton(oldSelectedID);
            console.log(frogID);
            resetScale(oldSelectedID);
            frogBody.scale.multiplyScalar(2);
            button.translateX(0.2);
            frogArea.add(button);
            oldSelectedID = objectID;
            break;
        case sheepID:
            scene.background = new THREE.Color(0xc9f0cf);
            resetButton(oldSelectedID);
            console.log(sheepID);
            resetScale(oldSelectedID);
            oldSelectedID = objectID;
            sheepBody.scale.multiplyScalar(2);
            sheepArea.add(button);
            break;
        case fishID:
            scene.background = new THREE.Color(0xafdcfa);
            resetButton(oldSelectedID);
            console.log(fishID);
            resetScale(oldSelectedID);
            oldSelectedID = objectID;
            fishBody.scale.multiplyScalar(2);
            button.translateX(-0.2);
            fishArea.add(button);
            break;
        default:
            //do nothing
            break;
    }
};
window.addEventListener('click', onclick);


function resetButton(oldSelectedID){
    switch (oldSelectedID){
        case frogID:
            button.translateX(-0.2);
            break;
        case sheepID:
            break;
        case fishID:
            button.translateX(0.2);
            break;
        default:
            break;
    }
}


function resetScale(oldSelectedID){
    switch (oldSelectedID){
        case frogID:
            frogBody.scale.multiplyScalar(0.5);
            break;
        case sheepID:
            sheepBody.scale.multiplyScalar(0.5);
            break;
        case fishID:
            fishBody.scale.multiplyScalar(0.5);
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


let onMouseOver = function (event) {
    mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    objectID = intersects.length > 0 ? intersects[0].object.id : "objectID";
    //console.log(objectID);
    console.log(intersects[0]);

    switch (objectID) {
        case buttonID:
            //console.log(buttonID);
            if (buttonFlag) {
                button.scale.multiplyScalar(1.5);
                render();
            }
            buttonFlag=false;
            break;
        default:
            //do nothing
            if (!buttonFlag) {
                button.scale.multiplyScalar(0.66);
                render()
            }
            buttonFlag=true;
            break;
    }


    console.log(objectID);


};
window.addEventListener('mousemove', onMouseOver);


function createButton(){
    console.log()
    const buttonGeometry = new THREE.CircleGeometry(0.4,32,0, 6.283185307179586);
   // const buttonMaterial = new THREE.MeshStandardMaterial({color: 0x00060});
    const loader = new THREE.TextureLoader();
    const buttonMaterial =
        new THREE.MeshBasicMaterial({
            map:  loader.load('textures/goImage.png'),
            side: THREE.DoubleSide
        });
    button = new THREE.Mesh( buttonGeometry, new THREE.MeshBasicMaterial(buttonMaterial) );
    button.translateY(-2.5);
    button.translateZ(5.0);
} 