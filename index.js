import * as THREE from './libs/three/build/three.module.js'
//import { TWEEN2 }  from './libs/three/examples/jsm/libs/tween.module.min.js'
//import * as TWEEN  from './libs/tweenjs/lib/tweenjs.js'
//import TWEEN from './libs/three/tweenjs.min.js'

//import * as Tween from 'https://code.createjs.com/1.0.0/tweenjs.min.js'
// -------------- VARIABLES DECLARATION ---------------------
let flyBody, flyEyes, flyBiggerWings, flySmallerWings;
let scissorBody, scissorBlades, scissorHandles;
let group, group2;
let windowPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -10);
let frogArea, frogBody, frogBelly, frogHead, frogMouth, frogEyeR, frogEyeL, frogPupilR, frogPupilL, frogCheekR,
    frogCheekL, frogUpperRightLeg, frogUpperLeftLeg, frogLowerRightLeg, frogLowerLeftLeg, frogTongue, frogTongueTip;
let sheepArea, sheepBody, sheepFrontRightLeg, sheepFrontLeftLeg, sheepBackRightLeg, sheepBackLeftLeg, sheepEyeBalls,
    sheepHead, sheepEyes, sheepCheeks;
let goButton, goButtonGeometry, goButtonMaterial, goButtonLoader;
let homeButton, homeButtonGeometry, homeButtonMaterial, homeButtonLoader;
let resetAnimationButton, resetAnimationButtonGeometry, resetAnimationButtonMaterial, resetAnimationButtonLoader;
let plane;
let intersects;

// -------------- MATERIALS DECLARATION --------------------
const greyMaterial = new THREE.MeshLambertMaterial({color: 0xf3f2f7});
const darkMaterial = new THREE.MeshLambertMaterial({color: 0x5a6e6c});
const pinkMaterial = new THREE.MeshLambertMaterial({color: 0xffc9c8});
const bordeauxMaterial = new THREE.MeshLambertMaterial({color: 0x9c4c6e});
const redMaterial = new THREE.MeshLambertMaterial({color: 0xcf1111});

const newGreyMaterial = new THREE.MeshLambertMaterial({color: 0x857e77});

// -------------- IDS OBJECT DECLARATION -------------------
const pi = Math.PI;
let objectID;
let oldSelectedID = 11;
const frogID = 10;
const sheepID = 28;
const goButtonID = 145;
const homeButtonID = 146;
const resetAnimationButtonID = 160;

// -------------- FLAGS DECLARATION -------------------
let buttonFlag = true;
let homeButtonFlag = true;
let resetAnimationButtonFlag = true;
let flyFlag = false;
let scissorFlag = false;
let selected;
let currentScrren;

let targetAngleVertical;
let inclination;

// ----------- BACKGROUND COLORS DECLARATION ----------
const backGroundHome = new THREE.Color(0xbfe3dd);
//giallino: 0xfafad2
//azzurrino: 0xbfe3dd

// ----------- SCENE AND CAMERA DECLARATION ------------
const scene = new THREE.Scene();
scene.background = backGroundHome;
let camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 80; //settare a 10 per la visione full screen
//camera.position.y = 25;
//camera.lookAt(0, 0, 0);

// --------- RENDERER -----------------------------------
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// --------- RAYCASTER AND MOUSE------------------------------
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let timer; //timer per gestire la lingua che parte verso la mosca

createSceneHome();

// ------------- LIGHTS --------------------------------------
function createLights(){
    //----------- AMBIENT LIGHT ---------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    //------------ POINT LIGHT ----------------------------------------
    const light = new THREE.DirectionalLight( 0xffffff, 0.8);
    light.position.set( 200, 200, 200);
    light.castShadow = true;
    light.shadowDarkness = 0.2;
    light.shadow.radius = 8;
    light.shadow.mapSize.width = 2048; // default
    light.shadow.mapSize.height = 2048; // default
    scene.add( light );
}

// ------------- FROG ----------------------------------------

function createFrog(scale){
    createFrogArea();
    createFrogBody(scale);
    createFrogBelly();
    createFrogHead(scale);
    createFrogPivotAndMouth(scale);
    createFrogEyeR(scale);
    createFrogEyeL(scale);
    createFrogPupilR(scale);
    createFrogPupilL(scale);
    createFrogCheekR(scale);
    createFrogCheekL(scale);
    createFrogUpperRightLeg(scale);
    createFrogUpperLeftLeg(scale);
    createFrogLowerRightLeg(scale);
    createFrogLowerLeftLeg(scale);
    createFrogTongue(scale);
}

// ------------- FROG PARTS ----------------------------------

function createFrogArea(){
    //Clickable area
    const frogAreaGeometry = new THREE.BoxGeometry(3, 3, 3);
    const frogAreaMaterial = new THREE.MeshStandardMaterial( { color: 0x4bcb4b} );
    frogAreaMaterial.transparent = true;
    frogAreaMaterial.opacity = 0;
    frogArea = new THREE.Mesh( frogAreaGeometry, frogAreaMaterial);
    frogArea.translateX(-2);
    scene.add(frogArea);
}

function createFrogBody(scale){
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
    frogBody.translateX(-2);
    frogBody.translateY(-1);
    frogBody.scale.multiplyScalar(scale);
    scene.add( frogBody );
}

function createFrogBelly(){
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
}

function createFrogHead(scale) {
    //Head
    const frogHeadGeometry = new THREE.BoxGeometry(0.9, 0.66, 0.6);
    const frogHeadMaterial = new THREE.MeshStandardMaterial({color: 0x96f2af});
    frogHead = new THREE.Mesh(frogHeadGeometry, frogHeadMaterial);
    frogHead.receiveShadow = true;
    frogHead.castShadow = true;
    frogHead.translateY(0.8);
    frogHead.translateZ(0.3);
    frogHead.rotateX(-0.2);
    frogHead.scale.multiplyScalar(scale);
    frogBody.add(frogHead);
}

function createFrogPivotAndMouth(scale){
    //Pivot (mandibola)
    let frogMouthPivot = new THREE.Object3D();
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
    frogMouth.scale.multiplyScalar(scale);
    frogMouthPivot.add( frogMouth );
}

function createFrogEyeR(scale){
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
 }

function createFrogEyeL(scale){
    //Left Eye
    const frogEyeLGeometry = new THREE.BoxGeometry( 0.3, 0.3, 0.15 ).toNonIndexed();
    const frogEyeLMaterial = new THREE.MeshStandardMaterial( {vertexColors: true } );
    const positionAttributeEyeL = frogEyeLGeometry.getAttribute('position');
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
}

function createFrogPupilR(scale){
    //Right Pupil
    const frogPupilRGeometry = new THREE.BoxGeometry( 0.1, 0.2, 0.05 );
    const frogPupilRMaterial = new THREE.MeshStandardMaterial( { color: 0x000000} );
    frogPupilR = new THREE.Mesh( frogPupilRGeometry, frogPupilRMaterial );
    frogPupilR.receiveShadow = true;
    frogPupilR.castShadow = true;
    frogPupilR.translateZ(0.1);
    frogPupilR.scale.multiplyScalar(scale);
    frogEyeR.add( frogPupilR );
}

function createFrogPupilL(scale){
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

function createFrogCheekR(scale){
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
}

function createFrogCheekL(scale){
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
}

function createFrogUpperRightLeg(scale){
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
}

function createFrogUpperLeftLeg(scale){
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
}

function createFrogLowerRightLeg(scale){
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
}

function createFrogLowerLeftLeg(scale){
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


function createFrogTongue(scale){
    class CustomSinCurve extends THREE.Curve {
        constructor( scale = 1 ) {
            super();
            this.scale = scale;
        }
    
        getPoint( t, optionalTarget = new THREE.Vector3() ) {
            
            const tx = t * 1 - 1.5; // per l'animazione cambiare 1 aumentandolo fino a 3
            const ty = 0.5 * Math.sin(Math.PI * t );
            const tz = 0;
            return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
        }
    
    }
    const tonguePath = new CustomSinCurve( 10 );
    const tongueGeometry = new THREE.TubeGeometry( tonguePath, 500, 1.1, 8, false);
    //const tongueMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    frogTongue = new THREE.Mesh( tongueGeometry, redMaterial );
    //scene.add( frogTongue );
    frogTongue.scale.multiplyScalar(0.05*scale);
    frogTongue.material.side = THREE.DoubleSide;
    frogMouth.add(frogTongue);
    frogTongue.translateZ(-0.5); // mentre si anima va traslata in valori sempre più positivi fino a 1
    frogTongue.rotateY(1.57);
    frogTongue.scale.z = 0.25; //allarga la lingua lateralmente
    /*frogTongue.scale.x = 0.5;
    frogTongue.translateX(2);
    frogTongue.translateY(0.1);*/


    // punta della lingua
    const frogTongueTipGeometry = new THREE.SphereGeometry( 0.25, 32, 100 );
    frogTongueTip = new THREE.Mesh( frogTongueTipGeometry, redMaterial );
    frogTongueTip.receiveShadow = true;
    frogTongueTip.castShadow = false;
    
    frogTongueTip.scale.multiplyScalar(5*scale);
    frogTongueTip.scale.z = 4.4;
    frogTongueTip.scale.x = 1; // aumentzre fino a 16.4 quando la lingua viene animata all'esterno
    frogTongueTip.translateX(-15);
    frogTongue.add( frogTongueTip );
    
}

// ------------------------------------------------------------

// ------------- SHEEP ----------------------------------------

function createSheep(scale){
    createSheepArea();
    createSheepBody(scale);
    createSheepHead();
    createSheepEyes();
    createSheepEyeBalls();
    createSheepTail();
    createSheepHair();
    createSheepLegs(scale);
    createSheepWool();
    createSheepCheeks();
    sheepBody.scale.multiplyScalar(0.8);
}

// ------------- SHEEP PARTS ----------------------------------

function createSheepArea(){
    //Clickable area
    const sheepAreaGeometry = new THREE.BoxGeometry(3, 3, 3);
    const sheepAreaMaterial = new THREE.MeshStandardMaterial( { color: 0x4bcb4b} );
    sheepAreaMaterial.transparent = true;
    sheepAreaMaterial.opacity = 0;
    sheepArea = new THREE.Mesh( sheepAreaGeometry, sheepAreaMaterial );
    sheepArea.translateX(2);
    scene.add(sheepArea);
}

function createSheepBody(scale){
    //Sheep body
    const sheepBodyGeometry = new THREE.IcosahedronGeometry(0.5, 0);
    const textureLoader = new THREE.TextureLoader();
    const furNormalMap = textureLoader.load('./textures/normalMap.jpg');
    furNormalMap.wrapS = THREE.RepeatWrapping;
    furNormalMap.wrapT = THREE.RepeatWrapping;
    const sheepBodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xf3f2f7,
        normalMap: furNormalMap, 
        
    });
    sheepBody = new THREE.Mesh( sheepBodyGeometry, sheepBodyMaterial );
    sheepBody.receiveShadow = true;
    sheepBody.castShadow = true;
    sheepBody.scale.multiplyScalar(scale);
    sheepBody.scale.multiplyScalar(1.1);
    sheepBody.translateY(-0.4);
    sheepBody.translateX(2);
    scene.add( sheepBody );
}

function createSheepHead(){
    //Sheep head
    let sheepHeadGeometry = new THREE.IcosahedronGeometry(1, 0);
    sheepHead = new THREE.Mesh(sheepHeadGeometry, darkMaterial);
    sheepHead.castShadow = true;
    sheepHead.scale.z = 0.6;
    sheepHead.scale.y = 1.1;
    sheepHead.scale.multiplyScalar(0.30);
    sheepHead.position.y = 0.1;
    sheepHead.rotation.x = -0.2;
    sheepHead.position.z = 0.55;
    sheepBody.add(sheepHead);
}

function createSheepEyes(){
    //sheepEyes
    let geo_eye = new THREE.CylinderGeometry(0.3, 0.2, 0.3, 8);
    sheepEyes = [];
    for (let i = 0; i < 2; i++) {
        sheepEyes[i] = new THREE.Mesh(geo_eye, greyMaterial);
        sheepHead.add(sheepEyes[i]);
        sheepEyes[i].castShadow = true;
        sheepEyes[i].position.set(0, sheepHead.position.y + 0.1, 0.7);
        sheepEyes[i].rotation.x = pi / 2 - pi / 15;
    }
    sheepEyes[0].position.x = 0.3;
    sheepEyes[1].position.x = -sheepEyes[0].position.x;
    sheepEyes[0].rotation.z = -pi / 15;
    sheepEyes[1].rotation.z = -sheepEyes[0].rotation.z;
}

function createSheepCheeks(){
    //sheepCheeks
    let sheepCheekGeometry = new THREE.CylinderGeometry(0.13, 0.13, 0.3, 20);
    sheepCheeks = [];
    for (let i = 0; i < 2; i++) {
        sheepCheeks[i] = new THREE.Mesh(sheepCheekGeometry, pinkMaterial);
        sheepHead.add(sheepCheeks[i]);
        sheepCheeks[i].castShadow = true;
        sheepCheeks[i].position.set(0, sheepHead.position.y - 0.4, 0.5);
        //sheepCheeks[i].rotation.x = pi / 2 - pi / 15;
        sheepCheeks[i].rotation.x = 2;
        sheepCheeks[i].scale.z = 1.1;
    }
    sheepCheeks[0].position.x = 0.5;
    sheepCheeks[1].position.x = -sheepCheeks[0].position.x;
    sheepCheeks[0].rotation.z = -0.35;
    sheepCheeks[1].rotation.z = -sheepCheeks[0].rotation.z;
}

function createSheepEyeBalls(){
    //sheepEyeBalls
    let geo_eyeball = new THREE.SphereGeometry(0.11, 8, 8);
    sheepEyeBalls = [];
    for (let i = 0; i < 2; i++) {
        sheepEyeBalls[i] = new THREE.Mesh(geo_eyeball, darkMaterial);
        sheepEyes[i].add(sheepEyeBalls[i]);
        sheepEyeBalls[i].castShadow = true;
        sheepEyeBalls[i].position.set(0, 0.2, 0.12); //ATTENZIONE!!! Il terzo parametro le muove in verticale, il secondo in profondità
    }
}

function createSheepTail(){
    //Sheep tail
    let geo_tail = new THREE.IcosahedronGeometry(0.5, 0);
    let tail = new THREE.Mesh(geo_tail, newGreyMaterial);
    tail.position.set(0, 0.23, -0.5);
    tail.castShadow = true;
    tail.scale.multiplyScalar(0.35);
    sheepBody.add(tail);
}

function createSheepHair(){
    //Sheep hair
    let hair = [];
    let hairGeometry = new THREE.IcosahedronGeometry(0.4, 0);
    for (let i = 0; i < 5; i++) {
        hair[i] = new THREE.Mesh(hairGeometry, newGreyMaterial);
        hair[i].castShadow = true;
        sheepHead.add(hair[i]);
    }
    hair[0].position.set(-0.4, sheepHead.position.y + 0.7, 0.4);
    hair[1].position.set(0, sheepHead.position.y + 0.8, 0.4);
    hair[2].position.set(0.4, sheepHead.position.y + 0.7, 0.4);
    hair[3].position.set(-0.1, sheepHead.position.y + 0.7, 0.1);
    hair[4].position.set(0.12, sheepHead.position.y + 0.7, 0.1);

    /*hair[0].position.set(-0.4, sheepHead.position.y + 0.9, -0.1);
    hair[1].position.set(0, sheepHead.position.y + 1, -0.1);
    hair[2].position.set(0.4, sheepHead.position.y + 0.9, -0.1);
    hair[3].position.set(-0.1, sheepHead.position.y + 0.9, -0.4);
    hair[4].position.set(0.12, sheepHead.position.y + 0.9, -0.4);*/

    hair[0].scale.set(0.6, 0.6, 0.6);
    hair[2].scale.set(0.8, 0.8, 0.8);
    hair[3].scale.set(0.7, 0.7, 0.7);
    hair[4].scale.set(0.6, 0.6, 0.6);
}

function createSheepLegs(scale){
    //Sheep legs
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.15, 1, 4);
    legGeometry.translate(0, -0.5, 0);
    sheepFrontRightLeg = new THREE.Mesh(legGeometry, darkMaterial);
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
}

function createSheepWool(){
    //Sheep hair
    let wool = [];
    let radius = 0.2;
    let angle = 0;
    let z = 0.4;
    let woolGeometry = new THREE.IcosahedronGeometry(0.4, 0);
    const textureLoader2 = new THREE.TextureLoader();
    const furNormalMap2 = textureLoader2.load('./textures/normalMap.jpg');
    furNormalMap2.wrapS = THREE.RepeatWrapping;
    furNormalMap2.wrapT = THREE.RepeatWrapping;
    const sheepWoolMaterial = new THREE.MeshStandardMaterial({
        color: 0xf3f2f7,
        //map: furMap,
        normalMap: furNormalMap2, 
        
    });

    // First circle of wool from the head
    for (let i = 0; i < 8; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
        if (i === 2 || i === 5 || i === 0 || i ===4)
            wool[i].scale.set(0.2, 0.2, 0.2);
        else if (i === 7 || i === 1 || i === 3)
            wool[i].scale.set(0.25, 0.25, 0.25);
        else
            wool[i].scale.set(0.3, 0.3, 0.3);
        wool[i].castShadow = true;
        sheepBody.add(wool[i]);
        wool[i].position.set(radius * Math.cos(angle) , radius * Math.sin(angle) + 0.1, z);
        angle += 0.78;
    }
    angle = 0.72;
    radius = 0.28;
    z = 0.3;

    // Second circle of wool from the head
    for (let i = 0; i < 12; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
        if (i === 2 || i === 5 || i === 0 || i ===4 )
            wool[i].scale.set(0.2, 0.2, 0.2);
        else if (i === 1 || i === 3 || i === 7 || i === 9)
            wool[i].scale.set(0.25, 0.25, 0.25);
        else
            wool[i].scale.set(0.3, 0.3, 0.3);
        wool[i].castShadow = true;
        sheepBody.add(wool[i]);
        wool[i].position.set(radius * Math.cos(angle) , radius * Math.sin(angle) + 0.05, z);
        angle += 0.50;
        if(i === 8)
            wool[i].translateZ(0.04);
    }

    angle = 0.10;
    radius = 0.38;
    z = 0.2;

    // Second circle of wool from the head
    for (let i = 0; i < 13; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
        if (i === 9 || i === 5 || i === 7 || i === 12 || i === 4 || i === 3)
            wool[i].scale.set(0.2, 0.2, 0.2);
        else if (i === 1 || i === 0)
            wool[i].scale.set(0.25, 0.25, 0.25);
        else
            wool[i].scale.set(0.3, 0.3, 0.3);
        wool[i].castShadow = true;
        sheepBody.add(wool[i]);
        wool[i].position.set(radius * Math.cos(angle) , radius * Math.sin(angle), z);
        angle += 0.50;
        if(i === 8)
            wool[i].translateZ(0.04);
    }
    angle = 0.90;
    radius = 0.42;
    z = 0.05;

    // Third circle of wool from the head
    for (let i = 0; i < 16; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
        if (i === 9  || i === 7 || i === 12 || i === 3 || i === 5)
            wool[i].scale.set(0.2, 0.2, 0.2);
        else if (i === 1 || i === 0)
            wool[i].scale.set(0.25, 0.25, 0.25);
        else
            wool[i].scale.set(0.3, 0.3, 0.3);
        wool[i].castShadow = true;
        sheepBody.add(wool[i]);
        wool[i].position.set(radius * Math.cos(angle) , radius * Math.sin(angle), z);
        angle += 0.40;
        if(i === 8)
            wool[i].translateZ(0.04);
    }

    angle = 0.30;
    radius = 0.38;
    z = -0.1;

    // Fourth circle of wool from the head
    for (let i = 0; i < 16; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
        if (i === 9  || i === 7 || i === 12 || i === 3 || i === 5)
            wool[i].scale.set(0.2, 0.2, 0.2);
        else if (i === 1 || i === 0)
            wool[i].scale.set(0.25, 0.25, 0.25);
        else
            wool[i].scale.set(0.3, 0.3, 0.3);
        wool[i].castShadow = true;
        sheepBody.add(wool[i]);
        wool[i].position.set(radius * Math.cos(angle) , radius * Math.sin(angle), z);
        angle += 0.40;
        if(i === 8)
            wool[i].translateZ(0.04);
    }

    angle = 0.6;
    radius = 0.3;
    z = -0.24;

    // Fifth circle of wool from the head
    for (let i = 0; i < 15; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, greyMaterial);
        //if (i === 9  || i === 7 || i === 12 || i === 3 || i === 5)
         //   wool[i].scale.set(0.2, 0.2, 0.2);
         if (i === 1 || i === 0)
            wool[i].scale.set(0.25, 0.25, 0.25);
        else
            wool[i].scale.set(0.3, 0.3, 0.3);
        wool[i].castShadow = true;
        sheepBody.add(wool[i]);
        wool[i].position.set(radius * Math.cos(angle) , radius * Math.sin(angle), z);
        angle += 0.41;
        if(i === 8)
            wool[i].translateZ(0.04);
        if(i === 14) {
            wool[i].translateY(0.04);
            wool[i].translateZ(-0.01);
            wool[i].translateX(0.03);
        }
    }

    angle = 0.1;
    radius = 0.17;
    z = -0.35;

    // Sixth circle of wool from the head
    for (let i = 0; i < 9; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, greyMaterial);
       // if (i === 9  || i === 12 || i === 3 || i === 5 )
        //    wool[i].scale.set(0.2, 0.2, 0.2);
        if (i === 1 || i === 0 || i === 7)
            wool[i].scale.set(0.25, 0.25, 0.25);
        else
            wool[i].scale.set(0.3, 0.3, 0.3);
        wool[i].castShadow = true;
        sheepBody.add(wool[i]);
        wool[i].position.set(radius * Math.cos(angle) , radius * Math.sin(angle), z);
        angle += 0.68;
        if(i === 7){
            wool[i].translateZ(-0.01);
            wool[i].translateY(-0.05);
        }
    }

    // Extra wool
    radius = 0.36;
    angle = 0;
    z = -0.21;
    wool[0] = new THREE.Mesh(woolGeometry, greyMaterial);
    wool[0].scale.set(0.25, 0.25, 0.25);
    wool[0].position.set(radius * Math.cos(angle), radius * Math.sin(angle), z);
    sheepBody.add(wool[0]);
    angle = 2.12;
    radius = 0.4;
    z = -0.02;
    wool[1] = new THREE.Mesh(woolGeometry, greyMaterial);
    wool[1].scale.set(0.3, 0.3, 0.3);
    wool[1].position.set(radius * Math.cos(angle), radius * Math.sin(angle), z);
    sheepBody.add(wool[1]);
    angle = 3.15;
    radius = 0.35;
    z = -0.21;
    wool[2] = new THREE.Mesh(woolGeometry, greyMaterial);
    wool[2].scale.set(0.3, 0.3, 0.3);
    wool[2].position.set(radius * Math.cos(angle), radius * Math.sin(angle), z);
    sheepBody.add(wool[2]);
    z = -0.38;
    wool[3] = new THREE.Mesh(woolGeometry, greyMaterial);
    wool[3].scale.set(0.35, 0.35, 0.35);
    wool[3].position.set(0, 0, z);
    sheepBody.add(wool[3]);


}
// ----------------------------------------------------------

// ------------- PLANE --------------------------------------
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

// ------------- FLY ----------------------------------------
function createFly(){
    createFlyBody();
    createFlyEyes();
    createBiggerWings();
    createSmallerWings();
    flyFlag = true;
    group.scale.multiplyScalar(2.5);
}

// ------------- FLY PARTS ----------------------------------
function createFlyBody(){
    let flyGeometry = new THREE.SphereGeometry( 0.1, 40, 40 );
    let flyMaterial = new THREE.MeshStandardMaterial( { color: 0x555555 } );
    flyBody = new THREE.Mesh( flyGeometry, flyMaterial );
    flyBody.castShadow = true;
    flyBody.scale.z = 1.2;
}

function createFlyEyes(){
    //flyEyes
    let flyEyeGeometry = new THREE.SphereGeometry( 0.05, 40, 40 );
    flyEyes = [];
    for (let i = 0; i < 2; i++) {
        flyEyes[i] = new THREE.Mesh(flyEyeGeometry, bordeauxMaterial);
        group.add(flyEyes[i]);
        flyEyes[i].castShadow = true;
    }
    flyEyes[0].translateX(0.04);
    flyEyes[0].translateZ(0.085);
    flyEyes[0].translateY(0.03);
    flyEyes[1].translateX(-0.04);
    flyEyes[1].translateZ(0.085);
    flyEyes[1].translateY(0.03);
}

function createBiggerWings(){
    //flyBiggerWings
    let flyBiggerWingsGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.02, 20);
    flyBiggerWings = [];
    for (let i = 0; i < 2; i++) {
        flyBiggerWings[i] = new THREE.Mesh(flyBiggerWingsGeometry, greyMaterial);
        group.add(flyBiggerWings[i]);
        flyBiggerWings[i].castShadow = true;
    }
    flyBiggerWings[0].translateX(0.07);
    flyBiggerWings[0].translateY(0.07);
    flyBiggerWings[0].scale.z = 0.7;
    flyBiggerWings[0].rotateZ(1.0);
    flyBiggerWings[0].translateZ(-0.045);
    flyBiggerWings[0].rotateY(0.4);

    flyBiggerWings[1].translateX(-0.07);
    flyBiggerWings[1].translateY(0.07);
    flyBiggerWings[1].scale.z = 0.7;
    flyBiggerWings[1].rotateZ(-1.0);
    flyBiggerWings[1].translateZ(-0.045);
    flyBiggerWings[1].rotateY(-0.4);
}

function createSmallerWings(){
    //flySmallerWings
    let flySmallerWingsGeometry = new THREE.CylinderGeometry(0.075, 0.075, 0.01, 20);
    flySmallerWings = [];
    for (let i = 0; i < 2; i++) {
        flySmallerWings[i] = new THREE.Mesh(flySmallerWingsGeometry, greyMaterial);
        group.add(flySmallerWings[i]);
        flySmallerWings[i].castShadow = true;
    }
    flySmallerWings[0].translateX(0.07);
    flySmallerWings[0].translateY(0.04);
    flySmallerWings[0].scale.z = 0.7;
    flySmallerWings[0].rotateZ(0.5);
    flySmallerWings[0].translateZ(-0.045);
    flySmallerWings[0].rotateY(0.4);

    flySmallerWings[1].translateX(-0.07);
    flySmallerWings[1].translateY(0.04);
    flySmallerWings[1].scale.z = 0.7;
    flySmallerWings[1].rotateZ(-0.5);
    flySmallerWings[1].translateZ(-0.045);
    flySmallerWings[1].rotateY(-0.4);
}


// ------------- SCISSOR ----------------------------------------
function createScissor(){
    createScissorBlades();
    createScissorHandle();

    scissorFlag = true;
    group2.scale.multiplyScalar(1.0);
}

// ------------- SCISSOR PARTS ----------------------------------

function createScissorBlades(){
    let scissorBladeGeometry = new THREE.BoxGeometry( 0.1, 1.9, 0.08, 100 );
    scissorBlades = [];
    for (let i = 0; i < 2; i++) {
        scissorBlades[i] = new THREE.Mesh(scissorBladeGeometry, newGreyMaterial);
        group2.add(scissorBlades[i]);
        scissorBlades[i].castShadow = true;
    }
    //first blade
    
    scissorBlades[0].translateX(0.1);
    scissorBlades[0].translateY(0.2);
    scissorBlades[0].translateZ(-0.08);

    //scissorBlades[0].scale.z = 0.7;
    scissorBlades[0].rotateZ(-0.48);
    //scissorBlades[0].rotateX(0.9);
   // scissorBlades[0].rotateY(0.4);
    
    //second blade
    scissorBlades[1].translateX(-0.1);
    scissorBlades[1].translateY(0.2);
    scissorBlades[1].translateZ(-0.08);
    //scissorBlades[1].scale.z = 0.7;
    scissorBlades[1].rotateZ(0.48);
    //scissorBlades[1].translateZ(-0.08);
   // scissorBlades[1].rotateY(-0.4);
}

function createScissorHandle(){
    let scissorHandleGeometry = new THREE.TorusGeometry( 0.37, 0.1, 32, 100 );
    scissorHandles = [];
    for (let i = 0; i < 2; i++) {
        scissorHandles[i] = new THREE.Mesh(scissorHandleGeometry, redMaterial);
        group2.add(scissorHandles[i]);
        scissorHandles[i].castShadow = true;
    }
    //first handle
    
    scissorHandles[0].translateX(0.49);
    scissorHandles[0].translateY(-0.38);
    scissorHandles[0].rotateZ(0.5);
    scissorHandles[0].scale.z = 0.7;
    scissorHandles[0].scale.x = -0.7;
    scissorHandles[0].scale.y = 1.2;
    //scissorHandles[0].translateZ(0.4);
   // scissorHandles[0].translateY(-0.065);

    scissorHandles[0].translateZ(-0.08);
    //scissorHandles[0].rotateY(0.4);
    
    //second handle
    scissorHandles[1].translateX(-0.49);
    scissorHandles[1].translateY(-0.38);
    scissorHandles[1].rotateZ(-0.5);
    scissorHandles[1].scale.z = 0.7;
    scissorHandles[1].scale.x = -0.7;
    scissorHandles[1].scale.y = 1.2;
    //scissorHandles[1].rotateZ(-0.5);
    scissorHandles[1].translateZ(-0.08);
    //scissorHandles[1].rotateY(-0.4);
    
    group2.rotateZ(1.57); //added to incline the scissor of 90 degrees

}

function animate() {
    requestAnimationFrame( animate );
    //TWEEN.update();
  // frogBody.rotation.x += 0.01;
  // frogBody.rotation.y += 0.01;

   // frogBody.rotation.y = 1.57;

   // sheepBody.rotation.x += 0.01;
   // sheepBody.rotation.y += 0.01;
   //sheepBody.rotation.y = 0.4;
   //sheepBody.rotation.x = -0.2;

    group.rotation.x += 0.01;
    group.rotation.y += 0.01;
    group.rotation.z += 0.01;

  //  group2.rotation.x += 0.01;
  //animate with create js?
    group2.rotation.y -= 0.01; //find the way to reach a certain angle 
 
  //  group2.rotation.z += 0.01;
    renderer.render(scene, camera);
}

function render(){
    renderer.render(scene, camera);
}

let onclick = function (event) {
    mouseSetting(event);
    console.log(objectID);
    switch (objectID) {
        case frogID:
            scene.background = new THREE.Color(0xfafad2);
            resetButton(oldSelectedID);
            console.log(frogID);
            resetScale(oldSelectedID);
            frogBody.scale.multiplyScalar(2);
            goButton.translateX(0.15);
            setButtonTexture('textures/goFrog.jpg');
            frogArea.add(goButton);
            oldSelectedID = objectID;
            selected = "FROG";
            break;
        case sheepID:
            scene.background = new THREE.Color(0xc9f0cf);
            resetButton(oldSelectedID);
            console.log(sheepID);
            resetScale(oldSelectedID);
            sheepBody.scale.multiplyScalar(2);
            goButton.translateX(-0.15);
            setButtonTexture('textures/goSheep.jpg');
            sheepArea.add(goButton);
            oldSelectedID = objectID;
            selected = "SHEEP";
            break;
        default:
            break;
    }
};

window.addEventListener('click', onclick);

function resetButton(oldSelectedID){
    switch (oldSelectedID){
        case frogID:
            goButton.translateX(-0.15);
            break;
        case sheepID:
            goButton.translateX(0.15);
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
        default:
            break;
    }
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize);

function mouseSetting(event){
    mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children);
    objectID = intersects.length > 0 ? intersects[0].object.id : "objectID";
}

let onMouseOverButton = function (event) {
    mouseSetting(event);
    if (intersects.length > 1) {
        for (let i = 0; i < intersects.length; i += 1) {
            if (intersects[i].object.id === homeButtonID)
                objectID = intersects[i].object.id;
            else if (intersects[i].object.id === resetAnimationButtonID)
                objectID = intersects[i].object.id;
        }
    }
    switch (objectID) {
        case goButtonID:
            if (buttonFlag)
                goButton.scale.multiplyScalar(1.6);
            buttonFlag = false;
            break;
        case homeButtonID:
            scene.remove(group);
            scene.remove(group2);
            if (homeButtonFlag)
                homeButton.scale.multiplyScalar(1.6);
            homeButtonFlag = false;
            // il seguente controllo serve a gestire il caso in cui
            // con il mouse si passa velocemente da un bottone all'altro
            // senza questo controllo succederebbe che rimarrebbero ingranditi entrambi i bottoni
            if (!resetAnimationButtonFlag){
                resetAnimationButton.scale.multiplyScalar(0.625);
                resetAnimationButtonFlag = true;
            }
            break;
        case resetAnimationButtonID:
            scene.remove(group);
            scene.remove(group2);
            if (resetAnimationButtonFlag) 
                resetAnimationButton.scale.multiplyScalar(1.6);
            resetAnimationButtonFlag = false;
            // per questo controllo vale quanto detto nel commento del caso sopra
            if (!homeButtonFlag){
                homeButton.scale.multiplyScalar(0.625);
                homeButtonFlag = true;
            }
            break;
        default:
            if (!buttonFlag) {
                goButton.scale.multiplyScalar(0.625);
                buttonFlag = true;
            }
            if (!homeButtonFlag && selected === "FROG") {
                homeButton.scale.multiplyScalar(0.625);
                scene.add(group);
                homeButtonFlag = true;
            }
            if(!homeButtonFlag && selected === "SHEEP"){
                homeButton.scale.multiplyScalar(0.625);
                scene.add(group2);
                homeButtonFlag = true;
            }
            if (!resetAnimationButtonFlag && selected === "FROG") {
                resetAnimationButton.scale.multiplyScalar(0.625);
                scene.add(group);
                resetAnimationButtonFlag = true;
            }
            if(!resetAnimationButtonFlag && selected === "SHEEP"){
                resetAnimationButton.scale.multiplyScalar(0.625);
                scene.add(group2);
                resetAnimationButtonFlag = true;
            }
            break;
    }
    console.log(objectID);
};
window.addEventListener('mousemove', onMouseOverButton);

let onClickButton = function (event) {
    mouseSetting(event);
    if (objectID === goButtonID) {
        switch (selected) {
            case "FROG":
                createSceneFrog();
                break;
            case "SHEEP":
                createSceneSheep();
                break;
            default:
                break;
        }
    } else if (objectID === homeButtonID) {
        switch (selected) {
            case "FROG":
                homeButton.scale.multiplyScalar(0.625);
                scene.remove(homeButton);
                scene.remove(resetAnimationButton);
                frogArea.remove(goButton);
                resetButton(frogID);
                homeButtonFlag = true;
                frogBody.scale.multiplyScalar(0.5);
                scene.remove(frogBody);
                scene.remove(flyBody);
                frogBody.translateX(-2);
                resetSceneHome();
                break;
            case "SHEEP":
                homeButton.scale.multiplyScalar(0.625);
                scene.remove(homeButton);
                scene.remove(resetAnimationButton);
                sheepArea.remove(goButton);
                resetButton(sheepID);
                homeButtonFlag = true;
                sheepBody.scale.multiplyScalar(0.5);
                scene.remove(sheepBody);
                scene.remove(scissorBody);
                sheepBody.translateX(2);
                resetSceneHome();
                break;
            default:
                break;
        }
    } else if (objectID === resetAnimationButtonID){
        switch (selected) {
            case "FROG":
                break;
            case "SHEEP":
                break;
            default:
                break;
        }
    }
}
window.addEventListener( 'click', onClickButton, false);

function setButtonTexture(texturePath){
    goButtonLoader = new THREE.TextureLoader();
    goButton.material = new THREE.MeshBasicMaterial({
        map:  goButtonLoader.load(texturePath),
        side: THREE.DoubleSide
    });
    goButton.material.needsUpdate = true;
}

function createButton(){
    goButtonGeometry = new THREE.CircleGeometry(0.4,32,0, 6.283185307179586);
    goButtonMaterial = new THREE.MeshBasicMaterial({color: 0x003060});
    goButton = new THREE.Mesh( goButtonGeometry, goButtonMaterial );
    goButton.translateY(-2.5);
    goButton.translateZ(5.0);
}

function followMouse(event){
    let intersects = new THREE.Vector3();
    let mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(windowPlane, intersects);
    if (flyFlag)
        group.position.set(intersects.x, intersects.y, intersects.z);
    else {
        flyFlag = false;
    }
    //NB: gli if else devono essere staccati altrimenti non segue il mouse la forbice
    if (scissorFlag){
        group2.position.set(intersects.x, intersects.y, intersects.z);
    }
    else{ 
        scissorFlag = false;
        
    }


}
window.addEventListener( 'mousemove', followMouse, false);

function setHomeButtonTexture(texturePath){
    homeButtonLoader = new THREE.TextureLoader();
    homeButton.material = new THREE.MeshBasicMaterial({
        map:  homeButtonLoader.load(texturePath),
        side: THREE.DoubleSide
    });
    goButton.material.needsUpdate = true;
}

function setResetAnimationButtonTexture(texturePath){
    resetAnimationButtonLoader = new THREE.TextureLoader();
    resetAnimationButton.material = new THREE.MeshBasicMaterial({
        map:  resetAnimationButtonLoader.load(texturePath),
        side: THREE.DoubleSide
    });
    resetAnimationButton.material.needsUpdate = true;
}

function createHomeButton(){
    homeButtonGeometry = new THREE.CircleGeometry(0.4,32,0, 6.283185307179586);
    homeButtonMaterial = new THREE.MeshBasicMaterial({color: 0x003060});
    homeButton = new THREE.Mesh( homeButtonGeometry, homeButtonMaterial );
    homeButton.translateX(0.6);
    homeButton.translateY(-5.0);
    homeButton.translateZ(8.0);
}

function createResetAnimationButton(){
    resetAnimationButtonGeometry = new THREE.CircleGeometry(0.4,32,0, 6.283185307179586);
    resetAnimationButtonMaterial = new THREE.MeshBasicMaterial({color: 0x003060});
    resetAnimationButton = new THREE.Mesh( resetAnimationButtonGeometry, resetAnimationButtonMaterial );
    resetAnimationButton.translateX(-0.6);
    resetAnimationButton.translateY(-5.0);
    resetAnimationButton.translateZ(8.0);
}

function createSceneFrog(){
    currentScrren = "FROG";
    scene.remove(sheepArea);
    scene.remove(sheepBody);
    scene.remove(frogArea);
    scene.add(flyBody);
    group.add(flyBody);
    scene.add(group);
    frogBody.translateX(2);
    setHomeButtonTexture('textures/homeFrog.jpg');
    scene.add(homeButton);
    setResetAnimationButtonTexture('textures/resetFrog.jpg');
    scene.add(resetAnimationButton);
    animateSceneFrog();
}

function createSceneSheep(){
    currentScrren = "SHEEP";
    scene.remove(frogArea);
    scene.remove(frogBody);
    scene.remove(sheepArea);
    scene.add(group2);
    sheepBody.translateX(-2);
    setHomeButtonTexture('textures/homeSheep.jpg');
    scene.add(homeButton);
    setResetAnimationButtonTexture('textures/resetSheep.jpg');
    scene.add(resetAnimationButton);
}

function resetSceneHome(){
    selected = "HOME";
    currentScrren = "HOME";
    scene.remove(group);
    scene.remove(group2);
    scene.background = backGroundHome;
    scene.add(frogBody);
    scene.add(frogArea);
    scene.add(sheepBody);
    scene.add(sheepArea);
    oldSelectedID = 0;
    
}

function createSceneHome(){
    currentScrren = "HOME";
    createFrog(1);
    createSheep(2);
    createPlane();
    createLights();
    createButton();
    createHomeButton();
    group = new THREE.Group();
    createFly();
    group2 = new THREE.Group();
    createScissor();
    createResetAnimationButton();
    animate();
    render();
}


function animateSceneFrog(){ //attenzione: l'animazione della rana continua anche quando si ritorna nella schermata home
    requestAnimationFrame( animateSceneFrog );
    animateFrogEyeBalls();
    animateFrogHead();
}

function animateFrogEyeBalls(){
    if (selected == "FROG"){
        var targetPos = new THREE.Vector3();
        flyBody.getWorldPosition(targetPos);
    
        //questa formula non funziona, dobbiamo trovare il modo di farla dipendere sia dalla larghezza che dall'altezza dello schermo
        var targetPosScaled = {x: ((8*targetPos.x)/(Math.min(window.innerWidth, window.innerHeight)/2)), y:((4*targetPos.y)/(window.innerHeight/2))+2};
    
        createjs.Tween.get(frogPupilL.position)
                .to({x: targetPosScaled.x, y: targetPosScaled.y-2}, 80, createjs.Ease.linear);
                
        createjs.Tween.get(frogPupilR.position)
                .to({x: targetPosScaled.x, y: targetPosScaled.y-2}, 80, createjs.Ease.linear);    
    }
}

function animateFrogHead(){
    if (selected == "FROG"){
        //MOVIMENTO ORIZZONTALE DELLA TESTA
        //variable for the mouse
        var targetPos = new THREE.Vector3();
        flyBody.getWorldPosition(targetPos);

        var headDistance = targetPos.z - frogHead.position.z;
        //console.log("distanza raggio headDistance: " + headDistance);
        var targetDivision = targetPos.x/headDistance;

        //check if I have a value that is acceptable by Math.asin
        if(targetDivision >= 1){
            targetDivision = 1;
        }
        if(targetDivision <= -1){
            targetDivision = -1;
        }

        //angle
        var targetAngle = Math.asin(targetDivision);

        //setting the limit value to the right and left
        var maxTargetAngle = 0.7;

        //check if the angle surpass a certain limit
        if(targetAngle>= maxTargetAngle){
            targetAngle = maxTargetAngle;
        }
        if(targetAngle <= -maxTargetAngle){
            targetAngle = -maxTargetAngle;
        } 

        createjs.Tween.get(frogHead.rotation)
        .to({y: targetAngle }, 80, createjs.Ease.linear);

        //ATTENZIONE: modificare il valore massimo degli occhi perchè 
        //con il limite dell'angolo escono fuori dalla figura



        //MOVIMENTO VERTICALE DELLA TESTA
        //console.log("distanza raggio headDistance: " + headDistance);
        var targetDivisionVertical = targetPos.y/headDistance;

        //check if I have a value that is acceptable by Math.asin
        if(targetDivisionVertical >= 1){
            targetDivisionVertical = 1;
        }
        if(targetDivisionVertical <= -1){
            targetDivisionVertical = -1;
        }

        //angle
        targetAngleVertical = Math.asin(targetDivisionVertical);

        //setting the limit value to the right and left
        var maxTargetAngleVertical = 0.7;

        //check if the angle surpass a certain limit
        if(targetAngleVertical>= maxTargetAngleVertical){
            targetAngleVertical = maxTargetAngleVertical;
        }
        if(targetAngleVertical <= 0){
            targetAngleVertical = 0;
        } 

        //console.log("ANGOLO TARGET " + targetAngleVertical);

        createjs.Tween.get(frogHead.rotation)
            .to({x: -targetAngleVertical }, 80, createjs.Ease.linear);

    }

}

function stretchFrogTongue(){

    createjs.Tween.get(frogHead.rotation)
        .to({x: 1.57 }, 800, createjs.Ease.linear);

    //animazione per allungare la lingua verso la mosca
    createjs.Tween.get(frogTongue.scale)
        .to({x: 0.5 }, 800, createjs.Ease.linear);

    createjs.Tween.get(frogTongue.position)
        .to({y: 0.1, z: -2.2}, 800, createjs.Ease.linear);
    
    createjs.Tween.get(frogTongueTip.position)
        .to({y: -0.1}, 800, createjs.Ease.linear);

    createjs.Tween.get(frogTongueTip.scale)
        .to({x: 4.5, y: 5, z:4.3}, 800, createjs.Ease.linear);

    //la testa va un po' indietro per ismulare apertura bocca
    //console.log("angolo attuale "+targetAngleVertical);
    //createjs.Tween.get(frogMouth.rotation)
        //.to({x: -targetAngleVertical}, 800, createjs.Ease.linear);


}

function foldFrogTongue(){
    //animazione per allungare la lingua verso la mosca
    createjs.Tween.get(frogTongue.scale)
        .to({x: 0.05 }, 800, createjs.Ease.linear); // il valore 0.05 lo mettiamo perchè è il valore di quando abbiamo creato la tongue

    createjs.Tween.get(frogTongue.position)
        .to({y: 0, z: -0.5}, 800, createjs.Ease.linear);    

    createjs.Tween.get(frogTongueTip.position)
        .to({y: 0}, 800, createjs.Ease.linear);

    createjs.Tween.get(frogTongueTip.scale)
        .to({x: 1, y: 5, z:4.4}, 800, createjs.Ease.linear);

}


let onMousePause = function (event) {
    clearTimeout(timer);

    timer = setTimeout(function() {
        if (currentScrren == "FROG")
            stretchFrogTongue();
    }, 3000);
}

window.addEventListener('mousemove', onMousePause);