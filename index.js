import * as THREE from './libs/three/build/three.module.js'
import { ObjectControls } from './libs/ObjectControls.js';
//import {Vec3} from "./libs/three/examples/jsm/libs/OimoPhysics";

// -------------- VARIABLES DECLARATION ---------------------
let flyBody, flyEyes, flyBiggerWings, flySmallerWings;
let scissorBody, scissorBlades, scissorHandles;
let flyGroup, group2, groupPivotLegR, groupPivotLegL;
let titleHomeArea;
let windowPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -3);
let frogAnimation,  frogArea, frogBody, frogBelly, frogHead, frogMouth, frogEyeR, frogEyeL, frogPupilR, frogPupilL, frogCheekR,
    frogMouthPivot, frogCheekL, frogUpperRightLeg, frogUpperLeftLeg, frogLowerRightLeg, frogLowerLeftLeg, frogTongue, frogTongueTip, titleFrogArea, descriptionFrogArea, subTitleFrogArea,
    frogAreaChill, frogAreaWarning, frogAreaDeath;
let sheepArea, sheepBody, sheepFrontRightLeg, sheepFrontLeftLeg, sheepBackRightLeg, sheepBackLeftLeg, sheepEyeBalls,
    sheepHead, sheepEyes, sheepCheeks, titleSheepArea, descriptionSheepArea, subTitleSheepArea,gameOverSheep, wool=[], playSheepArea, positionWoolX=[], positionWoolY=[], positionWoolZ=[],
    scaleWoolX=[], scaleWoolY=[], scaleWoolZ=[], woolFalling, woolSmall, woolFallingFlag, woolSmallFlag, happySheep;
let goButton, goButtonGeometry, goButtonMaterial, goButtonLoader;
let homeButton, homeButtonGeometry, homeButtonMaterial, homeButtonLoader;
let resetAnimationButton, resetAnimationButtonGeometry, resetAnimationButtonMaterial, resetAnimationButtonLoader;
let plane;
let intersects;
let frogRequestAnimationFrame;
var targetAngle;
let soundFly;
let timerFlyCatch;
let soundFlyCatch;
let frogJumpSound;
let sheepScissorSound;
let soundSheepFinal;
let gameOverFlag = false;
let chillAreaMaterials, warningAreaMaterials, deathAreaMaterials;
woolFallingFlag=false;
woolSmallFlag=false;
let flagHomeSound = false;

let frogVisited = false;
let createSounds;
let timerSheepFinal;
let sheepOneTime = 0;
let frogOneTime = 0;
let buttonSound;


// -------------- ANIMATIONS VARIABLES --------------------
let bodyFrogAnimation, frogLowerRightLegAnimation, frogLowerLeftLegAnimation, groupPivotLegRAnimation,
    groupPivotLegLAnimation, frogPupilRAnimation, frogPupilLAnimation, frogMouthAnimation, frogBellyAnimation;

let frogHeadVerticalAnimation, frogHeadHorizontalAnimation


// -------------- BACKUP VARIABLES --------------------
let frogBodyPositionBackup, frogBodyRotationBackup, 
    frogHeadPositionBackup, frogHeadRotationBackup,
    frogPupilPositionBackupR, frogPupilRotationBackupR,
    frogPupilPositionBackupL, frogPupilRotationBackupL,
    frogMouthPivotPositionBackup, frogMouthPivotRotationBackup, 
    frogLegPivotPositionBackupR, frogLegPivotRotationBackupR, 
    frogLegPivotPositionBackupL, frogLegPivotRotationBackupL,
    frogLowerLegPositionBackupR, frogLowerLegRotationBackupR, 
    frogLowerLegPositionBackupL, frogLowerLegRotationBackupL, 
    frogTonguePositionBackup, frogTongueRotationBackup, 
    frogTongueTipPositionBackup, frogTongueTipRotationBackup,
    frogPupilHeightBackup;

let initialFlyBiggerWingsPos, initialFlySmallerWingsPos;

let sheepBodyPositionBackup, sheepBodyRotationBackup, 
    sheepHeadPositionBackup, sheepHeadRotationBackup,
    sheepFrontLeftPositionLegBackup, sheepFrontRightPositionLegBackup, 
    sheepBackLeftPositionLegBackup, sheepBackRightPositionLegBackup, 
    sheepFrontLeftRotationLegBackup, sheepFrontRightRotationLegBackup, 
    sheepBackLeftRotationLegBackup, sheepBackRightRotationLegBackup, 
    sheepWoolPositionBackup, sheepWoolRotationBackup; 

// -------------- MATERIALS DECLARATION --------------------
const greyMaterial = new THREE.MeshLambertMaterial({color: 0xf3f2f7});
const whiteMaterial = new THREE.MeshLambertMaterial({color: 0xf3f2f7});
const darkMaterial = new THREE.MeshLambertMaterial({color: 0x5a6e6c});
const pinkMaterial = new THREE.MeshLambertMaterial({color: 0xffc9c8});
const bordeauxMaterial = new THREE.MeshLambertMaterial({color: 0x9c4c6e});
const redMaterial = new THREE.MeshLambertMaterial({color: 0xcf1111});

const newGreyMaterial = new THREE.MeshLambertMaterial({color: 0x857e77});

// -------------- IDS OBJECT DECLARATION -------------------
const pi = Math.PI;
let objectID;
let oldSelectedID = 13;
const frogID = 12;
const deathAreaID = 164;
const warningAreaID = 165;
const chillAreaID = 166;
const sheepID = 30;
const goButtonID = 147;
const homeButtonID = 148;
const resetAnimationButtonID = 162;
const scissorID = 158;

// -------------- FLAGS DECLARATION -------------------
let buttonFlag = true;
let homeButtonFlag = true;
let resetAnimationButtonFlag = true;
let flyFlag = false;
let scissorFlag = false;
let selected;
let currentScrren;

let targetAngleVertical;
let targetAngleVerticalOriginal;
let targetAngleHorizontalOriginal;
let inclination;
let woolArray = [];

// ----------- BACKGROUND COLORS DECLARATION ----------
const backGroundHome = new THREE.Color(0xbfe3dd);
//giallino: 0xfafad2
//azzurrino: 0xbfe3dd

// ----------- SCENE AND CAMERA DECLARATION ------------
let controls;
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
let timerSad;
let timerEat;
let flyTimer;
let homeSound, frogSceneSound, sheepSceneSound;

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

function backupFrogHome(){

    if(frogJumpSound) frogJumpSound.setVolume(0.0);
    if(soundFly) soundFly.setVolume(0.0);
    frogBody.position.x = -2;
    frogBody.position.y = -1;
    frogBody.position.z = 0;

    frogEyeR.position.x = -0.37;
    frogEyeR.position.y = 0.3;
    frogEyeR.position.z = 0.3;

    frogEyeL.position.x = 0.37;
    frogEyeL.position.y = 0.3;
    frogEyeL.position.z = 0.3;


    groupPivotLegR.rotation.setFromVector3(frogLegPivotRotationBackupR);
    groupPivotLegL.rotation.setFromVector3(frogLegPivotRotationBackupL);

    frogMouthPivot.rotation.setFromVector3(frogMouthPivotRotationBackup);
    frogLowerLeftLeg.rotation.setFromVector3(frogLowerLegRotationBackupL);
    frogLowerRightLeg.rotation.setFromVector3(frogLowerLegRotationBackupR);

    frogHead.rotation.setFromVector3(frogHeadRotationBackup);

    //questo serve altrimenti le ali ripartono ogni volta dall' ultima posizione lasciata
    //e quindi a volte perdono completamente l'animazione
    flyBiggerWings[0].rotation.z = initialFlyBiggerWingsPos;
    flyBiggerWings[1].rotation.z = -initialFlyBiggerWingsPos;
    flySmallerWings[0].rotation.z = initialFlySmallerWingsPos;
    flySmallerWings[1].rotation.z = -initialFlySmallerWingsPos;

    frogPupilR.scale.set(1, 1, 1);
    frogPupilL.scale.set(1, 1, 1);

    frogPupilLAnimation.setPaused(false);
    frogPupilRAnimation.setPaused(false);
    bodyFrogAnimation.setPaused(true);

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

    if(frogBodyGeometry) {
        frogBodyGeometry.attributes.position.array[5] = 0.25;
        frogBodyGeometry.attributes.position.array[14] = 0.25;
        frogBodyGeometry.attributes.position.array[26] = 0.25;
        frogBodyGeometry.attributes.position.array[29] = 0.25;
        frogBodyGeometry.attributes.position.array[62] = 0.25;
        frogBodyGeometry.attributes.position.array[65] = 0.25;
        frogBody.receiveShadow = true;
        frogBody.castShadow = true;
        frogBody.translateX(-2);
        frogBody.translateY(-1);
        frogBody.scale.multiplyScalar(scale);
        frogBody.add(groupPivotLegR);
        groupPivotLegR.translateX(0.4);
        groupPivotLegR.translateY(-0.3);
        groupPivotLegL.translateY(-0.3);
        groupPivotLegL.translateX(-0.4);
        frogBody.add(groupPivotLegL);

        frogLegPivotRotationBackupR = new THREE.Vector3(groupPivotLegR.rotation.x, groupPivotLegR.rotation.y, groupPivotLegR.rotation.z);
        frogLegPivotRotationBackupL = new THREE.Vector3(groupPivotLegL.rotation.x, groupPivotLegL.rotation.y, groupPivotLegL.rotation.z);
    
        scene.add(frogBody);
    }
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
    frogHeadRotationBackup = new THREE.Vector3(frogHead.rotation.x, frogHead.rotation.y, frogHead.rotation.z);

    frogBody.add(frogHead);
}

function createFrogPivotAndMouth(scale){
   frogMouthPivot = new THREE.Object3D();
    //Pivot (mandibola)
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

    frogMouthPivotRotationBackup = new THREE.Vector3(frogMouthPivot.rotation.x, frogMouthPivot.rotation.y, frogMouthPivot.rotation.z);
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
    console.log(frogEyeL.position.x + " " + frogEyeL.position.y + " " + frogEyeL.position.z)

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

    frogPupilHeightBackup = new THREE.Vector3(frogPupilR.scale.x, frogPupilR.scale.y, frogPupilR.scale.z);
    frogPupilPositionBackupR = new THREE.Vector3(frogPupilR.position.x, frogPupilR.position.y, frogPupilR.position.z);

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

    frogPupilPositionBackupL = new THREE.Vector3(frogPupilL.position.x, frogPupilL.position.y, frogPupilL.position.z);

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
    frogUpperRightLeg.translateY(0.25);
    frogUpperRightLeg.translateX(0.15);
    frogUpperRightLeg.rotateY(1.55);
    frogUpperRightLeg.rotateX(0.6);
    frogHeadRotationBackup = new THREE.Vector3(groupPivotLegR.rotation.x, groupPivotLegR.rotation.y, groupPivotLegR.rotation.z);
    frogHeadPositionBackup = groupPivotLegR.position;
    //frogUpperRightLeg.translateOnAxis(frogUpperRightLeg.worldToLocal(new THREE.Vector3(0,1,0)), 0.3);
    //frogUpperRightLeg.translateOnAxis(frogUpperRightLeg.worldToLocal(new THREE.Vector3(0,0,1)), 0.5);
    frogUpperRightLeg.scale.multiplyScalar(scale);
    groupPivotLegR.add( frogUpperRightLeg );
}

function createFrogUpperLeftLeg(scale){
    //Upper Left Leg
    const frogUpperLeftLegGeometry = new THREE.BoxGeometry( 0.4, 0.6, 0.2 );
    const frogUpperLeftLegMaterial = new THREE.MeshStandardMaterial( { color: 0x96f2af} );
    frogUpperLeftLeg = new THREE.Mesh( frogUpperLeftLegGeometry, frogUpperLeftLegMaterial );
    frogUpperLeftLeg.receiveShadow = true;
    frogUpperLeftLeg.castShadow = true;
    frogUpperLeftLeg.translateY(0.25);
    frogUpperLeftLeg.translateX(-0.15);
    frogUpperLeftLeg.rotateY(1.55);
    frogUpperLeftLeg.rotateX(-0.6);


    //frogUpperLeftLeg.translateOnAxis(frogUpperLeftLeg.worldToLocal(new THREE.Vector3(0,1,0)), 0.3);
    //frogUpperLeftLeg.translateOnAxis(frogUpperLeftLeg.worldToLocal(new THREE.Vector3(0,0,1)), -0.5);
    frogUpperLeftLeg.scale.multiplyScalar(scale);
    groupPivotLegL.add( frogUpperLeftLeg );
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
    frogLowerRightLeg.rotateY(1.57);
    frogLowerRightLeg.rotateZ(-0.65);
    frogLowerRightLeg.translateOnAxis(frogLowerRightLeg.worldToLocal(new THREE.Vector3(0,1,0)),-0.36);
    frogLowerRightLeg.scale.multiplyScalar(scale);
    frogUpperRightLeg.add( frogLowerRightLeg );

    frogLowerLegRotationBackupR = new THREE.Vector3(frogLowerRightLeg.rotation.x, frogLowerRightLeg.rotation.y, frogLowerRightLeg.rotation.z);

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
    frogLowerLeftLeg.rotateY(-1.57);
    frogLowerLeftLeg.rotateZ(-0.65);
    frogLowerLeftLeg.translateOnAxis(frogLowerRightLeg.worldToLocal(new THREE.Vector3(0,1,0)),-0.36);
    frogLowerLeftLeg.scale.multiplyScalar(scale);
    frogUpperLeftLeg.add( frogLowerLeftLeg );

    frogLowerLegRotationBackupL = new THREE.Vector3(frogLowerLeftLeg.rotation.x, frogLowerLeftLeg.rotation.y, frogLowerLeftLeg.rotation.z);

}


function createFrogTongue(scale){
    class CustomSinCurve extends THREE.Curve {
        constructor( scale = 1 ) {
            super();
            this.scale = scale;
        }
    
        getPoint( t, optionalTarget = new THREE.Vector3() ) {
            
            const tx = t * 1 - 1.5; // per l'animazione cambiare 1 aumentandolo fino a 3
            const ty = 0.2 * Math.sin(3 * Math.PI * t );
            const tz = 0;
            return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
        }
    
    }
    const tonguePath = new CustomSinCurve( 10 );
    const tongueGeometry = new THREE.TubeGeometry( tonguePath, 100, 1.1, 20, false);
    //const tongueMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    frogTongue = new THREE.Mesh( tongueGeometry, redMaterial );
    //scene.add( frogTongue );
    frogTongue.scale.multiplyScalar(0.05*scale);
    frogTongue.material.side = THREE.DoubleSide;
    frogMouth.add(frogTongue);
    frogTongue.translateY(0.1);
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
    frogTongueTip.scale.x = 1; // aumentare fino a 16.4 quando la lingua viene animata all'esterno
    frogTongueTip.translateX(-15);
    frogTongue.add( frogTongueTip );
    
}

// ------------------------------------------------------------
function backupSheepHome(){

    frogEyeR.position.x = -0.37;
    frogEyeR.position.y = 0.3;
    frogEyeR.position.z = 0.3;

    frogEyeL.position.x = 0.37;
    frogEyeL.position.y = 0.3;
    frogEyeL.position.z = 0.3;

    window.removeEventListener( 'mousemove', followMouse, false);
    //STOP CAMERA MOVEMENT

    controls.disableVerticalRotation();
    controls.disableHorizontalRotation();


    //BACKUP BODY
    sheepBody.rotation.setFromVector3(sheepBodyRotationBackup);
    sheepBody.position.x = 2;
    sheepBody.position.y = -0.4;
    sheepBody.position.z = 0;

    //BACKUP HEAD ROTATION AND POSITION
    sheepHead.rotation.setFromVector3(sheepHeadRotationBackup);
    sheepHead.position.x = (sheepHeadPositionBackup.x);
    sheepHead.position.y = (sheepHeadPositionBackup.y);
    sheepHead.position.z = (sheepHeadPositionBackup.z);

    //BACKUP WOOL POSITION
    for (var j=0 ; j<wool.length; j++) {
        createjs.Tween.get(wool[j].position, {loop: false})
        .to({x: positionWoolX[j], y: positionWoolY[j], z: positionWoolZ[j]}, 2000, createjs.Ease.linear)
    
        createjs.Tween.get(wool[j].scale, {loop: false}).wait(2000)
        .to({x: scaleWoolX[j], y: scaleWoolY[j], z: scaleWoolZ[j]}, 2000, createjs.Ease.linear)
    }
}

function backupSheepReset(){

    sheepSceneSound.setVolume(0.3)
    resetAnimationButton.scale.multiplyScalar(0.625);
    scene.remove(resetAnimationButton);
    homeButton.translateX(-0.6);
    scene.add(group2);
    controls.setObjectToMove(sheepBody);

    //BACKUP WOOL POSITION
    for (var j=0 ; j<wool.length; j++) {
        createjs.Tween.get(wool[j].position, {loop: false})
        .to({x: positionWoolX[j], y: positionWoolY[j], z: positionWoolZ[j]}, 2000, createjs.Ease.linear)
    
        createjs.Tween.get(wool[j].scale, {loop: false})
        .to({x: scaleWoolX[j], y: scaleWoolY[j], z: scaleWoolZ[j]}, 2000, createjs.Ease.linear)

    }
}

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
    sheepBodyRotationBackup = new THREE.Vector3(sheepBody.rotation.x, sheepBody.rotation.y, sheepBody.rotation.z);
    sheepBodyPositionBackup = sheepBody.position;
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

    sheepHeadRotationBackup = new THREE.Vector3(sheepHead.rotation.x, sheepHead.rotation.y, sheepHead.rotation.z);
    sheepHeadPositionBackup = sheepHead.position;
}

function createSheepEyes(){
    //sheepEyes
    let geo_eye = new THREE.CylinderGeometry(0.3, 0.2, 0.3, 8);
    sheepEyes = [];
    for (let i = 0; i < 2; i++) {
        sheepEyes[i] = new THREE.Mesh(geo_eye, whiteMaterial);
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
    //backup vectors
    sheepFrontRightRotationLegBackup = new THREE.Vector3(sheepFrontRightLeg.rotation.x, sheepFrontRightLeg.rotation.y, sheepFrontRightLeg.rotation.z);
    sheepFrontRightPositionLegBackup = sheepFrontRightLeg.position;


    sheepFrontLeftLeg = sheepFrontRightLeg.clone();
    sheepFrontLeftLeg.position.x = -sheepFrontRightLeg.position.x;
    sheepFrontLeftLeg.rotation.z = -sheepFrontRightLeg.rotation.z;
    sheepBody.add(sheepFrontLeftLeg);
    //backup vectors
    sheepFrontLeftRotationLegBackup = new THREE.Vector3(sheepFrontLeftLeg.rotation.x, sheepFrontLeftLeg.rotation.y, sheepFrontLeftLeg.rotation.z);
    sheepFrontLeftPositionLegBackup = sheepFrontLeftLeg.position;

    sheepBackRightLeg = sheepFrontRightLeg.clone();
    sheepBackRightLeg.position.z = -sheepFrontRightLeg.position.z;
    sheepBackRightLeg.rotation.x = -sheepFrontRightLeg.rotation.x;
    sheepBody.add(sheepBackRightLeg);
    //backup vectors
    sheepBackRightRotationLegBackup = new THREE.Vector3(sheepBackRightLeg.rotation.x, sheepBackRightLeg.rotation.y, sheepBackRightLeg.rotation.z);
    sheepBackRightPositionLegBackup = sheepBackRightLeg.position;


    sheepBackLeftLeg = sheepFrontLeftLeg.clone();
    sheepBackLeftLeg.position.z = -sheepFrontLeftLeg.position.z;
    sheepBackLeftLeg.rotation.x = -sheepFrontLeftLeg.rotation.x;
    sheepBody.add(sheepBackLeftLeg);
    //backup vectors
    sheepBackLeftRotationLegBackup = new THREE.Vector3(sheepBackLeftLeg.rotation.x, sheepBackLeftLeg.rotation.y, sheepBackRightLeg.rotation.z);
    sheepBackLeftPositionLegBackup = sheepBackLeftLeg.position;
}

function createSheepWool(){
    //Sheep hair
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
    for (let i = 8; i < 20; i++) {
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
    for (let i = 20; i < 33; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
        if (i === 9 || i === 5 || i === 7 || i === 12 || i === 4 || i === 3)
            wool[i].scale.set(0.2, 0.2, 0.2);
        else if (i === 1 || i === 0)
            woole[i].scale.set(0.25, 0.25, 0.25);
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
    for (let i = 33; i < 49; i++) {
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
    for (let i = 49; i < 65; i++) {
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
    for (let i = 65; i < 80; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
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
    for (let i = 80; i < 89; i++) {
        wool[i] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
       // if (i === 9  || i === 12 || i === 3 || i === 5 )
        //    wool[i].scale.set(0.2, 0.2, 0.2);
       
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

    sheepBody.remove(wool[82]);
    
    // Extra wool
    radius = 0.36;
    angle = 0;
    z = -0.21;
    wool[89] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
    wool[89].scale.set(0.25, 0.25, 0.25);
    wool[89].position.set(radius * Math.cos(angle), radius * Math.sin(angle), z);
    wool[89].castShadow = true;
    sheepBody.add(wool[89]);
    angle = 2.12;
    radius = 0.4;
    z = -0.02;
    wool[90] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
    wool[90].scale.set(0.3, 0.3, 0.3);
    wool[90].position.set(radius * Math.cos(angle), radius * Math.sin(angle), z);
    wool[90].castShadow = true;
    sheepBody.add(wool[90]);
    angle = 3.15;
    radius = 0.35;
    z = -0.21;
    wool[91] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
    wool[91].scale.set(0.3, 0.3, 0.3);
    wool[91].position.set(radius * Math.cos(angle), radius * Math.sin(angle), z);
    wool[91].castShadow = true;
    sheepBody.add(wool[91]);
    z = -0.38;
    wool[92] = new THREE.Mesh(woolGeometry, sheepWoolMaterial);
    wool[92].scale.set(0.35, 0.35, 0.35);
    wool[92].position.set(0, 0, z);
    wool[92].castShadow = true;
    sheepBody.add(wool[92]);

    //Create array of wool positions
    for (var j=0 ; j<wool.length; j++) {
        positionWoolX[j] = wool[j].position.x;
        positionWoolY[j] = wool[j].position.y;
        positionWoolZ[j] = wool[j].position.z;

        scaleWoolX[j] = wool[j].scale.x;
        scaleWoolY[j] = wool[j].scale.y;
        scaleWoolZ[j] = wool[j].scale.z;

}


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
    flyGroup.scale.multiplyScalar(2.5);
}

// ------------- FLY PARTS ----------------------------------
function createFlyBody(){
    let flyGeometry = new THREE.SphereGeometry( 0.1, 40, 40 );
    let flyMaterial = new THREE.MeshStandardMaterial( { color: 0x555555 } );
    flyBody = new THREE.Mesh( flyGeometry, flyMaterial );
    flyBody.castShadow = true;
    flyBody.scale.z = 1.2;
    flyGroup.add(flyBody);
}

function createFlyEyes(){
    //flyEyes
    let flyEyeGeometry = new THREE.SphereGeometry( 0.05, 40, 40 );
    flyEyes = [];
    for (let i = 0; i < 2; i++) {
        flyEyes[i] = new THREE.Mesh(flyEyeGeometry, bordeauxMaterial);
        flyGroup.add(flyEyes[i]);
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
        flyGroup.add(flyBiggerWings[i]);
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

    initialFlyBiggerWingsPos = flyBiggerWings[0].rotation.z; //backup position for wings
}

function createSmallerWings(){
    //flySmallerWings
    let flySmallerWingsGeometry = new THREE.CylinderGeometry(0.075, 0.075, 0.01, 20);
    flySmallerWings = [];
    for (let i = 0; i < 2; i++) {
        flySmallerWings[i] = new THREE.Mesh(flySmallerWingsGeometry, greyMaterial);
        flyGroup.add(flySmallerWings[i]);
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

    initialFlySmallerWingsPos = flySmallerWings[0].rotation.z; //backup position for wings
}

function animateFly(){

    createjs.Tween.get(flyBiggerWings[0].rotation, {loop: true})
        .to({ z: 0.1 }, 450, createjs.Ease.linear)
        .to({ z: initialFlyBiggerWingsPos }, 450, createjs.Ease.linear);

    createjs.Tween.get(flyBiggerWings[1].rotation, {loop: true})
        .to({ z: 0 }, 550, createjs.Ease.linear)
        .to({ z: -initialFlyBiggerWingsPos }, 350, createjs.Ease.linear);

    createjs.Tween.get(flySmallerWings[0].rotation, {loop: true})
        .to({ z: 0 }, 100, createjs.Ease.linear);

    createjs.Tween.get(flySmallerWings[1].rotation, {loop: true})
        .to({ z: 0 }, 100, createjs.Ease.linear);
}

function createFlySound(){
    const listener = new THREE.AudioListener();
    const audioLoader = new THREE.AudioLoader();
    soundFly = new THREE.Audio( listener );
    audioLoader.load( 'sounds/flySound1.ogg', function( buffer ) {
        soundFly.setBuffer( buffer );
        soundFly.setLoop( true );
        soundFly.setVolume( 0.5 );
        soundFly.play();
    });
}
// ------------- SCISSOR ----------------------------------------
function createScissor(){
    createScissorBlades();
    createScissorHandle();

    scissorFlag = true;
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
    scissorBlades[0].rotateZ(-0.4);
    scissorBlades[1].rotateZ(0.4);
}

function createScissorHandle(){
    let scissorHandleGeometry = new THREE.TorusGeometry( 0.37, 0.1, 32, 100 );
    scissorHandles = [];
    for (let i = 0; i < 2; i++) {
        scissorHandles[i] = new THREE.Mesh(scissorHandleGeometry, redMaterial);
        scissorBlades[i].add(scissorHandles[i]);
        scissorHandles[i].castShadow = true;
    }
    //first handle
    scissorHandles[0].translateX(-0.24);
    scissorHandles[0].translateY(-0.7);
    scissorHandles[0].scale.z = 0.7;
    scissorHandles[0].scale.x = -0.7;
    scissorHandles[0].scale.y = 1.2;
    
    //second handle
    scissorHandles[1].translateX(0.24);
    scissorHandles[1].translateY(-0.7);
    scissorHandles[1].scale.z = 0.7;
    scissorHandles[1].scale.x = -0.7;
    scissorHandles[1].scale.y = 1.2;
    
   group2.rotateZ(1.57); //added to incline the scissor of 90 degrees

}

function animate() {
    requestAnimationFrame( animate );

    //variable for the mouse
    var targetPos = new THREE.Vector3();
    flyBody.getWorldPosition(targetPos);
    var headDistance = targetPos.z - frogHead.position.z;

    //MOVIMENTO ORIZZONTALE DELLA TESTA
    var i = Math.sqrt(Math.pow(headDistance, 2)+Math.pow(targetPos.x, 2));
    var targetDivision = targetPos.x/i;

    //check if I have a value that is acceptable by Math.asin
    if(targetDivision >= 1) targetDivision = 1;
    if(targetDivision <= -1) targetDivision = -1;

    //angle
    targetAngle = Math.asin(targetDivision);
    targetAngleHorizontalOriginal = targetAngle;

    //MOVIMENTO VERTICALE DELLA TESTA
    var iHorizontal = Math.sqrt(Math.pow(headDistance, 2)+Math.pow(targetPos.y, 2));
    var targetDivisionVertical = targetPos.y/iHorizontal;

    //check if I have a value that is acceptable by Math.asin
    if(targetDivisionVertical >= 1) targetDivisionVertical = 1;
    if(targetDivisionVertical <= -1) targetDivisionVertical = -1;

    //angle
    targetAngleVertical = Math.asin(targetDivisionVertical);
    targetAngleVerticalOriginal = targetAngleVertical

  // frogBody.rotation.x += 0.01;
  // frogBody.rotation.y += 0.01;

   // frogBody.rotation.y = 1.57;

   // sheepBody.rotation.x += 0.01;
   // sheepBody.rotation.y += 0.01;
   //sheepBody.rotation.y = 0.4;
   //sheepBody.rotation.x = -0.2;

    flyGroup.rotation.x += 0.03;
    //group.rotation.y += 0.01;
    flyGroup.rotation.z += 0.03;
    renderer.render(scene, camera);
}

function render(){
    renderer.render(scene, camera);
}


let onclick = function (event) {
    mouseSetting(event);
    switch (objectID) {
        case frogID:
            loadButtonSound();
            loadHomeSound(++frogOneTime);
            if (selected != "FROG") {
                frogBody.scale.multiplyScalar(2);
                scene.background = new THREE.Color(0xfafad2);
                setButtonTexture('textures/goFrog.jpg');
                createFrogAreaTitle();
                frogAreaDescription();
                resetButton(oldSelectedID);
                resetScale(oldSelectedID);
                frogArea.add(goButton);
                goButton.translateX(0.15);
            }
            if (oldSelectedID == sheepID) {
                console.log("VADO GIù PERCHè HO CLICCATO SULLA FROG");
                sheepBody.translateY(-0.5); //la pecora torna alla sua posizione originale
            }
            oldSelectedID = objectID;
            selected = "FROG";
            scene.remove(titleHomeArea);
            scene.remove(titleSheepArea);
            sheepArea.remove(descriptionSheepArea);
            break;
        case sheepID:
            loadButtonSound();
            loadHomeSound(++sheepOneTime);
            if (selected != "SHEEP") {
                scene.background = new THREE.Color(0xc9f0cf);
                sheepBody.scale.multiplyScalar(2);
                setButtonTexture('textures/goSheep.jpg');
                createSheepAreaTitle();
                sheepAreaDescription();
                resetButton(oldSelectedID);
                resetScale(oldSelectedID);
                sheepArea.add(goButton);
                goButton.translateX(-0.15);
                console.log("VADO Sù PERCHè HO CLICCATO SULLA SHEEP");
                sheepBody.translateY(0.5);
            }
           // if (oldSelectedID === frogID)
            oldSelectedID = objectID;
            selected = "SHEEP";
            scene.remove(titleHomeArea);
            scene.remove(titleFrogArea);
            frogArea.remove(descriptionFrogArea);
            break;
        default:
            break;
    }
};

window.addEventListener('click', onclick);

function resetButton(oldSelectedID){
    switch (oldSelectedID){
        case frogID: {
            goButton.translateX(-0.15);
            //homeButton.translateX(0.6);
            break;
        }
        case sheepID:
            goButton.translateX(0.15);
            //homeButton.translateX(0.6);
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
            scene.remove(flyGroup);
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
            scene.remove(flyGroup);
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
                scene.add(flyGroup);
                homeButtonFlag = true;
            }
            if(!homeButtonFlag && selected === "SHEEP"){
                homeButton.scale.multiplyScalar(0.625);
                scene.add(group2);
                homeButtonFlag = true;
            }
            if (!resetAnimationButtonFlag && selected === "FROG") {
                resetAnimationButton.scale.multiplyScalar(0.625);
                scene.add(flyGroup);
                resetAnimationButtonFlag = true;
            }
            if(!resetAnimationButtonFlag && selected === "SHEEP"){
                resetAnimationButton.scale.multiplyScalar(0.625);
                scene.add(group2);
                resetAnimationButtonFlag = true;
            }
            break;
    }
};
window.addEventListener('mousemove', onMouseOverButton);

let onClickButton = function (event) {
    mouseSetting(event);
    if (objectID === goButtonID) {
        loadButtonSound();
        switch (selected) {
            case "FROG":
                homeSound.setVolume( 0 );
                const frogSceneListener = new THREE.AudioListener();
                const frogSceneAudioLoader = new THREE.AudioLoader();
                frogSceneSound = new THREE.Audio( frogSceneListener );
                frogSceneAudioLoader.load( 'sounds/frogSceneSound.ogg', function( buffer ) {
                    frogSceneSound.setBuffer( buffer );
                    frogSceneSound.setLoop( true );
                    frogSceneSound.setVolume( 0.35 );
                    frogSceneSound.play();
                });
                createSceneFrog();
                break;
            case "SHEEP":
                homeSound.setVolume( 0 );
                const sheepSceneListener = new THREE.AudioListener();
                const sheepSceneAudioLoader = new THREE.AudioLoader();
                sheepSceneSound = new THREE.Audio( sheepSceneListener );
                sheepSceneAudioLoader.load( 'sounds/sheepSceneSound.ogg', function( buffer ) {
                    sheepSceneSound.setBuffer( buffer );
                    sheepSceneSound.setLoop( true );
                    sheepSceneSound.setVolume( 0.3 );
                    sheepSceneSound.play();
                });
                createSceneSheep();
                break;
            default:
                break;
        }
    } else if (objectID === homeButtonID) {
        loadButtonSound();
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
                scene.remove(flyGroup);
                frogBody.translateX(-2);
                resetSceneHome();
                break;
            case "SHEEP":
                window.removeEventListener( 'mousemove', createSounds, false);
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
                console.log("VEDIAMO QUI HOME = " + gameOverFlag);
                if (gameOverFlag) {
                    console.log("VADO GIù PERCHè HO CLICCATO SULLA HOME");
                    sheepBody.translateY(-0.5);
                }
                scene.remove(playSheepArea);
                scene.remove(happySheep);
                resetSceneHome();
                break;
            default:
                break;
        }
    } else if (objectID === resetAnimationButtonID){
        loadButtonSound();
        switch (selected) {
            case "FROG":
                break;
            case "SHEEP":
                resetAnimationButtonFlag = true;
                scene.remove(happySheep);
                scene.remove(playSheepArea);
                scene.add(subTitleSheepArea);
                controls.setObjectToMove(sheepBody);
                backupSheepReset();
                break;
            default:
                break;
        }
    }
}
window.addEventListener( 'click', onClickButton, false);

function setButtonTexture(texturePath){
    loadTexture(texturePath).then(texture => {
        goButton.material = new THREE.MeshBasicMaterial({
            map:  texture,
            side: THREE.DoubleSide
        });
        goButton.material.needsUpdate = true;
    })
}

function createButton(){
    goButtonGeometry = new THREE.CircleGeometry(0.4,32,0, 6.283185307179586);
    goButtonMaterial = new THREE.MeshBasicMaterial({color: 0x003060});
    goButtonMaterial.transparent = true;
    goButtonMaterial.opacity = 0;
    goButton = new THREE.Mesh( goButtonGeometry, goButtonMaterial );
    goButton.translateY(-3.7);
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
        flyGroup.position.set(intersects.x, intersects.y, intersects.z);
    else {
        flyFlag = false;
    }
    //NB: gli if else devono essere staccati altrimenti non segue il mouse la forbice
    if (scissorFlag){
        //+0.5 per non avere il mouse sulla forbice
        group2.position.set(intersects.x+0.5, intersects.y, intersects.z);
    }
    else{ 
        scissorFlag = false;
        
    }
}
window.addEventListener( 'mousemove', followMouse, false);

function setHomeButtonTexture(texturePath){
    loadTexture(texturePath).then(texture => {
        homeButton.material = new THREE.MeshBasicMaterial({
            map:  texture,
            side: THREE.DoubleSide
        });
        homeButton.material.needsUpdate = true;
    })
}

function setResetAnimationButtonTexture(texturePath){
    loadTexture(texturePath).then(texture => {
        resetAnimationButton.material = new THREE.MeshBasicMaterial({
            map:  texture,
            side: THREE.DoubleSide
        });
        resetAnimationButton.material.needsUpdate = true;
    })
}

function createHomeButton(){
    homeButtonGeometry = new THREE.CircleGeometry(0.4,32,0, 6.283185307179586);
    homeButtonMaterial = new THREE.MeshBasicMaterial({color: 0x003060});
    homeButtonMaterial.transparent = true;
    homeButtonMaterial.opacity = 0;
    homeButton = new THREE.Mesh( homeButtonGeometry, homeButtonMaterial );
    //homeButton.translateX(0.6);
    homeButton.translateY(-5.0);
    homeButton.translateZ(8.0);
}

function createResetAnimationButton(){
    resetAnimationButtonGeometry = new THREE.CircleGeometry(0.4,32,0, 6.283185307179586);
    resetAnimationButtonMaterial = new THREE.MeshBasicMaterial({color: 0x003060});
    resetAnimationButtonMaterial.transparent = true;
    resetAnimationButtonMaterial.opacity = 0;
    resetAnimationButton = new THREE.Mesh( resetAnimationButtonGeometry, resetAnimationButtonMaterial );
    resetAnimationButton.translateX(-0.6);
    resetAnimationButton.translateY(-5.0);
    resetAnimationButton.translateZ(8.0);
}
function stopHomeAnimation(){
    frogLowerRightLegAnimation.setPaused(true);
    frogLowerLeftLegAnimation.setPaused(true);
    groupPivotLegRAnimation.setPaused(true);
    groupPivotLegLAnimation.setPaused(true);
    frogPupilRAnimation.setPaused(true);
    frogPupilLAnimation.setPaused(true);
    frogMouthAnimation.setPaused(true);
    
}
function createSceneFrog(){
    for (let i = 0; i<6; i++){
        warningAreaMaterials[i].opacity = 1.0;
        warningAreaMaterials[i].transparent = false;
        deathAreaMaterials[i].opacity = 1.0;
        deathAreaMaterials[i].transparent = false;
        chillAreaMaterials[i].opacity = 1.0;
        chillAreaMaterials[i].transparent = false;
    }
    frogVisited = true;
    stopHomeAnimation();
    backupFrogHome();
    makeFlyAppear();
    currentScrren = "FROG";
    scene.remove(sheepArea);
    scene.remove(sheepBody);
    scene.remove(frogArea);
    //scene.add(flyBody);
    //flyGroup.add(flyBody);
    scene.add(flyGroup);
    frogBody.translateX(2);
    setHomeButtonTexture('textures/homeFrog.jpg');
    //homeButton.translateX(-0.6);
    scene.add(homeButton);
    setResetAnimationButtonTexture('textures/resetFrog.jpg');
    //scene.add(resetAnimationButton);
    animate();
    render();
    animateSceneFrog();
    animateFly();
    scene.remove(titleHomeArea);
    scene.remove(titleSheepArea);
    scene.remove(titleFrogArea);
    scene.remove(subTitleSheepArea);
    //createFrogAreaSubTitle();
    createFlySound();
}
let sheepFlag = false;
function createSoundsSheep(){
    let listenerScissor = new THREE.AudioListener();
    let audioLoaderScissor = new THREE.AudioLoader();
    sheepScissorSound = new THREE.Audio(listenerScissor);
    audioLoaderScissor.load('sounds/scissor.ogg', function (buffer) {
        sheepScissorSound.setBuffer(buffer);
        sheepScissorSound.setLoop(true);
        sheepScissorSound.setVolume(0);
        sheepScissorSound.play();
    })

    const listenerSheep = new THREE.AudioListener();
    const audioLoaderSheep = new THREE.AudioLoader();
    soundSheepFinal = new THREE.Audio( listenerSheep );
    audioLoaderSheep.load( 'sounds/Sheep2.ogg', function( buffer ) {
        soundSheepFinal.setBuffer( buffer );
        soundSheepFinal.setLoop( false );
    });

    createSounds = function (event) {
        mouseSetting(event);
        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.id === 31) {
                sheepFlag = true;
                sheepScissorSound.setVolume(0.9);
            }
        }
        if(!sheepFlag)
            sheepScissorSound.setVolume(0);
        sheepFlag = false;
    }
    window.addEventListener('mousemove', createSounds);
}

function createSceneSheep(){
    window.addEventListener( 'mousemove', followMouse, false);
    createSoundsSheep();
    gameOverFlag = false;
    currentScrren = "SHEEP";
    rotateCameraSheepScene();
    scene.remove(frogArea);
    scene.remove(frogBody);
    scene.remove(sheepArea);
    scene.add(group2);
    sheepBody.translateX(-2);
    setHomeButtonTexture('textures/homeSheep.jpg');
    //homeButton.translateX(-0.6);
    scene.add(homeButton);
    setResetAnimationButtonTexture('textures/resetSheep.jpg');
    //scene.add(resetAnimationButton);
    scene.remove(titleHomeArea);
    scene.remove(titleSheepArea);
    scene.remove(titleFrogArea);
    scene.remove(subTitleFrogArea);
    createSheepAreaSubTitle();
    animateSceneSheep();

    let onWoolOverButton = function (event) {
        if (currentScrren == "SHEEP") {
            mouseSetting(event);
            if (intersects.length > 1) {
                for (let i = 0; i < intersects.length; i += 1) {
                    for (let j=0; j<wool.length; j+=1) {
                        if (intersects[i].object.id === wool[j])
                            objectID = intersects[i].object.id;
                    }
                }
            }
            switch (objectID) {
                case objectID:
                    for (let j=0; j<woolArray.length; j+=1) {
                        if (objectID==woolArray[j]) {
                            animateWool(j);
                        }
                    }
                    break;
        
            }
        }
    };
    window.addEventListener('mousemove', onWoolOverButton);

}

function loadTexture(url) {
  return new Promise(resolve => {
    new THREE.TextureLoader().load(url, resolve)
  })
}

function createAreaTitle() {
    loadTexture('textures/title.jpg').then(texture => {
        const titleAreaGeometry = new THREE.BoxGeometry(15, 5, 0);
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial({map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd})
        ];
        titleHomeArea = new THREE.Mesh( titleAreaGeometry, materials);
        titleHomeArea.translateY(3.3);
        scene.add(titleHomeArea);
    })

}
function createFrogAreaChill(){
    loadTexture('textures/chillArea9.jpeg').then(texture => {
        const chillAreaGeometry = new THREE.BoxGeometry(30, 30, 0);
        chillAreaMaterials = [
            new THREE.MeshBasicMaterial( { color: 0xfae2a1}),
            new THREE.MeshBasicMaterial( { color: 0xfae2a1}),
            new THREE.MeshBasicMaterial( { color: 0xfae2a1}),
            new THREE.MeshBasicMaterial( { color: 0xfae2a1}),
            new THREE.MeshBasicMaterial( { map: texture}), //map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xfae2a1})
        ];
        frogAreaChill = new THREE.Mesh( chillAreaGeometry, chillAreaMaterials);
        for (let i = 0; i<6; i++){
            chillAreaMaterials[i].opacity = 0.0;
            chillAreaMaterials[i].transparent = true;
        }
        scene.add(frogAreaChill);
    })
}

function createFrogAreaWarning(){
    return loadTexture('textures/warningArea4.png').then(texture => {
        const warningAreaGeometry = new THREE.BoxGeometry(15, 10, 0);
        warningAreaMaterials = [
            new THREE.MeshBasicMaterial( { color: 0xf5bf83}),
            new THREE.MeshBasicMaterial( { color: 0xf5bf83}),
            new THREE.MeshBasicMaterial( { color: 0xf5bf83}),
            new THREE.MeshBasicMaterial( { color: 0xf5bf83}),
            new THREE.MeshBasicMaterial( { map: texture}), //map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xf5bf83})
        ];
        frogAreaWarning = new THREE.Mesh( warningAreaGeometry, warningAreaMaterials);
        for (let i = 0; i<6; i++){
            warningAreaMaterials[i].opacity = 0.0;
            warningAreaMaterials[i].transparent = true;
        }
        frogAreaWarning.translateZ(0.01);
        scene.add(frogAreaWarning);
    })
}

function createFrogAreaDeath(){
    return loadTexture('textures/deathArea1.png').then(texture => {
        const deathAreaGeometry = new THREE.BoxGeometry(7, 6, 0);
        deathAreaMaterials = [
            new THREE.MeshBasicMaterial( { color: 0xf79675}),
            new THREE.MeshBasicMaterial( { color: 0xf79675}),
            new THREE.MeshBasicMaterial( { color: 0xf79675}),
            new THREE.MeshBasicMaterial( { color: 0xf79675}),
            new THREE.MeshBasicMaterial( { map: texture}), //map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xf79675})
        ];
        frogAreaDeath = new THREE.Mesh( deathAreaGeometry, deathAreaMaterials);
        for (let i = 0; i<6; i++){
            deathAreaMaterials[i].opacity = 0.0;
            deathAreaMaterials[i].transparent = true;
        }
        frogAreaDeath.translateY(0.3);
        frogAreaDeath.translateZ(0.02);
        scene.add(frogAreaDeath);
    })
}

function createFrogAreas() {
   createFrogAreaDeath().then(result =>{
        createFrogAreaWarning().then(result =>{
            createFrogAreaChill();
        })
      });
}

function createFrogAreaTitle() {
    loadTexture('textures/frogTitle.jpg').then(texture => {
        const titleAreaGeometry = new THREE.BoxGeometry(15, 5, 0);
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial({map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd})
        ];
        titleFrogArea = new THREE.Mesh( titleAreaGeometry, materials);
        titleFrogArea.translateY(3.3);
        scene.add(titleFrogArea);
    })
}

function createSheepAreaTitle() {
    loadTexture('textures/sheepTitle.jpg').then(texture => {
        const titleAreaGeometry = new THREE.BoxGeometry(15, 5, 0);
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial({map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd})
        ];
        titleSheepArea = new THREE.Mesh( titleAreaGeometry, materials);
        titleSheepArea.translateY(3.3);
        scene.add(titleSheepArea);
    })
}

function frogAreaDescription() {
    loadTexture('textures/playFrog3.png').then(texture => {
        const descriptionAreaGeometry = new THREE.BoxGeometry(5, 3, 0);
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial({map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd})
        ];
        descriptionFrogArea = new THREE.Mesh( descriptionAreaGeometry, materials);
        descriptionFrogArea.translateY(-3.5);
        frogArea.add(descriptionFrogArea);
    })
}

function sheepAreaDescription() {
    loadTexture('textures/playSheep2.png').then(texture => {
        const descriptionAreaGeometry = new THREE.BoxGeometry(5, 3, 0);
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial({map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd})
        ];
        descriptionSheepArea = new THREE.Mesh( descriptionAreaGeometry, materials);
        descriptionSheepArea.translateY(-3.7);
        sheepArea.add(descriptionSheepArea);
    })
}

function createFrogAreaSubTitle() {
    loadTexture('textures/subtitleFrog.jpg').then(texture => {
        const titleAreaGeometry = new THREE.BoxGeometry(10, 3, 0);
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial({map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd})
        ];
        subTitleFrogArea = new THREE.Mesh( titleAreaGeometry, materials);
        subTitleFrogArea.translateY(3.3);
        scene.add(subTitleFrogArea);
    })
}

function createSheepAreaSubTitle() {
    loadTexture('textures/subtitleSheep.jpg').then(texture => {
        const titleAreaGeometry = new THREE.BoxGeometry(10, 3, 0);
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial({map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd})
        ];
        subTitleSheepArea = new THREE.Mesh( titleAreaGeometry, materials);
        subTitleSheepArea.translateY(3.3);
        subTitleSheepArea.translateZ(-1.5);
        scene.add(subTitleSheepArea);
    })
}

function restartHomeAnimation() {
    frogLowerRightLegAnimation.setPaused(false);
    frogLowerLeftLegAnimation.setPaused(false);
    groupPivotLegRAnimation.setPaused(false);
    groupPivotLegLAnimation.setPaused(false);
    frogPupilRAnimation.setPaused(false);
    frogPupilLAnimation.setPaused(false);
    frogMouthAnimation.setPaused(false);
}

function makeFlyDisappear() {
    window.removeEventListener( 'mousemove', followMouse, false);

    flyBody.castShadow = false;
    flyBody.material.opacity = 0.0;
    flyBody.material.transparent = true;
    flyBody.material.needsUpdate = true;

    flyBiggerWings[0].castShadow = false;
    flyBiggerWings[0].material.opacity = 0.0;
    flyBiggerWings[0].material.transparent = true;
    flyBiggerWings[0].material.needsUpdate = true;
    flyBiggerWings[1].castShadow = false;

    flySmallerWings[0].castShadow = false;
    flySmallerWings[1].castShadow = false;
    flySmallerWings[1].material.opacity = 0.0;
    flySmallerWings[1].material.transparent = true;
    flySmallerWings[1].material.needsUpdate = true;

    flyEyes[0].castShadow = false;
    flyEyes[1].castShadow = false;
    flyEyes[1].material.opacity = 0.0;
    flyEyes[1].material.transparent = true;
    flyEyes[1].material.needsUpdate = true;
}

function makeFlyAppear() {
    window.addEventListener( 'mousemove', followMouse, false);

    flyBody.castShadow = true;
    flyBody.material.transparent = false;
    flyBody.material.needsUpdate = true;

    flyBiggerWings[0].castShadow = true;
    flyBiggerWings[0].material.transparent = false;
    flyBiggerWings[0].material.needsUpdate = true;
    flyBiggerWings[1].castShadow = true;

    flySmallerWings[0].castShadow = true;
    flySmallerWings[1].castShadow = true;
    flySmallerWings[1].material.transparent = false;
    flySmallerWings[1].material.needsUpdate = true;

    flyEyes[0].castShadow = true;
    flyEyes[1].castShadow = true;
    flyEyes[1].material.transparent = false;
    flyEyes[1].material.needsUpdate = true;
}

function stopSceneFrogAnimation (){
    flyGroup.position.set(0, 0.4, 5);
    frogHeadVerticalAnimation.setPaused(true);
    frogHeadHorizontalAnimation.setPaused(true);
    makeFlyDisappear();
}

function stopSceneSheepAnimation (){
    if (woolFallingFlag && woolSmallFlag) {
        woolFalling.setPaused(true);
        woolSmall.setPaused(true);
        woolFallingFlag=false;
        woolSmallFlag=false;
    }
}

function resetSceneHome(){
    if (selected == "FROG") {
        stopSceneFrogAnimation();
        backupFrogHome();
        scene.remove(titleFrogArea);
        frogArea.remove(descriptionFrogArea);
        scene.remove(subTitleFrogArea);
        for (let i = 0; i<6; i++){
            warningAreaMaterials[i].opacity = 0.0;
            warningAreaMaterials[i].transparent = true;
            deathAreaMaterials[i].opacity = 0.0;
            deathAreaMaterials[i].transparent = true;
            chillAreaMaterials[i].opacity = 0.0;
            chillAreaMaterials[i].transparent = true;
        }
        frogSceneSound.setVolume( 0 );
    }
    else if (selected == "SHEEP") {
        if (frogVisited) {
            stopSceneFrogAnimation();
            backupFrogHome();
        }
        stopSceneSheepAnimation();
        backupSheepHome();
        scene.remove(group2);
        scene.remove(titleSheepArea);
        sheepArea.remove(descriptionSheepArea);
        scene.remove(titleSheepArea);
        scene.remove(subTitleSheepArea);
        scene.remove(playSheepArea);
        scene.remove(happySheep);
        sheepSceneSound.setVolume( 0 );
    }
    const homeListener = new THREE.AudioListener();
    const homeAudioLoader = new THREE.AudioLoader();
    homeSound = new THREE.Audio( homeListener );
    homeAudioLoader.load( 'sounds/homeSound.ogg', function( buffer ) {
        homeSound.setBuffer( buffer );
        homeSound.setLoop( true );
        homeSound.setVolume( 0.5 );
        homeSound.play();
    });
    restartHomeAnimation();
    selected = "HOME";
    currentScrren = "HOME";
    scene.background = backGroundHome;
    scene.add(frogBody);
    scene.add(frogArea);
    scene.add(sheepBody);
    scene.add(sheepArea);
    oldSelectedID = 0;
    scene.add(titleHomeArea);
}


function animateFrogHome(){

    // BELLY ANIMATION
    let initialZ = frogBelly.scale.x;
    frogBellyAnimation =  createjs.Tween.get(frogBelly.scale, {loop: true})
        .to({ x: 0.9 }, 100, createjs.Ease.linear)
        .to({ x: initialZ }, 100, createjs.Ease.linear)
        .wait(5000);

    // MOUTH ANIMATION
    initialZ = frogMouthPivot.rotation.x;
    frogMouthAnimation = createjs.Tween.get(frogMouthPivot.rotation, {loop: true})
        .to({ x: 0.25 }, 200, createjs.Ease.linear)
        .to({ x: initialZ }, 200, createjs.Ease.linear)
        .wait(2500);

    // EYES ANIMATION
    initialZ = frogPupilL.scale.y;
    frogPupilLAnimation = createjs.Tween.get(frogPupilL.scale, {loop: true})
        .to({ y: 0.1 }, 100, createjs.Ease.linear)
        .to({ y: initialZ }, 100, createjs.Ease.linear)
        .wait(2500);

    initialZ = frogPupilR.scale.y;
    frogPupilRAnimation = createjs.Tween.get(frogPupilR.scale, {loop: true})
        .to({ y: 0.1 }, 100, createjs.Ease.linear)
        .to({ y: initialZ }, 100, createjs.Ease.linear)
        .wait(2500);

    // UPPER LEGS ANIMATION
    initialZ = groupPivotLegL.rotation.z;
    groupPivotLegLAnimation = createjs.Tween.get(groupPivotLegL.rotation, {loop: true})
        .to({ z: 0.2 }, 500, createjs.Ease.linear)
        .to({ z: initialZ }, 500, createjs.Ease.linear)
        .wait(1500)
        .to({ z: 0.1 }, 500, createjs.Ease.linear)
        .to({ z: initialZ }, 500, createjs.Ease.linear)
        .wait(3000);

    initialZ = groupPivotLegR.rotation.z;
    groupPivotLegRAnimation = createjs.Tween.get(groupPivotLegR.rotation, {loop: true})
        .to({ z: -0.2 }, 500, createjs.Ease.linear)
        .to({ z: initialZ }, 500, createjs.Ease.linear)
        .wait(1500)
        .to({ z: -0.1 }, 500, createjs.Ease.linear)
        .to({ z: initialZ }, 500, createjs.Ease.linear)
        .wait(3000);

    // LOWER LEGS ANIMATION
    initialZ = frogLowerLeftLeg.rotation.z;
    frogLowerLeftLegAnimation = createjs.Tween.get(frogLowerLeftLeg.rotation, {loop: true})
        .to({ z: -0.8 }, 500, createjs.Ease.linear)
        .to({ z: initialZ }, 500, createjs.Ease.linear)
        .wait(5500);

    initialZ = frogLowerRightLeg.rotation.z;
    frogLowerRightLegAnimation = createjs.Tween.get(frogLowerRightLeg.rotation, {loop: true})
        .to({ z: -0.8 }, 500, createjs.Ease.linear)
        .to({ z: initialZ }, 500, createjs.Ease.linear)
        .wait(5500);

    bodyFrogAnimation = createjs.Tween.get(frogBody.position, {loop: true});

}

function animateSheepHome(){
   //EYEBALLS ANIMATION
    let initialX = sheepEyeBalls[0].position.x;
    createjs.Tween.get(sheepEyeBalls[0].position, {loop: true})
        //.wait(3000)  
        .to({ x: -0.1 }, 300, createjs.Ease.linear).wait(1000)
        .to({ x: 0.1 }, 600, createjs.Ease.linear).wait(1000)
        .to({ x: initialX }, 300, createjs.Ease.linear)
        .wait(1350);
    
    initialX = sheepEyeBalls[1].position.x;
    createjs.Tween.get(sheepEyeBalls[1].position, {loop: true})
        //.wait(3000)
        .to({ x: -0.1 }, 300, createjs.Ease.linear).wait(1000)
        .to({ x: 0.1 }, 600, createjs.Ease.linear).wait(1000)
        .to({ x: initialX },300, createjs.Ease.linear)
        .wait(1350);

   //HEAD ANIMATION
    initialX = sheepHead.rotation.y;
    createjs.Tween.get(sheepHead.rotation, {loop: true})
        //.wait(3000)
        .to({ y: -0.3 }, 300, createjs.Ease.circIn).wait(1000)
        .to({ y: 0.3 }, 600, createjs.Ease.circIn).wait(1000)
        .to({ y: initialX }, 300, createjs.Ease.circIn)
        .wait(1350);
    
    //WOOL ANIMATION HOME
    for (var i=0; i<wool.length; i++) {
        let initialZ = wool[i].rotation.z;
        createjs.Tween.get(wool[i].rotation, {loop: true})
            .wait(3200)    
            .to({ z: -0.5 }, 200, createjs.Ease.linear)
            .to({ z: 0.5 }, 200, createjs.Ease.linear)
            .to({ z: initialZ }, 200, createjs.Ease.linear)
            .wait(750);
    }
}

function createSceneHome(){
        currentScrren = "HOME";
        groupPivotLegR = new THREE.Group();
        groupPivotLegL = new THREE.Group();
        createFrog(1);
        createSheep(2);
        createPlane();
        createLights();
        createButton();
        createHomeButton();
        flyGroup = new THREE.Group();
        createFly();
        group2 = new THREE.Group();
        createScissor();
        createResetAnimationButton();
        createAreaTitle();
        createFrogAreas();
        animateFrogHome();
        animateSheepHome();
        animate();
        render();
}

function animateSceneFrog(){
    animateFrogJump();
    animateFrogHeadAndEyes();
}

function animateFrogHeadAndEyes(){ //attenzione: l'animazione della rana continua anche quando si ritorna nella schermata home
    frogRequestAnimationFrame =  requestAnimationFrame( animateFrogHeadAndEyes ); //serve solo per il movimento degli occhi
    animateFrogEyeBalls();
    animateFrogHead();
}

function animateFrogJump(){

    // UPPER LEGS ANIMATION
    let initialZ = groupPivotLegL.rotation.z;
    groupPivotLegLAnimation = createjs.Tween.get(groupPivotLegL.rotation, {loop: true})
        .to({z: 0.2}, 500, createjs.Ease.linear)
        .to({z: initialZ}, 500, createjs.Ease.linear)
        .wait(1500)
        .to({z: 0.1}, 500, createjs.Ease.linear)
        .to({z: initialZ}, 500, createjs.Ease.linear)
        .wait(3000);

    initialZ = groupPivotLegR.rotation.z;
    groupPivotLegRAnimation = createjs.Tween.get(groupPivotLegR.rotation, {loop: true})
        .to({z: -0.2}, 500, createjs.Ease.linear)
        .to({z: initialZ}, 500, createjs.Ease.linear)
        .wait(1500)
        .to({z: -0.1}, 500, createjs.Ease.linear)
        .to({z: initialZ}, 500, createjs.Ease.linear)
        .wait(3000);

    // BODY ANIMATION
    let initialY = frogBody.position.y;
    bodyFrogAnimation = createjs.Tween.get(frogBody.position, {loop: true})
        .to({y: 0.12}, 500, createjs.Ease.circOut)
        .to({y: initialY}, 500, createjs.Ease.circOut)
        .wait(1500)
        .to({y: 0.1}, 500, createjs.Ease.circOut)
        .to({y: initialY}, 500, createjs.Ease.circOut)
        .wait(3000);

    // LOWER LEGS ANIMATION
    initialZ = frogLowerLeftLeg.rotation.z;
    frogLowerLeftLegAnimation = createjs.Tween.get(frogLowerLeftLeg.rotation, {loop: true})
        .to({z: -0.8}, 500, createjs.Ease.linear)
        .to({z: initialZ}, 500, createjs.Ease.linear)
        .wait(5500);

    initialZ = frogLowerRightLeg.rotation.z;
    frogLowerRightLegAnimation = createjs.Tween.get(frogLowerRightLeg.rotation, {loop: true})
        .to({z: -0.8}, 500, createjs.Ease.linear)
        .to({z: initialZ}, 500, createjs.Ease.linear)
        .wait(5500);

    let listenerFrogJump = new THREE.AudioListener();
    let audioLoaderFrogJump = new THREE.AudioLoader();
    frogJumpSound = new THREE.Audio(listenerFrogJump);
    audioLoaderFrogJump.load('sounds/idle1.ogg', function (buffer) {
        frogJumpSound.setBuffer(buffer);
        frogJumpSound.setLoop(false);
        frogJumpSound.setVolume(0.3);
    })

    const interval2 = setInterval(function () {
        let rnd = Math.floor((Math.random() * 8));
        frogJumpSound.play();
    }, 3000);

}

function animateSceneSheep(){
    //requestAnimationFrame( animateSceneSheep );
    //rotateCameraSheepScene();
    animateScissors();
}

function arrayWoolID() {
    for (let i=47; i<=139; i+=1) {
        woolArray.push(i);
    }
    //console.log("L'array di wool è: "+woolArray);
    //console.log("L'array : "+wool);

}
arrayWoolID();
let count_array = woolArray.slice();
//console.log("count array è: "+count_array.splice(0, 1));
//console.log("count array nuovo è: "+count_array.length);
//var count_wool = woolArray.length-1; //numero pallocchi

function resetSheepPosition() {
    //SHEEP BODY ANIMATION
    createjs.Tween.get(sheepBody.rotation, {loop: false})
      .to({x: 0, y: 0, z: 0}, 1500, createjs.Ease.linear);
}

function jumpSheep() {
    sheepSceneSound.setVolume(0.1)
    // BODY ANIMATION
    createjs.Tween.get(sheepBody.position, {loop: false}).wait(1600)
      .to({y: 1.5}, 500, createjs.Ease.circOut)
      .to({y: -0.4  }, 500, createjs.Ease.circOut)
      .wait(9000);

    clearTimeout(timerSheepFinal);
    timerSheepFinal = setTimeout(function() {
        soundSheepFinal.play();
        soundSheepFinal.setVolume(0.9);
    }, 1600);

}

function gameOver() {
    loadTexture('textures/happySheep2.jpg').then(texture => {
        const happySheepGeometry = new THREE.BoxGeometry(10, 3, 0);
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial({map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd})
        ];
        happySheep = new THREE.Mesh( happySheepGeometry, materials);
        happySheep.translateY(3.3);
        happySheep.translateZ(-1.5);
        scene.add(happySheep);
    })
}

function sheepPlayArea() {
    loadTexture('textures/playAgain.png').then(texture => {
        const playAreaGeometry = new THREE.BoxGeometry(6.7, 4, 0);
        const materials = [
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd}),
            new THREE.MeshBasicMaterial({map: texture}),
            new THREE.MeshBasicMaterial( { color: 0xbfe3dd})
        ];
        playSheepArea = new THREE.Mesh( playAreaGeometry, materials);
        playSheepArea.translateY(-5.3);
        scene.add(playSheepArea);
    
    })
}

var count=0;
function animateWool(j) {
    // WOOL ANIMATION
    woolFalling = createjs.Tween.get(wool[j].position, {loop: false})
    .to({ y: -0.7}, 2000, createjs.Ease.bounceOut)

    woolSmall = createjs.Tween.get(wool[j].scale, {loop: false}).wait(2000)
    .to({x: 0.001, y: 0.001, z: 0.001}, 2000, createjs.Ease.bounceOut)

    for (var i=0; i<count_array.length; i++) {
        if (count_array[i]===woolArray[j]) {
            count_array.splice(i, 1);
            //console.log("HO ELIMINATO: "+count_array.splice(i, 1));
            count += 1;
        }
        else {
            continue;
        }

    }
    if (count_array.length == 1) {
        sheepSceneSound.setVolume(0.3)
        resetSheepPosition();
        jumpSheep();
        gameOver();
        controls.disableVerticalRotation();
        controls.disableHorizontalRotation();
        scene.add(resetAnimationButton);
        homeButton.translateX(0.6);
        sheepPlayArea();
        count_array = woolArray.slice();
        gameOverFlag = true;
        oldSelectedID = 0;
    }
    woolFallingFlag=true;
    woolSmallFlag=true;
}

function animateFrogEyeBalls(){
        var targetPos = new THREE.Vector3();
        flyGroup.getWorldPosition(targetPos);
        
        //compute width and height of the three js scene
        var vFOV = THREE.MathUtils.degToRad( camera.fov ); // convert vertical fov to radians
        var height = 2 * Math.tan( vFOV / 2 ) * 80; // visible height
        var width = height * camera.aspect;

        //computes the range of movement of the eyeball (proportion between scene dimensions and eye dimensions)
        var targetPosScaled = {x: (((targetPos.x)*0.2)/width), y:(((targetPos.y)*0.2)/height)+2};

        createjs.Tween.get(frogPupilL.position)
                .to({x: targetPosScaled.x, y: targetPosScaled.y-2}, 80, createjs.Ease.linear);
                
        createjs.Tween.get(frogPupilR.position)
                .to({x: targetPosScaled.x, y: targetPosScaled.y-2}, 80, createjs.Ease.linear);    
}

function animateFrogHead(){
        //variable for the mouse
        var targetPos = new THREE.Vector3();
        flyBody.getWorldPosition(targetPos);
        var headDistance = targetPos.z - frogHead.position.z;

        //MOVIMENTO ORIZZONTALE DELLA TESTA
        var i = Math.sqrt(Math.pow(headDistance, 2)+Math.pow(targetPos.x, 2));
        var targetDivision = targetPos.x/i;

        //check if I have a value that is acceptable by Math.asin
        if(targetDivision >= 1) targetDivision = 1;
        if(targetDivision <= -1) targetDivision = -1;

        //angle
        targetAngle = Math.asin(targetDivision);

        //setting the limit value to the right and left
        var maxTargetAngle = 0.7;

        targetAngleHorizontalOriginal = targetAngle;
        //check if the angle surpass a certain limit
        if(targetAngle>= maxTargetAngle) targetAngle = maxTargetAngle;
        if(targetAngle <= -maxTargetAngle) targetAngle = -maxTargetAngle;

        frogHeadHorizontalAnimation = createjs.Tween.get(frogHead.rotation)
        .to({y: targetAngle }, 80, createjs.Ease.linear);

        //MOVIMENTO VERTICALE DELLA TESTA
        var iHorizontal = Math.sqrt(Math.pow(headDistance, 2)+Math.pow(targetPos.y, 2));
        var targetDivisionVertical = targetPos.y/iHorizontal;

        //check if I have a value that is acceptable by Math.asin
        if(targetDivisionVertical >= 1) targetDivisionVertical = 1;
        if(targetDivisionVertical <= -1) targetDivisionVertical = -1;

        //angle
        targetAngleVertical = Math.asin(targetDivisionVertical);

        //setting the limit value to the right and left
        var maxTargetAngleVertical = 0.7; 
        var catchVariable = 0.4;

        //check if the angle surpass a certain limit
        targetAngleVerticalOriginal = targetAngleVertical
        if(targetAngleVertical >= maxTargetAngleVertical) targetAngleVertical = maxTargetAngleVertical;
        if(targetAngleVertical <= 0) targetAngleVertical = 0;

        frogHeadVerticalAnimation = createjs.Tween.get(frogHead.rotation)
            .to({x: -targetAngleVertical }, 80, createjs.Ease.linear);

}

function stretchFrogTongue(){ //DEATH AREA
    cancelAnimationFrame(frogRequestAnimationFrame);

    createjs.Tween.get(frogHead.rotation, {loop:false})
        .to({ x: Number(-targetAngleVertical) - 0.65, y: Number(targetAngle) }, 200, createjs.Ease.linear)  //-0.25
        .wait(50)
        .to({ x: 0, y:0 }, 200, createjs.Ease.linear);

     createjs.Tween.get(frogMouthPivot.rotation, {loop:false})
        .to({ x: 1 }, 200, createjs.Ease.linear) //0.6
         .wait(50)
         .to({ x: 0.25 }, 200, createjs.Ease.linear)
         .wait(1000)
         .to({ x: 0.4 }, 200, createjs.Ease.linear)

    var tongueVertAngle = targetAngleVerticalOriginal;
    var tongueHorizAngle = targetAngleHorizontalOriginal;

    if(tongueVertAngle >= 0.3) tongueVertAngle = 0.3;
    if(tongueVertAngle >= 0.2 && tongueVertAngle < 0.3) tongueVertAngle = tongueVertAngle;//ok va bene lasciare tongueAngle
    else if(tongueVertAngle>0 && tongueVertAngle<0.2) tongueVertAngle = 0.3;
    else if(tongueVertAngle <0 && tongueVertAngle >=-0.1) tongueVertAngle = 0.25;
    else if(tongueVertAngle <-0.1 && tongueVertAngle >= -0.2) tongueVertAngle = 0.2;
    else if(tongueVertAngle <-0.2 && tongueVertAngle >= -0.4) tongueVertAngle = 0.1;
    else if(tongueVertAngle <-0.4 && tongueVertAngle >= -0.6) tongueVertAngle = 0;
    else if (tongueVertAngle < -0.6) tongueVertAngle = -0.1;


    createjs.Tween.get(frogTongue.rotation, {loop:false})
        .to({ x: Number(-tongueVertAngle), y: 1.57+Number(tongueHorizAngle)/8 }, 200, createjs.Ease.linear)
        .wait(50)
        .to({ x: 0, y: 1.57 }, 200, createjs.Ease.linear);

    createjs.Tween.get(frogTongue.scale, {loop:false})
        .to({ x: 0.2 }, 200, createjs.Ease.linear)
        .wait(50)
        .to({ x: 0.06 }, 200, createjs.Ease.linear);

    createjs.Tween.get(frogTongue.position, {loop:false})
        .to({z: -0.8, y: 0.1 }, 200, createjs.Ease.linear);

    createjs.Tween.get(frogTongueTip.position, {loop:false})
        .to({ y: -0.1 }, 200, createjs.Ease.linear);

    createjs.Tween.get(frogTongueTip.scale, {loop:false})
        .to({ x: 4.5, y: 5, z:4.3 }, 200, createjs.Ease.linear);


    // BELLY ANIMATION
    let initialZ = frogBelly.scale.x;
    frogBellyAnimation =  createjs.Tween.get(frogBelly.scale, {loop: false})
        .wait(500)
        .to({ x: 0.9 }, 100, createjs.Ease.linear)
        .to({ x: initialZ }, 100, createjs.Ease.linear)
        .wait(100)
        .to({ x: 0.9 }, 100, createjs.Ease.linear)
        .to({ x: initialZ }, 100, createjs.Ease.linear);

    // EYES ANIMATION
    initialZ = frogPupilL.scale.y;
    frogPupilLAnimation = createjs.Tween.get(frogPupilL.scale, {loop: false})
        .wait(550)
        .to({ y: 0.1 }, 100, createjs.Ease.linear)
        .to({ y: initialZ }, 100, createjs.Ease.linear);

    initialZ = frogPupilR.scale.y;
    frogPupilRAnimation = createjs.Tween.get(frogPupilR.scale, {loop: false})
        .wait(550)
        .to({ y: 0.1 }, 100, createjs.Ease.linear)
        .to({ y: initialZ }, 100, createjs.Ease.linear);

    createjs.Tween.get(frogPupilR.position, {loop:false})
        .wait(450)
        .to({x: frogPupilPositionBackupR.x, y: frogPupilPositionBackupR.y, z: frogPupilPositionBackupR.z}, 100, createjs.Ease.linear)

    createjs.Tween.get(frogPupilL.position, {loop:false})
        .wait(450)
        .to({x: frogPupilPositionBackupL.x, y: frogPupilPositionBackupL.y, z: frogPupilPositionBackupL.z}, 100, createjs.Ease.linear)

    createjs.Tween.get(flyGroup.scale, {loop: false}).wait(200)
        .to({x: 0.1, y: 0.1, z: 0.1}, 250, createjs.Ease.bounceOut)
        .wait(1000)
        .to({x: 2.5, y: 2.5, z: 2.5}, 3500, createjs.Ease.bounceOut)
    
    createjs.Tween.get(flyGroup.position, {loop: false}).wait(200)
        .to({x: 0, y: 0, z: 0.5}, 250, createjs.Ease.linear);

    clearTimeout(timerEat);
    timerEat = setTimeout(function() {
        animateFrogHeadAndEyes();
    }, 850);

    clearTimeout(timerFlyCatch);
    timerFlyCatch = setTimeout(function() {
        soundFly.setVolume(0);
        const listenerFlyCatch = new THREE.AudioListener();
        const audioLoaderFlyCatch = new THREE.AudioLoader();
        soundFlyCatch = new THREE.Audio( listenerFlyCatch );
        audioLoaderFlyCatch.load( 'sounds/death.ogg', function( buffer ) {
            soundFlyCatch.setBuffer( buffer );
            soundFlyCatch.setLoop( false );
            soundFlyCatch.setVolume(0.5);
            soundFlyCatch.play();
        });
    }, 200);
}

function sadFrogAnimation(){ //AREA WARNING
    cancelAnimationFrame(frogRequestAnimationFrame);

    createjs.Tween.get(frogHead.rotation, {loop:false})
        .to({ x: Number(-targetAngleVertical) - 0.65, y: Number(targetAngle) }, 200, createjs.Ease.linear)  //-0.25
        .wait(50)
        .to({ x: 0, y:0 }, 200, createjs.Ease.linear)
        .wait(50)
        .to({y: 0.2 }, 100, createjs.Ease.bounceIn)
        .to({y: -0.2 }, 100, createjs.Ease.bounceIn)
        .to({y: 0.1 }, 100, createjs.Ease.bounceIn)
        .to({y: -0.1 }, 100, createjs.Ease.bounceIn)
        .to({y: 0 }, 100, createjs.Ease.bounceIn);


     createjs.Tween.get(frogMouthPivot.rotation, {loop:false})
        .to({ x: 1 }, 200, createjs.Ease.linear)
         .wait(50)
         .to({ x: 0.25 }, 200, createjs.Ease.linear)
         .wait(1000)
         .to({ x: 0.4 }, 200, createjs.Ease.linear)

    var tongueVertAngle = targetAngleVerticalOriginal;
    var tongueHorizAngle = targetAngleHorizontalOriginal;

    if(tongueVertAngle >= 0.3) tongueVertAngle = 0.3;
    if(tongueVertAngle >= 0.2 && tongueVertAngle < 0.3) tongueVertAngle = tongueVertAngle;//ok va bene lasciare tongueAngle
    else if(tongueVertAngle>0 && tongueVertAngle<0.2) tongueVertAngle = 0.3;
    else if(tongueVertAngle <0 && tongueVertAngle >=-0.1) tongueVertAngle = 0.25;
    else if(tongueVertAngle <-0.1 && tongueVertAngle >= -0.2) tongueVertAngle = 0.2;
    else if(tongueVertAngle <-0.2 && tongueVertAngle >= -0.4) tongueVertAngle = 0.1;
    else if(tongueVertAngle <-0.4 && tongueVertAngle >= -0.6) tongueVertAngle = 0;
    else if (tongueVertAngle < -0.6) tongueVertAngle = -0.1;


    createjs.Tween.get(frogTongue.rotation, {loop:false})
        .to({ x: Number(-tongueVertAngle), y: 1.57+Number(tongueHorizAngle)/8 }, 200, createjs.Ease.linear)
        .wait(50)
        .to({ x: 0, y: 1.57 }, 200, createjs.Ease.linear);

    createjs.Tween.get(frogTongue.scale, {loop:false})
        .to({ x: 0.2 }, 200, createjs.Ease.linear)
        .wait(50)
        .to({ x: 0.06 }, 200, createjs.Ease.linear);

    createjs.Tween.get(frogTongue.position, {loop:false})
        .to({z: -0.8, y: 0.1 }, 200, createjs.Ease.linear);

    createjs.Tween.get(frogTongueTip.position, {loop:false})
        .to({ y: -0.1 }, 200, createjs.Ease.linear);

    createjs.Tween.get(frogTongueTip.scale, {loop:false})
        .to({ x: 4.5, y: 5, z:4.3 }, 200, createjs.Ease.linear);

    createjs.Tween.get(frogPupilR.position, {loop:false})
        .wait(450)
        .to({x: frogPupilPositionBackupR.x, y: frogPupilPositionBackupR.y, z: frogPupilPositionBackupR.z}, 100, createjs.Ease.linear);

    createjs.Tween.get(frogPupilL.position, {loop:false})
        .wait(450)
        .to({x: frogPupilPositionBackupL.x, y: frogPupilPositionBackupL.y, z: frogPupilPositionBackupL.z}, 100, createjs.Ease.linear);

    clearTimeout(timerSad);
    timerSad = setTimeout(function() {
        animateFrogHeadAndEyes();
        console.log("riattivo animation frame");
    }, 1050);
    
}

let onMousePause = function (event) {
    clearTimeout(timer);
    clearTimeout(flyTimer);
    var chill, warning, death = false;

    if (currentScrren === "FROG")
        soundFly.setVolume(0.5);

    flyTimer = setTimeout(function() {
        if (currentScrren === "FROG")
        soundFly.setVolume(0);
    }, 100);

    timer = setTimeout(function() {
        if (currentScrren === "FROG"){
            mouseSetting(event);
            console.log("" + intersects[0].object.id);
           // console.log(intersects[1].object.id);
           // console.log(intersects[2].object.id);

            for (let i = 0; i < intersects.length; i += 1) {
                if (intersects[i].object.id === deathAreaID) death = true;
                else if (intersects[i].object.id  === warningAreaID) warning = true;
                else if (intersects[i].object.id  === chillAreaID) chill = true;
            }

            if (death) stretchFrogTongue();
            else if (warning && !death) sadFrogAnimation();
        }
    }, 1000);

}

window.addEventListener('mousemove', onMousePause);

function animateScissors(){

    createjs.Tween.get(scissorBlades[0].rotation, {loop: true})
        .to({ z: -0.1 }, 700, createjs.Ease.linear) //this first animation never stops
        .to({ z: -0.4 }, 900, createjs.Ease.linear); //this second animation never starts

    createjs.Tween.get(scissorBlades[1].rotation, {loop: true})
        .to({ z: 0.1 }, 700, createjs.Ease.linear) //this first animation never stops
        .to({ z: 0.4 }, 900, createjs.Ease.linear); //this second animation never starts

}

function rotateCameraSheepScene(){
    /** instantiate ObjectControls**/
    controls = new ObjectControls( camera, renderer.domElement, sheepBody );
    controls.setObjectToMove(sheepBody);
    controls.setDistance(50, 100); // set min - max distance for zoom
    controls.setZoomSpeed(0.05); // set zoom speed
    controls.enableVerticalRotation();
    controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
    //controls.setMaxHorizontalRotationAngle(Math.PI / 2, Math.PI / 2);
    controls.setRotationSpeed(0.02);
}

function loadHomeSound(counter) {
    if(counter === 1 && !flagHomeSound) {
        const homeListener = new THREE.AudioListener();
        const homeAudioLoader = new THREE.AudioLoader();
        homeSound = new THREE.Audio(homeListener);
        homeAudioLoader.load('sounds/homeSound.ogg', function (buffer) {
            homeSound.setBuffer(buffer);
            homeSound.setLoop(true);
            homeSound.setVolume(0.5);
            homeSound.play();
        });
        flagHomeSound = true;
    }
}

function loadButtonSound() {
        const buttonListener = new THREE.AudioListener();
        const buttonAudioLoader = new THREE.AudioLoader();
        buttonSound = new THREE.Audio(buttonListener);
        buttonAudioLoader.load('sounds/button.ogg', function (buffer) {
            buttonSound.setBuffer(buffer);
            buttonSound.setLoop(false);
            buttonSound.setVolume(0.2);
            buttonSound.play();
        });
}

/*
let loadSound = function (event) {
    const homeListener = new THREE.AudioListener();
    const homeAudioLoader = new THREE.AudioLoader();
    homeSound = new THREE.Audio( homeListener );
    homeAudioLoader.load( 'sounds/homeSound.ogg', function( buffer ) {
        homeSound.setBuffer( buffer );
        homeSound.setLoop( true );
        homeSound.setVolume( 0.5 );
        homeSound.play();
    });
}

window.addEventListener( 'load', loadSound);

 */


