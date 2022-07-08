import * as THREE from '../node_modules/three/build/three.module.js';
// -------------- VARIABLES DECLARATION ----------------------------------
var selected;
var flyBody;
var flyFlag = false;
var windowPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -60);
var frogArea, frogBody, frogBelly,  frogHead, frogMouth,  frogEyeR, frogEyeL, frogPupilR, frogPupilL, frogCheekR, frogCheekL, frogUpperRightLeg, frogUpperLeftLeg, frogLowerRightLeg, frogLowerLeftLeg;
var sheepArea, sheepBody, sheepFrontRightLeg, sheepFrontLeftLeg, sheepBackRightLeg, sheepBackLeftLeg, sheepEyeBalls, sheepHead, sheepEyes;
var button, buttonGeometry, buttonMaterial, buttonLoader;
var homeButton, homeButtonGeometry, homeButtonMaterial, homeButtonLoader;
var fishArea, fishBody, fishHead, fishEyeR, fishEyeL, fishPupilR, fishPupilL, fishTail, fishRightSideFin, fishLeftSideFin, fishUpperFin;
var plane;
var oldSelectedID = 11;

//materials
var grey_color = new THREE.MeshLambertMaterial({ color: 0xf3f2f7 });
var dark_color = new THREE.MeshLambertMaterial({ color: 0x5a6e6c });

const pi = Math.PI;
var objectID, secondObjectID;
const frogID = 10;
const sheepID = 26;
const fishID = 43;
const buttonID = 59;
const homeButtonID = 61;
var buttonFlag = true;
var homeButtonFlag = true;
const backGroundHome = new THREE.Color(0xbfe3dd);



// ---------------------------------------------------------------------
const scene = new THREE.Scene();

//setting the background color

//giallino: 0xfafad2
//azzurrino: 0xbfe3dd
scene.background = backGroundHome;
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

// ------------- FROG ----------------------------------------

function createFrog(scale){
    createFrogArea(scale);
    createFrogBody(scale);
    createFrogBelly(scale);
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
}

// ------------- FROG PARTS ----------------------------------------

function createFrogArea(scale){
    //Clickable area
    const frogAreaGeometry = new THREE.BoxGeometry(3, 3, 3);
    const frogAreaMaterial = new THREE.MeshStandardMaterial( { color: 0x4bcb4b} );
    frogAreaMaterial.transparent = true;
    frogAreaMaterial.opacity = 0;
    frogArea = new THREE.Mesh( frogAreaGeometry, frogAreaMaterial);
    frogArea.translateX(-4);
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
    frogBody.translateX(-4);
    frogBody.scale.multiplyScalar(scale);
    scene.add( frogBody );
}

function createFrogBelly(scale){
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
// ------------------------------------------------------------

// ------------- SHEEP ----------------------------------------

function createSheep(scale){
    createSheepArea(scale);
    createSheepBody(scale);
    createSheepHead(scale);
    createSheepEyes(scale);
    createSheepEyeBalls(scale);
    createSheepTail(scale);
    createSheepHair(scale);
    createSheepLegs(scale);
    sheepBody.scale.multiplyScalar(0.8);
}

// ------------- SHEEP PARTS ----------------------------------------

function createSheepArea(scale){
    //Clickable area
    const sheepAreaGeometry = new THREE.BoxGeometry(3, 3, 3);
    const sheepAreaMaterial = new THREE.MeshStandardMaterial( { color: 0x4bcb4b} );
    sheepAreaMaterial.transparent = true;
    sheepAreaMaterial.opacity = 0;
    sheepArea = new THREE.Mesh( sheepAreaGeometry, sheepAreaMaterial );
    scene.add(sheepArea);
}

function createSheepBody(scale){
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
}

function createSheepHead(scale){
    //Sheep head
    var sheepHeadGeometry = new THREE.IcosahedronGeometry(1, 0);
    sheepHead = new THREE.Mesh(sheepHeadGeometry, dark_color);
    sheepHead.castShadow = true;
    sheepHead.scale.z = 0.6;
    sheepHead.scale.y = 1.1;
    sheepHead.scale.multiplyScalar(0.30);
    sheepHead.position.y = 0.1;
    sheepHead.rotation.x = -0.2;
    sheepHead.position.z = 0.55;
    sheepBody.add(sheepHead);
}

function createSheepEyes(scale){
    //sheepEyes
    var geo_eye = new THREE.CylinderGeometry(0.3, 0.2, 0.3, 8);
    sheepEyes = [];
    for (var i = 0; i < 2; i++) {
        sheepEyes[i] = new THREE.Mesh(geo_eye, grey_color);
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

function createSheepEyeBalls(scale){
    //sheepEyeBalls
    var geo_eyeball = new THREE.SphereGeometry(0.11, 8, 8);
    sheepEyeBalls = [];
    for (var i = 0; i < 2; i++) {
        sheepEyeBalls[i] = new THREE.Mesh(geo_eyeball, dark_color);
        sheepEyes[i].add(sheepEyeBalls[i]);
        sheepEyeBalls[i].castShadow = true;
        sheepEyeBalls[i].position.set(0, 0.2, 0); //ATTENZIONE!!! Il terzo parametro le muove in verticale, il secondo in profondità
    }
}

function createSheepTail(scale){
    //Sheep tail
    var geo_tail = new THREE.IcosahedronGeometry(0.5, 0);
    var tail = new THREE.Mesh(geo_tail, grey_color);
    tail.position.set(0, 0.23, -0.5);
    tail.castShadow = true;
    tail.scale.multiplyScalar(0.35);
    sheepBody.add(tail);
}

function createSheepHair(scale){
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

}

function createSheepLegs(scale){
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
}
// ------------------------------------------------------------


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

   // frogBody.rotation.x += 0.01;
   // frogBody.rotation.y += 0.01;

  //  sheepBody.rotation.x += 0.01;
  //  sheepBody.rotation.y += 0.01;

 //   fishBody.rotation.x += 0.01;
  //  fishBody.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function render(){
    renderer.render(scene, camera);
}

createSceneHome();


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
            setButtonTexture('textures/goFrog.jpg');
            frogArea.add(button);
            oldSelectedID = objectID;
            selected = "FROG";
            break;
        case sheepID:
            scene.background = new THREE.Color(0xc9f0cf);
            resetButton(oldSelectedID);
            console.log(sheepID);
            resetScale(oldSelectedID);
            oldSelectedID = objectID;
            sheepBody.scale.multiplyScalar(2);
            setButtonTexture('textures/goSheep.jpg');
            sheepArea.add(button);
            selected = "SHEEP";
            break;
        case fishID:
            scene.background = new THREE.Color(0xafdcfa);
            resetButton(oldSelectedID);
            console.log(fishID);
            resetScale(oldSelectedID);
            oldSelectedID = objectID;
            fishBody.scale.multiplyScalar(2);
            button.translateX(-0.2);
            setButtonTexture('textures/go_blue.jpg');
            fishArea.add(button);
            selected = "FISH";
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

function onWindowResize() {

    console.log(window.innerWidth);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', onWindowResize);

let onMouseOverButton = function (event) {
    mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    objectID = intersects.length > 0 ? intersects[0].object.id : "objectID";
    secondObjectID = intersects.length > 1 ? intersects[1].object.id : "secondObjectID";
    if (secondObjectID === homeButtonID)
        objectID = secondObjectID;

    console.log("homeButton = " +  homeButtonFlag);
    switch (objectID) {
        case buttonID:
            if (buttonFlag)
                button.scale.multiplyScalar(1.6);
            buttonFlag = false;
            break;
        case homeButtonID:
            scene.remove(flyBody);
            if (homeButtonFlag)
                homeButton.scale.multiplyScalar(1.6);
            homeButtonFlag = false;
            break;
        default:
            if (!buttonFlag) {
                button.scale.multiplyScalar(0.625);
                buttonFlag = true;
            }
            if (!homeButtonFlag && selected === "FROG") {
                homeButton.scale.multiplyScalar(0.625);
                console.log("SI GIURO CHE LO STO RIMPICCIOLENDO IL BOTTONE!");
                scene.add(flyBody);
                homeButtonFlag = true;
            }
            if(!homeButtonFlag && selected === "SHEEP"){
                homeButton.scale.multiplyScalar(0.625);
                homeButtonFlag = true;
            }
            break;
    }
    console.log(objectID);
};
window.addEventListener('mousemove', onMouseOverButton);

let onClickButton = function (event) {
    console.log("VEDIAMO I VALORI = " + (objectID === homeButtonID) + " " + selected);
    mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);
    objectID = intersects.length > 0 ? intersects[0].object.id : "objectID";

    if (objectID === buttonID) {
        switch (selected) {
            case "FROG":
                //console.log(window.history.state);
               // document.getElementById("content").innerHTML = window.html;
               // document.title = response.pageTitle;
               // window.history.pushState("","", "/#frog");
                createSceneFrog();
               // window.location = "#frog";
                break;
            case "SHEEP":
                //createSceneSheep();
                break;
            case "FISH":
                break;
            default:
                break;
        }
    } else if (objectID === homeButtonID) {
        switch (selected) {
            case "FROG":
                //selected = "HOME";
                homeButton.scale.multiplyScalar(0.625);
                frogBody.remove(homeButton);
                frogArea.remove(button);
               // buttonFlag = true;
                resetButton(frogID);
                homeButtonFlag = true;
                frogBody.scale.multiplyScalar(0.5);
                scene.remove(frogBody);
                scene.remove(flyBody);
                frogBody.translateX(-4);
                resetSceneHome();
                break;
            case "SHEEP":
                homeButton.scale.multiplyScalar(0.625);
                sheepBody.remove(homeButton);
                sheepArea.remove(button);
                resetButton(sheepID);
                homeButtonFlag = true;
                sheepBody.scale.multiplyScalar(0.5);
                scene.remove(sheepBody);
                resetSceneHome();
                break;
            default:
                break;
        }
    }
}
window.addEventListener( 'click', onClickButton, false);

function setButtonTexture(texturePath){
    buttonLoader = new THREE.TextureLoader();
    button.material = new THREE.MeshBasicMaterial({
        map:  buttonLoader.load(texturePath),
        side: THREE.DoubleSide
    });
    button.material.needsUpdate = true;
}

function createButton(){
    buttonGeometry = new THREE.CircleGeometry(0.4,32,0, 6.283185307179586);
    buttonMaterial = new THREE.MeshBasicMaterial({color: 0x003060});
    button = new THREE.Mesh( buttonGeometry, buttonMaterial );
    button.translateY(-2.5);
    button.translateZ(5.0);
}

function followMouse(event){
    let intersects = new THREE.Vector3();
    let mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1);

    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(windowPlane, intersects);
    if (flyFlag)
    flyBody.position.set(intersects.x, intersects.y, intersects.z);
    else flyFlag = false;

}
window.addEventListener( 'mousemove', followMouse, false);

function createFly(){
    let mouseGeometry = new THREE.SphereGeometry( 0.05, 12, 8 );
    let mouseMaterial = new THREE.MeshStandardMaterial( { color: 0x00ffff } );
    flyBody = new THREE.Mesh( mouseGeometry, mouseMaterial );
    //scene.add( flyBody );
    flyFlag = true;
}

function setHomeButtonTexture(texturePath){
    homeButtonLoader = new THREE.TextureLoader();
    homeButton.material = new THREE.MeshBasicMaterial({
        map:  homeButtonLoader.load(texturePath),
        side: THREE.DoubleSide
    });
    button.material.needsUpdate = true;
}

function createHomeButton(){
    homeButtonGeometry = new THREE.CircleGeometry(0.2,32,0, 6.283185307179586);
    homeButtonMaterial = new THREE.MeshBasicMaterial({color: 0x003060});
    homeButton = new THREE.Mesh( homeButtonGeometry, homeButtonMaterial );
    homeButton.translateY(-2.5);
    homeButton.translateZ(5.0);
}

function createSceneFrog(){
    scene.remove(fishArea);
    scene.remove(fishBody);
    scene.remove(sheepArea);
    scene.remove(sheepBody);
    scene.remove(frogArea);
    scene.add(flyBody);
    frogBody.translateX(4);
    setHomeButtonTexture('textures/homeFrog.jpg');
    frogBody.add(homeButton);

}

function createSceneSheep(){
    scene.remove(fishArea);
    scene.remove(fishBody);
    scene.remove(frogArea);
    scene.remove(frogBody);
    scene.remove(sheepArea);
    setHomeButtonTexture('textures/homeSheep.jpg');
    //homeButton.translateY(-3);

    sheepBody.add(homeButton);
}

function resetSceneHome(){
    scene.background = backGroundHome;
    scene.add(frogBody);
    scene.add(frogArea);
    scene.add(sheepBody);
    scene.add(sheepArea);
    scene.add(fishBody);
    scene.add(fishArea);
    oldSelectedID = 0;
}
function createSceneHome(){
    createFrog(1);
    createSheep(2);
    createFish(1);
    createPlane();
    createLights();
    createButton();
    createFly();
    createHomeButton();
    animate();
    render();
}






